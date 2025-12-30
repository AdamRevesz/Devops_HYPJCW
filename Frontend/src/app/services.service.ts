import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Match } from './match';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addResults(match: Match): Observable<Match>{
    return this.http.post<Match>(`${this.url}api/Match`, match);
  }

  getAllMatches(): Observable<Match[]>{
    return this.http.get<Match[]>(`${this.url}api/Match`);
  }
}
