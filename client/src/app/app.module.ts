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
import { UserComponent } from './@pages/user/user.component';
import { JudgeComponent } from './@pages/judge/judge.component';
import { UserHomeComponent } from './@pages/user/user-home/user-home.component';
import { JudgeHomeComponent } from './@pages/judge/judge-home/judge-home.component';
import { PolicemanComponent } from './@pages/policeman/policeman.component';
import { PolicemanHomeComponent } from './@pages/policeman/policeman-home/policeman-home.component';
import { JudgeNotFoundComponent } from './@pages/judge/judge-not-found/judge-not-found.component';
import { JudgeNoAccessComponent } from './@pages/judge/judge-no-access/judge-no-access.component';
import { PolicemanNotFoundComponent } from './@pages/policeman/policeman-not-found/policeman-not-found.component';
import { PolicemanNoAccessComponent } from './@pages/policeman/policeman-no-access/policeman-no-access.component';
import { UserNotFoundComponent } from './@pages/user/user-not-found/user-not-found.component';
import { UserNoAccessComponent } from './@pages/user/user-no-access/user-no-access.component';
import { ToastBarComponent } from './@components/toast-bar/toast-bar.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    UserComponent,
    JudgeComponent,
    UserHomeComponent,
    JudgeHomeComponent,
    PolicemanComponent,
    PolicemanHomeComponent,
    JudgeNotFoundComponent,
    JudgeNoAccessComponent,
    PolicemanNotFoundComponent,
    PolicemanNoAccessComponent,
    UserNotFoundComponent,
    UserNoAccessComponent,
    ToastBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonUiModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
