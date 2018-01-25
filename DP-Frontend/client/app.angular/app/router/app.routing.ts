import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "../pages/home/home.component";
import {NoteAlgorithm} from "../pages/note/note.algorithm/note.algorithm";
import {MarkDownComponent} from "../ui/markdown/markdown.component";
import {NoteJavaBasic} from "../pages/note/note.javaBasic/note.javaBasic";
import {NoteDevOps} from "../pages/note/note.devOps/note.devOps";
import {NoteDesignPattern} from "../pages/note/note.designPattern/note.designPattern";
import {NoteFrontend} from "../pages/note/note.frontend/note.frontend";


export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'javaBasic',
    component: NoteJavaBasic,
    children: [
      {
        path: 'note/:id',
        component: MarkDownComponent
      }
    ]
  },
  {
    path: 'algorithm',
    component: NoteAlgorithm,
    children: [
      {
        path: 'note/:id',
        component: MarkDownComponent
      }
    ]
  },
  {
    path: 'devOps',
    component: NoteDevOps,
    children: [
      {
        path: 'note/:id',
        component: MarkDownComponent
      }
    ]
  },
  {
    path: 'designPattern',
    component: NoteDesignPattern,
    children: [
      {
        path: 'note/:id',
        component: MarkDownComponent
      }
    ]
  },
  {
    path: 'frontend',
    component: NoteFrontend,
    children: [
      {
        path: 'note/:id',
        component: MarkDownComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
