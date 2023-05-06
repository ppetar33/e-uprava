import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserOpenData } from '../model/user-open-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly path = "http://localhost:8000/api/auth";

  constructor(private http: HttpClient) { }

  getAllJudges():Observable<UserOpenData[]>{
    return this.http.get<UserOpenData[]>(this.path + `/get-judges`);
  }

  getJudgesByMunicipality(municipality: string):Observable<UserOpenData[]>{
    return this.http.get<UserOpenData[]>(this.path + `/get-judges/${municipality}`);
  }

}
