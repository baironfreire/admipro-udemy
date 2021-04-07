import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    NopagefoundComponent,
    SidebarComponent,
    SpinnerComponent,
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    NopagefoundComponent,
    SidebarComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
