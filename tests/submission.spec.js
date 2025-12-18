/**
 * Playwright Test: Submission Page
 * Tests submission form validation and success state
 */

const { test, expect } = require('@playwright/test');

test.describe('Submission Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/submit/');
  });

  test('submission page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Submit Feedback/);
    
    const heading = page.locator('h1');
    await expect(heading).toContainText('Submit Feedback');
  });

  test('form fields are present', async ({ page }) => {
    // Check required fields
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    
    // Check optional fields
    await expect(page.locator('select[name="theme"]')).toBeVisible();
    await expect(page.locator('input[name="newsletter"]')).toBeVisible();
  });

  test('form validates required fields', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]');
    
    // Try to submit empty form
    await submitBtn.click();
    
    // Browser validation should prevent submission
    // Check that name field is required
    const nameField = page.locator('input[name="name"]');
    await expect(nameField).toHaveAttribute('required');
    
    const emailField = page.locator('input[name="email"]');
    await expect(emailField).toHaveAttribute('required');
    
    const messageField = page.locator('textarea[name="message"]');
    await expect(messageField).toHaveAttribute('required');
  });

  test('form can be filled out', async ({ page }) => {
    // Fill out form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.selectOption('select[name="theme"]', 'calm');
    await page.fill('textarea[name="message"]', 'This is a test message');
    await page.check('input[name="newsletter"]');
    
    // Verify values
    await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
    await expect(page.locator('select[name="theme"]')).toHaveValue('calm');
    await expect(page.locator('textarea[name="message"]')).toHaveValue('This is a test message');
    await expect(page.locator('input[name="newsletter"]')).toBeChecked();
  });

  test('form shows status messages', async ({ page }) => {
    const statusDiv = page.locator('#form-status');
    
    // Initially hidden
    await expect(statusDiv).not.toBeVisible();
    
    // Status div should exist
    await expect(statusDiv).toHaveCount(1);
  });
});

