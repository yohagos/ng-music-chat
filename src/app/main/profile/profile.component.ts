import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  print!: string;

  constructor(private auth: AuthService,
              private api: ApiService, ) { }

  ngOnInit(): void {

  }

  test_jwt() {
    this.api.getRequest('users').subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }

  printToken() {
    console.log(this.auth.getToken())
  }

  logout() {
    console.log('logout')
    let token = this.auth?.getUserDetails('admin')
    this.api.postRequest('logout', token).subscribe(
      data => {
        console.log(data)
      }
    )
  }
}
