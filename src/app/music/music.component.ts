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

  musicAll() {
    this.api.getRequestWithToken('music/all').subscribe(
      (data) => {
        console.log(data);
        this.musicList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setFile(event: any) {
    this.file = event.target.files[0]
  }

  addSong() {
    let form = this.addSongForm.value;

    /* let body = new HttpParams({})
      .append('title', 't')
      .append('artist', 'a')
      .append('genre', 'g')
      .append('feature', 'f')
      .append('file', '1_audioaufnahme.mp3') */

    /* let body = new HttpParams({})
      .append("title", "t")
      .append("artist", "a")
      .append("genre", "g")
      .append("feature", "f")
      .append("file", "1_audioaufnahme.mp3") */

    let body = {
      "title": "t",
      "artist": "artist",
      "genre": "g",
      "feature": "f",
      "file": this.file.name
    }

    this.addInfo(body)
    this.addFile()
  }

  addInfo(params: any) {
    this.api.postRequestWithToken('music/add_info', params).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async addFile() {
    let data = new FormData()
    data.set('file', this.file, this.file.name)

    this.api.postRequestWithToken('music/add_song', data.get('file')).subscribe(
      (res) => {
        console.log(res);
      },
      error => {
        console.log(error)
      }
    )
  }
}
