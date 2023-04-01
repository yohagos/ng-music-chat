import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatIconModule } from "@angular/material/icon";

import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";

import { MessagesComponent } from "./messages.component";
import { WebsocketComponent } from './websocket/websocket.component';

@NgModule({
  declarations: [
    MessagesComponent,
    WebsocketComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [
  ]
})
export class MessagesModule { }
