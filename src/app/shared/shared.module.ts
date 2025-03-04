import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSelectComponent } from "./input-select/input-select.component";
import { NgScrollbarModule } from "ngx-scrollbar";

@NgModule({
  declarations: [
    InputSelectComponent
  ],
  exports: [
    InputSelectComponent
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
  ]
})
export class SharedModule { }
