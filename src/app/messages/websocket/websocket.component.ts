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
      console.log(this.msgList)
      this.ws.connect(this.msgList)
    } else {
      console.log(this.msgList)
      this.ws.connect()
    }
  }

  ngAfterViewInit() {
    console.log('after init')
    this.ws.connect()
  }

  ngOnDestroy() {
    console.log('destroy')
    this.ws.close()
  }

  sendMessage(message: string) {
    this.ws.sendMessage(this.receiver, message)
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
