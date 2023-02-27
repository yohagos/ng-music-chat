import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Contacts, ContactsReq } from '../shared/models/contacts.model';
import { UserFull } from '../shared/models/user.model';
import { ApiService } from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';
import { InterceptosService } from '../shared/services/interceptos.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  users: UserFull[] = []

  reqList!: ContactsReq[]

  contacts: Contacts[] = []

  showContacts = false;


  constructor(private router: Router,
              private api: ApiService,
              private auth: AuthService,
              private ic: InterceptosService) {
                this.loadReqList()
                this.loadContacts()
              }

  ngOnInit(): void {
  }

  toProfile() {
    this.router.navigate(['/profile'])
  }

  logout() {
    this.auth.clearStorage();
    this.router.navigate(['/signin']);
  }

  loadReqList() {
    this.api.getRequestWithToken('contacts/req_list').subscribe(
      data => {
        this.reqList = data
      }
    )
  }

  loadContacts() {
    this.api.getRequestWithToken('contacts/contacts').subscribe(
      (data) => {
        this.contacts = data
        this.getUserList()
      }
    )
  }

  getUserList() {
    this.api.getRequest('users').subscribe(
      data => {
        this.users = data
        console.log('length ', this.users.length)
        this.users.forEach((element, index) => {
          if (element.username == this.ic.getUsername()) this.users.splice(index, 1)
        })
        this.users.forEach((element, index) => {
          for (let i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].contact == element.username) this.users.splice(index, 1)
          }
        })
      }
    )
  }

  acceptRequest(id: number) {
    console.log(id)
  }

  deleteRequest(id: number) {
    console.log(id)
  }

}
