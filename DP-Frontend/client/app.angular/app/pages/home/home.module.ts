import {NgModule} from '@angular/core';
import {HomeComponent} from "./home.component";
import {UIModule} from "../../ui/ui.module";

@NgModule({
  imports: [
    UIModule
  ],
  declarations: [
    HomeComponent
  ]
})

export class HomeModule {
}
