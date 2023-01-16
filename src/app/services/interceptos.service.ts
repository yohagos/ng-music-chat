import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpEvent } from "@angular/common/http";
import { Observable, Subject, of, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";



@Injectable({
  providedIn: 'root'
})
export class InterceptosService {

  constructor(private router: Router,
              private auth: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.headers.has('Content-Type')) {
      request = request.clone({headers: request.headers.set('Content-Type', 'application/json')})
    }
    request = request.clone({headers: request.headers.set('Accept', 'application/json')}).clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    })
    return next.handle(request)
  }

}
