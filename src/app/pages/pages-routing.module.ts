import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphComponent } from './graph/graph.component';
import { AccountSttingsComponent } from './account-sttings/account-sttings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}},
      { path: 'progress', component: ProgressComponent, data: {title: 'ProgressBars'}},
      { path: 'graph', component: GraphComponent, data: {title: 'Gráficas'}},
      { path: 'account-settings', component: AccountSttingsComponent, data: {title: 'Ajuste de Tema'}},
      { path: 'promise', component: PromesasComponent, data: {title: 'Promesas '}},
      { path: 'rxjs', component: RxjsComponent, data: {title: 'RxJs'}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
