const fs = require('fs');
const path = require('path');

const basePath = 'C:/Users/supor/Documents/central_de_ajuda_edit';
const assetsImgPath = path.join(basePath, 'src/assets/img');

// Criar diretório assets/img se não existir
if (!fs.existsSync(assetsImgPath)) {
  fs.mkdirSync(assetsImgPath, { recursive: true });
}

// Seções a processar
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

console.log('Movendo imagens para src/assets/img/...\n');

// Função recursiva para copiar diretórios
function copiarDiretorio(origem, destino) {
  const items = fs.readdirSync(origem);

  items.forEach(item => {
    const origemPath = path.join(origem, item);
    const destinoPath = path.join(destino, item);
    const stat = fs.statSync(origemPath);

    if (stat.isDirectory()) {
      // Se for diretório, criar e copiar recursivamente
      if (!fs.existsSync(destinoPath)) {
        fs.mkdirSync(destinoPath, { recursive: true });
      }
      copiarDiretorio(origemPath, destinoPath);
    } else if (stat.isFile() && /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(item)) {
      // Se for imagem, copiar
      fs.copyFileSync(origemPath, destinoPath);
    }
  });
}

secoes.forEach(secao => {
  const secaoOrigem = path.join(basePath, secao);

  if (!fs.existsSync(secaoOrigem)) {
    console.log('⊘ Pasta não encontrada:', secao);
    return;
  }

  // Criar pasta de destino
  const secaoDestino = path.join(assetsImgPath, secao);
  if (!fs.existsSync(secaoDestino)) {
    fs.mkdirSync(secaoDestino, { recursive: true });
  }

  copiarDiretorio(secaoOrigem, secaoDestino);
  console.log('✓ Copiado:', secao);
});

console.log('\n✅ Todas as imagens foram copiadas para src/assets/img/');
