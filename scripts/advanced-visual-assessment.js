#!/usr/bin/env node
/**
 * Advanced Visual Assessment with AI-style Analysis
 * Uses Playwright to capture screenshots and analyze visual design
 */

const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, '..', 'screenshots');
const assessmentDir = path.join(__dirname, '..', 'logs', 'visual-assessments');

const themes = ['onyx', 'paper', 'neon', 'brutal', 'calm', 'royal'];
const baseUrl = process.env.BASE_URL || 'http://localhost:8080';

/**
 * Analyze color contrast from computed styles
 */
async function analyzeContrast(page) {
  const contrastResults = await page.evaluate(() => {
    const results = [];
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, li, span, button');
    
    textElements.forEach(el => {
      const styles = window.getComputedStyle(el);
      const bgColor = styles.backgroundColor;
      const textColor = styles.color;
      
      // Get RGB values
      const rgbToLuminance = (rgb) => {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        const [rs, gs, bs] = [r, g, b].map(val => {
          val = val / 255;
          return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      };
      
      try {
        const textLum = rgbToLuminance(textColor);
        const bgLum = rgbToLuminance(bgColor);
        const contrast = (Math.max(textLum, bgLum) + 0.05) / (Math.min(textLum, bgLum) + 0.05);
        
        results.push({
          element: el.tagName,
          contrast: contrast.toFixed(2),
          passesAA: contrast >= 4.5,
          passesAAA: contrast >= 7,
          textColor,
          bgColor
        });
      } catch (e) {
        // Skip if can't parse
      }
    });
    
    return results;
  });
  
  const passingAA = contrastResults.filter(r => r.passesAA).length;
  const passingAAA = contrastResults.filter(r => r.passesAAA).length;
  const total = contrastResults.length;
  const avgContrast = contrastResults.reduce((sum, r) => sum + parseFloat(r.contrast), 0) / total;
  
  return {
    totalElements: total,
    passingAA: passingAA,
    passingAAA: passingAAA,
    aaPercentage: (passingAA / total * 100).toFixed(1),
    aaaPercentage: (passingAAA / total * 100).toFixed(1),
    averageContrast: avgContrast.toFixed(2),
    score: (passingAA / total) * 5,
    details: contrastResults
  };
}

/**
 * Analyze spacing consistency
 */
async function analyzeSpacing(page) {
  const spacingResults = await page.evaluate(() => {
    const results = [];
    const containers = document.querySelectorAll('.container, .section, main, article, section');
    
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
        hasConsistentPadding: padding.top === padding.bottom && padding.left === padding.right,
        hasVerticalSpacing: margin.top > 0 || margin.bottom > 0
      });
    });
    
    return results;
  });
  
  const consistentPadding = spacingResults.filter(r => r.hasConsistentPadding).length;
  const hasVerticalSpacing = spacingResults.filter(r => r.hasVerticalSpacing).length;
  const total = spacingResults.length;
  
  return {
    totalContainers: total,
    consistentPadding: consistentPadding,
    hasVerticalSpacing: hasVerticalSpacing,
    consistencyScore: (consistentPadding / total) * 5,
    spacingScore: (hasVerticalSpacing / total) * 5,
    overallScore: ((consistentPadding + hasVerticalSpacing) / (total * 2)) * 5,
    details: spacingResults
  };
}

/**
 * Analyze typography hierarchy
 */
async function analyzeTypography(page) {
  const typographyResults = await page.evaluate(() => {
    const headings = {
      h1: document.querySelectorAll('h1').length,
      h2: document.querySelectorAll('h2').length,
      h3: document.querySelectorAll('h3').length,
      h4: document.querySelectorAll('h4').length,
      h5: document.querySelectorAll('h5').length,
      h6: document.querySelectorAll('h6').length
    };
    
    const hasProperHierarchy = headings.h1 <= 1 && headings.h1 > 0;
    const hasMultipleLevels = Object.values(headings).filter(count => count > 0).length >= 3;
    
    // Check font sizes
    const h1Size = document.querySelector('h1') 
      ? parseFloat(window.getComputedStyle(document.querySelector('h1')).fontSize)
      : 0;
    const h2Size = document.querySelector('h2')
      ? parseFloat(window.getComputedStyle(document.querySelector('h2')).fontSize)
      : 0;
    const bodySize = document.querySelector('p')
      ? parseFloat(window.getComputedStyle(document.querySelector('p')).fontSize)
      : 0;
    
    const hasSizeHierarchy = h1Size > h2Size && h2Size > bodySize;
    
    return {
      headings,
      hasProperHierarchy,
      hasMultipleLevels,
      hasSizeHierarchy,
      sizes: { h1: h1Size, h2: h2Size, body: bodySize },
      score: (hasProperHierarchy + hasMultipleLevels + hasSizeHierarchy) / 3 * 5
    };
  });
  
  return typographyResults;
}

/**
 * Check for professional design patterns
 */
async function checkProfessionalism(page) {
  const professionalismResults = await page.evaluate(() => {
    const checks = {
      hasHeader: !!document.querySelector('header'),
      hasFooter: !!document.querySelector('footer'),
      hasNavigation: !!document.querySelector('nav'),
      hasMain: !!document.querySelector('main'),
      hasSemanticHTML: document.querySelectorAll('header, nav, main, footer, article, section').length >= 4,
      hasMetaDescription: !!document.querySelector('meta[name="description"]'),
      hasTitle: !!document.querySelector('title'),
      hasViewport: !!document.querySelector('meta[name="viewport"]'),
      hasCanonical: !!document.querySelector('link[rel="canonical"]'),
      hasOGTags: document.querySelectorAll('meta[property^="og:"]').length >= 3,
      responsiveDesign: document.querySelector('meta[name="viewport"]')?.content.includes('width=device-width'),
      hasAltText: Array.from(document.querySelectorAll('img')).every(img => img.alt !== ''),
      hasARIALabels: document.querySelectorAll('[aria-label]').length > 0
    };
  
    const score = Object.values(checks).filter(Boolean).length;
    const maxScore = Object.keys(checks).length;
    
    return {
      ...checks,
      score: (score / maxScore) * 5,
      percentage: (score / maxScore * 100).toFixed(1)
    };
  });
  
  return professionalismResults;
}

/**
 * Generate comprehensive assessment
 */
async function assessThemePage(theme, pagePath, pageName) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  // Set theme in localStorage BEFORE navigation
  await page.addInitScript((theme) => {
    localStorage.setItem('mywebclass-theme', theme);
    // Also set it on the document immediately
    if (document.documentElement) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, theme);
  
  await page.goto(`${baseUrl}${pagePath}`, { waitUntil: 'networkidle' });
  
  // Wait for theme switcher to initialize, then force set theme
  await page.waitForTimeout(500);
  
  // Force set theme after page loads (override theme-switcher)
  await page.evaluate((theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mywebclass-theme', theme);
    // Update select if it exists
    const select = document.querySelector('.theme-switcher select');
    if (select) {
      select.value = theme;
    }
    // Use ThemeSwitcher if available
    if (window.ThemeSwitcher) {
      window.ThemeSwitcher.setTheme(theme);
    }
  }, theme);
  
  // Wait for styles to apply
  await page.waitForTimeout(1000);
  
  // Verify theme is applied
  const appliedTheme = await page.evaluate(() => {
    return document.documentElement.getAttribute('data-theme');
  });
  
  if (appliedTheme !== theme) {
    console.warn(`  ⚠️  Theme mismatch: Expected ${theme}, got ${appliedTheme}. Retrying...`);
    // Force set again
    await page.evaluate((theme) => {
      document.documentElement.setAttribute('data-theme', theme);
    }, theme);
    await page.waitForTimeout(500);
  }
  
  // Take screenshot
  const screenshotPath = path.join(screenshotsDir, `${theme}-${pageName}-${Date.now()}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  
  // Run analyses
  const contrast = await analyzeContrast(page);
  const spacing = await analyzeSpacing(page);
  const typography = await analyzeTypography(page);
  const professionalism = await checkProfessionalism(page);
  
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
    screenshot: screenshotPath,
    timestamp: new Date().toISOString(),
    assessments: {
      spacing: {
        question: "Is it spaced properly?",
        score: spacing.overallScore,
        answer: spacing.overallScore >= 4 
          ? `Yes - ${spacing.consistentPadding}/${spacing.totalContainers} containers have consistent padding, ${spacing.hasVerticalSpacing}/${spacing.totalContainers} have vertical spacing`
          : `Needs improvement - Only ${spacing.consistentPadding}/${spacing.totalContainers} containers have consistent spacing`,
        details: spacing
      },
      cleanliness: {
        question: "Is it clean?",
        score: professionalism.score,
        answer: professionalism.score >= 4
          ? `Yes - Clean, organized design with ${professionalism.percentage}% professional indicators`
          : `Could be cleaner - Only ${professionalism.percentage}% professional indicators met`,
        details: professionalism
      },
      readability: {
        question: "Can users read easily? (Ensure color contrast nicely)",
        score: contrast.score,
        answer: contrast.score >= 4
          ? `Yes - ${contrast.aaPercentage}% of text elements meet WCAG AA contrast (4.5:1), average contrast: ${contrast.averageContrast}:1`
          : `Needs improvement - Only ${contrast.aaPercentage}% meet WCAG AA, average contrast: ${contrast.averageContrast}:1`,
        details: contrast
      },
      professionalism: {
        question: "Do the designs have a mark of professionalism to them?",
        score: professionalism.score,
        answer: professionalism.score >= 4
          ? `Yes - Professional design patterns: semantic HTML, meta tags, responsive design, accessibility features`
          : `Could be more professional - Missing some professional design patterns`,
        details: professionalism
      },
      typography: {
        question: "Is typography hierarchy clear?",
        score: typography.score,
        answer: typography.hasProperHierarchy && typography.hasSizeHierarchy
          ? `Yes - Clear hierarchy with proper heading structure and size differentiation`
          : `Needs improvement - Typography hierarchy could be clearer`,
        details: typography
      }
    },
    overallScore: overallScore.toFixed(2)
  };
}

/**
 * Compare theme to industry standards
 */
function compareToIndustryStandards(theme, assessment) {
  const industryStandards = {
    onyx: {
      description: "Dark, editorial themes typically feature: high contrast (7:1+), generous whitespace, serif typography, minimal borders",
      typicalFeatures: ["High contrast", "Editorial spacing", "Serif fonts", "Minimal design"]
    },
    paper: {
      description: "Print-inspired themes feature: warm tones, paper textures, classic typography, traditional spacing",
      typicalFeatures: ["Warm colors", "Paper texture", "Classic fonts", "Traditional layout"]
    },
    neon: {
      description: "Neon/tech themes feature: high contrast, glow effects, modern fonts, bold colors, tech aesthetic",
      typicalFeatures: ["Glow effects", "Bold colors", "Modern fonts", "Tech aesthetic"]
    },
    brutal: {
      description: "Brutalist themes feature: sharp edges, high contrast, bold typography, raw aesthetic, minimal polish",
      typicalFeatures: ["Sharp edges", "High contrast", "Bold fonts", "Raw aesthetic"]
    },
    calm: {
      description: "Minimal/calm themes feature: soft colors, generous spacing, rounded corners, airy feel, clarity",
      typicalFeatures: ["Soft colors", "Generous spacing", "Rounded corners", "Airy design"]
    }
  };
  
  const standard = industryStandards[theme] || {};
  
  return {
    theme,
    industryStandard: standard,
    comparison: {
      question: "If compared to other images of this theme, what does my page miss out on?",
      answer: `Based on ${theme} theme standards: ${standard.description}. ` +
        `Your implementation scores ${assessment.overallScore}/5. ` +
        `Typical features include: ${standard.typicalFeatures?.join(', ')}. ` +
        `Review your implementation against these standards.`,
      recommendations: standard.typicalFeatures || []
    }
  };
}

/**
 * Main assessment function
 */
async function runAdvancedAssessment() {
  console.log('🎨 Starting Advanced Visual Assessment...\n');
  console.log(`Base URL: ${baseUrl}\n`);
  
  const pages = [
    { path: '/', name: 'homepage' },
    { path: '/themes/', name: 'themes-index' }
  ];
  
  const allAssessments = [];
  
  for (const theme of themes) {
    console.log(`\n${'═'.repeat(70)}`);
    console.log(`📸 Assessing theme: ${theme.toUpperCase()}`);
    console.log('═'.repeat(70));
    
    for (const page of pages) {
      console.log(`\n  📄 Page: ${page.name}`);
      try {
        const assessment = await assessThemePage(theme, page.path, page.name);
        const comparison = compareToIndustryStandards(theme, assessment);
        
        assessment.comparison = comparison.comparison;
        allAssessments.push(assessment);
        
        console.log(`  ✅ Screenshot: ${path.basename(assessment.screenshot)}`);
        console.log(`  📊 Overall Score: ${assessment.overallScore}/5`);
        console.log(`  📈 Spacing: ${assessment.assessments.spacing.score.toFixed(1)}/5`);
        console.log(`  👁️  Readability: ${assessment.assessments.readability.score.toFixed(1)}/5`);
        console.log(`  ✨ Professionalism: ${assessment.assessments.professionalism.score.toFixed(1)}/5`);
        
      } catch (error) {
        console.error(`  ❌ Error: ${error.message}`);
      }
    }
  }
  
  // Generate reports
  const timestamp = Date.now();
  const jsonPath = path.join(assessmentDir, `advanced-assessment-${timestamp}.json`);
  const summaryPath = path.join(assessmentDir, `advanced-assessment-summary-${timestamp}.txt`);
  
  fs.writeFileSync(jsonPath, JSON.stringify(allAssessments, null, 2));
  
  // Generate human-readable summary
  let summary = generateSummary(allAssessments);
  fs.writeFileSync(summaryPath, summary);
  
  console.log('\n' + '═'.repeat(70));
  console.log('✅ ADVANCED VISUAL ASSESSMENT COMPLETE');
  console.log('═'.repeat(70));
  console.log(`\n📊 Total Assessments: ${allAssessments.length}`);
  console.log(`📸 Screenshots: ${screenshotsDir}`);
  console.log(`📄 Summary: ${summaryPath}`);
  console.log(`📋 Detailed JSON: ${jsonPath}\n`);
  
  // Print quick summary
  const avgScore = allAssessments.reduce((sum, a) => sum + parseFloat(a.overallScore), 0) / allAssessments.length;
  console.log(`🎯 Overall Average Score: ${avgScore.toFixed(2)}/5\n`);
}

function generateSummary(assessments) {
  let summary = '╔════════════════════════════════════════════════════════════════════════════╗\n';
  summary += '║              ADVANCED VISUAL ASSESSMENT REPORT                               ║\n';
  summary += '║              Comprehensive Theme Quality Analysis                             ║\n';
  summary += '╚════════════════════════════════════════════════════════════════════════════╝\n\n';
  summary += `Generated: ${new Date().toISOString()}\n`;
  summary += `Screenshots Directory: ${screenshotsDir}\n\n`;
  
  // Group by theme
  const byTheme = {};
  assessments.forEach(a => {
    if (!byTheme[a.theme]) byTheme[a.theme] = [];
    byTheme[a.theme].push(a);
  });
  
  Object.keys(byTheme).forEach(theme => {
    summary += `\n${'═'.repeat(70)}\n`;
    summary += `THEME: ${theme.toUpperCase()}\n`;
    summary += `${'═'.repeat(70)}\n\n`;
    
    byTheme[theme].forEach(assessment => {
      summary += `Page: ${assessment.page}\n`;
      summary += `Screenshot: ${path.basename(assessment.screenshot)}\n`;
      summary += `Overall Score: ${assessment.overallScore}/5\n\n`;
      
      Object.entries(assessment.assessments).forEach(([key, value]) => {
        summary += `  ❓ ${value.question}\n`;
        summary += `  ✅ ${value.answer}\n`;
        summary += `  📊 Score: ${value.score.toFixed(1)}/5\n\n`;
      });
      
      if (assessment.comparison) {
        summary += `  🌐 ${assessment.comparison.question}\n`;
        summary += `  💡 ${assessment.comparison.answer}\n\n`;
      }
      
      summary += '\n';
    });
    
    const themeAvg = byTheme[theme].reduce((sum, a) => sum + parseFloat(a.overallScore), 0) / byTheme[theme].length;
    summary += `Theme Average: ${themeAvg.toFixed(2)}/5\n\n`;
  });
  
  const overallAvg = assessments.reduce((sum, a) => sum + parseFloat(a.overallScore), 0) / assessments.length;
  summary += `\n${'═'.repeat(70)}\n`;
  summary += `OVERALL AVERAGE: ${overallAvg.toFixed(2)}/5\n`;
  summary += `${'═'.repeat(70)}\n`;
  
  return summary;
}

if (require.main === module) {
  runAdvancedAssessment().catch(console.error);
}

module.exports = { runAdvancedAssessment, assessThemePage };

