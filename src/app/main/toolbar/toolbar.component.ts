import { Component, EventEmitter, Output } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FunctionsService } from 'src/app/shared/services/functions.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  loggedIn = false

  showFiller=false

  constructor(private router: Router, private functions: FunctionsService, private authService: AuthService) {
    this.isLoggedIn()
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn()
      }
    })
  }

  toggleSidenav() {
    this.functions.toggleSideNav()
  }

  toLogin() {
    this.router.navigate(['/signin'])
  }

  toSignUp() {
    this.router.navigate(['/signup'])
  }

  isLoggedIn() {
    this.loggedIn = this.authService.isLoggedIn()
  }

  logout() {
    this.authService.clearStorage()
    this.router.navigate(['/'])
  }

  toggle(draw: MatSidenav | undefined) {
    if (draw ) {
      draw.toggle()
    }
  }

}
