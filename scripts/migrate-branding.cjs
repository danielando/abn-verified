/**
 * Script to batch migrate components to use centralized branding
 * Run with: node scripts/migrate-branding.js
 */

const fs = require('fs');
const path = require('path');

// List of files to migrate
const filesToMigrate = [
  'components/Dashboard.tsx',
  'components/FileUploadModal.tsx',
  'components/PricingModal.tsx',
  'components/EntityDetailsModal.tsx',
  'components/SettingsModal.tsx',
  'components/VerificationHistory.tsx',
  'components/AuthPage.tsx',
  'components/PricingPage.tsx',
  'components/FeaturesPage.tsx',
  'components/HelpCenter.tsx',
  'components/ArticlesList.tsx',
  'components/PrivacyPolicy.tsx',
  'components/TermsOfUse.tsx',
  'components/Footer.tsx',
];

// Replacements to make
const replacements = [
  // Colors
  { from: /#fee045/g, to: 'SBS_COLORS.popYellow' },
  { from: /#fdb717/g, to: 'SBS_COLORS.standardYellow' },
  { from: /#2e2e2e/g, to: 'SBS_COLORS.darkBase' },
  { from: /#4b4b4b/g, to: 'SBS_COLORS.midCharcoal' },
  { from: /#828282/g, to: 'SBS_COLORS.lightCharcoal' },
  { from: /#fff9e6/g, to: 'SBS_COLORS.lightYellow' },

  // Font families
  { from: /'Ubuntu', sans-serif/g, to: 'SBS_TYPOGRAPHY.heading' },
  { from: /'Raleway', sans-serif/g, to: 'SBS_TYPOGRAPHY.body' },

  // Gradients
  { from: /linear-gradient\(135deg, #fdb717 0%, #fee045 100%\)/g, to: 'SBS_GRADIENTS.yellowGradient' },
];

// Import statement to add if not present
const importStatement = `import { SBS_COLORS, SBS_GRADIENTS, SBS_TYPOGRAPHY, headingStyle, bodyStyle, yellowButtonStyle, logoStyle, CHART_COLORS } from '../config/branding';`;

function migrateFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`❌ File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;

  // Check if import already exists
  if (!content.includes("from '../config/branding'")) {
    // Find the last import statement
    const importRegex = /^import .* from .*;$/gm;
    const imports = content.match(importRegex);

    if (imports && imports.length > 0) {
      const lastImport = imports[imports.length - 1];
      content = content.replace(lastImport, `${lastImport}\n${importStatement}`);
      changed = true;
    }
  }

  // Apply all replacements
  replacements.forEach(({ from, to }) => {
    const before = content;
    content = content.replace(from, to);
    if (content !== before) {
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Migrated: ${filePath}`);
    return true;
  } else {
    console.log(`⏭️  No changes needed: ${filePath}`);
    return false;
  }
}

// Main execution
console.log('🚀 Starting branding migration...\n');

let migratedCount = 0;
filesToMigrate.forEach(file => {
  if (migrateFile(file)) {
    migratedCount++;
  }
});

console.log(`\n✨ Migration complete! ${migratedCount} files updated.`);
