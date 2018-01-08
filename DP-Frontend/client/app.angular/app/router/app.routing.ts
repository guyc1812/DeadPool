import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";


export const appRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
