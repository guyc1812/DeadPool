import 'rxjs';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {environment} from './environments/environment';
import {AppBrowserModule} from './app/app.browser.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppBrowserModule)
  .catch(err => console.log(err));

try {
  // remove place holder page when js is fully loaded
  document.getElementById("ph").style.display = 'none';
} catch (e) {
  // ignore
}
