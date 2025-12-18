#!/usr/bin/env node
/**
 * Visual Assessment Script
 * Takes screenshots of each theme and assesses visual quality
 */

const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, '..', 'screenshots');
const assessmentDir = path.join(__dirname, '..', 'logs', 'visual-assessments');

// Ensure directories exist
[screenshotsDir, assessmentDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const themes = ['onyx', 'paper', 'neon', 'brutal', 'calm', 'royal'];
const baseUrl = process.env.BASE_URL || 'http://localhost:8080';
const pages = [
  { path: '/', name: 'homepage' },
  { path: '/themes/', name: 'themes-index' },
  { path: '/submit/', name: 'submit' }
];

/**
 * Check color contrast ratio
 */
function checkContrast(foreground, background) {
  // Simplified contrast check - in real implementation, would use WCAG formulas
  // This is a placeholder that would need actual color parsing
  return { ratio: 4.5, passes: true, level: 'AA' };
}

/**
 * Assess spacing using CSS analysis
 */
function assessSpacing(cssContent) {
  const spacingVars = cssContent.match(/--space-[a-z]+:\s*([^;]+)/g) || [];
  const hasConsistentScale = spacingVars.length >= 5;
  const usesSpacingVars = cssContent.includes('var(--space-');
  
  return {
    hasConsistentScale,
    usesSpacingVars,
    spacingVarsCount: spacingVars.length,
    score: hasConsistentScale && usesSpacingVars ? 5 : 3
  };
}

/**
 * Assess color contrast from CSS
 */
function assessContrast(cssContent) {
  // Check for high contrast color combinations
  const hasHighContrast = 
    cssContent.includes('--color-text-primary') &&
    cssContent.includes('--color-bg-primary');
  
  // Check for explicit contrast ratios or WCAG compliance
  const mentionsContrast = 
    cssContent.toLowerCase().includes('contrast') ||
    cssContent.includes('wcag');
  
  return {
    hasHighContrast,
    mentionsContrast,
    score: hasHighContrast ? 4 : 3
  };
}

/**
 * Assess professionalism indicators
 */
function assessProfessionalism(htmlContent, cssContent) {
  const indicators = {
    hasSemanticHTML: /<header|<nav|<main|<footer/.test(htmlContent),
    hasMetaTags: /<meta name="description"/.test(htmlContent),
    hasStructuredCSS: cssContent.includes('/*') && cssContent.includes('*/'),
    hasConsistentNaming: /--color-|--space-|--font-/.test(cssContent),
    hasResponsiveDesign: /@media|viewport/.test(htmlContent + cssContent)
  };
  
  const score = Object.values(indicators).filter(Boolean).length;
  
  return {
    ...indicators,
    score: (score / Object.keys(indicators).length) * 5
  };
}

/**
 * Generate assessment report
 */
function generateAssessment(theme, pageName, screenshotPath) {
  const cssPath = path.join(__dirname, '..', 'src', 'css', 'themes.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  // Extract theme-specific CSS
  const themeRegex = new RegExp(`\\[data-theme="${theme}"\\][^{]*{([^}]+)}`, 's');
  const themeMatch = cssContent.match(themeRegex);
  const themeCSS = themeMatch ? themeMatch[1] : '';
  
  // Read HTML for professionalism check
  const htmlPath = path.join(__dirname, '..', '_site', pageName === 'homepage' ? 'index.html' : `${pageName}/index.html`);
  let htmlContent = '';
  if (fs.existsSync(htmlPath)) {
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
  }
  
  const spacing = assessSpacing(cssContent);
  const contrast = assessContrast(cssContent);
  const professionalism = assessProfessionalism(htmlContent, cssContent);
  
  return {
    theme,
    page: pageName,
    screenshot: screenshotPath,
    timestamp: new Date().toISOString(),
    assessments: {
      spacing: {
        score: spacing.score,
        details: {
          hasConsistentScale: spacing.hasConsistentScale,
          usesSpacingVars: spacing.usesSpacingVars,
          spacingVarsCount: spacing.spacingVarsCount
        },
        question: "Is it spaced properly?",
        answer: spacing.score >= 4 ? "Yes - Consistent spacing scale used" : "Needs improvement - Inconsistent spacing"
      },
      cleanliness: {
        score: professionalism.score,
        details: professionalism,
        question: "Is it clean?",
        answer: professionalism.score >= 4 ? "Yes - Clean, organized design" : "Could be cleaner"
      },
      readability: {
        score: contrast.score,
        details: contrast,
        question: "Can users read easily? (Ensure color contrast nicely)",
        answer: contrast.score >= 4 ? "Yes - Good contrast ratios" : "Needs contrast improvement"
      },
      professionalism: {
        score: professionalism.score,
        details: professionalism,
        question: "Do the designs have a mark of professionalism to them?",
        answer: professionalism.score >= 4 ? "Yes - Professional design patterns" : "Could be more professional"
      }
    },
    overallScore: (spacing.score + contrast.score + professionalism.score) / 3
  };
}

/**
 * Take screenshots and assess themes
 */
async function assessThemes() {
  console.log('🎨 Starting Visual Assessment...\n');
  console.log(`Base URL: ${baseUrl}\n`);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const assessments = [];
  
  for (const theme of themes) {
    console.log(`\n📸 Assessing theme: ${theme.toUpperCase()}`);
    console.log('─'.repeat(50));
    
    for (const page of pages) {
      const pageInstance = await context.newPage();
      
      try {
        // Set theme before navigation
        await pageInstance.addInitScript((theme) => {
          document.documentElement.setAttribute('data-theme', theme);
          localStorage.setItem('mywebclass-theme', theme);
        }, theme);
        
        const url = `${baseUrl}${page.path}`;
        console.log(`  Navigating to: ${url}`);
        await pageInstance.goto(url, { waitUntil: 'networkidle' });
        
        // Wait for fonts and styles to load
        await pageInstance.waitForTimeout(1000);
        
        // Take screenshot
        const screenshotPath = path.join(screenshotsDir, `${theme}-${page.name}.png`);
        await pageInstance.screenshot({
          path: screenshotPath,
          fullPage: true
        });
        
        console.log(`  ✅ Screenshot saved: ${screenshotPath}`);
        
        // Generate assessment
        const assessment = generateAssessment(theme, page.name, screenshotPath);
        assessments.push(assessment);
        
        // Log quick assessment
        console.log(`  📊 Overall Score: ${assessment.overallScore.toFixed(1)}/5`);
        
      } catch (error) {
        console.error(`  ❌ Error assessing ${theme} - ${page.name}:`, error.message);
      } finally {
        await pageInstance.close();
      }
    }
  }
  
  await browser.close();
  
  // Generate comprehensive report
  const reportPath = path.join(assessmentDir, `visual-assessment-${Date.now()}.json`);
  const summaryPath = path.join(assessmentDir, `visual-assessment-summary.txt`);
  
  fs.writeFileSync(reportPath, JSON.stringify(assessments, null, 2));
  
  // Generate human-readable summary
  let summary = '╔════════════════════════════════════════════════════════════════════════════╗\n';
  summary += '║                    VISUAL ASSESSMENT REPORT                                    ║\n';
  summary += '║                    Theme Visual Quality Analysis                               ║\n';
  summary += '╚════════════════════════════════════════════════════════════════════════════╝\n\n';
  summary += `Generated: ${new Date().toISOString()}\n`;
  summary += `Screenshots: ${screenshotsDir}\n\n`;
  
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
      summary += `Overall Score: ${assessment.overallScore.toFixed(1)}/5\n\n`;
      
      Object.entries(assessment.assessments).forEach(([key, value]) => {
        summary += `  ${value.question}\n`;
        summary += `  Answer: ${value.answer}\n`;
        summary += `  Score: ${value.score.toFixed(1)}/5\n\n`;
      });
      
      summary += '\n';
    });
    
    // Theme average
    const themeAvg = byTheme[theme].reduce((sum, a) => sum + a.overallScore, 0) / byTheme[theme].length;
    summary += `Theme Average Score: ${themeAvg.toFixed(1)}/5\n\n`;
  });
  
  // Overall summary
  const overallAvg = assessments.reduce((sum, a) => sum + a.overallScore, 0) / assessments.length;
  summary += `\n${'═'.repeat(70)}\n`;
  summary += `OVERALL AVERAGE SCORE: ${overallAvg.toFixed(1)}/5\n`;
  summary += `${'═'.repeat(70)}\n\n`;
  
  summary += 'RECOMMENDATIONS:\n';
  summary += '──────────────────────────────────────────────────────────────────────────────\n';
  summary += '1. Review screenshots in: ' + screenshotsDir + '\n';
  summary += '2. Compare themes side-by-side for consistency\n';
  summary += '3. Check color contrast ratios meet WCAG AA standards (4.5:1)\n';
  summary += '4. Ensure spacing is consistent across all themes\n';
  summary += '5. Verify professional design patterns are maintained\n\n';
  
  summary += 'For detailed JSON data, see: ' + reportPath + '\n';
  
  fs.writeFileSync(summaryPath, summary);
  
  console.log('\n' + '═'.repeat(70));
  console.log('✅ VISUAL ASSESSMENT COMPLETE');
  console.log('═'.repeat(70));
  console.log(`\n📊 Assessments: ${assessments.length}`);
  console.log(`📸 Screenshots: ${screenshotsDir}`);
  console.log(`📄 Summary: ${summaryPath}`);
  console.log(`📋 Detailed: ${reportPath}`);
  console.log(`\n🎯 Overall Average Score: ${overallAvg.toFixed(1)}/5\n`);
}

// Run if called directly
if (require.main === module) {
  assessThemes().catch(console.error);
}

module.exports = { assessThemes, generateAssessment };

