import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastyModule } from 'ng2-toasty';
import { StorageServiceModule } from 'ngx-webstorage-service';
import {  } from './guards/no-auth.guard';
import { FileUploadModule } from 'ng2-file-upload';

import {
  SettingsService, SharedService, 
  SidebarService, HelperService, 
  UserService, AuthGuard , HttpService,
  AlertService, LocalStorageService, NoAuthGuard,
  AuthInterceptorsService, UploadFileService
} from './service.index'



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ToastyModule.forRoot(),
    StorageServiceModule,
    FileUploadModule,
    
    
  ],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorsService, multi: true},
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
    UploadFileService,
  ],
  exports:[
    ToastyModule,
    FileUploadModule,
  ]
})
export class ServiceModule { }
