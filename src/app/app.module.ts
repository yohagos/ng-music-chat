import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MusicModule } from './music/music.module';
import { AppRoutingModule } from './app-routing.module';
import { MessagesModule } from "./messages/messages.module";
import { MaterialsModule } from './materials.module';

import { SignInComponent } from './main/sign-in/sign-in.component';
import { ProfileComponent } from './main/profile/profile.component';
import { HomeComponent } from './main/home/home.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { ToolbarComponent } from './main/toolbar/toolbar.component';

import { InterceptosService } from './shared/services/interceptos.service';
import { ErrorInterceptor } from './shared/services/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ProfileComponent,
    HomeComponent,
    SignUpComponent,
    ContactsComponent,
    NavbarComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MusicModule,
    SharedModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialsModule
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptosService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
