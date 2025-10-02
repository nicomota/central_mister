const fs = require('fs');

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

components.forEach(componentName => {
  const htmlPath = `src/main/webapp/app/entities/${componentName}/${componentName}.component.html`;

  try {
    let content = fs.readFileSync(htmlPath, 'utf8');

    // Remove everything before the hero div, keep only jhi-sidebar
    // Find where the actual content starts (hero div)
    const heroMatch = content.match(/<div class="hero">/);

    if (heroMatch) {
      const heroIndex = heroMatch.index;
      const beforeHero = content.substring(0, heroIndex);
      const afterHero = content.substring(heroIndex);

      // Check if jhi-sidebar exists
      const hasSidebar = beforeHero.includes('<jhi-sidebar>');

      // Rebuild: just sidebar + content
      const newContent = '<jhi-sidebar></jhi-sidebar>\n\n' + afterHero;

      fs.writeFileSync(htmlPath, newContent, 'utf8');
      console.log(`✅ Cleaned ${componentName}.component.html`);
    } else {
      console.log(`⚠️  No hero div found in ${componentName}.component.html`);
    }

  } catch (error) {
    console.error(`❌ Error cleaning ${componentName}.component.html:`, error.message);
  }
});

console.log('\n✨ HTML cleaning complete!');
