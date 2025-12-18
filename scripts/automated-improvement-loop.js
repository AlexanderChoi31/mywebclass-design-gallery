#!/usr/bin/env node
/**
 * Automated Improvement Loop
 * Assesses screenshots, fixes issues, and iterates until perfect scores
 */

const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const screenshotsDir = path.join(__dirname, '..', 'screenshots');
const progressDir = path.join(screenshotsDir, 'progress');
const logsDir = path.join(__dirname, '..', 'logs', 'improvement-loop');
const baseUrl = process.env.BASE_URL || 'http://localhost:8080';
const themes = ['onyx', 'paper', 'neon', 'brutal', 'calm', 'royal'];
const pages = [
  { path: '/', name: 'homepage' },
  { path: '/themes/', name: 'themes-index' }
];

// Ensure directories exist
[screenshotsDir, progressDir, logsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

let iteration = 0;
const maxIterations = 10;
const improvementLog = [];

/**
 * Take screenshot with version number
 */
async function takeScreenshot(theme, pageName, version) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  // Set theme
  await page.addInitScript((theme) => {
    localStorage.setItem('mywebclass-theme', theme);
  }, theme);
  
  await page.goto(`${baseUrl}${pages.find(p => p.name === pageName).path}`, { 
    waitUntil: 'networkidle' 
  });
  
  await page.waitForTimeout(500);
  
  // Force set theme
  await page.evaluate((theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mywebclass-theme', theme);
    if (window.ThemeSwitcher) {
      window.ThemeSwitcher.setTheme(theme);
    }
  }, theme);
  
  await page.waitForTimeout(1000);
  
  // Verify theme
  const appliedTheme = await page.evaluate(() => {
    return document.documentElement.getAttribute('data-theme');
  });
  
  if (appliedTheme !== theme) {
    await page.evaluate((theme) => {
      document.documentElement.setAttribute('data-theme', theme);
    }, theme);
    await page.waitForTimeout(500);
  }
  
  const filename = `${theme}-${pageName}-v${version}.png`;
  const screenshotPath = path.join(progressDir, filename);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  
  await browser.close();
  
  return screenshotPath;
}

/**
 * Analyze contrast from page
 */
async function analyzeContrast(page) {
  const contrastResults = await page.evaluate(() => {
    const results = [];
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, li, span, button, label');
    
    const rgbToLuminance = (rgb) => {
      const match = rgb.match(/\d+/g);
      if (!match || match.length < 3) return 0;
      const [r, g, b] = match.map(Number);
      const [rs, gs, bs] = [r, g, b].map(val => {
        val = val / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };
    
    textElements.forEach(el => {
      try {
        const styles = window.getComputedStyle(el);
        const bgColor = styles.backgroundColor;
        const textColor = styles.color;
        
        if (bgColor && textColor && bgColor !== 'rgba(0, 0, 0, 0)' && textColor !== 'rgba(0, 0, 0, 0)') {
          const textLum = rgbToLuminance(textColor);
          const bgLum = rgbToLuminance(bgColor);
          
          if (textLum > 0 && bgLum > 0) {
            const contrast = (Math.max(textLum, bgLum) + 0.05) / (Math.min(textLum, bgLum) + 0.05);
            
            results.push({
              element: el.tagName,
              contrast: contrast,
              passesAA: contrast >= 4.5,
              passesAAA: contrast >= 7,
              textColor,
              bgColor
            });
          }
        }
      } catch (e) {
        // Skip if can't parse
      }
    });
    
    return results;
  });
  
  const total = contrastResults.length || 1;
  const passingAA = contrastResults.filter(r => r.passesAA).length;
  const passingAAA = contrastResults.filter(r => r.passesAAA).length;
  const avgContrast = contrastResults.length > 0 
    ? contrastResults.reduce((sum, r) => sum + r.contrast, 0) / total 
    : 0;
  
  return {
    totalElements: total,
    passingAA,
    passingAAA,
    aaPercentage: (passingAA / total * 100).toFixed(1),
    aaaPercentage: (passingAAA / total * 100).toFixed(1),
    averageContrast: avgContrast.toFixed(2),
    score: (passingAA / total) * 5,
    failingElements: contrastResults.filter(r => !r.passesAA).slice(0, 10) // Top 10 failures
  };
}

/**
 * Analyze spacing
 */
async function analyzeSpacing(page) {
  const spacingResults = await page.evaluate(() => {
    const containers = document.querySelectorAll('.container, .section, main, article, section, .card, .form-group');
    const results = [];
    
    containers.forEach(container => {
      const styles = window.getComputedStyle(container);
      const padding = {
        top: parseFloat(styles.paddingTop),
        bottom: parseFloat(styles.paddingBottom),
        left: parseFloat(styles.paddingLeft),
        right: parseFloat(styles.paddingRight)
      };
      
      const margin = {
        top: parseFloat(styles.marginTop),
        bottom: parseFloat(styles.marginBottom)
      };
      
      results.push({
        element: container.className || container.tagName,
        padding,
        margin,
        hasConsistentPadding: Math.abs(padding.top - padding.bottom) < 2 && 
                              Math.abs(padding.left - padding.right) < 2,
        hasVerticalSpacing: margin.top > 0 || margin.bottom > 0,
        totalPadding: padding.top + padding.bottom + padding.left + padding.right
      });
    });
    
    return results;
  });
  
  const total = spacingResults.length || 1;
  const consistentPadding = spacingResults.filter(r => r.hasConsistentPadding).length;
  const hasVerticalSpacing = spacingResults.filter(r => r.hasVerticalSpacing).length;
  
  return {
    totalContainers: total,
    consistentPadding,
    hasVerticalSpacing,
    consistencyScore: (consistentPadding / total) * 5,
    spacingScore: (hasVerticalSpacing / total) * 5,
    overallScore: ((consistentPadding + hasVerticalSpacing) / (total * 2)) * 5,
    issues: spacingResults.filter(r => !r.hasConsistentPadding && !r.hasVerticalSpacing)
  };
}

/**
 * Assess theme with 5 questions
 */
async function assessTheme(theme, pagePath, pageName) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  // Set theme
  await page.addInitScript((theme) => {
    localStorage.setItem('mywebclass-theme', theme);
  }, theme);
  
  await page.goto(`${baseUrl}${pagePath}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  
  await page.evaluate((theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mywebclass-theme', theme);
    if (window.ThemeSwitcher) {
      window.ThemeSwitcher.setTheme(theme);
    }
  }, theme);
  
  await page.waitForTimeout(1000);
  
  // Run analyses
  const contrast = await analyzeContrast(page);
  const spacing = await analyzeSpacing(page);
  
  // Check professionalism
  const professionalism = await page.evaluate(() => {
    const checks = {
      hasHeader: !!document.querySelector('header'),
      hasFooter: !!document.querySelector('footer'),
      hasNavigation: !!document.querySelector('nav'),
      hasMain: !!document.querySelector('main'),
      hasSemanticHTML: document.querySelectorAll('header, nav, main, footer, article, section').length >= 4,
      hasMetaDescription: !!document.querySelector('meta[name="description"]'),
      hasTitle: !!document.querySelector('title'),
      responsiveDesign: document.querySelector('meta[name="viewport"]')?.content.includes('width=device-width')
    };
    
    const score = Object.values(checks).filter(Boolean).length;
    return {
      ...checks,
      score: (score / Object.keys(checks).length) * 5
    };
  });
  
  // Check typography
  const typography = await page.evaluate(() => {
    const headings = {
      h1: document.querySelectorAll('h1').length,
      h2: document.querySelectorAll('h2').length,
      h3: document.querySelectorAll('h3').length
    };
    
    const hasProperHierarchy = headings.h1 <= 1 && headings.h1 > 0;
    const hasMultipleLevels = Object.values(headings).filter(count => count > 0).length >= 2;
    
    const h1Size = document.querySelector('h1') 
      ? parseFloat(window.getComputedStyle(document.querySelector('h1')).fontSize)
      : 0;
    const h2Size = document.querySelector('h2')
      ? parseFloat(window.getComputedStyle(document.querySelector('h2')).fontSize)
      : 0;
    const bodySize = document.querySelector('p')
      ? parseFloat(window.getComputedStyle(document.querySelector('p')).fontSize)
      : 0;
    
    const hasSizeHierarchy = h1Size > h2Size && h2Size > bodySize && bodySize > 0;
    
    return {
      hasProperHierarchy,
      hasMultipleLevels,
      hasSizeHierarchy,
      score: (hasProperHierarchy + hasMultipleLevels + hasSizeHierarchy) / 3 * 5
    };
  });
  
  await browser.close();
  
  // Calculate overall score
  const overallScore = (
    contrast.score * 0.3 +
    spacing.overallScore * 0.25 +
    typography.score * 0.2 +
    professionalism.score * 0.25
  );
  
  return {
    theme,
    page: pageName,
    pagePath,
    timestamp: new Date().toISOString(),
    assessments: {
      spacing: {
        question: "Is it spaced properly?",
        score: spacing.overallScore,
        answer: spacing.overallScore >= 4.5 
          ? `Yes - ${spacing.consistentPadding}/${spacing.totalContainers} containers have consistent spacing`
          : `Needs improvement - Only ${spacing.consistentPadding}/${spacing.totalContainers} containers have consistent spacing`,
        details: spacing
      },
      cleanliness: {
        question: "Is it clean?",
        score: professionalism.score,
        answer: professionalism.score >= 4.5
          ? `Yes - Clean, organized design with professional indicators`
          : `Could be cleaner - Missing some professional design patterns`,
        details: professionalism
      },
      readability: {
        question: "Can users read easily? (Ensure color contrast nicely)",
        score: contrast.score,
        answer: contrast.score >= 4.5
          ? `Yes - ${contrast.aaPercentage}% of text elements meet WCAG AA contrast (4.5:1), average: ${contrast.averageContrast}:1`
          : `Needs improvement - Only ${contrast.aaPercentage}% meet WCAG AA, average: ${contrast.averageContrast}:1`,
        details: contrast
      },
      professionalism: {
        question: "Do the designs have a mark of professionalism to them?",
        score: professionalism.score,
        answer: professionalism.score >= 4.5
          ? `Yes - Professional design patterns present`
          : `Could be more professional - Missing some professional indicators`,
        details: professionalism
      },
      typography: {
        question: "Is typography hierarchy clear?",
        score: typography.score,
        answer: typography.hasProperHierarchy && typography.hasSizeHierarchy
          ? `Yes - Clear hierarchy with proper heading structure`
          : `Needs improvement - Typography hierarchy could be clearer`,
        details: typography
      }
    },
    overallScore: parseFloat(overallScore.toFixed(2)),
    needsImprovement: overallScore < 4.5 || contrast.score < 4.5 || spacing.overallScore < 4.5
  };
}

/**
 * Calculate contrast ratio between two colors
 */
function calculateContrast(color1, color2) {
  const getLuminance = (rgb) => {
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    const [rs, gs, bs] = [r, g, b].map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Fix contrast issues intelligently
 */
function fixContrastIssues(theme, contrastData) {
  const cssPath = path.join(__dirname, '..', 'src', 'css', 'themes.css');
  let cssContent = fs.readFileSync(cssPath, 'utf8');
  
  // Get theme-specific CSS block
  const themeRegex = new RegExp(`(\\[data-theme="${theme}"\\][^{]*\\{[^}]+\\})`, 's');
  const match = cssContent.match(themeRegex);
  
  if (!match) return false;
  
  let themeCSS = match[1];
  let changesMade = false;
  
  // If contrast is low, adjust colors to meet WCAG AA (4.5:1)
  if (parseFloat(contrastData.averageContrast) < 4.5) {
    const improvements = {
      'onyx': {
        '--color-text-primary': '#ffffff',      // Pure white on dark
        '--color-text-secondary': '#e0e0e0',    // Light gray
        '--color-bg-primary': '#000000'         // Pure black
      },
      'paper': {
        '--color-text-primary': '#000000',      // Pure black on light
        '--color-text-secondary': '#1a1a1a',    // Very dark gray
        '--color-bg-primary': '#ffffff'         // Pure white
      },
      'neon': {
        '--color-text-primary': '#ffffff',      // White on dark
        '--color-text-secondary': '#e0e0e0',    // Light gray
        '--color-bg-primary': '#000000'         // Pure black
      },
      'brutal': {
        '--color-text-primary': '#000000',      // Black on white
        '--color-text-secondary': '#000000',    // Black
        '--color-bg-primary': '#ffffff'         // White
      },
      'calm': {
        '--color-text-primary': '#1a202c',      // Very dark gray-blue
        '--color-text-secondary': '#2d3748',    // Dark gray
        '--color-bg-primary': '#ffffff'         // White
      }
    };
    
    const themeImprovements = improvements[theme];
    if (themeImprovements) {
      Object.entries(themeImprovements).forEach(([varName, newValue]) => {
        const varRegex = new RegExp(`(${varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\s*)[^;]+`, 'g');
        if (themeCSS.match(varRegex)) {
          themeCSS = themeCSS.replace(varRegex, `$1${newValue}`);
          changesMade = true;
        }
      });
    }
  }
  
  if (changesMade) {
    cssContent = cssContent.replace(themeRegex, themeCSS);
    fs.writeFileSync(cssPath, cssContent);
    return true;
  }
  
  return false;
}

/**
 * Fix spacing issues
 */
function fixSpacingIssues(spacingData) {
  const cssPath = path.join(__dirname, '..', 'src', 'css', 'base.css');
  let cssContent = fs.readFileSync(cssPath, 'utf8');
  let changesMade = false;
  
  // Add consistent spacing if missing
  if (spacingData.overallScore < 4.5) {
    // Ensure containers have consistent padding
    if (!cssContent.includes('.container {')) {
      const insertPoint = cssContent.indexOf('/* Layout */');
      if (insertPoint > -1) {
        cssContent = cssContent.slice(0, insertPoint) + 
          '.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: var(--space-lg) var(--space-md);\n}\n\n' +
          cssContent.slice(insertPoint);
        changesMade = true;
      }
    } else {
      // Update existing container
      const containerRegex = /\.container\s*\{[^}]*\}/;
      if (containerRegex.test(cssContent)) {
        cssContent = cssContent.replace(
          containerRegex,
          `.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-lg) var(--space-md);
}`
        );
        changesMade = true;
      }
    }
    
    // Ensure sections have vertical spacing
    if (!cssContent.includes('.section {')) {
      const insertPoint = cssContent.indexOf('/* Layout */');
      if (insertPoint > -1) {
        cssContent = cssContent.slice(0, insertPoint) + 
          '.section {\n  margin: var(--space-xl) 0;\n  padding: var(--space-lg) 0;\n}\n\n' +
          cssContent.slice(insertPoint);
        changesMade = true;
      }
    } else {
      // Update existing section
      const sectionRegex = /\.section\s*\{[^}]*\}/;
      if (sectionRegex.test(cssContent)) {
        cssContent = cssContent.replace(
          sectionRegex,
          `.section {
  margin: var(--space-xl) 0;
  padding: var(--space-lg) 0;
}`
        );
        changesMade = true;
      }
    }
    
    // Ensure cards have consistent spacing
    if (!cssContent.includes('.card {')) {
      cssContent += '\n\n.card {\n  padding: var(--space-md);\n  margin: var(--space-md) 0;\n}\n';
      changesMade = true;
    }
  }
  
  if (changesMade) {
    fs.writeFileSync(cssPath, cssContent);
    return true;
  }
  
  return false;
}

/**
 * Main improvement loop
 */
async function improvementLoop() {
  console.log('🔄 Starting Automated Improvement Loop...\n');
  console.log(`Max iterations: ${maxIterations}\n`);
  
  let allPerfect = false;
  
  while (iteration < maxIterations && !allPerfect) {
    iteration++;
    console.log(`${'═'.repeat(70)}`);
    console.log(`ITERATION ${iteration}`);
    console.log('═'.repeat(70) + '\n');
    
    const iterationAssessments = [];
    const issuesFound = [];
    
    // Assess all themes
    for (const theme of themes) {
      for (const page of pages) {
        console.log(`📊 Assessing ${theme} - ${page.name}...`);
        
        const assessment = await assessTheme(theme, page.path, page.name);
        iterationAssessments.push(assessment);
        
        console.log(`  Overall Score: ${assessment.overallScore}/5`);
        console.log(`  Spacing: ${assessment.assessments.spacing.score.toFixed(1)}/5`);
        console.log(`  Readability: ${assessment.assessments.readability.score.toFixed(1)}/5`);
        console.log(`  Professionalism: ${assessment.assessments.professionalism.score.toFixed(1)}/5\n`);
        
        // Check if needs improvement
        if (assessment.needsImprovement) {
          issuesFound.push(assessment);
          
          // Take screenshot before fixes
          const screenshotBefore = await takeScreenshot(theme, page.name, `${iteration}-before`);
          console.log(`  📸 Screenshot (before): ${path.basename(screenshotBefore)}\n`);
          
          // Fix issues
          let fixed = false;
          
          // Fix contrast
          if (assessment.assessments.readability.score < 4.5) {
            console.log(`  🔧 Fixing contrast issues...`);
            fixed = fixContrastIssues(theme, assessment.assessments.readability.details) || fixed;
          }
          
          // Fix spacing
          if (assessment.assessments.spacing.score < 4.5) {
            console.log(`  🔧 Fixing spacing issues...`);
            fixed = fixSpacingIssues(assessment.assessments.spacing.details) || fixed;
          }
          
          if (fixed) {
            // Rebuild
            console.log(`  🔨 Rebuilding...`);
            execSync('npm run build', { cwd: path.join(__dirname, '..'), stdio: 'pipe' });
            
            // Wait a bit for server to pick up changes
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Take screenshot after fixes
            const screenshotAfter = await takeScreenshot(theme, page.name, `${iteration}-after`);
            console.log(`  📸 Screenshot (after): ${path.basename(screenshotAfter)}\n`);
          }
        } else {
          // Perfect score - take final screenshot
          const screenshot = await takeScreenshot(theme, page.name, `${iteration}-final`);
          console.log(`  ✅ Perfect! Screenshot: ${path.basename(screenshot)}\n`);
        }
      }
    }
    
    // Check if all are perfect
    const allScores = iterationAssessments.map(a => a.overallScore);
    const avgScore = allScores.reduce((sum, s) => sum + s, 0) / allScores.length;
    const minScore = Math.min(...allScores);
    
    console.log(`📊 Iteration ${iteration} Summary:`);
    console.log(`   Average Score: ${avgScore.toFixed(2)}/5`);
    console.log(`   Minimum Score: ${minScore.toFixed(2)}/5`);
    console.log(`   Issues Found: ${issuesFound.length}\n`);
    
    // Log iteration
    improvementLog.push({
      iteration,
      timestamp: new Date().toISOString(),
      assessments: iterationAssessments,
      averageScore: avgScore,
      minimumScore: minScore,
      issuesFound: issuesFound.length
    });
    
    // Check if perfect (all scores >= 4.5)
    if (minScore >= 4.5 && avgScore >= 4.5) {
      allPerfect = true;
      console.log('🎉 ALL THEMES ACHIEVED PERFECT SCORES!\n');
    } else if (issuesFound.length === 0) {
      // No issues found but scores not perfect - might need manual review
      console.log('⚠️  No automatic fixes available. Manual review may be needed.\n');
      break;
    }
    
    // Save progress
    const logPath = path.join(logsDir, `iteration-${iteration}.json`);
    fs.writeFileSync(logPath, JSON.stringify(improvementLog, null, 2));
  }
  
  // Generate comprehensive final report with 5 questions
  const finalReportPath = path.join(logsDir, 'improvement-loop-summary.txt');
  let report = '╔════════════════════════════════════════════════════════════════════════════╗\n';
  report += '║              AUTOMATED IMPROVEMENT LOOP - FINAL REPORT                       ║\n';
  report += '║              Assessment Based on 5 Key Questions                              ║\n';
  report += '╚════════════════════════════════════════════════════════════════════════════╝\n\n';
  report += `Total Iterations: ${iteration}\n`;
  report += `Status: ${allPerfect ? '✅ PERFECT SCORES ACHIEVED' : '⚠️  INCOMPLETE'}\n`;
  report += `Date: ${new Date().toISOString()}\n\n`;
  
  if (improvementLog.length > 0) {
    const final = improvementLog[improvementLog.length - 1];
    report += `Final Average Score: ${final.averageScore.toFixed(2)}/5\n`;
    report += `Final Minimum Score: ${final.minimumScore.toFixed(2)}/5\n\n`;
    
    // Group by theme and show 5 questions
    const byTheme = {};
    final.assessments.forEach(a => {
      if (!byTheme[a.theme]) byTheme[a.theme] = [];
      byTheme[a.theme].push(a);
    });
    
    Object.keys(byTheme).forEach(theme => {
      report += `${'═'.repeat(70)}\n`;
      report += `THEME: ${theme.toUpperCase()}\n`;
      report += `${'═'.repeat(70)}\n\n`;
      
      byTheme[theme].forEach(assessment => {
        report += `Page: ${assessment.page}\n`;
        report += `Overall Score: ${assessment.overallScore}/5\n\n`;
        
        // Answer all 5 questions
        Object.entries(assessment.assessments).forEach(([key, value]) => {
          report += `  ❓ ${value.question}\n`;
          report += `  ✅ ${value.answer}\n`;
          report += `  📊 Score: ${value.score.toFixed(1)}/5\n\n`;
        });
        
        report += '\n';
      });
      
      const themeAvg = byTheme[theme].reduce((sum, a) => sum + a.overallScore, 0) / byTheme[theme].length;
      report += `Theme Average: ${themeAvg.toFixed(2)}/5\n\n`;
    });
    
    report += `${'═'.repeat(70)}\n`;
    report += 'ITERATION HISTORY\n';
    report += `${'═'.repeat(70)}\n\n`;
    improvementLog.forEach((log) => {
      report += `Iteration ${log.iteration}:\n`;
      report += `  Average Score: ${log.averageScore.toFixed(2)}/5\n`;
      report += `  Minimum Score: ${log.minimumScore.toFixed(2)}/5\n`;
      report += `  Issues Found: ${log.issuesFound}\n\n`;
    });
  }
  
  report += `\n${'═'.repeat(70)}\n`;
  report += 'FILES GENERATED\n';
  report += `${'═'.repeat(70)}\n\n`;
  report += `Progress Screenshots: ${progressDir}\n`;
  report += `Detailed Logs: ${logsDir}\n`;
  report += `Total Screenshots: ${fs.readdirSync(progressDir).filter(f => f.endsWith('.png')).length}\n`;
  
  fs.writeFileSync(finalReportPath, report);
  
  console.log('═'.repeat(70));
  console.log('✅ IMPROVEMENT LOOP COMPLETE');
  console.log('═'.repeat(70));
  console.log(`\n📊 Total Iterations: ${iteration}`);
  console.log(`📸 Progress Screenshots: ${progressDir}`);
  console.log(`📋 Final Report: ${finalReportPath}\n`);
  
  if (allPerfect) {
    console.log('🎉 All themes achieved perfect scores!\n');
  } else {
    console.log('⚠️  Some themes may need manual review\n');
  }
}

if (require.main === module) {
  improvementLoop().catch(console.error);
}

module.exports = { improvementLoop };

