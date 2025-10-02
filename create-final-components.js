const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const basePath = 'C:/Users/supor/Documents/central_de_ajuda_edit';
const entitiesPath = path.join(basePath, 'src/main/webapp/app/entities');

// Componentes a criar
const components = [
  { path: 'aprenda-utilizar', name: 'AprendaUtilizarComponent' },
  { path: 'duvidas-frequentes', name: 'DuvidasFrequentesComponent' },
  { path: 'mister-academy', name: 'MisterAcademyComponent' },
  { path: 'mister-academy/journey', name: 'JourneyComponent' }
];

console.log('Criando componentes finais...\n');

components.forEach(comp => {
  const componentPath = path.join(entitiesPath, comp.path);

  // Criar diretório
  if (!fs.existsSync(componentPath)) {
    fs.mkdirSync(componentPath, { recursive: true });
  }

  const fileName = comp.path.split('/').pop();

  // Criar TypeScript
  const tsContent = `import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-${fileName}',
  templateUrl: './${fileName}.component.html',
  styleUrls: ['./${fileName}.component.scss']
})
export class ${comp.name} implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
`;

  fs.writeFileSync(path.join(componentPath, `${fileName}.component.ts`), tsContent);

  // Criar SCSS vazio
  fs.writeFileSync(path.join(componentPath, `${fileName}.component.scss`), '');

  // Criar HTML básico
  const htmlContent = `<jhi-sidebar></jhi-sidebar>

<div class="hero">
  <h1>Título</h1>
  <p class="text-primary">Descrição</p>
</div>

<div class="content">
  <!-- Conteúdo será migrado -->
</div>
`;

  fs.writeFileSync(path.join(componentPath, `${fileName}.component.html`), htmlContent);

  console.log(`✓ ${comp.name} criado`);
});

console.log('\n✅ Todos os componentes foram criados!');
