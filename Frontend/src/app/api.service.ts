import { Injectable } from '@angular/core';
import { Match } from './match';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private http: HttpClient, private config: ConfigService) { }

  private get url(): string {
    return this.config.cfg.backendUrl || '';
  }

  addResults(match: Match): Observable<Match>{
    return this.http.post<Match>(`${this.url}/api/Match`, match);
  }

  getAllMatches(): Observable<Match[]>{
    return this.http.get<Match[]>(`${this.url}/api/Match`);
  }
}
