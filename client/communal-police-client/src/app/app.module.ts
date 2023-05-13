import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateCommunalProblemComponent } from './components/create-communal-problem/create-communal-problem.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommunalProblemCardComponent } from './components/communal-problem-card/communal-problem-card.component';
import { PolicemanCommunalProblemsComponent } from './components/policeman-communal-problems/policeman-communal-problems.component';
import { MunicipalityCommunalProblemsComponent } from './components/municipality-communal-problems/municipality-communal-problems.component';
import { CommunalProblemmDetailsComponent } from './components/communal-problemm-details/communal-problemm-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateCommunalProblemComponent,
    NavbarComponent,
    CommunalProblemCardComponent,
    PolicemanCommunalProblemsComponent,
    MunicipalityCommunalProblemsComponent,
    CommunalProblemmDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
