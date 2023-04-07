import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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

import { InterceptosService } from './shared/services/interceptos.service';
import { GlobalErrorHandlerService } from "./shared/services/global-error-handler.service";


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
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
