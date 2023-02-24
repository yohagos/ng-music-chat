import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserBase } from 'src/app/shared/models/user.model';

import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FunctionsService } from 'src/app/shared/services/functions.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  profilePhoto: string = '';

  currentUser!: UserBase

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
    private fr: FunctionsService
  ) {
    this.getProfilePhoto()
    this.getCurrentUserInfo()
  }

  ngOnInit() {  }

  toSongs() {
    this.router.navigate(['/songs']);
  }

  logout() {
    this.auth.clearStorage();
    this.profilePhoto = '';
    this.router.navigate(['/signin']);
  }

  getProfilePhoto() {
    this.api.getRequestWithTokenBlob('user/photo').subscribe(
      async (response) => {
        let blob: Blob = response.body as Blob;
        let file = new File([blob], 'profile.jpg', {type: blob.type, lastModified: 0})
        this.fr.readFile(file).then(
          value => {
            this.profilePhoto = value
          }
        )
      }
    );
  }

  getCurrentUserInfo() {
    this.api.getRequestWithToken('user').subscribe(
      data => {
        this.currentUser = data
      }
    )
  }

}
