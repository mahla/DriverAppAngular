import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// Import RX Deps
import 'rxjs/Rx';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
