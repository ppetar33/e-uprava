import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JudgeService {
  private readonly APIurl = `${environment.APIurl}/court`;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getJudgeCommunalProblems(judgeId: string): Observable<any> {
    return this.httpClient.get(`${this.APIurl}/communal-problem/judge/${judgeId}`);
  }

  public getCommunalProblmeById(id: string): Observable<any> {
    return this.httpClient.get(`${this.APIurl}/communal-problem/id/${id}`);
  }

  public accept(id: string): Observable<any> {
    return this.httpClient.put(`${this.APIurl}/communal-problem/accept/${id}`, {});
  }

  public decline(id: string): Observable<any> {
    return this.httpClient.put(`${this.APIurl}/communal-problem/decline/${id}`, {});
  }
}
