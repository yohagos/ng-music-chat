import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjectUnsubscribedError } from 'rxjs';
import { MusicBase } from '../shared/models/music.model';

import { ApiService } from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  musicList: MusicBase[] = [];

  addSongForm!: FormGroup

  constructor(private auth: AuthService,
              private api: ApiService,
              private router: Router,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.addSongForm = this.fb.group({
      new_artist: [''],
      new_title: [''],
      new_genre: [''],
      new_feature: [''],
      file: [''],
    })
  }

  logout() {
    this.auth.clearStorage()
    this.router.navigate(['/home'])
  }

  addSong() {
    /* let form = this.addSongForm.value;
    let body = new HttpParams()
      .set('new_title', form.new_title)
      .set('new_artist', form.new_artist)
      .set('new_genre', form.new_genre)
      .set('new_feature', form.new_feature)
      .set('file', form.file) */

    let formData = new FormData();
    Object.keys(this.addSongForm.controls).forEach(
      formControlName => {
        formData.set(formControlName, this.addSongForm.get(formControlName)?.value)
      })

    console.log(formData)

    this.api.postRequestMultipartWithToken('music/add_song', formData).subscribe(
      res => {
        alert(res);
      },
      error => {
        console.log(error)
      }
    );
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
