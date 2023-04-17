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
