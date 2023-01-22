import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(private auth: AuthService,
              private api: ApiService, ) { }

  ngOnInit(): void {

  }

  test_jwt() {
    this.api.getRequest('music/all').subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }


}
