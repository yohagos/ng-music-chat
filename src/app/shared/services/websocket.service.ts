import { Injectable } from '@angular/core';
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
  private socket$!: WebSocketSubject<any>
  public receivedData: Message[] = []

  constructor(
    private api: ApiService,
    private interceptor: InterceptosService
  ) {  }

  public connect(data?: Message[]) {
    if (data) this.addReceivedData(data)

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

  addReceivedData(data: Message[]) {
    data = data.sort((a, b) => (a.send_date > b.send_date) ? 1 : -1)
    this.receivedData = data
  }

  sendMessage(receiver: string, text: string) {
    let sender = this.interceptor.getUsername()
    this.socket$.next({sender, receiver, text})
  }

  close() {
    this.socket$.closed = true
  }

}
