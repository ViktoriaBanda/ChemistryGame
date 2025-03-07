import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSelectComponent } from "./input-select/input-select.component";
import { NgScrollbarModule } from "ngx-scrollbar";
import { SafeHtmlPipe } from "./pipes/safe-html.pipe";
import { MenuInputSelectComponent } from "./menu-input-select/menu-input-select.component";

@NgModule({
  declarations: [
    InputSelectComponent,
    MenuInputSelectComponent,
    SafeHtmlPipe
  ],
  exports: [
    InputSelectComponent,
    SafeHtmlPipe,
    MenuInputSelectComponent
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
  ]
})
export class SharedModule { }
