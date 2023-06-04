import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Contacts, ContactsReq } from '../shared/models/contacts.model';
import { UserFull } from '../shared/models/user.model';

import { ApiService } from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';
import { InterceptosService } from '../shared/services/interceptos.service';
import { MenuService } from '../shared/services/menu.service';

interface MenuItem {
  label: string;
  icon?: string;
  action: () => void;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements AfterViewInit {
  menu!: MenuItem[];

  users: UserFull[] = [];

  reqList!: ContactsReq[];

  contacts: Contacts[] = [];
  contactInfo!: UserFull;

  showContact = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthService,
    private ic: InterceptosService,
    private menuService: MenuService
  ) {
    this.loadReqList();
    this.loadContacts();
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
          label: 'Messages',
          icon: 'message',
          action: () => {
            this.router.navigate(['/messages']);
          },
        }
      ];
      this.menuService.setMenu(this.menu);
    });
  }

  loadReqList() {
    this.api.getRequestWithToken('contacts/req_list').subscribe((data) => {
      this.reqList = data;
    });
  }

  loadContacts() {
    this.api.getRequestWithToken('contacts/contacts').subscribe((data) => {
      this.contacts = data;
      this.getUserList();
    });
  }

  getUserList() {
    this.api.getRequest('users').subscribe((data) => {
      this.users = data;
      this.users.forEach((element, index) => {
        if (element.username == this.ic.getUsername())
          this.users.splice(index, 1);
      });
      this.users.forEach((element, index) => {
        for (let i = 0; i < this.contacts.length; i++) {
          if (this.contacts[i].contact == element.username)
            this.users.splice(index, 1);
        }
      });
    });
  }

  createRequest(newContact: string) {
    let body = {
      requested: newContact,
    };

    this.api.postRequestWithToken('contacts/create', body).subscribe();
  }

  acceptRequest(id: number) {
    this.api.postRequestWithToken(`contacts/accepts/${id}`).subscribe(() => {
      this.loadReqList();
      this.loadContacts();
    });
  }

  declineRequest(id: number) {
    this.api
      .deleteRequestWithToken(`contacts/decline/${id}`)
      .subscribe((data) => {
        this.loadReqList();
      });
  }

  deleteContact(id: number) {
    this.api
      .deleteRequestWithToken(`contacts/delete/${id}`)
      .subscribe((data) => {
        this.loadContacts();
      });
  }

  showContactInfo(name: string) {
    this.api.getRequestWithToken(`contacts/${name}`).subscribe((data) => {
      this.showContact = true;
      this.contactInfo = data;
    });
  }

  clearContactInfo() {
    this.contactInfo = new UserFull();
    this.showContact = false;
  }
}
