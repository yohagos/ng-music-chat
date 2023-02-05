import { ApiService } from 'src/app/shared/services/api.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private api: ApiService) { }

  ngOnInit(): void {
  }

  signIn() {
    this.router.navigate(['/signin']);
  }

  signUp() {
    this.router.navigate(['/signup']);
  }

}
