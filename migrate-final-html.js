const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const basePath = 'C:/Users/supor/Documents/central_de_ajuda_edit';

const migrations = [
  {
    sourceFile: 'aprenda_utilizar/aprenda.html',
    targetFile: 'src/main/webapp/app/entities/aprenda-utilizar/aprenda-utilizar.component.html'
  },
  {
    sourceFile: 'duvidas_frequentes/duvidas.html',
    targetFile: 'src/main/webapp/app/entities/duvidas-frequentes/duvidas-frequentes.component.html'
  },
  {
    sourceFile: 'mister_academy/mister_academy.html',
    targetFile: 'src/main/webapp/app/entities/mister-academy/mister-academy.component.html'
  },
  {
    sourceFile: 'mister_academy/journey/journey.html',
    targetFile: 'src/main/webapp/app/entities/mister-academy/journey/journey.component.html'
  }
];

console.log('Migrando conteúdo HTML...\n');

migrations.forEach(migration => {
  const sourcePath = path.join(basePath, migration.sourceFile);
  const targetPath = path.join(basePath, migration.targetFile);

  if (!fs.existsSync(sourcePath)) {
    console.log(`⊘ Arquivo não encontrado: ${migration.sourceFile}`);
    return;
  }

  try {
    const html = fs.readFileSync(sourcePath, 'utf8');
    const $ = cheerio.load(html);

    // Remover sidebar
    $('.sidebar').remove();

    // Extrair hero
    const heroHtml = $('.hero').html() || '<h1>Título</h1>\n  <p class="text-primary">Descrição</p>';

    // Extrair content
    let contentHtml = $('.content').html() || '<!-- Conteúdo -->';

    // Adicionar sidebar do Angular
    const newHtml = `<jhi-sidebar></jhi-sidebar>

<div class="hero">
  ${heroHtml}
</div>

<div class="content">
${contentHtml}
</div>
`;

    fs.writeFileSync(targetPath, newHtml);
    console.log(`✓ Migrado: ${migration.sourceFile}`);
  } catch (error) {
    console.error(`✗ Erro ao migrar ${migration.sourceFile}:`, error.message);
  }
});

console.log('\n✅ Migração concluída!');
