import { Component, Input } from '@angular/core';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() isSidenavOpen = false;

  constructor(private authService: AuthService) {}

  get isLoggedIn() {
    if (this.authService.getToken()) {
      return true
    }
    return false
  }
}
