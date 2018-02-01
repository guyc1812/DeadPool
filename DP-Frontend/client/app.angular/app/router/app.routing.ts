import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "../pages/home/home.component";
import {MarkDownComponent} from "../ui/markdown/markdown.component";
import {NoteComponent} from "../pages/note/note.component";

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
    path: 'note/:category',
    component: NoteComponent
  },
  {
    path: 'note/:category/:id',
    component: NoteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
