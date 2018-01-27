import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UIModule} from "../../ui/ui.module";
import {RouterModule} from "@angular/router";
import {NoteComponent} from "./note.component";
import {SiderModule} from "../../ui/sider/sider.module";

@NgModule({
  imports: [
    RouterModule,
    BrowserAnimationsModule,
    UIModule,
    SiderModule
  ],
  declarations: [
    NoteComponent
  ],
  exports: [
    NoteComponent
  ]
})

export class NoteModule {
}
