import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './@pages/home/home.component';
import { JudgeHomeComponent } from './@pages/judge/judge-home/judge-home.component';
import { JudgeNoAccessComponent } from './@pages/judge/judge-no-access/judge-no-access.component';
import { JudgeNotFoundComponent } from './@pages/judge/judge-not-found/judge-not-found.component';
import { JudgeComponent } from './@pages/judge/judge.component';
import { NotFoundComponent } from './@pages/not-found/not-found.component';
import { JudgeCommunalProblemsComponent } from './@pages/judge/judge-communal-problems/judge-communal-problems.component';

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
    path: 'not-found',
    component: NotFoundComponent
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
        path: 'problems',
        component: JudgeCommunalProblemsComponent
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
