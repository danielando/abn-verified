/**
 * Script to remove onPricingClick props from all components
 */

const fs = require('fs');
const path = require('path');

const filesToFix = [
  'components/LandingPage.tsx',
  'components/PrivacyPolicy.tsx',
  'components/TermsOfUse.tsx',
  'components/AboutPage.tsx',
  'components/ContactPage.tsx',
  'components/HelpCenter.tsx',
  'components/ArticlesList.tsx',
  'components/ArticleView.tsx',
  'components/FeaturesPage.tsx',
  'components/PageLayout.tsx',
];

function removeFromInterface(content) {
  // Remove onPricingClick from interface definition
  return content.replace(/\s*onPricingClick\?\:\s*\(\)\s*=>\s*void;?\s*/g, '');
}

function removeFromProps(content) {
  // Remove onPricingClick from destructured props
  // Handles: { ..., onPricingClick, ... }
  content = content.replace(/,\s*onPricingClick\s*,/g, ',');
  content = content.replace(/,\s*onPricingClick\s*\}/g, ' }');
  content = content.replace(/\{\s*onPricingClick\s*,/g, '{');
  return content;
}

function removeFromJSX(content) {
  // Remove onPricingClick={...} from JSX
  return content.replace(/\s*onPricingClick=\{[^}]+\}\s*/g, ' ');
}

function migrateFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`❌ File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;

  // Apply all transformations
  content = removeFromInterface(content);
  content = removeFromProps(content);
  content = removeFromJSX(content);

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  } else {
    console.log(`⏭️  No pricing props found: ${filePath}`);
    return false;
  }
}

console.log('🗑️  Removing onPricingClick props from components...\n');

let fixedCount = 0;
filesToFix.forEach(file => {
  if (migrateFile(file)) {
    fixedCount++;
  }
});

console.log(`\n✨ Complete! Fixed ${fixedCount} files.`);
