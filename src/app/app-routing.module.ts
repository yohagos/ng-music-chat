import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './main/home/home.component';
import { SignInComponent } from './main/sign-in/sign-in.component';
import { ProfileComponent } from './main/profile/profile.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { MusicComponent } from './music/music.component';
import { MusicPlayerComponent } from "./music/music-player/music-player.component";
import { ContactsComponent } from "./contacts/contacts.component";

import { AuthGuardService } from './shared/services/auth-guard.service';
import { MessagesComponent } from './messages/messages.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  getRoutingList() {
    const list = routes.filter((route) => route.canActivate != null)
    return list;
  }
}
