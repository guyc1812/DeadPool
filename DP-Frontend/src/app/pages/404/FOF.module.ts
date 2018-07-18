import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UIModule} from '../../ui/ui.module';
import {FOFComponent} from './FOF.component';

@NgModule({
  imports: [
    UIModule,
    BrowserAnimationsModule
  ],
  declarations: [
    FOFComponent
  ]
})

export class FOFModule {
}
