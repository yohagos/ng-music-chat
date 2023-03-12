import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { MusicComponent } from './music.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatDividerModule } from "@angular/material/divider";
import { MatLegacySliderModule as MatSliderModule } from "@angular/material/legacy-slider";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";


@NgModule({
  declarations: [
    MusicPlayerComponent,
    MusicComponent
  ],
  exports: [
    MusicPlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatSliderModule,
    MatToolbarModule
  ]
})
export class MusicModule {

}
