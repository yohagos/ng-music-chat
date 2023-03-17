import { Component, OnChanges, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Event, NavigationStart, Router } from "@angular/router";

import { MusicBase, Music } from 'src/app/shared/models/music.model';

import { PlayerService } from 'src/app/shared/services/player.service';


@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css'],
})
export class MusicPlayerComponent implements OnInit, OnChanges {

  musicList: Music[] = [];

  music!: Music;

  audio = new Audio();
  musicLength: string = '0:00';
  duration: number = 1;
  currentTime: string = '0:00';

  constructor(
      public router: Router,
      private player: PlayerService
    ) {
    this.audio.ondurationchange = () => {
      const totalSeconds = Math.floor(this.audio.duration),
        duration = moment.duration(totalSeconds, 'seconds');
      this.musicLength =
        duration.seconds() < 10
          ? `${Math.floor(duration.asMinutes())}:
                          0${duration.seconds()}`
          : `${Math.floor(duration.asMinutes())}:
                          ${duration.seconds()}`;
      this.duration = totalSeconds;
    };

    this.audio.ontimeupdate = () => {
      const duration = moment.duration(
        Math.floor(this.audio.currentTime),
        'seconds'
      );
      this.currentTime =
        duration.seconds() < 10
          ? `${Math.floor(duration.asMinutes())}:
                          0${duration.seconds()}`
          : `${Math.floor(duration.asMinutes())}:
                          ${duration.seconds()}`;
    };

    if (this.player.playlist) {
      this.musicList = this.player.getMultipleSongs()
    } else {
      this.musicList.push(this.player.getSingleSong())
    }
  }

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationStart) {
          this.player.clear()
        }
      }
    )
  }

  displayedColumns: string[] = ['title', 'artist', 'album'];
  trackPointer: number = 0;
  currentMusic: Music = {
    base: {
      artist: '',
      title: '',
      genre: '',
      featuring: '',
      path: '',
      uploaded_by: '',
      id: 0
    },
    url: ''
  }

  play(index?: number): void {
    if (index !== undefined && index < this.musicList.length) {
        index = 0;
    }
    console.log('play function');
    if (index === undefined) {
      if (this.audio.paused) {
        if (this.audio.readyState === 0) {
          this.trackPointer = 0;
          this.currentMusic = this.musicList[0];
          this.audio.src = this.currentMusic.url;
        }
        this.audio.play();
      } else {
        this.audio.pause();
      }
    } else {
      this.trackPointer = index;
      this.currentMusic = this.musicList[index];
      this.audio.src = this.currentMusic.url;
      this.audio.play();
    }
  }

  prev(): void {
    this.trackPointer--;
    this.currentMusic = this.musicList[this.trackPointer];
    this.audio.src = this.currentMusic.url;
    this.audio.play();
  }

  next(): void {
    this.trackPointer++;
    this.currentMusic = this.musicList[this.trackPointer];
    this.audio.src = this.currentMusic.url;
    this.audio.play();
  }

  volumeSlider(event: any) {
    this.audio.volume = event.value / 16;
  }

  durationSlider(event: any) {
    this.audio.currentTime = event.value;
  }

  navigateToSongs() {
    this.router.navigate(['/songs'])
  }

}
