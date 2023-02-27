import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './main/login/login.component';
import { ProfileComponent } from './main/profile/profile.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { MusicComponent } from './music/music.component';
import { MusicPlayerComponent } from "./music/music-player/music-player.component";
import { ContactsComponent } from "./contacts/contacts.component";

import { AuthGuardService } from './shared/services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'songs',
    component: MusicComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'player',
    component: MusicPlayerComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'contact',
    component: ContactsComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
