/**
 * Playwright Test: Theme Pages
 * Tests theme detail pages and theme switching
 */

const { test, expect } = require('@playwright/test');

const themes = ['onyx', 'paper', 'neon', 'brutal', 'calm'];

test.describe('Theme Pages', () => {
  themes.forEach(theme => {
    test(`${theme} theme page loads and applies theme`, async ({ page }) => {
      await page.goto(`http://localhost:8080/themes/${theme}/`);
      
      // Check page loads
      await expect(page).toHaveTitle(new RegExp(theme, 'i'));
      
      // Check theme is applied
      const html = page.locator('html');
      const dataTheme = await html.getAttribute('data-theme');
      expect(dataTheme).toBe(theme);
    });

    test(`${theme} theme page shows all required components`, async ({ page }) => {
      await page.goto(`http://localhost:8080/themes/${theme}/`);
      
      // Check for hero section
      const hero = page.locator('h1').first();
      await expect(hero).toBeVisible();
      
      // Check for card grid
      const cards = page.locator('.card');
      const cardCount = await cards.count();
      expect(cardCount).toBeGreaterThan(0);
      
      // Check for form inputs
      const inputs = page.locator('input[type="text"], input[type="email"], textarea');
      const inputCount = await inputs.count();
      expect(inputCount).toBeGreaterThan(0);
      
      // Check for buttons
      const buttons = page.locator('.btn');
      const buttonCount = await buttons.count();
      expect(buttonCount).toBeGreaterThan(0);
      
      // Check for alerts
      const alerts = page.locator('.alert');
      const alertCount = await alerts.count();
      expect(alertCount).toBeGreaterThan(0);
      
      // Check for table
      const table = page.locator('table');
      await expect(table).toBeVisible();
    });
  });

  test('themes index page lists all themes', async ({ page }) => {
    await page.goto('http://localhost:8080/themes/');
    
    // Check all theme links are present
    for (const theme of themes) {
      const themeLink = page.locator(`a[href="/themes/${theme}/"]`);
      await expect(themeLink).toBeVisible();
    }
  });
});

