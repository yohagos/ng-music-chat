import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output() toggleSidenavEvent = new EventEmitter<void>();

  constructor(private router: Router) {

  }

  toggleSidenav() {
    this.toggleSidenavEvent.emit();
  }

  toLogin() {
    this.router.navigate(['/signin'])
  }

}
