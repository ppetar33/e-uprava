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
import { NotFoundComponent } from './@pages/not-found/not-found.component';
import { JudgeComponent } from './@pages/judge/judge.component';
import { JudgeHomeComponent } from './@pages/judge/judge-home/judge-home.component';
import { JudgeNotFoundComponent } from './@pages/judge/judge-not-found/judge-not-found.component';
import { JudgeNoAccessComponent } from './@pages/judge/judge-no-access/judge-no-access.component';
import { ToastBarComponent } from './@components/toast-bar/toast-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JudgeCommunalProblemsComponent } from './@pages/judge/judge-communal-problems/judge-communal-problems.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './@api/interceptors/jwt-interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthModule } from '@auth0/auth0-angular';
import { JudgeCommunalProblemsDetailsComponent } from './@pages/judge/judge-communal-problems/judge-communal-problems-details/judge-communal-problems-details.component';
import { JudgeCommunalProblemsHearingDialogComponent } from './@pages/judge/judge-communal-problems/judge-communal-problems-hearing-dialog/judge-communal-problems-hearing-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    NotFoundComponent,
    JudgeComponent,
    JudgeHomeComponent,
    JudgeNotFoundComponent,
    JudgeNoAccessComponent,
    ToastBarComponent,
    JudgeCommunalProblemsComponent,
    JudgeCommunalProblemsDetailsComponent,
    JudgeCommunalProblemsHearingDialogComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonUiModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-xd1sqt4xwi2fj3r4.us.auth0.com',
      clientId: '3trBDTD1UQPNatlnfJue4m9KVMQjjDZF',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
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
