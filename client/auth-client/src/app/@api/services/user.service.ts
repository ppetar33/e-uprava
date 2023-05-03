import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserOpenData } from '../model/user-open-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly path = "http://localhost:8000/api/open-data";

  constructor(private http: HttpClient) { }

  getAllCops():Observable<UserOpenData[]>{
    return this.http.get<UserOpenData[]>(this.path+`/get-all-cops`);
  }

  getAllJudges():Observable<UserOpenData[]>{
    return this.http.get<UserOpenData[]>(this.path+`/get-all-judges`);
  }
}
