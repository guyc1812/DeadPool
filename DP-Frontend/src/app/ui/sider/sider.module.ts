import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SiderComponent} from './sider.component';
import {SiderItemComponent} from './sider-item/sider-item.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  declarations: [
    SiderComponent,
    SiderItemComponent
  ],
  exports: [
    SiderComponent,
    SiderItemComponent
  ]
})

export class SiderModule {
}
