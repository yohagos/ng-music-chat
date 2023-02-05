
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from 'src/app/shared/services/auth.service';
import { ApiService } from 'src/app/shared/services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm!: FormGroup

  constructor(public fb: FormBuilder,
              private auth: AuthService,
              private api: ApiService,
              private router: Router) { }

  ngOnInit() {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  backHome() {
    this.router.navigate(['/home']);
  }

  signUp() {
    this.router.navigate(['/signup']);
  }

  login(){
    let b = this.signInForm.value;
    let body = new HttpParams()
    .set('username', b.username)
    .set('password', b.password)

    this.api.postRequestLogin('login', body).subscribe(
      (res: any) => {
        if (res.access_token) {
          this.auth.setDataInLocalStorage('token', res.access_token);
          this.router.navigate(['profile']);
        }
      }
    );
  }

}
