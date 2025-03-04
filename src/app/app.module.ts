import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChemistryGameComponent } from "./modules/chemistry-game/chemistry-game.component";
import { CommonModule } from "@angular/common";
import { InputSelectComponent } from "./modules/input-select/input-select.component";
import { NgScrollbarModule } from "ngx-scrollbar";

@NgModule({
  declarations: [
    AppComponent,
    ChemistryGameComponent,
    InputSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NgScrollbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
