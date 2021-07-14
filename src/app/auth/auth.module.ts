import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ServiceModule } from '../services/service.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

import '../components/form-control-error/extensions';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ServiceModule,
    SharedModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent
  ]
})
export class AuthModule { }
