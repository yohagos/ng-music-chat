import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { UserBase } from 'src/app/shared/models/user.model';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  check = false;

  createForm: UntypedFormGroup = new UntypedFormGroup({
    firstname: new UntypedFormControl(''),
    lastname: new UntypedFormControl(''),
    username: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
  })

  constructor(private api: ApiService,
              private router: Router) {

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
