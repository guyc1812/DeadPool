import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UIModule} from "../../ui/ui.module";
import {RouterModule} from "@angular/router";
import {NoteComponent} from "./note.component";
import {SiderModule} from "../../ui/sider/sider.module";
import {HttpService} from "../../service/httpService/httpService";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UIModule,
    SiderModule
  ],
  declarations: [
    NoteComponent
  ],
  exports: [
    NoteComponent
  ],
  providers: [
    HttpService
  ]
})

export class NoteModule {
}
