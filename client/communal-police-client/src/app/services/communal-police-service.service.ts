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
		let url = "http://localhost:8000/api/communal-police/get-communal-problems"
		let queryParams = {};

		queryParams = {
			headers: this.headers,
			observe: 'response'
		};

		return this.http.get(url, queryParams);
	}

	getByCitizen(id: string): Observable<any> {
		let url = "http://localhost:8000/api/communal-police/get-communal-problems/citizen/" + id
		let queryParams = {};

		queryParams = {
			headers: this.headers,
			observe: 'response'
		};

		return this.http.get(url, queryParams);
	}

	getByPoliceman(id: string): Observable<any> {
		let url = "http://localhost:8000/api/communal-police/get-communal-problems/policeman/" + id
		let queryParams = {};

		queryParams = {
			headers: this.headers,
			observe: 'response'
		};

		return this.http.get(url, queryParams);
	}

	getById(id: string): Observable<any> {
		let url = "http://localhost:8000/api/communal-police/get-communal-problem/" + id
		let queryParams = {};

		queryParams = {
			headers: this.headers,
			observe: 'response'
		};

		return this.http.get(url, queryParams);
	}


	getByMunicipality(municipality: string): Observable<any> {
		let url = "http://localhost:8000/api/communal-police/get-communal-problems/" + municipality
		let queryParams = {};

		queryParams = {
			headers: this.headers,
			observe: 'response'
		};

		return this.http.get(url, queryParams);
	}

	getUserByJMBG(jmbg: string): Observable<any> {
		let url = "http://localhost:8000/api/auth/user-jmbg/" + jmbg
		let queryParams = {};

		queryParams = {
			headers: this.headers,
			observe: 'response'
		};

		return this.http.get(url, queryParams);
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
        		report: communalProblem.report,
				reportedById: communalProblem.reportedById,
			},
		{ headers: this.headers, responseType: 'json' });
	}

	sendToCOurt(communalProblem: any): Observable<any> {
		let url = "http://localhost:8000/api/court/communal-problem"

		return this.http.post(url,
			{
				id: communalProblem.id,
				title: communalProblem.title,
				description: communalProblem.description,
				address: communalProblem.address,
				imageUrl: communalProblem.imageUrl,
        		policemanId: communalProblem.policemanId,
        		anonymous: communalProblem.anonymous,
        		date: communalProblem.date,
        		municipality: communalProblem.municipality,
        		judgeId: communalProblem.judgeId,
        		report: communalProblem.report,
				reportedById: communalProblem.reportedById,
				accepted: false
			},
		{ headers: this.headers, responseType: 'json' });
	}

	addReport(communalProblem: CommunalProblem): Observable<any> {
		let url = "http://localhost:8000/api/communal-police/add-report"

		return this.http.put(url,
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
        		report: communalProblem.report,
				reportedById: communalProblem.reportedById,
				accepted: false
			},
		{ headers: this.headers, responseType: 'json' });
	}

	acceptByPoliceman(communalProblem: CommunalProblem): Observable<any> {
		let url = "http://localhost:8000/api/communal-police/assign-problem"

		return this.http.put(url,
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
        		report: communalProblem.report,
				reportedById: communalProblem.reportedById,
				accepted: false
			},
		{ headers: this.headers, responseType: 'json' });
	}

	sendToCourtCommunalPolice(communalProblem: CommunalProblem): Observable<any> {
		let url = "http://localhost:8000/api/communal-police/sent-to-court"

		return this.http.put(url,
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
        		report: communalProblem.report,
				reportedById: communalProblem.reportedById,
				accepted: false
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
