import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MessageBase } from 'src/app/shared/models/message.model';

import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() msgList!: MessageBase[]
  @Input() receiver!: string

  message = new FormControl('')

  constructor(
    private api: ApiService
  ) {

  }

  ngOnInit(): void {
    if (this.msgList?.length > 0) {
      this.msgList.forEach(
        msg => {
          console.log(msg.sender, ' ', msg.receiver, ' ', msg.text)
        }
      )
    }
  }

  sendMessage() {
    let body = {
      'receiver': this.receiver,
      'text': this.message.value
    }

    this.api.postRequestWithToken('msg', body).subscribe(
      data => {
        this.message.setValue('')
      }
    )

    this.reloadMsgList()
  }

  reloadMsgList() {
    this.api.getRequestWithToken(`msg/${this.receiver}`).subscribe(
      data => {
        console.log(data)
        this.msgList = data
      },
      error => {
        console.log('error')
      }
    )
  }

}
