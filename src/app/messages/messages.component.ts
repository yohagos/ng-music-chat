import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacts } from '../shared/models/contacts.model';
import { MessageBase } from '../shared/models/message.model';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  showWebSocket = false

  msgList!: MessageBase[]
  contact!: string

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

  setMessageList(contact: string) {
    this.api.getRequestWithToken(`msg/${contact}`).subscribe(
      data => {
        this.msgList = data
        this.contact = contact
      },
      error => {
        console.log('error')
      }
    )
  }

  setReceiver(receiver: string) {
    this.contact = receiver
    this.showWebSocket = true
  }


}
