
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from 'src/app/shared/services/auth.service';
import { ApiService } from 'src/app/shared/services/api.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm!: UntypedFormGroup

  constructor(public fb: UntypedFormBuilder,
              private auth: AuthService,
              private api: ApiService,
              private router: Router) {
                this.signInForm = this.fb.group({
                  username: ['', Validators.required],
                  password: ['', Validators.required]
                })
              }

  ngOnInit() {

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
