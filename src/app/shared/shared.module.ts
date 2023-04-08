import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { MaterialsModule } from "../materials.module";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [

  ],
  exports: [

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialsModule,
    RouterModule
  ]
})
export class SharedModule { }
