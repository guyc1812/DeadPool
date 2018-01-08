import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms'; // <-- #1 import module
import {AppComponent} from './app.component';


@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent
  ]
})

export class AppModule {
}
