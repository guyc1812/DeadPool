import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home.component';
import {UIModule} from '../../ui/ui.module';

@NgModule({
  imports: [
    UIModule,
    BrowserAnimationsModule
  ],
  declarations: [
    HomeComponent
  ]
})

export class HomeModule {
}
