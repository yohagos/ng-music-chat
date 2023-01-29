import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BACKEND = 'http://localhost:8000'

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  getRequest(url: string): Observable<any> {
    return this.http.get(this.BACKEND+'/'+url, ).pipe(
      map(
        res => {
          return res
        }
      )
    );
  }

  getRequestWithToken(url: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`
    })
    const requestOptions = {headers: headers}
    return this.http.get(this.BACKEND + '/' + url, requestOptions).pipe(
      map(
        res => {
          return res
        }
      )
    );
  }

  postRequest(url: string, payload: any): Observable<any> {
    let headersPost: HttpHeaders = new HttpHeaders({
      Authorization: "Bearer +token",
      "Content-Type": "application/json"
    })
    return this.http.post(this.BACKEND+'/'+url, payload, {headers: headersPost}).pipe(
      map(
        res => {
          return res
        }
      )
    )
  }

  postRequestLogin(url: string, payload: any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({
      Authorization: "Bearer +token",
      "Content-Type": "application/x-www-form-urlencoded"
    })
    return this.http.post(this.BACKEND+'/'+url, payload, {headers: headers}).pipe(
      map(
        res => {
          return res
        }
      )
    )
  }

  postRequestWithToken(url: string, payload:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`
    });

    return this.http.post(this.BACKEND + '/' + url, payload, { headers: headers}).pipe(
      map(
        res => {
          return res
        }
      )
    )
  }

  postRequestMultipartWithToken(url: string, payload: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type': 'multipart/form-data',
    });

    return this.http.post(this.BACKEND + '/' + url, payload, { headers: headers}).pipe(
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

