import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MusicModule } from './music/music.module';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './main/login/login.component';
import { ProfileComponent } from './main/profile/profile.component';
import { InterceptosService } from './services/interceptos.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MusicModule,
    SharedModule,
    AppRoutingModule
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
