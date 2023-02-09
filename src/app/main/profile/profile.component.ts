import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profilePhoto!: File;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    //this.getProfilePhoto()
  }

  toSongs() {
    this.router.navigate(['/songs']);
  }

  logout() {
    this.auth.clearStorage();
    this.router.navigate(['/']);
  }

  getProfilePhoto() {
    this.api.getRequestWithToken('user/photo').subscribe(
      (data) => {
        //this.profilePhoto = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
