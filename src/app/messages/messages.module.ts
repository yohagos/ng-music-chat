import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";

import { MessagesComponent } from "./messages.component";

@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule
  ]
})
export class MessagesModule { }
