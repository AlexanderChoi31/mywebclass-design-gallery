/**
 * HTML Validator Script
 * Validates all HTML files in _site directory
 */

const { validateHTML } = require('html-validator');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const siteDir = path.join(__dirname, '..', '_site');
const htmlFiles = glob.sync('**/*.html', { cwd: siteDir });

let errors = 0;
let warnings = 0;

async function validateFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  
  try {
    const result = await validateHTML({
      data: html,
      format: 'json'
    });
    
    if (result.messages && result.messages.length > 0) {
      result.messages.forEach(msg => {
        if (msg.type === 'error') {
          console.error(`❌ ${filePath}: ${msg.message} (line ${msg.lastLine})`);
          errors++;
        } else if (msg.type === 'info' && msg.subType === 'warning') {
          console.warn(`⚠️  ${filePath}: ${msg.message} (line ${msg.lastLine})`);
          warnings++;
        }
      });
    } else {
      console.log(`✅ ${filePath}: Valid HTML`);
    }
  } catch (error) {
    console.error(`❌ Error validating ${filePath}:`, error.message);
    errors++;
  }
}

async function validateAll() {
  console.log(`\n🔍 Validating ${htmlFiles.length} HTML files...\n`);
  
  for (const file of htmlFiles) {
    await validateFile(path.join(siteDir, file));
  }
  
  console.log(`\n📊 Validation Summary:`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Warnings: ${warnings}`);
  console.log(`   Files: ${htmlFiles.length}`);
  
  if (errors === 0 && warnings === 0) {
    console.log(`\n✅ All HTML files are valid!\n`);
    process.exit(0);
  } else {
    console.log(`\n⚠️  Some issues found. Please review above.\n`);
    process.exit(errors > 0 ? 1 : 0);
  }
}

validateAll();

