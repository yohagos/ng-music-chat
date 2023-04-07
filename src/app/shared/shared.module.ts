import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { MaterialsModule } from "../materials.module";
import { RouterModule } from "@angular/router";

import { FooterComponent } from './navigation/footer/footer.component';
import { HeaderComponent } from './navigation/header/header.component';
import { MainShellComponent } from './navigation/main-shell/main-shell.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { SidenavbarComponent } from './navigation/sidenavbar/sidenavbar.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    MainShellComponent,
    SidebarComponent,
    SidenavbarComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    MainShellComponent,
    SidebarComponent,
    SidenavbarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialsModule,
    RouterModule
  ]
})
export class SharedModule { }
