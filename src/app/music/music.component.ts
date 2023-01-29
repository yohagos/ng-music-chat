import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
      new_artist: [''],
      new_title: [''],
      new_genre: [''],
      new_feature: [''],
    });
  }

  logout() {
    this.auth.clearStorage();
    this.router.navigate(['/home']);
  }

  setFile(event: any) {
    this.file = event.target.files[0]
    console.log(this.file)
  }

  addSong() {
    let form = this.addSongForm.value;
    let body = new HttpParams({})
      .append('new_title',form.new_title)
      .append('new_artist', form.new_artist)
      .append('new_genre',form.new_genre)
      .append('new_feature', form.new_feature)
      /* .append('file', this.file) */

    console.log(form)
    console.log(body)

    let formdata = new FormData();
    formdata.set('new_title', form.new_title)
    formdata.set('new_artist',form.new_artist)
    formdata.set('new_genre',form.new_genre)
    formdata.set('new_feature',form.new_feature)
    formdata.set('file',this.file)

    this.api.postRequestMultipartWithToken('music/add_song', formdata).subscribe(
      (res) => {
        alert(res);
      },
      (error) => {
        console.log(error);
      }
    );
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
}
