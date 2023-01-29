import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  addSongForm: FormGroup = new FormGroup({
    artist: new FormControl(''),
    title: new FormControl(''),
    feature: new FormControl(''),
    genre: new FormControl(''),
    file: new FormControl(''),
    fileSource: new FormControl('')
  })

  constructor(private auth: AuthService,
              private api: ApiService,
              private router: Router,
              public fb: FormBuilder) { }

  ngOnInit(): void { }

  logout() {
    this.auth.clearStorage()
    this.router.navigate(['/home'])
  }

  addSong() {
      console.log(this.addSongForm.value);
    const formData = new FormData();
    formData.append('file', this.addSongForm.get('file')?.value);
      console.log(formData)

    this.api.postRequestWithToken('music/add_song', formData).subscribe(
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
