import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '@env/environment';


Offline.options = {
  interceptRequests: false,
  checkOnLoad: true,
  reconnect: true,
  checks: { xhr: { url: environment.apiBaseUrl + '/connection-test' } }
};

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
