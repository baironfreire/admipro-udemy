import { RouterModule, Routes } from "@angular/router";


import { LoginComponent } from './auth/login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [  
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: '**', component: NopagefoundComponent},
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});

