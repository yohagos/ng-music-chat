import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Route } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FunctionsService } from 'src/app/shared/services/functions.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnChanges{
  isSidenavOpen = this.functions.toggleNav.value;

  list: Route[] = []

  constructor(private functions: FunctionsService) {
    this.list = this.functions.getList()
  }

  ngOnChanges(changes: SimpleChanges) {
    changes['isSidenavOpen'].currentValue === true
  }
}
