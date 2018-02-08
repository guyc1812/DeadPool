import {NgModule} from '@angular/core';
import {DeadpoolComponent} from "./deadpool/deadpool.component";
import {SpiderWebComponent} from "./spiderweb/spiderweb.component";
import {MarkDownComponent} from "./markdown/markdown.component";
import {SiderModule} from "./sider/sider.module";
import {FooterComponent} from "./footer/footer.component";
import {HeaderNoteComponent} from "./header.note/header.note";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from '@angular/common';
import {HeaderHomeComponent} from "./header.home/header.home";
import {PopComponent} from "./pop/pop.component";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SiderModule
  ],
  declarations: [
    HeaderNoteComponent,
    HeaderHomeComponent,
    FooterComponent,
    DeadpoolComponent,
    SpiderWebComponent,
    MarkDownComponent,
    PopComponent
  ],
  exports: [
    HeaderNoteComponent,
    HeaderHomeComponent,
    FooterComponent,
    DeadpoolComponent,
    SpiderWebComponent,
    MarkDownComponent,
    PopComponent
  ]
})

export class UIModule {
}
