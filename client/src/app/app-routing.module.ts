import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './@pages/home/home.component';
import { JudgeHomeComponent } from './@pages/judge/judge-home/judge-home.component';
import { JudgeNoAccessComponent } from './@pages/judge/judge-no-access/judge-no-access.component';
import { JudgeNotFoundComponent } from './@pages/judge/judge-not-found/judge-not-found.component';
import { JudgeComponent } from './@pages/judge/judge.component';
import { NotFoundComponent } from './@pages/not-found/not-found.component';
import { PolicemanHomeComponent } from './@pages/policeman/policeman-home/policeman-home.component';
import { PolicemanNoAccessComponent } from './@pages/policeman/policeman-no-access/policeman-no-access.component';
import { PolicemanNotFoundComponent } from './@pages/policeman/policeman-not-found/policeman-not-found.component';
import { PolicemanComponent } from './@pages/policeman/policeman.component';
import { RegisterComponent } from './@pages/register/register.component';
import { UserHomeComponent } from './@pages/user/user-home/user-home.component';
import { UserNoAccessComponent } from './@pages/user/user-no-access/user-no-access.component';
import { UserNotFoundComponent } from './@pages/user/user-not-found/user-not-found.component';
import { UserComponent } from './@pages/user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'registration',
    component: RegisterComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { 
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full'
      },
      {
        path: 'not-found',
        component: UserNotFoundComponent
      },
      {
        path: 'no-access',
        component: UserNoAccessComponent
      },
      {
        path: 'home',
        component: UserHomeComponent
      },
      {
        path: '**',
        redirectTo: 'not-found',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'judge',
    component: JudgeComponent,
    children: [
      { 
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full'
      },
      {
        path: 'not-found',
        component: JudgeNotFoundComponent
      },
      {
        path: 'no-access',
        component: JudgeNoAccessComponent
      },
      {
        path: 'home',
        component: JudgeHomeComponent
      },
      {
        path: '**',
        redirectTo: 'not-found',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'policeman',
    component: PolicemanComponent,
    children: [
      { 
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full'
      },
      {
        path: 'not-found',
        component: PolicemanNotFoundComponent
      },
      {
        path: 'no-access',
        component: PolicemanNoAccessComponent
      },
      {
        path: 'home',
        component: PolicemanHomeComponent
      },
      {
        path: '**',
        redirectTo: 'not-found',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
