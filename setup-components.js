const fs = require('fs');
const path = require('path');

const components = [
  { name: 'plano-de-contas', htmlSource: 'plano_de_contas/plano_de_contas.html' },
  { name: 'cadastros', htmlSource: 'cadastros/cadastros.html' },
  { name: 'integracoes-bancarias', htmlSource: 'integracoes_bancarias/integracoes_bancarias.html' },
  { name: 'notas-fiscais', htmlSource: 'notas_fiscais/notas_fiscais.html' },
  { name: 'comprovantes', htmlSource: 'comprovantes/comprovantes.html' },
  { name: 'extratos', htmlSource: 'extratos/extratos.html' },
  { name: 'planilhas', htmlSource: 'planilhas/planilhas.html' },
  { name: 'concilia-cartao', htmlSource: 'concilia/concilia_cartao.html' },
  { name: 'regras', htmlSource: 'regras/regras.html' },
  { name: 'registro-contabil', htmlSource: 'registro/registro.html' },
  { name: 'gerar-ticket', htmlSource: 'ticket/ticket.html' },
  { name: 'exportacao', htmlSource: 'exportacao/exportacao.html' },
  { name: 'edicao-avancada', htmlSource: 'edicao_avancada/edicao.html' },
];

const extractBodyContent = (htmlContent) => {
  // Remove DOCTYPE, html, head tags
  let content = htmlContent.replace(/<!DOCTYPE[^>]*>/gi, '');
  content = content.replace(/<html[^>]*>/gi, '');
  content = content.replace(/<\/html>/gi, '');
  content = content.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');

  // Extract body content
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    content = bodyMatch[1];
  }

  // Remove sidebar (will be replaced with jhi-sidebar component)
  content = content.replace(/<div class="sidebar">[\s\S]*?<\/div>/i, '');

  // Remove scripts
  content = content.replace(/<script[\s\S]*?<\/script>/gi, '');

  // Add jhi-sidebar at the beginning
  content = '<jhi-sidebar></jhi-sidebar>\n\n' + content.trim();

  return content;
};

const addAuthGuardToRoute = (componentName) => {
  const routePath = `src/main/webapp/app/entities/${componentName}/${componentName}-routing.module.ts`;

  try {
    let routeContent = fs.readFileSync(routePath, 'utf8');

    // Check if AuthGuard is already imported
    if (!routeContent.includes('AuthGuard')) {
      // Add AuthGuard import
      routeContent = routeContent.replace(
        /import { Routes, RouterModule } from '@angular\/router';/,
        `import { Routes, RouterModule } from '@angular/router';\nimport { AuthGuard } from 'app/core/auth/auth.guard';`
      );

      // Add canActivate to route
      routeContent = routeContent.replace(
        /path: '',\s*component:/,
        `path: '', canActivate: [AuthGuard], component:`
      );

      fs.writeFileSync(routePath, routeContent, 'utf8');
      console.log(`✅ AuthGuard added to ${componentName}`);
    }
  } catch (error) {
    console.error(`❌ Error adding AuthGuard to ${componentName}:`, error.message);
  }
};

const setupComponent = (component) => {
  const { name, htmlSource } = component;
  const htmlSourcePath = path.join(__dirname, htmlSource);
  const htmlDestPath = path.join(__dirname, `src/main/webapp/app/entities/${name}/${name}.component.html`);

  try {
    // Check if source HTML exists
    if (!fs.existsSync(htmlSourcePath)) {
      console.log(`⚠️  Source HTML not found for ${name}: ${htmlSourcePath}`);
      return;
    }

    // Read source HTML
    const sourceHtml = fs.readFileSync(htmlSourcePath, 'utf8');

    // Extract and clean body content
    const cleanedHtml = extractBodyContent(sourceHtml);

    // Write to component HTML
    fs.writeFileSync(htmlDestPath, cleanedHtml, 'utf8');
    console.log(`✅ HTML updated for ${name}`);

    // Add AuthGuard to route
    addAuthGuardToRoute(name);

  } catch (error) {
    console.error(`❌ Error setting up ${name}:`, error.message);
  }
};

console.log('🚀 Starting component setup...\n');

components.forEach(component => {
  setupComponent(component);
});

console.log('\n✨ Component setup complete!');
