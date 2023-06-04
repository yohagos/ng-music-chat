import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Contacts } from '../shared/models/contacts.model';

import { Message, WebsocketService } from '../shared/services/websocket.service';
import { ApiService } from '../shared/services/api.service';
import { MenuService } from '../shared/services/menu.service';
import { AuthService } from '../shared/services/auth.service';

interface MenuItem {
  label: string;
  icon?: string;
  action: () => void;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements AfterViewInit {
  menu!: MenuItem[]

  showWebSocket = false

  msgList!: Message[]
  contact!: string

  contactList: Contacts[] = [];

  constructor(
    private router: Router,
    private api: ApiService,
    private wsService: WebsocketService,
    private menuService: MenuService,
    private auth: AuthService
    ) {
      this.loadContacts()
    }

    ngAfterViewInit() {
      this.loadMenu();
    }

    loadMenu() {
      setTimeout(() => {
        this.menu = [
          {
            label: 'Profile',
            icon: 'supervised_user_circle',
            action: () => {
              this.router.navigate(['/profile']);
            },
          },
          {
            label: 'Songs',
            icon: 'music_video',
            action: () => {
              this.router.navigate(['/songs']);
            },
          },
          {
            label: 'Contacts',
            icon: 'contacts',
            action: () => {
              this.router.navigate(['/contact']);
            },
          }
        ];
        this.menuService.setMenu(this.menu);
      });
    }

  loadContacts() {
    this.api.getRequestWithToken('contacts/contacts').subscribe(
      data => {
        this.contactList = data
      }
    )
  }

  setMessageList(contact: string) {
    this.api.getRequestWithToken(`msg/${contact}`).subscribe(
      data => {
        this.msgList = data
      }
    )
  }

  setReceiver(receiver: string) {
    this.msgList = []
    this.contact = receiver
    this.setMessageList(receiver)

    setTimeout(() => {
      this.wsService.setContact(receiver)
      this.wsService.addReceivedData(this.msgList)
      this.showWebSocket = true
    }, 100);
  }
}
