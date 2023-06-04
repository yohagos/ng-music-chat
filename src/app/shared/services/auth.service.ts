import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getUserDetails(user: string) {
    return localStorage.getItem('userInfo'); //? JSON.parse(localStorage.getItem('userInfo')) : null;
  }

  setDataInLocalStorage(variableName: string, data: string) {
    localStorage.setItem(variableName, data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearStorage() {
    localStorage.clear();
  }

  isLoggedIn() {
    if (this.getToken()) {
      console.log(this.getToken())
      return true
    }
    return false
  }
}
