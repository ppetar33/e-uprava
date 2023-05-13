import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateCommunalProblemComponent } from './components/create-communal-problem/create-communal-problem.component';
import { PolicemanCommunalProblemsComponent } from './components/policeman-communal-problems/policeman-communal-problems.component';
import { MunicipalityCommunalProblemsComponent } from './components/municipality-communal-problems/municipality-communal-problems.component';
import { CommunalProblemmDetailsComponent } from './components/communal-problemm-details/communal-problemm-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'create-communal-problem', component: CreateCommunalProblemComponent },
  { path: 'policeman-communal-problem', component: PolicemanCommunalProblemsComponent },
  { path: 'municipality-communal-problems', component: MunicipalityCommunalProblemsComponent },
  { path: 'communal-problem/:id', component: CommunalProblemmDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
