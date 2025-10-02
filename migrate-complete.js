const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Mapeamento completo: nome da seção -> [subpáginas]
const estrutura = {
  'cadastros': ['agencia', 'empresas', 'usuarios'],
  'integracoes-bancarias': ['integra', 'integra-bb', 'inter-01', 'inter-02'],
  'notas-fiscais': ['sieg', 'upload-nfe', 'upload-nfse'],
  'comprovantes': ['banco-do-brasil', 'bradesco', 'caixa', 'credcrea', 'inter', 'itau', 'santander', 'sicoob', 'sicredi', 'unicred', 'upload-comprovantes'],
  'extratos': ['banco-brasil', 'bradesco', 'caixa', 'credcrea', 'inter', 'itau', 'santander', 'sicoob', 'sicredi', 'unicred', 'upload-de-extratos'],
  'planilhas': ['upload-planilha'],
  'concilia': ['modulo-basico', 'modulo-premium', 'recebimento-cielo', 'recebimento-rede', 'recebimento-stone'],
  'regras': ['criacao-regras'],
  'registro': ['associacao-conta-contabil', 'entendendo-registro', 'transferencias-bancarias'],
  'ticket': ['gerar-ticket', 'responder-ticket', 'finalizar-ticket'],
  'exportacao': ['baixa-nfe-dominio', 'exportacao-alterdata', 'exportacao-calima', 'exportacao-contabit', 'exportacao-contmatic', 'exportacao-dominio', 'exportacao-fortes', 'exportacao-iob', 'exportacao-mastermaq', 'exportacao-netspeed', 'exportacao-prosoft', 'exportacao-questor', 'exportacao-questor-cloud', 'exportacao-sci-unico', 'exportacao-sci-visual', 'exportacao-tron'],
  'edicao-avancada': ['edicao-avancada-nfse', 'edicao-avancada-nfe']
};

// Mapeamento de nomes de pastas originais (com underscores) para nomes com hífens
const mappingPastasOriginais = {
  'cadastros': 'cadastros',
  'integracoes-bancarias': 'integracoes_bancarias',
  'notas-fiscais': 'notas_fiscais',
  'comprovantes': 'comprovantes',
  'extratos': 'extratos',
  'planilhas': 'planilhas',
  'concilia': 'concilia',
  'regras': 'regras',
  'registro': 'registro',
  'ticket': 'ticket',
  'exportacao': 'exportacao',
  'edicao-avancada': 'edicao_avancada'
};

const baseDir = 'C:/Users/supor/Documents/central_de_ajuda_edit';
const srcDir = path.join(baseDir, 'src/app/entities');

console.log('╔═══════════════════════════════════════════════════════╗');
console.log('║     MIGRAÇÃO AUTOMÁTICA - CENTRAL DE AJUDA           ║');
console.log('╚═══════════════════════════════════════════════════════╝\n');

// ETAPA 1: Criar componentes Angular
console.log('📦 ETAPA 1: Criando componentes Angular...\n');

let componentesCriados = 0;
let componentesErro = 0;

Object.keys(estrutura).forEach(secao => {
  console.log(`\n▶ Seção: ${secao}`);

  // Criar componente principal da seção
  try {
    const componentPath = path.join(srcDir, secao, `${secao}.component.ts`);
    if (!fs.existsSync(componentPath)) {
      execSync(`ng generate component entities/${secao} --skip-tests`, { cwd: baseDir, stdio: 'pipe' });
      console.log(`  ✓ ${secao} (principal)`);
      componentesCriados++;
    } else {
      console.log(`  ⊙ ${secao} (já existe)`);
    }
  } catch (error) {
    console.log(`  ✗ ${secao} (erro)`);
    componentesErro++;
  }

  // Criar componentes das subpáginas
  estrutura[secao].forEach(subpagina => {
    try {
      const componentPath = path.join(srcDir, secao, subpagina, `${subpagina}.component.ts`);
      if (!fs.existsSync(componentPath)) {
        execSync(`ng generate component entities/${secao}/${subpagina} --skip-tests`, { cwd: baseDir, stdio: 'pipe' });
        console.log(`  ✓ ${secao}/${subpagina}`);
        componentesCriados++;
      } else {
        console.log(`  ⊙ ${secao}/${subpagina} (já existe)`);
      }
    } catch (error) {
      console.log(`  ✗ ${secao}/${subpagina} (erro)`);
      componentesErro++;
    }
  });
});

console.log(`\n✅ Componentes criados: ${componentesCriados}`);
if (componentesErro > 0) {
  console.log(`⚠️  Erros: ${componentesErro}`);
}

console.log('\n' + '═'.repeat(60));
console.log('📝 ETAPA 2: Gerando módulos e rotas...\n');

// ETAPA 2: Gerar arquivos de módulo para cada seção
Object.keys(estrutura).forEach(secao => {
  const modulePath = path.join(srcDir, secao, `${secao}.module.ts`);

  // Converter nome da seção para PascalCase para nomes de classes
  const secaoClassName = secao.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');

  // Gerar imports dos componentes
  let imports = `import { ${secaoClassName}Component } from './${secao}.component';\n`;
  estrutura[secao].forEach(subpagina => {
    const subClassName = subpagina.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    imports += `import { ${subClassName}Component } from './${subpagina}/${subpagina}.component';\n`;
  });

  // Gerar declarations
  let declarations = `${secaoClassName}Component,\n`;
  estrutura[secao].forEach(subpagina => {
    const subClassName = subpagina.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    declarations += `    ${subClassName}Component,\n`;
  });

  // Gerar rotas
  let routes = `  { path: '', component: ${secaoClassName}Component },\n`;
  estrutura[secao].forEach(subpagina => {
    const subClassName = subpagina.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    routes += `  { path: '${subpagina}', component: ${subClassName}Component },\n`;
  });

  const moduleContent = `import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

${imports}
const routes: Routes = [
${routes}];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    ${declarations}  ]
})
export class ${secaoClassName}Module {}
`;

  fs.writeFileSync(modulePath, moduleContent, 'utf-8');
  console.log(`✓ Módulo criado: ${secao}.module.ts`);
});

console.log('\n✅ Todos os módulos criados!');
console.log('\n' + '═'.repeat(60));
console.log('\n🎉 MIGRAÇÃO DE ESTRUTURA CONCLUÍDA!\n');
console.log(`Total de componentes: ${componentesCriados}`);
console.log('\nPróximo passo: Migrar conteúdo HTML\n');
