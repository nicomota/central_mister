const fs = require('fs');
const path = require('path');

const basePath = 'C:/Users/supor/Documents/central_de_ajuda_edit/src/main/webapp/app/entities';

console.log('Atualizando referências de imagens nos componentes...\n');

let totalFilesUpdated = 0;
let totalReferencesUpdated = 0;

function atualizarArquivosHTML(dirPath) {
  const items = fs.readdirSync(dirPath);

  items.forEach(item => {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      // Recursivamente processar subdiretórios
      atualizarArquivosHTML(itemPath);
    } else if (item.endsWith('.component.html')) {
      // Processar arquivo HTML
      let conteudo = fs.readFileSync(itemPath, 'utf8');
      let conteudoOriginal = conteudo;
      let mudou = false;

      // Corrigir double slashes
      if (conteudo.includes('/assets/img//')) {
        conteudo = conteudo.replace(/\/assets\/img\/\//g, '/assets/img/');
        mudou = true;
      }

      // Corrigir "extrato" para "extratos" quando necessário
      if (conteudo.includes('/assets/img/extrato/')) {
        conteudo = conteudo.replace(/\/assets\/img\/extrato\//g, '/assets/img/extratos/');
        mudou = true;
      }

      // Se houve mudanças, salvar o arquivo
      if (mudou || conteudo !== conteudoOriginal) {
        fs.writeFileSync(itemPath, conteudo, 'utf8');

        // Contar quantas referências existem agora
        const matches = conteudo.match(/src="\/assets\/img\//g);
        const count = matches ? matches.length : 0;

        totalFilesUpdated++;
        totalReferencesUpdated += count;

        console.log(`✓ Atualizado: ${path.relative(basePath, itemPath)} (${count} referências)`);
      }
    }
  });
}

// Processar todos os diretórios dentro de entities
const entitiesDir = fs.readdirSync(basePath);
entitiesDir.forEach(dir => {
  const dirPath = path.join(basePath, dir);
  if (fs.statSync(dirPath).isDirectory()) {
    atualizarArquivosHTML(dirPath);
  }
});

console.log(`\n✅ Concluído!`);
console.log(`   Arquivos atualizados: ${totalFilesUpdated}`);
console.log(`   Total de referências de imagens: ${totalReferencesUpdated}`);
