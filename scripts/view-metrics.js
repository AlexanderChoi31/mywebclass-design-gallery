#!/usr/bin/env node
/**
 * Quick Metrics Viewer
 * Displays current quality metrics in a readable format
 */

const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '..', 'logs');
const lighthouseDir = path.join(logsDir, 'lighthouse');

console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║          MYWEBCLASS DESIGN GALLERY - QUALITY METRICS          ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

// Check for latest review packet
const reviewPacketPath = path.join(logsDir, 'review-packet.txt');
if (fs.existsSync(reviewPacketPath)) {
  console.log('📋 Latest Review Packet:');
  console.log('   Location: logs/review-packet.txt');
  const content = fs.readFileSync(reviewPacketPath, 'utf-8');
  const lines = content.split('\n').slice(0, 30);
  lines.forEach(line => {
    if (line.trim()) {
      console.log(`   ${line}`);
    }
  });
  console.log('\n   Full report: cat logs/review-packet.txt\n');
}

// Check for Lighthouse reports
if (fs.existsSync(lighthouseDir)) {
  const reports = fs.readdirSync(lighthouseDir)
    .filter(f => f.endsWith('.report.html'))
    .sort()
    .reverse()
    .slice(0, 3);
  
  if (reports.length > 0) {
    console.log('📊 Lighthouse Reports Available:');
    reports.forEach(report => {
      const reportPath = path.join(lighthouseDir, report);
      const stats = fs.statSync(reportPath);
      const date = stats.mtime.toLocaleString();
      console.log(`   • ${report}`);
      console.log(`     Generated: ${date}`);
      console.log(`     Open: open logs/lighthouse/${report}\n`);
    });
  }
}

// Check for comprehensive quality report
const qualityReportPath = path.join(logsDir, 'comprehensive-quality-report.txt');
if (fs.existsSync(qualityReportPath)) {
  console.log('✅ Comprehensive Quality Report:');
  console.log('   Location: logs/comprehensive-quality-report.txt');
  console.log('   View: cat logs/comprehensive-quality-report.txt\n');
}

// Check for test results
const testResultsDir = path.join(__dirname, '..', 'test-results');
if (fs.existsSync(testResultsDir)) {
  console.log('🧪 Test Results:');
  console.log('   Location: test-results/');
  console.log('   Run tests: npm test\n');
}

// Quick commands
console.log('🚀 Quick Commands:');
console.log('   npm run quality-comprehensive  - Run all quality checks');
console.log('   npm run lighthouse             - Run Lighthouse CI');
console.log('   npm test                       - Run Playwright tests');
console.log('   npm run lint                   - Run all linters');
console.log('   npm run accessibility          - Run accessibility checks');
console.log('   npm run bundle-size            - Check bundle sizes\n');

// Browser-based metrics
console.log('🌐 Browser-Based Metrics:');
console.log('   1. Open: http://localhost:8080 (or live site)');
console.log('   2. Open DevTools (F12)');
console.log('   3. Go to Lighthouse tab');
console.log('   4. Click "Analyze page load"\n');

// GitHub Actions
console.log('📈 CI/CD Metrics:');
console.log('   GitHub Actions: https://github.com/AlexanderChoi31/mywebclass-design-gallery/actions');
console.log('   View latest workflow run for detailed metrics\n');

console.log('📚 Full Guide: See QUALITY-METRICS-GUIDE.md\n');

