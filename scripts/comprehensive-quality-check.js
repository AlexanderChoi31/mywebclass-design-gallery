#!/usr/bin/env node
/**
 * Comprehensive Quality Check Script
 * Runs all quality metrics and generates a report
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '..', 'logs');
const reportFile = path.join(logsDir, 'comprehensive-quality-report.txt');

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

let report = [];
let errors = 0;
let warnings = 0;

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️';
  const line = `[${timestamp}] ${prefix} ${message}`;
  console.log(line);
  report.push(line);
}

function runCommand(command, description) {
  log(`Running: ${description}...`);
  try {
    const output = execSync(command, { 
      encoding: 'utf8',
      stdio: 'pipe',
      cwd: path.join(__dirname, '..')
    });
    log(`${description} completed successfully`, 'success');
    return { success: true, output };
  } catch (error) {
    log(`${description} failed: ${error.message}`, 'error');
    errors++;
    return { success: false, output: error.stdout || error.message };
  }
}

async function main() {
  log('═══════════════════════════════════════════════════════════════════════════');
  log('COMPREHENSIVE QUALITY CHECK - MYWEBCLASS DESIGN GALLERY');
  log('═══════════════════════════════════════════════════════════════════════════');
  log('');

  // 1. Build check
  log('STEP 1: Building project...');
  const buildResult = runCommand('npm run build', 'Build');
  if (!buildResult.success) {
    log('Build failed. Stopping quality checks.', 'error');
    process.exit(1);
  }

  // 2. Linting
  log('');
  log('STEP 2: Running linters...');
  const lintResult = runCommand('npm run lint', 'Linting');
  if (!lintResult.success) {
    warnings++;
  }

  // 3. Tests
  log('');
  log('STEP 3: Running tests...');
  const testResult = runCommand('npm test', 'Playwright Tests');
  if (!testResult.success) {
    errors++;
  }

  // 4. Bundle Size
  log('');
  log('STEP 4: Checking bundle sizes...');
  const bundleResult = runCommand('npm run bundle-size', 'Bundle Size Check');
  if (!bundleResult.success) {
    warnings++;
  }

  // 5. HTML Validation
  log('');
  log('STEP 5: Validating HTML...');
  const htmlResult = runCommand('npm run validate:html', 'HTML Validation');
  if (!htmlResult.success) {
    warnings++;
  }

  // 6. Lighthouse (if server is running)
  log('');
  log('STEP 6: Running Lighthouse CI...');
  log('Note: Lighthouse requires dev server. Run separately with: npm run lighthouse');
  
  // 7. Summary
  log('');
  log('═══════════════════════════════════════════════════════════════════════════');
  log('QUALITY CHECK SUMMARY');
  log('═══════════════════════════════════════════════════════════════════════════');
  log(`Errors: ${errors}`);
  log(`Warnings: ${warnings}`);
  
  if (errors === 0 && warnings === 0) {
    log('🎉 ALL CHECKS PASSED! Perfect quality score!', 'success');
  } else if (errors === 0) {
    log('✅ All critical checks passed. Some warnings to review.', 'success');
  } else {
    log('❌ Some checks failed. Please review errors above.', 'error');
  }

  // Write report
  fs.writeFileSync(reportFile, report.join('\n'));
  log('');
  log(`Full report saved to: ${reportFile}`);

  process.exit(errors > 0 ? 1 : 0);
}

main();

