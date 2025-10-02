const fs = require('fs');
const path = require('path');

const basePath = 'C:/Users/supor/Documents/central_de_ajuda_edit/src/main/webapp/app/entities';

// Seções que foram migradas
const secoes = [
  'cadastros',
  'comprovantes',
  'concilia',
  'edicao_avancada',
  'exportacao',
  'extratos',
  'integracoes_bancarias',
  'notas_fiscais',
  'planilhas',
  'registro',
  'regras',
  'ticket'
];

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

      // Atualizar referências de imagens para cada seção
      secoes.forEach(secao => {
        // Padrão: src="/secao/ ou src="/secao_com_underscore/
        const pattern1 = new RegExp(`src="/${secao}/`, 'g');
        const pattern2 = new RegExp(`src="/${secao.replace(/_/g, '_')}/`, 'g');

        conteudo = conteudo.replace(pattern1, `src="/assets/img/${secao}/`);
        conteudo = conteudo.replace(pattern2, `src="/assets/img/${secao}/`);
      });

      // Se houve mudanças, salvar o arquivo
      if (conteudo !== conteudoOriginal) {
        fs.writeFileSync(itemPath, conteudo, 'utf8');

        // Contar quantas referências foram atualizadas
        const matches = conteudo.match(/src="\/assets\/img\//g);
        const count = matches ? matches.length : 0;

        totalFilesUpdated++;
        totalReferencesUpdated += count;

        console.log(`✓ Atualizado: ${path.relative(basePath, itemPath)} (${count} referências)`);
      }
    }
  });
}

// Processar todas as seções
secoes.forEach(secao => {
  const secaoPath = path.join(basePath, secao);

  if (fs.existsSync(secaoPath)) {
    atualizarArquivosHTML(secaoPath);
  }
});

console.log(`\n✅ Concluído!`);
console.log(`   Arquivos atualizados: ${totalFilesUpdated}`);
console.log(`   Referências atualizadas: ${totalReferencesUpdated}`);
