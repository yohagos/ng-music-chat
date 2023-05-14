import { Component, OnChanges, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Event, NavigationStart, Router } from "@angular/router";

import { Music } from 'src/app/shared/models/music.model';
import { PlayerService } from 'src/app/shared/services/player.service';


@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css'],
})
export class MusicPlayerComponent implements OnInit, OnChanges, OnDestroy {

  musicList: Music[] = [];

  audio = new Audio();
  musicLength: string = '0:00';
  duration: number = 1;
  currentTime: string = '0:00';
  volume: number = 16;

  loading = this.player.getObservableOfPlaylist();

  displayedColumns: string[] = ['title', 'artist'];
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
  currentTotalSeconds!: number;
  currentDuration!: moment.Duration

  constructor(
      public router: Router,
      private player: PlayerService
    ) {
    this.audio.ondurationchange = () => {
      const totalSeconds = Math.floor(this.audio.duration),
        duration = moment.duration(totalSeconds, 'seconds');
      this.currentTotalSeconds = totalSeconds;
      this.currentDuration = duration
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
  }

  ngOnInit(): void {
    if (this.player.playlist) {
      this.musicList = this.player.getMultipleSongs()
    } else {
      this.musicList.push(this.player.getSingleSong())
    }
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

  async ngOnDestroy() {
    this.audio.pause()
  }

  play(): void {
    let index = 0;

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
    this.trackPointer = this.trackPointer--
    if (this.trackPointer > 0) {
      this.trackPointer = this.musicList.length - 1
    }
    this.currentMusic = this.musicList[this.trackPointer];
    this.audio.src = this.currentMusic.url;
    this.audio.play();
  }

  next(): void {
    this.trackPointer = this.trackPointer++
    let currentIndex = this.trackPointer;
    if (currentIndex > this.musicList.length) {
      this.trackPointer = 0
    } else {
      this.currentMusic = this.musicList[this.trackPointer];
      this.audio.src = this.currentMusic.url;
      this.audio.play();
    }
  }

  volumeSlider(event: any) {
    this.audio.volume = event.value / 16;
  }

  durationSlider(event: any) {
    console.log(event.value)
    this.audio.currentTime = event.value * 60;
  }

  navigateToSongs() {
    this.ngOnDestroy()
    this.router.navigate(['/songs'])
  }

}
