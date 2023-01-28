import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserBase } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  createForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(public fb: FormBuilder,
              private auth: AuthService,
              private api: ApiService,
              private router: Router) { }

  ngOnInit(): void {
  }

  backHome() {
    this.router.navigate(['/home']);
  }

  signIn() {
    this.router.navigate(['/signin']);
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
