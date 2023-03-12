import { Component, OnInit, OnDestroy , Input} from '@angular/core';
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
    if (this.msgList) {
      this.ws.connect(this.msgList)
    } else {
      this.ws.connect()
    }
  }

  ngAfterViewInit() {
    this.ws.connect()
  }

  ngOnDestroy() {
    this.ws.close()
  }

  sendMessage() {
    this.ws.sendMessage(this.receiver, this.message)
    this.message = ''
  }

  convertDateString(sendDate?: string) {
    if (sendDate) {
      let [dateComp, timeComp] = sendDate.split(' ')
      return timeComp
    }
    return ''
  }

  toProfile() {
    this.router.navigate(['/profile'])
  }

}
