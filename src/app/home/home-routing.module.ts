import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HasSessionGuard } from '../guards/has-session/has-session.guard';

const routesChildren: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [HasSessionGuard]},
  {path: 'dashboard/popular', component: DashboardComponent, canActivate: [HasSessionGuard]},
  {path: 'dashboard/most_downloads', component: DashboardComponent, canActivate: [HasSessionGuard]},
  {path: 'dashboard/comming_soon', component: DashboardComponent, canActivate: [HasSessionGuard]},
  {path: 'about', component: AboutComponent, canActivate: [HasSessionGuard]},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
];

const routes: Routes = [
  {path: 'home', component: HomeComponent, children: routesChildren},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
