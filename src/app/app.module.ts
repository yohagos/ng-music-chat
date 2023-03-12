import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyCardModule as MatCardModule } from "@angular/material/legacy-card";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyChipsModule as MatChipsModule } from "@angular/material/legacy-chips";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatDividerModule } from "@angular/material/divider";
import { MatLegacySliderModule as MatSliderModule } from "@angular/material/legacy-slider";


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
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatSliderModule,
    MatToolbarModule,
    MatChipsModule
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
