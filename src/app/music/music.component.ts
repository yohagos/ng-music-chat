import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Music, MusicBase } from '../shared/models/music.model';

import { ApiService } from '../shared/services/api.service';
import { FunctionsService } from '../shared/services/functions.service';
import { PlayerService } from '../shared/services/player.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
})
export class MusicComponent {
  musicList: MusicBase[] = [];

  addSongForm: UntypedFormGroup = new UntypedFormGroup({
    artist: new UntypedFormControl(''),
    title: new UntypedFormControl(''),
    genre: new UntypedFormControl(''),
    feature: new UntypedFormControl(''),
    fname: new UntypedFormControl('')
  })

  file!: File

  url: string = ''

  switch = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private fr: FunctionsService,
    private player: PlayerService,
  ) {}

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

  getFilename() {
    if(this.file) {
      return this.file.name;
    }
    return 'No File selected'
  }

  addSong() {
    let fd: FormData = new FormData();
    fd.append('artist', this.addSongForm.get('artist')?.value)
    fd.append('title', this.addSongForm.get('title')?.value)
    fd.append('genre', this.addSongForm.get('genre')?.value)
    fd.append('featuring', this.addSongForm.get('featuring')?.value)
    fd.append('file', this.file, this.file?.name)
    console.log("send data")
    this.api.postUploadFile('music/add_song',fd).subscribe(
      data => {
        console.log(data)
      }
    )
  }

  playSong(id: number, song: MusicBase) {
    this.api.getRequestWithTokenBlob(`music/song/${id}`).subscribe(
      async (response) => {
        let blob: Blob = response.body as Blob
        let file = new File([blob], song.title, { type: blob.type, lastModified: 0 })
        await this.fr.readFile(file).then(
          value => {
            this.url = value
          }
        )

        this.openMusicPlayer(this.url, song)
      }
    )
  }

  playAllSongs() {
    let playlist: Music[] = [];
    this.musicList.forEach(element => {
      this.api.getRequestWithTokenBlob(`music/song/${element.id}`).subscribe(
        async (response) => {
          let blob = response.body as Blob
          let file = new File([blob], element.title, { type: blob.type })
          await this.fr.readFile(file).then(
            value => {
              playlist.push(
                {
                  base: element,
                  url: value
                }
              )
            }
          )
        }
      )
    });
    setTimeout(() => {}, 1);
    this.player.setMultipleSongs(playlist)
    setTimeout(() => {}, 1);
    this.router.navigate(['/player'])
  }

  openMusicPlayer(url?: string, song?: MusicBase) {
    this.player.setSingleSong(
      {
        base: {
          artist: song?.artist || '',
          featuring: song?.featuring || '',
          genre: song?.genre || '',
          id: song?.id || 0,
          path: song?.path || '',
          title: song?.title || '',
          uploaded_by: song?.uploaded_by || '',
        },
        url:  url?.toString() || ''
      }
    )
    this.router.navigate(['/player'])
  }
}
