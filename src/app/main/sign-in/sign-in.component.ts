
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from 'src/app/shared/services/auth.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MenuService } from 'src/app/shared/services/menu.service';

interface MenuItem {
  label?: string;
  action?: () => void;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @Input() menu!: MenuItem[];

  signInForm!: UntypedFormGroup

  constructor(public fb: UntypedFormBuilder,
              private auth: AuthService,
              private api: ApiService,
              private router: Router,
              private menuService: MenuService) {
                this.signInForm = this.fb.group({
                  username: ['', Validators.required],
                  password: ['', Validators.required]
                })
              }

  ngOnInit() {
    this.menu = [
      { label: 'Home', action: () => {this.router.navigate(['/home'])} },
      { label: 'Sign Up', action: () => { this.router.navigate(['/signup']) } },
    ];
    this.menuService.setMenu(this.menu)
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
