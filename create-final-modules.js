const fs = require('fs');
const path = require('path');

const basePath = 'C:/Users/supor/Documents/central_de_ajuda_edit/src/main/webapp/app/entities';

const modules = [
  {
    folder: 'aprenda-utilizar',
    component: 'AprendaUtilizarComponent',
    moduleName: 'AprendaUtilizarModule'
  },
  {
    folder: 'duvidas-frequentes',
    component: 'DuvidasFrequentesComponent',
    moduleName: 'DuvidasFrequentesModule'
  },
  {
    folder: 'mister-academy',
    component: 'MisterAcademyComponent',
    moduleName: 'MisterAcademyModule',
    subComponents: [
      { name: 'JourneyComponent', path: 'journey', route: 'journey' }
    ]
  }
];

console.log('Criando módulos...\n');

modules.forEach(mod => {
  const moduleContent = `import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ${mod.component} } from './${mod.folder}.component';
${mod.subComponents ? mod.subComponents.map(sub => `import { ${sub.name} } from './${sub.path}/${sub.path}.component';`).join('\n') : ''}

const routes: Routes = [
  {
    path: '',
    component: ${mod.component}
  }${mod.subComponents ? ',\n' + mod.subComponents.map(sub => `  {
    path: '${sub.route}',
    component: ${sub.name}
  }`).join(',\n') : ''}
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [${mod.component}${mod.subComponents ? ', ' + mod.subComponents.map(sub => sub.name).join(', ') : ''}]
})
export class ${mod.moduleName} {}
`;

  const modulePath = path.join(basePath, mod.folder, `${mod.folder}.module.ts`);
  fs.writeFileSync(modulePath, moduleContent);
  console.log(`✓ ${mod.moduleName} criado`);
});

console.log('\n✅ Todos os módulos foram criados!');
