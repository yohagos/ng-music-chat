import { Component, Input, OnInit } from '@angular/core';
import { Navitem } from "../models/navitems";

import { UsersService } from "../../core/api/v1/api/users.service";
import { ShowUser } from "../../core/api/v1/model/showUser";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input()
  items?: Navitem[];

  userList?: ShowUser[];

  constructor(private users: UsersService) {  }

  ngOnInit(): void {
    
  }

  public GetUserList() {
    this.users.getAllUsersUsersGet().subscribe(
      data => {
        console.log(data);
        this.userList = data;
      },
      error => {
        console.error(error)
      }
    )
  }

  public getHello() {
    this.users.getHelloUserHelloGet().subscribe(
      data => {
        console.log(data)
      }
    )
  }
}
