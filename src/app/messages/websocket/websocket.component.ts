import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit, OnDestroy {

  message = ''

  constructor(public ws: WebsocketService) {
    this.ws.connect()
  }

  ngOnInit(): void {
  }

  sendMessage(message: string) {
    this.ws.sendMessage(message)
  }

  ngOnDestroy() {
    this.ws.close()
  }

}
