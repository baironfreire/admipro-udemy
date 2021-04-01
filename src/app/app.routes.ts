import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GraphComponent } from './pages/graph/graph.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        children: [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
            { path: 'dashboard', component: DashboardComponent},
            { path: 'progress', component: ProgressComponent},
            { path: 'graph', component: GraphComponent},
        ]
    },
    { 
        path: 'auth', 
        component: AuthComponent,
        children: [
            { path: '', redirectTo: '/auth/login', pathMatch: 'full'},
            { path: 'login', component: LoginComponent},
            { path: 'register', component: RegisterComponent},
        ]
    },
  
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: '**', component: NopagefoundComponent},
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});

