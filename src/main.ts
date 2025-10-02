import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './main/webapp/app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
