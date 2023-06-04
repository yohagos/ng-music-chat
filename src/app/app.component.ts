import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

interface MenuItem {
  label: string;
  icon?: string;
  action: () => void;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isSidenavOpen = false;

  loggedIn = false

  constructor(private authService: AuthService) { }

  get isLoggedIn() {
    return this.authService.isLoggedIn()
  }

}
