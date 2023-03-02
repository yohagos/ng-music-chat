import { Component, OnInit, OnDestroy , Input, OnChanges, SimpleChanges} from '@angular/core';
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

    }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.ws.connect()
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
