/**
 * Playwright Test: Homepage
 * Tests homepage loads and contains theme switcher
 */

const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:8080');
  });

  test('homepage loads successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/MyWebClass Design Gallery/);
    
    // Check main heading exists
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('MyWebClass');
  });

  test('theme switcher is present and functional', async ({ page }) => {
    // Check theme switcher exists
    const themeSwitcher = page.locator('.theme-switcher select');
    await expect(themeSwitcher).toBeVisible();
    
    // Check all theme options are present
    const options = themeSwitcher.locator('option');
    await expect(options).toHaveCount(6); // Updated to include Royal theme
    
    // Verify theme options
    const optionTexts = await options.allTextContents();
    expect(optionTexts).toContain('Onyx');
    expect(optionTexts).toContain('Paper');
    expect(optionTexts).toContain('Neon');
    expect(optionTexts).toContain('Brutal');
    expect(optionTexts).toContain('Calm');
  });

  test('switching themes changes data-theme attribute', async ({ page }) => {
    const html = page.locator('html');
    const themeSwitcher = page.locator('.theme-switcher select');
    
    // Get initial theme
    const initialTheme = await html.getAttribute('data-theme');
    expect(initialTheme).toBeTruthy();
    
    // Switch to a different theme
    await themeSwitcher.selectOption('neon');
    
    // Wait for theme change
    await page.waitForTimeout(100);
    
    // Verify data-theme changed
    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).toBe('neon');
    
    // Switch to another theme
    await themeSwitcher.selectOption('brutal');
    await page.waitForTimeout(100);
    
    const finalTheme = await html.getAttribute('data-theme');
    expect(finalTheme).toBe('brutal');
  });

  test('navigation links are present', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check navigation links by their text content to avoid ambiguity
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Themes' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Content' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Submit' })).toBeVisible();
  });

  test('theme cards are displayed', async ({ page }) => {
    const cards = page.locator('.card');
    const cardCount = await cards.count();
    
    // Should have at least 5 theme cards
    expect(cardCount).toBeGreaterThanOrEqual(5);
    
    // Check that theme links are present
    const themeLinks = page.locator('.card a[href*="/themes/"]');
    await expect(themeLinks.first()).toBeVisible();
  });
});

