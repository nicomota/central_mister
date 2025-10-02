const fs = require('fs');
const path = require('path');

const basePath = 'C:/Users/supor/Documents/central_de_ajuda_edit/src/main/webapp/app/entities';

console.log('Corrigindo TODOS os caminhos de imagens...\n');

let totalFilesUpdated = 0;
let totalReferencesUpdated = 0;

// Mapeamento de pastas antigas para novas
const mappings = [
  { from: '/plano-de-contas/', to: '/assets/img/plano-de-contas/' },
  { from: '/concilia/', to: '/assets/img/concilia/' },
  { from: '/registro/', to: '/assets/img/registro/' },
  { from: '/ticket/', to: '/assets/img/ticket/' }
];

function atualizarArquivosHTML(dirPath) {
  const items = fs.readdirSync(dirPath);

  items.forEach(item => {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      atualizarArquivosHTML(itemPath);
    } else if (item.endsWith('.component.html')) {
      let conteudo = fs.readFileSync(itemPath, 'utf8');
      let conteudoOriginal = conteudo;

      // Aplicar todas as substituições
      mappings.forEach(mapping => {
        const regex = new RegExp(mapping.from.replace(/\//g, '\\/'), 'g');
        conteudo = conteudo.replace(regex, mapping.to);
      });

      // Contar mudanças
      if (conteudo !== conteudoOriginal) {
        fs.writeFileSync(itemPath, conteudo, 'utf8');

        const beforeCount = (conteudoOriginal.match(/src="\/(?!assets|https|http)/g) || []).length;
        const afterCount = (conteudo.match(/src="\/(?!assets|https|http)/g) || []).length;
        const fixed = beforeCount - afterCount;

        if (fixed > 0) {
          totalFilesUpdated++;
          totalReferencesUpdated += fixed;
          console.log(`✓ ${path.relative(basePath, itemPath)} (${fixed} referências corrigidas)`);
        }
      }
    }
  });
}

// Processar todos os diretórios
const entitiesDir = fs.readdirSync(basePath);
entitiesDir.forEach(dir => {
  const dirPath = path.join(basePath, dir);
  if (fs.statSync(dirPath).isDirectory()) {
    atualizarArquivosHTML(dirPath);
  }
});

console.log(`\n✅ Concluído!`);
console.log(`   Arquivos atualizados: ${totalFilesUpdated}`);
console.log(`   Referências corrigidas: ${totalReferencesUpdated}`);

// Verificar se ainda há caminhos incorretos
console.log('\n🔍 Verificando se ainda há caminhos incorretos...');
let remaining = 0;

function verificarArquivos(dirPath) {
  const items = fs.readdirSync(dirPath);

  items.forEach(item => {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      verificarArquivos(itemPath);
    } else if (item.endsWith('.component.html')) {
      const conteudo = fs.readFileSync(itemPath, 'utf8');
      const matches = conteudo.match(/src="\/(?!assets|https|http)[^"]+\.(png|jpg|jpeg|gif|svg|webp)/gi);

      if (matches && matches.length > 0) {
        remaining += matches.length;
        console.log(`⚠️  ${path.relative(basePath, itemPath)}: ${matches.length} referências ainda incorretas`);
        matches.forEach(m => console.log(`     ${m}`));
      }
    }
  });
}

entitiesDir.forEach(dir => {
  const dirPath = path.join(basePath, dir);
  if (fs.statSync(dirPath).isDirectory()) {
    verificarArquivos(dirPath);
  }
});

if (remaining === 0) {
  console.log('✅ Todos os caminhos de imagens foram corrigidos!');
} else {
  console.log(`\n⚠️  Ainda restam ${remaining} referências para corrigir manualmente.`);
}
