import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NoAuthGuard } from '../services/service.index';

const routes: Routes = [
  { 
    path: 'auth', 
    component: AuthComponent,
    canActivate: [NoAuthGuard],
    children: [
        { path: '', redirectTo: '/auth/login', pathMatch: 'full'},
        { path: 'login', component: LoginComponent},
        { path: 'register', component: RegisterComponent},
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
