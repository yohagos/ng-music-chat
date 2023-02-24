import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { MusicBase } from '../shared/models/music.model';
import { ApiService } from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
})
export class MusicComponent implements OnInit {
  musicList: MusicBase[] = [];

  addSongForm!: FormGroup;

  file!: File

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addSongForm = this.fb.group({
      artist: [''],
      title: [''],
      genre: [''],
      feature: [''],
    });
  }

  logout() {
    this.auth.clearStorage();
    this.router.navigate(['/home']);
  }

  profile() {
    this.router.navigate(['/profile'])
  }

  musicAll() {
    this.api.getRequestWithToken('music/all').subscribe(
      (data) => {
        this.musicList = data;
      }
    );
  }

  setFile(event: any) {
    this.file = event.target.files[0]
  }

  addSong() {
    let fd: FormData = new FormData();
    fd.append('artist', this.addSongForm.get('artist')?.value)
    fd.append('title', this.addSongForm.get('title')?.value)
    fd.append('genre', this.addSongForm.get('genre')?.value)
    fd.append('featuring', this.addSongForm.get('featuring')?.value)
    fd.append('file', this.file, this.file?.name)

    this.api.postAddSong(fd).subscribe(
      data => {
        console.log(data)
      }
    )
  }

  openMusicPlayer() {
    this.router.navigate(['/player'])
  }
}
