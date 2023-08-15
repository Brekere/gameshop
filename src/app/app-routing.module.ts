import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'module-auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)},
  {path: 'module-home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)},
  {path: 'module-crud', loadChildren: () => import('./crud/crud.module').then((m) => m.CrudModule)},
  {path: '**', pathMatch: 'full', redirectTo: 'module-auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
