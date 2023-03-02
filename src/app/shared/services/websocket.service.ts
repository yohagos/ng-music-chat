import { Injectable, Input } from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { InterceptosService } from './interceptos.service';

/* interface MessageData {
  message: string,
  time?: string
} */

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

  constructor(
    private api: ApiService,
    private interceptor: InterceptosService
  ) {  }

  public connect() {
    if (!this.socket$ || this.socket$.closed) {
      let url = this.api.getUrlWebSocket() + '/msg/ws'
      console.log(url)
      this.socket$ = webSocket(url)
      this.socket$.subscribe(
        (data: Message) => {
          this.receivedData.push(data)
        }
      )
    }
  }

  sendMessage(receiver: string, message: string) {
    let sender = this.interceptor.getUsername()
    this.socket$.next({sender, receiver, message})
  }

  close() {
    this.socket$.complete()
  }

}
