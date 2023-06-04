import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable} from "rxjs";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import jwt_decode from "jwt-decode";

import { AuthService } from './auth.service';


export interface Expiration {
  sub: string
  exp: number
}

@Injectable({
  providedIn: 'root'
})
export class InterceptosService {

  constructor(private router: Router,
              private auth: AuthService) {
                router.events.subscribe(
                  event => {
                    if (event instanceof NavigationEnd) {
                      this.checkTokenExpiration()
                    }
                  }
                )
              }

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

  checkTokenExpiration() {
    const token = this.auth.getToken()
    if (!token) {
      this.auth.clearStorage()
      this.router.navigate(['/signin'])
      return
    }
    const decode: Expiration = jwt_decode(token)
    const now = Date.now() / 1000
    if (decode.exp < now) {
      this.router.navigate(['/signin'])
    }
  }

  getUsername() {
    const token = this.auth.getToken()
    if (!token) {
      this.router.navigate(['/signin'])
      return
    }
    const decode: Expiration = jwt_decode(token)
    return decode.sub
  }

}
