import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { HasSessionGuard } from '../guards/has-session/has-session.guard';

const routes: Routes = [
  {path: 'add', component: AddComponent, canActivate: [HasSessionGuard]},
  {path: '**', redirectTo: 'add', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
