import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacts, ContactsReq } from '../shared/models/contacts.model';
import { UserFull } from '../shared/models/user.model';
import { ApiService } from '../shared/services/api.service';
import { FunctionsService } from '../shared/services/functions.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  users: UserFull[] = []

  reqList: ContactsReq[] = []

  contacts: Contacts[] = []

  showContacts = false;

  constructor(private router: Router,
              private api: ApiService,
              private fs: FunctionsService) {
                this.getUserList()
                this.loadReqList()
                this.loadContacts()
              }

  ngOnInit(): void {
  }

  toProfile() {
    this.router.navigate(['/profile'])
  }

  logout() {
    this.fs.logout()
  }

  getUserList() {
    this.api.getRequest('users').subscribe(
      data => {
        this.users = data
      }
    )
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
      data => {
        console.log(data)
        this.contacts = data
      }
    )
  }

}
