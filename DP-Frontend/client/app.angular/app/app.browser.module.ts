// module
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AppModule} from "./bootstrap/app.module";
// components
import {AppComponent} from './bootstrap/app.component';

// for browser only
// import "datatables.net";
// import "datatables.net-scroller";
// import "datatables.net-bs";
// import "datatables.net-buttons";

@NgModule({
  imports: [
    AppModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {
}
