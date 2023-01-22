import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BACKEND = 'http://localhost:8000'
  private headers: HttpHeaders = new HttpHeaders({
    Authorization: "Bearer +token",
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  })
  private headersPost: HttpHeaders = new HttpHeaders({
    Authorization: "Bearer +token",
    "Content-Type": "application/json;charset=utf-8"
  })

  constructor(private http: HttpClient) { }

  getRequest(url: string): Observable<any> {
    return this.http.get(this.BACKEND+'/'+url).pipe(
      map(
        res => {
          return res
        }
      )
    )
  }

  postRequest(url: string, payload: any): Observable<any> {
    return this.http.post(this.BACKEND+'/'+url, payload, {headers: this.headersPost}).pipe(
      map(
        res => {
          return res
        }
      )
    )
  }

  postRequestLogin(url: string, payload: any): Observable<any> {
    return this.http.post(this.BACKEND+'/'+url, payload, {headers: this.headers}).pipe(
      map(
        res => {
          return res
        }
      )
    )
  }

  putRequest(url: string, payload: string): Observable<any>{
    return this.http.post(this.BACKEND+'/'+url, payload).pipe(
      map(
        res => {
          return res
        }
      )
    )
  }

}

