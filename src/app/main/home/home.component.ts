import { ApiService } from 'src/app/shared/services/api.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  file!: File;

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

  formdata() {
    this.api.postForm()
  }

  change(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0]
  }

  files() {
    this.api.postFiles(this.file).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    );
  }

}
