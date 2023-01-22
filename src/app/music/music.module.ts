import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { MusicComponent } from './music.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MusicPlayerComponent,
    MusicComponent
  ],
  exports: [
    MusicPlayerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class MusicModule {

}
