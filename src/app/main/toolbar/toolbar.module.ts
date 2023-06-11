import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from './toolbar.component';
import { MusicComponent } from 'src/app/music/music.component';
import { MusicPlayerComponent } from 'src/app/music/music-player/music-player.component';
import { ContactsComponent } from 'src/app/contacts/contacts.component';
import { MessagesComponent } from 'src/app/messages/messages.component';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ProfileComponent } from '../profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ToolbarComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Home'
      },
      {
        path: 'signin',
        component: SignInComponent,
        title: 'Sign in'
      },
      {
        path: 'signup',
        component: SignUpComponent,
        title: 'Sign Up'
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService],
        title: 'Profile'
      },
      {
        path: 'songs',
        component: MusicComponent,
        canActivate: [AuthGuardService],
        title: 'Music'
      },
      {
        path: 'player',
        component: MusicPlayerComponent,
        canActivate: [AuthGuardService],
        title: 'Music Player'
      },
      {
        path: 'contact',
        component: ContactsComponent,
        canActivate: [AuthGuardService],
        title: 'Contacts'
      },
      {
        path: 'messages',
        component: MessagesComponent,
        canActivate: [AuthGuardService],
        title: 'Chat'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/profile',
    pathMatch: 'full'
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class ToolbarModule { }
