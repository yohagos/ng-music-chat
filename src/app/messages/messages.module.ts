import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";

import { MessagesComponent } from "./messages.component";
import { ChatComponent } from "./chat/chat.component";

@NgModule({
  declarations: [
    MessagesComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatIconModule,
    MatInputModule,
    MatListModule
  ],
  providers: [
  ]
})
export class MessagesModule { }
