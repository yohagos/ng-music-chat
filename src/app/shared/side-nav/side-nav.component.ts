import { Component, Input, OnInit } from '@angular/core';
import { Navitem } from "../models/navitems";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input()
  items?: Navitem[];

  constructor() {  }

  ngOnInit(): void {
  }


}
