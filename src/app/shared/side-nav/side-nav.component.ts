import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { Navitem } from "../models/navitems";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input()
  items?: Navitem[];

  constructor(private http: HttpClient) {  }

  ngOnInit(): void {

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

  public login() {
    let user = {username: 'admin', password: 'admin'}
    this.http.post('http://localhost:8000/login', user).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }

}
