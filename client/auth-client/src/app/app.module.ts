import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from './@ui/common-ui.module';
import { HeaderComponent } from './@components/header/header.component';
import { FooterComponent } from './@components/footer/footer.component';
import { NavComponent } from './@components/nav/nav.component';
import { HomeComponent } from './@pages/home/home.component';
import { LoginComponent } from './@pages/login/login.component';
import { RegisterComponent } from './@pages/register/register.component';
import { NotFoundComponent } from './@pages/not-found/not-found.component';
import { ToastBarComponent } from './@components/toast-bar/toast-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS, JwtInterceptor } from '@auth0/angular-jwt';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommunalProblemCardComponent } from './@components/communal-problem-card/communal-problem-card.component';
import { CommunalProblemsComponent } from './@components/communal-problems/communal-problems.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    ToastBarComponent,
    CommunalProblemCardComponent,
    CommunalProblemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonUiModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, 
      useValue: { 
        hasBackdrop: true
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
