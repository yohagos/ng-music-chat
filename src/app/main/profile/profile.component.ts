import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

import { MusicBase } from 'src/app/shared/models/music.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  file!: File;

  addSong?: MusicBase;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {}

  toSongs() {
    this.router.navigate(['/songs']);
  }

  logout() {
    this.auth.clearStorage();
    this.router.navigate(['/']);
  }

  change(event: any) {
    this.file = event.target.files[0]
  }

  files() {
    let fd:FormData = new FormData()
    fd.set('uploadFile', this.file)

    console.log(this.file)

    this.api.postAddSong(this.file).subscribe(
      data => {
        console.log(data)
      }
    );
  }
}
