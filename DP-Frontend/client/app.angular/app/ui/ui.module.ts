import {NgModule} from '@angular/core';
import {DeadpoolComponent} from "./deadpool/deadpool.component";
import {SpiderWebComponent} from "./spiderweb/spiderweb.component";
import {MarkDownComponent} from "./markdown/markdown.component";
import {SiderModule} from "./sider/sider.module";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {HttpService} from "../service/httpService/httpService";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    HttpClientModule,
    SiderModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    DeadpoolComponent,
    SpiderWebComponent,
    MarkDownComponent
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    DeadpoolComponent,
    SpiderWebComponent,
    MarkDownComponent
  ],
  providers: [
    HttpService
  ]
})

export class UIModule {}
