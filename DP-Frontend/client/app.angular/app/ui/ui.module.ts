import {NgModule} from '@angular/core';
import {DeadpoolComponent} from "./deadpool/deadpool.component";
import {SpiderWebComponent} from "./spiderweb/spiderweb.component";

@NgModule({
  imports: [],
  declarations: [
    DeadpoolComponent,
    SpiderWebComponent
  ],
  exports:[
    DeadpoolComponent,
    SpiderWebComponent
  ]
})

export class UIModule {}
