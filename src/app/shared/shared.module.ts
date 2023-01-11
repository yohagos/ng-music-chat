import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    SideNavComponent
  ],
  exports: [
    SideNavComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule { }
