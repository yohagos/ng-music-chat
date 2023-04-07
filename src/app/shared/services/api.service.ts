import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BACKEND = 'http://localhost:8000'

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  getUrlWebSocket() {
    let url = this.BACKEND.replace('http', 'ws')
    return url
  }

  getRequest(url: string): Observable<any> {
    return this.http.get(this.BACKEND+'/'+url).pipe(
      map(
        res => {
          return res
        }
      ),
      catchError(this.handleErrors)
    );
  }

  getRequestWithToken(url: string): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    })
    return this.http.get(this.BACKEND + '/' + url, {headers: headers}).pipe(
      map(
        res => {
          return res
        }
      ),
      catchError(this.handleErrors)
    );
  }

  getRequestWithTokenBlob(url: string) {
    let path = this.BACKEND + '/' + url

    return this.http.get<Blob>(path, {observe: 'response', responseType: 'blob' as 'json'})
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
      ),
      catchError(this.handleErrors)
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
      ),
      catchError(this.handleErrors)
    )
  }

  postUploadFile(url: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`
    });

    return this.http.post(this.BACKEND+'/'+url, formData, { headers: headers})
  }

  postRequestWithToken(url: string, payload?:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`
    });

    return this.http.post(this.BACKEND + '/' + url, payload, { headers: headers}).pipe(
      map(
        res => {
          return res
        }
      ),
      catchError(this.handleErrors)
    )
  }

  deleteRequestWithToken(url: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`
    })

    return this.http.delete(this.BACKEND + '/' + url, {headers: headers}).pipe(
      map(
        res => {
          return res
        }
      ),
      catchError(this.handleErrors)
    )
  }

  putRequest(url: string, payload: string): Observable<any>{
    return this.http.post(this.BACKEND+'/'+url, payload).pipe(
      map(
        res => {
          return res
        }
      ),
      catchError(this.handleErrors)
    )
  }

  handleErrors(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
    } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError('')
  }

}
