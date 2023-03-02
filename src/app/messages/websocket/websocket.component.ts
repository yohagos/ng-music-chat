import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit, OnDestroy {

  @Input() receiver: string = ''
  message = ''

  constructor(
    public ws: WebsocketService,
    private router: Router
    ) {
      this.ws.connect()
    }

  ngOnInit(): void {
  }

  sendMessage(message: string) {
    this.ws.sendMessage(this.receiver, message)
  }

  ngOnDestroy() {
    this.ws.close()
  }

  toProfile() {
    this.router.navigate(['/profile'])
  }

}
