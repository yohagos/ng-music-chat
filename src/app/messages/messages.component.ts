import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacts } from '../shared/models/contacts.model';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  contactList: Contacts[] = [];

  constructor(
    private router: Router,
    private api: ApiService
    ) {
      this.loadContacts()
    }

  ngOnInit(): void {
  }

  toProfile() {
    this.router.navigate(['/profile'])
  }

  loadContacts() {
    this.api.getRequestWithToken('contacts/contacts').subscribe(
      data => {
        this.contactList = data
      }
    )
  }


}
