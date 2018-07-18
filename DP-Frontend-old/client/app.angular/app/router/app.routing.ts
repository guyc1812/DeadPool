import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "../pages/home/home.component";
import {NoteComponent} from "../pages/note/note.component";
import {AdminComponent} from "../pages/admin/admin.component";
import {FOFComponent} from "../pages/404/FOF.component";

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
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'note/:category',
    component: NoteComponent
  },
  {
    path: 'note/:category/:id',
    component: NoteComponent
  },
  {
    path: '**',
    component: FOFComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
