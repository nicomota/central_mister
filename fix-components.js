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
  'aprenda-utilizar',
  'duvidas-frequentes',
];

// Remove AuthGuard from routing modules
const removeAuthGuard = (componentName) => {
  const routingPath = `src/main/webapp/app/entities/${componentName}/${componentName}-routing.module.ts`;

  try {
    let content = fs.readFileSync(routingPath, 'utf8');

    // Remove AuthGuard import
    content = content.replace(/import { AuthGuard } from 'app\/core\/auth\/auth\.guard';\n?/g, '');

    // Remove canActivate
    content = content.replace(/,?\s*canActivate:\s*\[AuthGuard\]/g, '');

    fs.writeFileSync(routingPath, content, 'utf8');
    console.log(`✅ AuthGuard removed from ${componentName}`);
  } catch (error) {
    console.error(`❌ Error removing AuthGuard from ${componentName}:`, error.message);
  }
};

// Fix HTML closing tags
const fixHTML = (componentName) => {
  const htmlPath = `src/main/webapp/app/entities/${componentName}/${componentName}.component.html`;

  try {
    let content = fs.readFileSync(htmlPath, 'utf8');

    // Remove orphaned closing div tags that appear after the sidebar section
    // The sidebar was removed by our script, but left a closing </div>
    const lines = content.split('\n');
    const fixedLines = [];
    let skipNext = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if this is an orphaned </div> after navigation lists
      if (line.trim() === '</div>' && i < 30 && i > 20) {
        // This is likely the orphaned sidebar closing tag
        console.log(`  Removing orphaned </div> at line ${i + 1} in ${componentName}`);
        continue;
      }

      fixedLines.push(line);
    }

    fs.writeFileSync(htmlPath, fixedLines.join('\n'), 'utf8');
    console.log(`✅ HTML fixed for ${componentName}`);
  } catch (error) {
    console.error(`❌ Error fixing HTML for ${componentName}:`, error.message);
  }
};

console.log('🔧 Fixing components...\n');
console.log('📝 Removing AuthGuard from all components except mister-academy...\n');

components.forEach(component => {
  removeAuthGuard(component);
  fixHTML(component);
});

console.log('\n✨ Fix complete!');
