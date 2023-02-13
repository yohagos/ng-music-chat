import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserBase } from 'src/app/shared/models/user.model';

import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profilePhoto: string = '';

  currentUser!: UserBase

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.getProfilePhoto()
    this.getCurrentUserInfo()
  }

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
      (response) => {
        let blob: Blob = response.body as Blob;
        let file = new File([blob], 'profile.jpg', {type: blob.type, lastModified: 0})
        this.readFile(file)
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

  readFile(input: Blob) {
    const fr = new FileReader()
    fr.readAsDataURL(input)

    fr.addEventListener('load', ()=> {
      const res = fr.result
      this.profilePhoto = res?.toString() || ''
    })
  }

}
