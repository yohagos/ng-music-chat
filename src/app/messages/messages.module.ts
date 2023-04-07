import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialsModule } from "../materials.module";

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
    MaterialsModule
  ],
  providers: [
  ]
})
export class MessagesModule { }
