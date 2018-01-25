import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoteAlgorithm} from "./note.algorithm/note.algorithm";
import {UIModule} from "../../ui/ui.module";
import {RouterModule} from "@angular/router";
import {NoteJavaBasic} from "./note.javaBasic/note.javaBasic";
import {NoteDesignPattern} from "./note.designPattern/note.designPattern";
import {NoteFrontend} from "./note.frontend/note.frontend";
import {NoteDevOps} from "./note.devOps/note.devOps";
import {SiderModule} from "../../ui/sider/sider.module";

@NgModule({
  imports: [
    RouterModule,
    BrowserAnimationsModule,
    UIModule,
    SiderModule
  ],
  declarations: [
    NoteJavaBasic,
    NoteAlgorithm,
    NoteDesignPattern,
    NoteFrontend,
    NoteDevOps
  ],
  exports: [
    NoteJavaBasic,
    NoteAlgorithm,
    NoteDesignPattern,
    NoteFrontend,
    NoteDevOps
  ]
})

export class NoteModule {
}
