import { map } from 'rxjs/operators';
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

  form!: FormGroup

  createForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  })

  userList: UserBase[] = [];

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
    let jsonData: LoginBase = {
      'username': b.username ,
      'password': b.password
    }

    let test = {
      'username': b.username,
      'password': b.password
    }

    let body = new HttpParams()
    .set('username', b.username)
    .set('password', b.password)

    console.log(test)
    this.api.postRequestLogin('login', body).subscribe(
      (res: any) => {
        console.log(res);
        if (res.access_token) {
          this.auth.setDataInLocalStorage(body.get('username') || '', res.access_token);
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
    /* let body = new HttpParams()
      .set('username', newUser.username)
      .set('password', newUser.password)
    console.log(jsonData); */
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

}
