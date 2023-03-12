import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatIconModule } from "@angular/material/icon";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";

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
