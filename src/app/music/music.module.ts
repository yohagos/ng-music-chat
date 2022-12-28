import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { MusicComponent } from './music.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: MusicComponent
  }
]

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
    RouterModule.forChild(routes)
  ]
})
export class MusicModule {

}
