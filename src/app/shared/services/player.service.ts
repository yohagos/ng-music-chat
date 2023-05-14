import { Injectable } from '@angular/core';
import { Music } from '../models/music.model';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  singleSong!: Music;
  playlist!: Music[];
  obs = of(this.playlist)

  constructor() { }

  setSingleSong(song: Music) {
    this.singleSong = song;
  }

  getSingleSong() {
    return this.singleSong;
  }

  setMultipleSongs(songs: Music[]) {
    this.playlist = songs
  }

  getMultipleSongs() {
    return this.playlist
  }

  clear() {
    this.singleSong = {
      base: {
        artist: '',
        featuring: '',
        genre: '',
        id: 0,
        path: '',
        title: '',
        uploaded_by: ''
      },
      url: ''
    }
    this.playlist = []
  }

  getObservableOfPlaylist() {
    return this.obs;
  }

}
