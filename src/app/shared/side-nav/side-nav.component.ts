import { ShowUser } from './../../core/api/v1/model/showUser';
import { Component, Input, OnInit } from '@angular/core';
import { Navitem } from "../models/navitems";

import { UsersService } from "../../core/api/v1/api/users.service";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input()
  items?: Navitem[];

  constructor(private users: UsersService) {  }

  ngOnInit(): void {
  }

  public GetUserList() {
    this.users.getAllUsersUsersGet().subscribe(data => {
      console.log(data);
    })
  }
}
