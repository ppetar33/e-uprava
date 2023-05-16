import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JudgeService {
  private readonly APIurl = `${environment.APIurl}/court`;
  private readonly APIurl_communal_police = `${environment.APIurl}/communal-police`;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getJudgeCommunalProblems(judgeId: string): Observable<any> {
    return this.httpClient.get(`${this.APIurl}/communal-problem/judge/${judgeId}`);
  }

  public getCommunalProblmeById(id: string): Observable<any> {
    return this.httpClient.get(`${this.APIurl}/communal-problem/id/${id}`);
  }

  public accept(id: string, user: any): Observable<any> {
    return this.httpClient.put(`${this.APIurl}/communal-problem/accept/${id}`, user);
  }

  public decline(id: string, data: any): Observable<any> {
    return this.httpClient.put(`${this.APIurl}/communal-problem/decline/${id}`, data);
  }

  public solve(id: string): Observable<any> {
    return this.httpClient.put(`${this.APIurl}/communal-problem/solve/${id}`, {});
  }

  public improveCommunalProblem(data: any): Observable<any> {
    return this.httpClient.put(`${this.APIurl_communal_police}/improve-communal-problem`, data);
  }

  public solveCommunalProblem(data: any): Observable<any> {
    return this.httpClient.put(`${this.APIurl_communal_police}/solve`, data);
  }
}
