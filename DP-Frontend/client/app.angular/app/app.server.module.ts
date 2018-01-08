import {NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {AppModule} from './bootstrap/app.module';
import {AppComponent} from './bootstrap/app.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    AppModule,
    ModuleMapLoaderModule,
    NoopAnimationsModule,
    ServerModule,
    ServerTransferStateModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
}
