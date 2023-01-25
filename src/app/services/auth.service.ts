import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserDetails(user: string) {
    return localStorage.getItem(user) //? JSON.parse(localStorage.getItem('userInfo')) : '';
  }

  setDataInLocalStorage(user: string, data: string) {
      localStorage.setItem(user, data);
  }

  getToken() {
      return localStorage.getItem('token');
  }

  clearStorage() {
      localStorage.clear();
  }
}
