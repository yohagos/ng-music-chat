import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { Login2Base, LoginBase } from 'src/app/shared/models/login.model';
import { UserBase } from 'src/app/shared/models/user.model';

import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl('username'),
    password: new FormControl('password')
  });

  createForm: FormGroup = new FormGroup({
    firstname: new FormControl('firstname'),
    lastname: new FormControl('lastname'),
    username: new FormControl('username'),
    password: new FormControl('password'),
  })

  constructor(public fb: FormBuilder,
              private auth: AuthService,
              private api: ApiService,
              private router: Router) { }

  ngOnInit(): void { }

  login(){
    let b = this.form.value;
    let jsonData: Login2Base = {
      'username': Object.toString() ,
      'password': b.password
    }
    console.log(jsonData)

    this.api.postRequest('login', jsonData).subscribe(
      (res: any) => {
        console.log(res);
        if (res.access_token) {
          this.auth.setDataInLocalStorage('token', res.access_token);
          this.router.navigate(['profile']);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  createUserRequest() {
    //this.setCreateForm()
    let newUser = this.createForm.value;
    let jsonData: UserBase = {
      'firstname': newUser.firstname,
      'lastname': newUser.lastname,
      'username': newUser.username,
      'password': newUser.password
    }
    //let body = new HttpParams()

    this.api.postRequest('user', jsonData).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }

}
