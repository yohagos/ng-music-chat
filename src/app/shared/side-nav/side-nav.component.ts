import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Navitem } from "../models/navitems";
import { UsersService } from "../../core/api/v1/api/users.service";
import { ShowUser } from "../../core/api/v1/model/showUser";
import { AuthenticationService } from "../../core/api/v1/api/authentication.service";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input()
  items?: Navitem[];

  userList?: ShowUser[];

  username: string = '';
  password: string = '';

  constructor(private users: UsersService,
              private http: HttpClient,
              private auth: AuthenticationService) {  }

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

  public GetUserListReq() {
    this.http.get('http://localhost:8000/users').subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }

  public Auth() {
    this.auth.loginLoginPost(this.username, this.password).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }

  
}
