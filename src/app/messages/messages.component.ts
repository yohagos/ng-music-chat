import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Contacts } from '../shared/models/contacts.model';

import { Message, WebsocketService } from '../shared/services/websocket.service';
import { ApiService } from '../shared/services/api.service';
import { WebsocketComponent } from './websocket/websocket.component';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  showWebSocket = false

  msgList!: Message[]
  contact!: string

  contactList: Contacts[] = [];

  constructor(
    private router: Router,
    private api: ApiService,
    private wsService: WebsocketService
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
