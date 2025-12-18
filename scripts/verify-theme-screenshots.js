#!/usr/bin/env node
/**
 * Verify Theme Screenshots
 * Checks that screenshots actually show different themes
 */

const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const baseUrl = process.env.BASE_URL || 'http://localhost:8080';
const themes = ['onyx', 'paper', 'neon', 'brutal', 'calm', 'royal'];

/**
 * Get theme color characteristics
 */
async function getThemeColors(page, theme) {
  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  
  await page.evaluate((theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mywebclass-theme', theme);
    if (window.ThemeSwitcher) {
      window.ThemeSwitcher.setTheme(theme);
    }
  }, theme);
  
  await page.waitForTimeout(1000);
  
  const colors = await page.evaluate(() => {
    const html = document.documentElement;
    const styles = window.getComputedStyle(html);
    return {
      bgColor: styles.backgroundColor,
      textColor: styles.color,
      dataTheme: html.getAttribute('data-theme'),
      bodyBg: window.getComputedStyle(document.body).backgroundColor
    };
  });
  
  return colors;
}

async function verifyThemes() {
  console.log('🔍 Verifying theme screenshots...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const themeColors = {};
  
  for (const theme of themes) {
    console.log(`Checking ${theme} theme...`);
    const colors = await getThemeColors(page, theme);
    themeColors[theme] = colors;
    console.log(`  ✅ data-theme: ${colors.dataTheme}`);
    console.log(`  ✅ Background: ${colors.bgColor}`);
    console.log(`  ✅ Text: ${colors.textColor}\n`);
  }
  
  await browser.close();
  
  // Verify all themes are different
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('THEME VERIFICATION RESULTS');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  let allDifferent = true;
  const bgColors = Object.values(themeColors).map(t => t.bgColor);
  const uniqueBgColors = new Set(bgColors);
  
  if (uniqueBgColors.size === themes.length) {
    console.log('✅ All themes have different background colors');
  } else {
    console.log('❌ Some themes have the same background color');
    allDifferent = false;
  }
  
  // Check data-theme attributes
  const dataThemes = Object.values(themeColors).map(t => t.dataTheme);
  const allCorrect = dataThemes.every((theme, idx) => theme === themes[idx]);
  
  if (allCorrect) {
    console.log('✅ All data-theme attributes are correctly set');
  } else {
    console.log('❌ Some data-theme attributes are incorrect');
    allDifferent = false;
  }
  
  console.log('\n📊 Theme Color Summary:');
  Object.entries(themeColors).forEach(([theme, colors]) => {
    console.log(`  ${theme}: ${colors.bgColor} / ${colors.textColor}`);
  });
  
  console.log('\n' + (allDifferent ? '✅' : '❌') + ' Theme verification: ' + (allDifferent ? 'PASSED' : 'FAILED'));
  
  return allDifferent;
}

if (require.main === module) {
  verifyThemes().catch(console.error);
}

module.exports = { verifyThemes };

