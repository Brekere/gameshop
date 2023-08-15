import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentsModule } from '../components/components.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [DashboardComponent, HomeComponent, AboutComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule,
  ]
})
export class HomeModule { }
