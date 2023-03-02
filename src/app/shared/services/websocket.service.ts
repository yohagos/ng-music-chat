import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

import { ApiService } from './api.service';
import { InterceptosService } from './interceptos.service';

interface Message {
  sender: string
  receiver: string
  text: string
  send_time?: string
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$!: WebSocketSubject<any>
  public receivedData: Message[] = []

  /*
    Need one subscribtion to a service to load
    the messages between to users
  */

  constructor(
    private api: ApiService,
    private interceptor: InterceptosService
  ) {  }

  public connect() {
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

  sendMessage(receiver: string, text: string) {
    let sender = this.interceptor.getUsername()
    this.socket$.next({sender, receiver, text})
  }

  close() {
    this.socket$.closed = true
  }

}
