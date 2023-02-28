import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { MatSliderModule } from "@angular/material/slider";


import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MusicModule } from './music/music.module';
import { AppRoutingModule } from './app-routing.module';
import { MessagesModule } from "./messages/messages.module";

import { SignInComponent } from './main/sign-in/sign-in.component';
import { ProfileComponent } from './main/profile/profile.component';
import { InterceptosService } from './shared/services/interceptos.service';
import { HomeComponent } from './main/home/home.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { ContactsComponent } from './contacts/contacts.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ProfileComponent,
    HomeComponent,
    SignUpComponent,
    ContactsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MusicModule,
    SharedModule,
    AppRoutingModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatSliderModule,
    MatToolbarModule
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptosService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
