import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {MobxAngularModule} from 'mobx-angular';

import {AppComponent} from './app.component';
import {HomeModule} from "../pages/home/home.module";
import {AppRoutingModule} from "../router/app.routing";
import {NoteModule} from "../pages/note/note.module";
import {FOFModule} from "../pages/404/FOF.module";
import {SiderState} from "../service/siderState/sider.state.store";

@NgModule({
  imports: [
    //angular
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    //mobx
    MobxAngularModule,
    //router
    AppRoutingModule,
    //pages
    FOFModule,
    HomeModule,
    NoteModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [SiderState]
})

export class AppModule {
}
