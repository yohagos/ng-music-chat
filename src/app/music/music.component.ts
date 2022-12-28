import { Component, OnInit } from '@angular/core';
import { Navitem } from '../shared/models/navitems';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  navitemMusic: Navitem[] = [{label: "Player"}, {label: "Upload"}];

  constructor() { }

  ngOnInit(): void {
  }

}
