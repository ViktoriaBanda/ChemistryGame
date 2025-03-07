import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSelectComponent } from "./input-select/input-select.component";
import { NgScrollbarModule } from "ngx-scrollbar";
import { SafeHtmlPipe } from "./pipes/safe-html.pipe";

@NgModule({
  declarations: [
    InputSelectComponent,
    SafeHtmlPipe
  ],
  exports: [
    InputSelectComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
  ]
})
export class SharedModule { }
