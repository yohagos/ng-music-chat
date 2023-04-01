import { Injectable, Input } from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

import { ApiService } from './api.service';
import { InterceptosService } from './interceptos.service';

export interface Message {
  sender: string
  receiver: string
  text: string
  send_date: string
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  contact = ''

  private socket$!: WebSocketSubject<any>
  public receivedData: Message[] = []

  constructor(
    private api: ApiService,
    private interceptor: InterceptosService
  ) {  }

  async connect() {
   await this.loadData()

    if (!this.socket$ || this.socket$.closed) {
      let url = this.api.getUrlWebSocket() + '/msg/ws'
      this.socket$ = webSocket(url)
      this.socket$.subscribe(
        (data: Message) => {
          this.receivedData.push(data)
        }
      )
    }
  }

  loadData() {
    this.api.getRequestWithToken(`msg/${this.contact}`).subscribe(
      (data) => {
        this.receivedData = data;
      },
    )
  }

  getTimeStamp() {
    let timestamp =new Date()
    return timestamp.toISOString().replace('T', ' ').replace('Z', '');
  }

  addReceivedData(data: Message[]) {
    this.receivedData = []
    data = data.sort((a, b) => (a.send_date > b.send_date) ? 1 : -1)
    this.receivedData = data
  }

  sendMessage(receiver: string, text: string) {
    let sender = this.interceptor.getUsername()
    let send_date = this.getTimeStamp()
    this.socket$.next({sender, receiver, text, send_date})
  }

  setContact(con: string) {
    this.contact = con
  }

  close() {
    this.socket$.closed = true
  }

}
