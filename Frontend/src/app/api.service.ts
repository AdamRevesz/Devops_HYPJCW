import { Injectable } from '@angular/core';
import { Match } from './match';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
url = enviroment.backendUrl;
constructor(private http: HttpClient) { }


  addResults(match: Match): Observable<Match>{
    return this.http.post<Match>(`${this.url}/api/Match`, match);
  }

  getAllMatches(): Observable<Match[]>{
    return this.http.get<Match[]>(`${this.url}/api/Match`);
  }
}
