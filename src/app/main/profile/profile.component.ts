import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';


import { MusicBase } from 'src/app/shared/models/music.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  print!: string;

  musicList: MusicBase[] = [];

  addSong?: MusicBase;

  constructor(private auth: AuthService,
              private api: ApiService,
              private router: Router) { }

  ngOnInit(): void {}

  toSongs() {
    this.router.navigate(['/songs']);
  }

  logout() {
    this.auth.clearStorage();
    this.router.navigate(['/']);
  }

  musicAll() {
    this.api.getRequestWithToken('music/all').subscribe(
      data => {
        console.log(data)
        this.musicList = data;
      },
      error => {
        console.log(error);
      }
    )
  }


}
