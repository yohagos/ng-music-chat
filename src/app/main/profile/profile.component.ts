import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';

import { MusicBase } from 'src/app/shared/models/music.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  constructor(
    private auth: AuthService,
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

}
