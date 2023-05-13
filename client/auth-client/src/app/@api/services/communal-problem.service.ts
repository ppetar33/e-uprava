import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunalProblem } from '../model/communal-problem.model';
import { CommunalStatisticData } from '../model/communal-statistic-data.model';

@Injectable({
  providedIn: 'root'
})
export class CommunalProblemService {

  private readonly path = "http://localhost:8000/api/communal-police";

  constructor(private http: HttpClient) { }

  getAll():Observable<CommunalProblem[]>{
    return this.http.get<CommunalProblem[]>(this.path + `/get-communal-problems`);
  }

  getAllMunicipality():Observable<string[]>{
    return this.http.get<string[]>(this.path + `/get-municipality`);
  }

  getCommunalProblemByMunicipality(municipality: string):Observable<CommunalProblem[]>{
    return this.http.get<CommunalProblem[]>(this.path + `/get-communal-problems/${municipality}`);
  }

  getStatisticData():Observable<CommunalStatisticData>{
    return this.http.get<CommunalStatisticData>(this.path + `/get-statistic-data`);
  }

  getSolvedCommunalProblems():Observable<CommunalProblem[]>{
    return this.http.get<CommunalProblem[]>(this.path + `/get-solved-communal-problems`);
  }

  getUnsolvedCommunalProblems():Observable<CommunalProblem[]>{
    return this.http.get<CommunalProblem[]>(this.path + `/get-un-solved-communal-problems`);
  }

}