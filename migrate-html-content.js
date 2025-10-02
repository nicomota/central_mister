const fs = require('fs');
const path = require('path');

// Mapeamento: pasta raiz -> [nome componente angular, pasta original]
const estruturaMap = {
  'cadastros': {
    'cadastros': 'cadastros/cadastros.html',
    'agencia': 'cadastros/agencia/agencia.html',
    'empresas': 'cadastros/empresas/empresas.html',
    'usuarios': 'cadastros/usuarios/usuarios.html'
  },
  'integracoes-bancarias': {
    'integracoes-bancarias': 'integracoes_bancarias/integracoes_bancarias.html',
    'integra': 'integracoes_bancarias/integra/integra.html',
    'integra-bb': 'integracoes_bancarias/integra_bb/integra_bb.html',
    'inter-01': 'integracoes_bancarias/inter_01/inter_01.html',
    'inter-02': 'integracoes_bancarias/inter_02/inter_02.html'
  },
  'notas-fiscais': {
    'notas-fiscais': 'notas_fiscais/notas_fiscais.html',
    'sieg': 'notas_fiscais/sieg/sieg.html',
    'upload-nfe': 'notas_fiscais/upload_nfe/upload_nfe.html',
    'upload-nfse': 'notas_fiscais/upload_nfse/upload_nfse.html'
  },
  'comprovantes': {
    'comprovantes': 'comprovantes/comprovantes.html',
    'banco-do-brasil': 'comprovantes/banco_do_brasil/bb_comprovantes.html',
    'bradesco': 'comprovantes/bradesco/bradesco_comprovantes.html',
    'caixa': 'comprovantes/caixa/caixa_comprovantes.html',
    'credcrea': 'comprovantes/credcrea/credcrea_comprovantes.html',
    'inter': 'comprovantes/inter/inter_comprovantes.html',
    'itau': 'comprovantes/itau/itau_comprovantes.html',
    'santander': 'comprovantes/santander/santander_comprovantes.html',
    'sicoob': 'comprovantes/sicoob/sicoob_comprovantes.html',
    'sicredi': 'comprovantes/sicredi/sicredi_comprovantes.html',
    'unicred': 'comprovantes/unicred/unicred_comprovantes.html',
    'upload-comprovantes': 'comprovantes/upload_comprovantes/upload_comprovantes.html'
  },
  'extratos': {
    'extratos': 'extratos/extratos.html',
    'banco-brasil': 'extratos/banco_brasil/bb_extratos.html',
    'bradesco': 'extratos/bradesco/bradesco_extratos.html',
    'caixa': 'extratos/caixa/caixa_extratos.html',
    'credcrea': 'extratos/credcrea/credcrea_extratos.html',
    'inter': 'extratos/inter/inter_extratos.html',
    'itau': 'extratos/itau/itau_extratos.html',
    'santander': 'extratos/santander/santander_extratos.html',
    'sicoob': 'extratos/sicoob/sicoob_extratos.html',
    'sicredi': 'extratos/sicredi/sicredi_extratos.html',
    'unicred': 'extratos/unicred/unicred_extratos.html',
    'upload-de-extratos': 'extratos/upload_de_extratos/upload_extratos.html'
  },
  'planilhas': {
    'planilhas': 'planilhas/planilhas.html',
    'upload-planilha': 'planilhas/upload_planilha/upload_planilha.html'
  },
  'concilia': {
    'concilia': 'concilia/concilia_cartao.html',
    'modulo-basico': 'concilia/modulo_basico/modulo_basico.html',
    'modulo-premium': 'concilia/modulo_premium/modulo_premium.html',
    'recebimento-cielo': 'concilia/recebimento_cielo/recebimento_cielo.html',
    'recebimento-rede': 'concilia/recebimento_rede/recebimento_rede.html',
    'recebimento-stone': 'concilia/recebimento_stone/recebimento_stone.html'
  },
  'regras': {
    'regras': 'regras/regras.html',
    'criacao-regras': 'regras/criacao_regras/criacao_regras.html'
  },
  'registro': {
    'registro': 'registro/registro.html',
    'associacao-conta-contabil': 'registro/associacao_conta_contabil/associacao_conta_contabil.html',
    'entendendo-registro': 'registro/entendendo_registro/entendendo_registro.html',
    'transferencias-bancarias': 'registro/transferencias_bancarias/transferencias_bancarias.html'
  },
  'ticket': {
    'ticket': 'ticket/ticket.html',
    'gerar-ticket': 'ticket/gerar_ticket/gerar_ticket.html',
    'responder-ticket': 'ticket/responder_ticket/responder_ticket.html',
    'finalizar-ticket': 'ticket/finalizar_ticket/finalizar_ticket.html'
  },
  'exportacao': {
    'exportacao': 'exportacao/exportacao.html',
    'baixa-nfe-dominio': 'exportacao/baixa_nfe_dominio/baixa_nfe_dominio.html',
    'exportacao-alterdata': 'exportacao/exportacao_alterdata/exportacao_alterdata.html',
    'exportacao-calima': 'exportacao/exportacao_calima/exportacao_calima.html',
    'exportacao-contabit': 'exportacao/exportacao_contabit/exportacao_contabit.html',
    'exportacao-contmatic': 'exportacao/exportacao_contmatic/exportacao_contmatic.html',
    'exportacao-dominio': 'exportacao/exportacao_dominio/exportacao_dominio.html',
    'exportacao-fortes': 'exportacao/exportacao_fortes/exportacao_fortes.html',
    'exportacao-iob': 'exportacao/exportacao_iob/exportacao_iob.html',
    'exportacao-mastermaq': 'exportacao/exportacao_mastermaq/exportacao_mastermaq.html',
    'exportacao-netspeed': 'exportacao/exportacao_netspeed/exportacao_netspeed.html',
    'exportacao-prosoft': 'exportacao/exportacao_prosoft/exportacao_prosoft.html',
    'exportacao-questor': 'exportacao/exportacao_questor/exportacao_questor.html',
    'exportacao-questor-cloud': 'exportacao/exportacao_questor_cloud/exportacao_questor_cloud.html',
    'exportacao-sci-unico': 'exportacao/exportacao_sci_unico/exportacao_sci_unico.html',
    'exportacao-sci-visual': 'exportacao/exportacao_sci_visual/exportacao_sci_visual.html',
    'exportacao-tron': 'exportacao/exportacao_tron/exportacao_tron.html'
  },
  'edicao-avancada': {
    'edicao-avancada': 'edicao_avancada/edicao.html',
    'edicao-avancada-nfse': 'edicao_avancada/edicao_avancada_nfse/edicao_avancada_nfse.html',
    'edicao-avancada-nfe': 'edicao_avancada/editção_avancada_nfe/edicao_avancada.html'
  }
};

const baseDir = 'C:/Users/supor/Documents/central_de_ajuda_edit';
const componentesDir = path.join(baseDir, 'src/main/webapp/app/entities');

function extractMainContent(htmlContent) {
  // Remover scripts
  let content = htmlContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Procurar pelo hero e content
  const heroStart = htmlContent.indexOf('<div class="hero">');
  if (heroStart === -1) {
    console.log('    ⚠️  Hero não encontrado');
    return null;
  }

  // Encontrar o final do content
  const footerEnd = htmlContent.lastIndexOf('</div>');

  if (footerEnd === -1) {
    console.log('    ⚠️  Footer não encontrado');
    return null;
  }

  const mainContent = htmlContent.substring(heroStart, footerEnd + 6).trim();

  return mainContent;
}

console.log('╔═══════════════════════════════════════════════════════╗');
console.log('║          MIGRAÇÃO DE CONTEÚDO HTML - 75 PÁGINAS      ║');
console.log('╚═══════════════════════════════════════════════════════╝\n');

let migrados = 0;
let erros = 0;
let naoEncontrados = 0;

Object.keys(estruturaMap).forEach(secao => {
  console.log(`\n▶ ${secao}:`);

  Object.keys(estruturaMap[secao]).forEach(componente => {
    const htmlOriginal = path.join(baseDir, estruturaMap[secao][componente]);
    const componentPath = componente === secao
      ? path.join(componentesDir, secao, `${componente}.component.html`)
      : path.join(componentesDir, secao, componente, `${componente}.component.html`);

    try {
      if (!fs.existsSync(htmlOriginal)) {
        console.log(`  ⊘ ${componente} (arquivo original não encontrado)`);
        naoEncontrados++;
        return;
      }

      const htmlContent = fs.readFileSync(htmlOriginal, 'utf-8');
      const mainContent = extractMainContent(htmlContent);

      if (!mainContent) {
        console.log(`  ✗ ${componente} (conteúdo inválido)`);
        erros++;
        return;
      }

      const angularTemplate = `<jhi-sidebar></jhi-sidebar>\n\n${mainContent}\n`;
      fs.writeFileSync(componentPath, angularTemplate, 'utf-8');
      console.log(`  ✓ ${componente}`);
      migrados++;

    } catch (error) {
      console.log(`  ✗ ${componente} (erro: ${error.message})`);
      erros++;
    }
  });
});

console.log('\n' + '═'.repeat(60));
console.log(`\n✅ Migrados com sucesso: ${migrados}`);
if (naoEncontrados > 0) {
  console.log(`⊘  Arquivos não encontrados: ${naoEncontrados}`);
}
if (erros > 0) {
  console.log(`✗  Erros: ${erros}`);
}
console.log('\n🎉 MIGRAÇÃO DE CONTEÚDO CONCLUÍDA!\n');
