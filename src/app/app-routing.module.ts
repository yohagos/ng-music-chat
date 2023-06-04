import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/toolbar/toolbar.module').then(m=>m.ToolbarModule)
  },
  {
    path:"**",
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  getRoutingList() {
    const list = routes.filter((route) => route.canActivate != null)
    return list;
  }
}
