import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphComponent } from './graph/graph.component';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    GraphComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraphComponent,
  ]
})
export class PagesModule { }
