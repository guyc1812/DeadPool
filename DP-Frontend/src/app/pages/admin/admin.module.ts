import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminComponent} from './admin.component';
import {UIModule} from '../../ui/ui.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    UIModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AdminComponent
  ]
})

export class AdminModule {
}
