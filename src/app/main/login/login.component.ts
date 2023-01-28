
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

import { LoginBase } from 'src/app/shared/models/login.model';
import { UserBase } from 'src/app/shared/models/user.model';
import { MusicBase } from "src/app/shared/models/music.model";

import { ApiService } from "../../shared/services/api.service";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup

  createForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  })

  userList: UserBase[] = [];

  musicList: MusicBase[] = [];

  constructor(public fb: FormBuilder,
              private auth: AuthService,
              private api: ApiService,
              private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    let b = this.form.value;

    let body = new HttpParams()
    .set('username', b.username)
    .set('password', b.password)

    this.api.postRequestLogin('login', body).subscribe(
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
    let newUser = this.createForm.value;
    let jsonData: UserBase = {
      'firstname': newUser.firstname,
      'lastname': newUser.lastname,
      'username': newUser.username,
      'password': newUser.password
    }

    this.api.postRequest('user', jsonData).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }

  users() {
    this.api.getRequest('users').subscribe(
      (data: UserBase[]) => {
        this.userList = data;
      }
    )
  }

  musicAll() {
    this.api.getRequest('music/all').subscribe(
      data => {
        this.musicList = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
