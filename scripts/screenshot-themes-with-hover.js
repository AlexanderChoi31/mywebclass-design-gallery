#!/usr/bin/env node

/**
 * Screenshot themes with hover states to identify visual issues
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const baseUrl = 'http://localhost:8080';
const themes = ['neon', 'brutal'];
const outputDir = path.join(__dirname, '..', 'screenshots', 'issues');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function screenshotThemeWithHover(theme) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  // Set theme before navigation
  await page.addInitScript((theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mywebclass-theme', theme);
  }, theme);
  
  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  await page.waitForSelector('html[data-theme="' + theme + '"]');
  await page.waitForTimeout(2000);
  
  // Find all cards/text boxes
  const cards = await page.locator('.card').all();
  
  console.log(`\n📸 Screenshotting ${theme} theme with hover states...`);
  console.log(`   Found ${cards.length} cards`);
  
  for (let i = 0; i < Math.min(cards.length, 3); i++) {
    const card = cards[i];
    
    // Screenshot without hover
    await card.screenshot({ 
      path: path.join(outputDir, `${theme}-card-${i}-normal.png`) 
    });
    
    // Hover over the card
    await card.hover();
    await page.waitForTimeout(500);
    
    // Screenshot with hover
    await card.screenshot({ 
      path: path.join(outputDir, `${theme}-card-${i}-hover.png`) 
    });
    
    // Screenshot full page with hover
    await page.screenshot({ 
      path: path.join(outputDir, `${theme}-page-hover-${i}.png`),
      fullPage: true 
    });
    
    console.log(`   ✓ Captured card ${i + 1} (normal + hover)`);
  }
  
  await browser.close();
  console.log(`   ✅ ${theme} theme screenshots complete`);
}

async function main() {
  console.log('🔍 Capturing theme hover states to identify visual issues...\n');
  
  for (const theme of themes) {
    await screenshotThemeWithHover(theme);
  }
  
  console.log(`\n✅ All screenshots saved to: ${outputDir}`);
  console.log('\n📋 Files created:');
  const files = fs.readdirSync(outputDir).filter(f => f.includes(theme));
  files.forEach(file => console.log(`   • ${file}`));
}

main().catch(console.error);

