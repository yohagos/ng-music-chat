import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { IMenu } from './iMenu';


@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit{
  menuList!: Observable<IMenu[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.menuList = this.http.get<IMenu[]>('/assets/menu.json')
  }
}
