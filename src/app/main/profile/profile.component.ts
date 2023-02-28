import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

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

  profilePhoto!: string;

  currentUser!: UserBase

  errorMessage = ''

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
    private fr: FunctionsService
  ) {
    console.log(this.profilePhoto)
    this.profilePhoto = ''
    this.getProfilePhoto()
    this.getCurrentUserInfo()
  }

  ngOnInit() {  }

  toSongs() {
    this.router.navigate(['/songs']);
  }

  toContacts() {
    this.router.navigate(['/contact'])
  }

  toMessages() {
    this.router.navigate(['/messages'])
  }

  logout() {
    this.profilePhoto = '';
    this.auth.clearStorage();
    this.router.navigate(['/signin']);
  }

  getProfilePhoto() {
      this.api.getRequestWithTokenBlob('user/photo').subscribe({
        next: async (response) => {
          let blob: Blob = response.body as Blob;
          let file = new File([blob], 'profile.jpg', {type: blob.type, lastModified: 0})
          await this.fr.readFile(file).then(
            value => {
              this.profilePhoto = value
            }
          )
        },
        error(err) {
            catchError(err => of(Error))
        },
    })

  }

  getCurrentUserInfo() {
    this.api.getRequestWithToken('user').subscribe(
      data => {
        this.currentUser = data
      }
    )
  }

  onFileInput(event: any) {
    let photo: File = event.target.files[0]
    let fd: FormData = new FormData()
    fd.append('file', photo, photo.name)

    this.api.postUploadFile('user/upload_photo', fd).subscribe()

    this.getProfilePhoto()
  }

}
