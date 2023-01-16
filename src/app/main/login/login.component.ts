import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service"

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

  constructor(public fb: FormBuilder,
              private auth: AuthService,
              private api: ApiService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password:['', Validators.required]
    });
  }

  login(){
    let b = this.form.value;
    console.log(b);
    let body = new HttpParams()
      .set('username', b.username)
      .set('password', b.password)

    this.api.postRequest('login', body).subscribe(
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

}
