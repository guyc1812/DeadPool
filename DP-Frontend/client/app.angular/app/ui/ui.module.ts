import {NgModule} from '@angular/core';
import {DeadpoolComponent} from "./deadpool/deadpool.component";
import {SpiderWebComponent} from "./spiderweb/spiderweb.component";
import {MarkDownComponent} from "./markdown/markdown.component";
import {SiderModule} from "./sider/sider.module";

@NgModule({
  imports: [
    SiderModule
  ],
  declarations: [
    DeadpoolComponent,
    SpiderWebComponent,
    MarkDownComponent
  ],
  exports:[
    DeadpoolComponent,
    SpiderWebComponent,
    MarkDownComponent
  ]
})

export class UIModule {}
