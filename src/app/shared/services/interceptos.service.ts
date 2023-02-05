import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable} from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from './auth.service';


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
    request = request.clone({headers: request.headers.set('Accept', 'application/json')}).clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    })
    return next.handle(request)
  }

}
