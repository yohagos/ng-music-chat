import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

import { UserBase } from 'src/app/shared/models/user.model';

import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FunctionsService } from 'src/app/shared/services/functions.service';
import { MenuService } from 'src/app/shared/services/menu.service';

interface MenuItem {
  label: string;
  icon?: string;
  action: () => void;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements AfterViewInit {
  sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  profilePhoto!: string;

  currentUser!: UserBase

  menu!: MenuItem[]

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
    private fr: FunctionsService,
    private menuService: MenuService,
  ) {
    this.getProfilePhoto()
    this.getCurrentUserInfo()
  }

  ngAfterViewInit() {
    this.loadMenu()
  }

  loadMenu() {
    setTimeout(() => {
      this.menu = [
        { label: 'Songs', icon: 'music_video', action: () => {this.router.navigate(['/songs'])} },
        { label: 'Contacts', icon: 'contacts', action: () => { this.router.navigate(['/contact']) } },
        { label: 'Messages', icon: 'message', action: () => { this.router.navigate(['/messages']) } },
        { label: 'Logout', icon: 'exit_to_app', action: () => { this.logout() } },
      ];
      this.menuService.setMenu(this.menu)
    })
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
