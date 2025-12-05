/**
 * Script to replace Tailwind blue classes with yellow equivalents
 */

const fs = require('fs');
const path = require('path');

const filesToFix = [
  'components/AboutPage.tsx',
  'components/AdminPage.tsx',
  'components/ArticleView.tsx',
  'components/AuthPage.tsx',
  'components/ContactPage.tsx',
  'components/Dashboard.tsx',
  'components/EntityDetailsModal.tsx',
  'components/HelpCenter.tsx',
  'components/PrivacyPolicy.tsx',
  'components/TermsOfUse.tsx',
];

// Tailwind class replacements
const replacements = [
  // Backgrounds
  { from: /bg-blue-600/g, to: 'bg-[#fdb717]' },  // Standard yellow
  { from: /bg-blue-700/g, to: 'bg-[#e5a616]' },  // Darker yellow for hover
  { from: /bg-blue-100/g, to: 'bg-[#fff9e6]' },  // Light yellow
  { from: /bg-blue-50/g, to: 'bg-[#fffbf0]' },   // Very light yellow

  // Text colors
  { from: /text-blue-600/g, to: 'text-[#fdb717]' },
  { from: /text-blue-700/g, to: 'text-[#e5a616]' },
  { from: /text-blue-800/g, to: 'text-[#4b4b4b]' },  // Use charcoal
  { from: /text-blue-500/g, to: 'text-[#fdb717]' },
  { from: /text-blue-100/g, to: 'text-[#fff9e6]' },

  // Borders
  { from: /border-blue-600/g, to: 'border-[#fdb717]' },
  { from: /border-blue-500/g, to: 'border-[#fdb717]' },
  { from: /border-blue-400/g, to: 'border-[#fee045]' },
  { from: /border-blue-300/g, to: 'border-[#ffe680]' },
  { from: /border-blue-200/g, to: 'border-[#fff9e6]' },
  { from: /border-blue-100/g, to: 'border-[#fffbf0]' },

  // Hover states
  { from: /hover:bg-blue-700/g, to: 'hover:bg-[#e5a616]' },
  { from: /hover:bg-blue-100/g, to: 'hover:bg-[#fff4cc]' },
  { from: /hover:text-blue-600/g, to: 'hover:text-[#fdb717]' },
];

function migrateFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`❌ File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;

  replacements.forEach(({ from, to }) => {
    const before = content;
    content = content.replace(from, to);
    if (content !== before) {
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  } else {
    console.log(`⏭️  No blue classes found: ${filePath}`);
    return false;
  }
}

console.log('🎨 Replacing Tailwind blue classes with yellow...\n');

let fixedCount = 0;
filesToFix.forEach(file => {
  if (migrateFile(file)) {
    fixedCount++;
  }
});

console.log(`\n✨ Complete! Fixed ${fixedCount} files.`);
