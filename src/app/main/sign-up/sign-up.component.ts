import { Component, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { UserBase } from 'src/app/shared/models/user.model';
import { MenuService } from 'src/app/shared/services/menu.service';

interface MenuItem {
  label: string;
  action: () => void;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  menu!: MenuItem[];

  check = false;

  createForm: UntypedFormGroup = new UntypedFormGroup({
    firstname: new UntypedFormControl(''),
    lastname: new UntypedFormControl(''),
    username: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
  })

  constructor(public fb: UntypedFormBuilder,
              private api: ApiService,
              private router: Router,
              private menuService: MenuService,
              private cdr: ChangeDetectorRef) {
                setTimeout(() => {
                  this.menu = [
                    { label: 'Home', action: () => {this.router.navigate(['/home'])} },
                    { label: 'Sign In', action: () => { this.router.navigate(['/signin']) } },
                  ];
                  this.menuService.setMenu(this.menu)
                })
              }

  password(event: Event) {
    if (document.getElementById('p1') === document.getElementById('p2')) {
      this.check = true;
    }
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
      res => {
        this.router.navigate(['/signin'])
      }
    );
  }

}
