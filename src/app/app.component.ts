import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuService } from './shared/services/menu.service';

interface MenuItem {
  label: string;
  action: () => void;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuItems!: MenuItem[];

  constructor(private router: Router, private menuService: MenuService ) {
    this.menuService.getData().subscribe( value => {
        this.menuItems = value as MenuItem[]
      }
    );

    this.router.events.subscribe(value => {
      if (value instanceof NavigationEnd) {
        if (value.url == '/home') {
          this.menuItems = [
            { label: 'Sign up', action: () => { this.router.navigate(['/signup']) } },
            { label: 'Sign in', action: () => { this.router.navigate(['/signin']) } },
          ];
        }
      }
    })
  }


}

