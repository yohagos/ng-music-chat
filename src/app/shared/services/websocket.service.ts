import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { ApiService } from './api.service';

interface MessageData {
  message: string,
  time?: string
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$!: WebSocketSubject<any>
  public receivedData: MessageData[] = []

  constructor(
    private api: ApiService
  ) {  }

  public connect() {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(this.api.getBackendUrl() + '/msg/ws')
      this.socket$.subscribe(
        (data: MessageData) => {
          this.receivedData.push(data)
        }
      )
    }
  }

  sendMessage(message: string) {
    this.socket$.next({message})
  }

  close() {
    this.socket$.complete()
  }

}
