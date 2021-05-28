import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlErrorComponent } from '../components/form-control-error/form-control-error.component';
import '../components/form-control-error/extensions';
import { SharedModule } from '../shared/shared.module';
import { ServiceModule } from '../services/service.module';
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
    AuthComponent,
    FormControlErrorComponent
  ]
})
export class AuthModule { }
