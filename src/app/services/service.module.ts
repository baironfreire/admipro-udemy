import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastyModule } from 'ng2-toasty';
import { StorageServiceModule } from 'ngx-webstorage-service';
import {  } from './guards/no-auth.guard';

import {
  SettingsService, SharedService, 
  SidebarService, HelperService, 
  UserService, AuthGuard , HttpService,
  AlertService, LocalStorageService, NoAuthGuard
} from './service.index'



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ToastyModule.forRoot(),
    StorageServiceModule,
    
    
  ],
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    HelperService,
    UserService,
    AuthGuard,
    NoAuthGuard,
    HttpService,
    AlertService,
    LocalStorageService,
  ],
  exports:[
    ToastyModule
  ]
})
export class ServiceModule { }
