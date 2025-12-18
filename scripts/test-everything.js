#!/usr/bin/env node

/**
 * Comprehensive Test Script
 * Tests all aspects of the MyWebClass Design Gallery
 */

const { execSync } = require('child_process');
const https = require('https');
const http = require('http');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkPort(port) {
  try {
    execSync(`lsof -ti:${port}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function checkUrl(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname,
      method: 'GET',
      timeout: 10000,
      rejectUnauthorized: true
    };

    const req = client.request(options, (res) => {
      resolve({ status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
    });

    req.on('error', (err) => {
      resolve({ status: 0, ok: false, error: err.message });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, ok: false, error: 'timeout' });
    });

    req.setTimeout(10000);
    req.end();
  });
}

async function runTests() {
  log('\n╔══════════════════════════════════════════════════════════════╗', 'cyan');
  log('║     MYWEBCLASS DESIGN GALLERY - COMPREHENSIVE TEST SUITE      ║', 'cyan');
  log('╚══════════════════════════════════════════════════════════════╝\n', 'cyan');

  const results = {
    devServer: false,
    localSite: false,
    build: false,
    tests: false,
    lint: false,
    netlify: false
  };

  // 1. Check Dev Server
  log('1️⃣  Checking Dev Server...', 'blue');
  if (checkPort(8080)) {
    log('   ✅ Dev server is running on port 8080', 'green');
    results.devServer = true;
  } else {
    log('   ❌ Dev server is NOT running', 'red');
    log('   💡 Run: npm run dev', 'yellow');
  }

  // 2. Check Local Site
  log('\n2️⃣  Checking Local Site...', 'blue');
  try {
    const response = execSync('curl -s -o /dev/null -w "%{http_code}" http://localhost:8080', { encoding: 'utf8' });
    if (response.trim() === '200') {
      log('   ✅ Local site is accessible (HTTP 200)', 'green');
      results.localSite = true;
    } else {
      log(`   ❌ Local site returned HTTP ${response.trim()}`, 'red');
    }
  } catch (error) {
    log('   ❌ Could not connect to local site', 'red');
  }

  // 3. Test Build
  log('\n3️⃣  Testing Build...', 'blue');
  try {
    execSync('npm run build', { stdio: 'pipe' });
    log('   ✅ Build completed successfully', 'green');
    results.build = true;
  } catch (error) {
    log('   ❌ Build failed', 'red');
    log(`   Error: ${error.message}`, 'yellow');
  }

  // 4. Run Tests
  log('\n4️⃣  Running Playwright Tests...', 'blue');
  try {
    const testOutput = execSync('npm test', { encoding: 'utf8', stdio: 'pipe' });
    const passed = (testOutput.match(/passed/g) || []).length;
    const failed = (testOutput.match(/failed/g) || []).length;
    
    if (failed === 0) {
      log(`   ✅ All tests passed (${passed} passed)`, 'green');
      results.tests = true;
    } else {
      log(`   ⚠️  ${passed} passed, ${failed} failed`, 'yellow');
      log('   Check test output above for details', 'yellow');
    }
  } catch (error) {
    log('   ❌ Tests failed', 'red');
    log(`   Error: ${error.message}`, 'yellow');
  }

  // 5. Run Linting
  log('\n5️⃣  Running Linting...', 'blue');
  try {
    execSync('npm run lint', { stdio: 'pipe' });
    log('   ✅ Linting passed', 'green');
    results.lint = true;
  } catch (error) {
    log('   ⚠️  Linting has warnings/errors', 'yellow');
    log('   (Some stylelint warnings are expected)', 'yellow');
  }

  // 6. Check Netlify
  log('\n6️⃣  Checking Netlify Deployment...', 'blue');
  try {
    const netlifyResponse = await checkUrl('https://joyful-cranachan-6fdbb1.netlify.app');
    if (netlifyResponse.ok) {
      log(`   ✅ Netlify site is live (HTTP ${netlifyResponse.status})`, 'green');
      log('   🌐 https://joyful-cranachan-6fdbb1.netlify.app', 'cyan');
      results.netlify = true;
    } else {
      log(`   ❌ Netlify site returned HTTP ${netlifyResponse.status}`, 'red');
    }
  } catch (error) {
    log('   ❌ Could not check Netlify site', 'red');
  }

  // Summary
  log('\n╔══════════════════════════════════════════════════════════════╗', 'cyan');
  log('║                        TEST SUMMARY                          ║', 'cyan');
  log('╚══════════════════════════════════════════════════════════════╝\n', 'cyan');

  const total = Object.keys(results).length;
  const passed = Object.values(results).filter(Boolean).length;

  Object.entries(results).forEach(([test, passed]) => {
    const icon = passed ? '✅' : '❌';
    const name = test.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    log(`${icon} ${name}`, passed ? 'green' : 'red');
  });

  log(`\n📊 Score: ${passed}/${total} tests passed\n`, passed === total ? 'green' : 'yellow');

  if (passed === total) {
    log('🎉 All systems operational!', 'green');
  } else {
    log('⚠️  Some checks failed. Review the output above.', 'yellow');
  }

  process.exit(passed === total ? 0 : 1);
}

runTests();

