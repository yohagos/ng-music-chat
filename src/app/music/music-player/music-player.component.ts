import { Component, Input, OnInit } from '@angular/core';
import { MusicBase } from 'src/app/shared/models/music.model';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {
  @Input() musicList: MusicBase[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
