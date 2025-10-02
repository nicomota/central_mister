const fs = require('fs');
const path = require('path');

const components = [
  'plano-de-contas',
  'cadastros',
  'integracoes-bancarias',
  'notas-fiscais',
  'comprovantes',
  'extratos',
  'planilhas',
  'concilia-cartao',
  'regras',
  'registro-contabil',
  'gerar-ticket',
  'exportacao',
  'edicao-avancada',
];

// Fix module imports
components.forEach(componentName => {
  const modulePath = `src/main/webapp/app/entities/${componentName}/${componentName}.module.ts`;

  try {
    let content = fs.readFileSync(modulePath, 'utf8');

    // Check if SharedModule is already imported
    if (!content.includes('SharedModule')) {
      // Add SharedModule import
      content = content.replace(
        /import { CommonModule } from '@angular\/common';/,
        `import { CommonModule } from '@angular/common';\nimport { SharedModule } from 'app/shared/shared.module';`
      );

      // Add SharedModule to imports array
      content = content.replace(
        /imports:\s*\[\s*CommonModule/,
        'imports: [SharedModule, CommonModule'
      );

      fs.writeFileSync(modulePath, content, 'utf8');
      console.log(`✅ SharedModule added to ${componentName}.module.ts`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${componentName}.module.ts:`, error.message);
  }
});

// Fix HTML orphaned divs - more aggressive approach
const htmlFiles = [
  'aprenda-utilizar',
  'duvidas-frequentes',
];

htmlFiles.forEach(componentName => {
  const htmlPath = `src/main/webapp/app/entities/${componentName}/${componentName}.component.html`;

  try {
    let content = fs.readFileSync(htmlPath, 'utf8');
    const lines = content.split('\n');
    const result = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip orphaned closing divs in the navigation area (lines 20-30)
      if (i >= 20 && i <= 35 && line === '</div>') {
        console.log(`  Skipping orphaned </div> at line ${i + 1} in ${componentName}`);
        continue;
      }

      result.push(lines[i]);
    }

    fs.writeFileSync(htmlPath, result.join('\n'), 'utf8');
    console.log(`✅ Fixed orphaned divs in ${componentName}.component.html`);
  } catch (error) {
    console.error(`❌ Error fixing ${componentName}.component.html:`, error.message);
  }
});

console.log('\n✨ All fixes applied!');
