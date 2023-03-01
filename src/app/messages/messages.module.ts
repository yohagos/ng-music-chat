import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";

import { MessagesComponent } from "./messages.component";
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    MessagesComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule
  ]
})
export class MessagesModule { }
