import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms'; // <-- #1 import module
import {AppComponent} from './app.component';
import {HomeModule} from "../pages/home/home.module";
import {AppRoutingModule} from "../router/app.routing";


@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HomeModule
  ],
  declarations: [
    AppComponent
  ]
})

export class AppModule {
}
