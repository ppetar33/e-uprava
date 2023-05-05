import { Injectable } from '@angular/core';
import { HttpClientModule, HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommunalProblem } from '../model/communal-problem';

@Injectable({
  providedIn: 'root'
})
export class CommunalPoliceServiceService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	private baseURL = "http://localhost:8000/api/communal-police/create-communal-problem"

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<any> {
		let queryParams = {};

		queryParams = {
			headers: this.headers,
			observe: 'response'
		};

		return this.http.get(this.baseURL, queryParams);
	}

  createNew(communalProblem: CommunalProblem): Observable<any> {
		return this.http.post(this.baseURL,
			{
				id: communalProblem.id,
				title: communalProblem.title,
				description: communalProblem.description,
				address: communalProblem.address,
				imageUrl: communalProblem.imageUrl,
        		policemanId: communalProblem.policemanId,
        		anonymous: communalProblem.anonymus,
        		date: communalProblem.date,
        		municipality: communalProblem.municipality,
        		judgeId: communalProblem.judgeId,
        		reportId: communalProblem.reportId,
				reportedById: communalProblem.reportedById,
			},
		{ headers: this.headers, responseType: 'json' });
	}

	isAuthenticated(): Observable<any> {
		let url = "http://localhost:8000/api/auth/authenticated"
		let queryParams = {};

		queryParams = {
			headers: this.headers,
			observe: 'response'
		};

		return this.http.get(url, queryParams);
	}

	

	
	  public logoutAuth(): Observable<any> {
		let url = "http://localhost:8000/api/auth/logout"
		return this.http.post(url, {});
	  }
}
