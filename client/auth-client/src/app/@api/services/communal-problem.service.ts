import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunalProblem } from '../model/communal-problem.model';

@Injectable({
  providedIn: 'root'
})
export class CommunalProblemService {

  private readonly path = "http://localhost:8000/api/communal-police/get-communal-problems";

  constructor(private http: HttpClient) { }

  getAll():Observable<CommunalProblem[]>{
    return this.http.get<CommunalProblem[]>(this.path);
  }

}