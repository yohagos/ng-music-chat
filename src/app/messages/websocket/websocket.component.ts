import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Message, WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit, OnDestroy {
  @Input() msgList!: Message[]
  @Input() receiver: string = ''

  form: FormGroup = new FormGroup({
    msg: new FormControl('')
  })

  constructor(
    public ws: WebsocketService,
    private router: Router,
    private alert: AlertService,
    ) {

    }

  ngOnInit(): void {
    this.ws.connect()
  }

  ngAfterViewInit() {
    this.ws.connect()
  }

  ngOnDestroy() {
    this.ws.close()
  }

  sendMessage() {
    let message = this.form.get('msg')?.value;
    if (message) {
      this.ws.sendMessage(this.receiver, message)
    } else {
      this.alert.open('Empty message')
    }
    this.form.setValue({'msg': ''})
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
