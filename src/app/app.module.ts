import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ServiceModule } from './services/service.module';



import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { APP_ROUTES } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { ToastyModule } from 'ng2-toasty';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  exports: [
    BrowserModule
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    AuthModule,
    FormsModule,
    ChartsModule,
    ServiceModule,
    SharedModule,
    ToastyModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
