import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateCommunalProblemComponent } from './components/create-communal-problem/create-communal-problem.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'create-communal-problem', component: CreateCommunalProblemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
