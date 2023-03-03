import { Component, OnInit, OnDestroy , Input, OnChanges, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { Message, WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit, OnDestroy {
  @Input() msgList!: Message[]
  @Input() receiver: string = ''
  message = ''

  constructor(
    public ws: WebsocketService,
    private router: Router
    ) {

    }

  ngOnInit(): void {
    console.log('websocket -> msg list : ', this.msgList)
    if (this.msgList) {
      console.log('connect with msglist')
      this.ws.connect(this.msgList)
    } else {
      console.log('connect without msg list')
      this.ws.connect()
    }
  }

  ngAfterViewInit() {
    this.ws.connect()
  }

  ngOnDestroy() {
    this.ws.close()
  }

  sendMessage(message: string) {
    this.ws.sendMessage(this.receiver, message)
  }

  toProfile() {
    this.router.navigate(['/profile'])
  }

}
