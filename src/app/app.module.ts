import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChemistryGameComponent } from "./modules/chemistry-game/chemistry-game.component";
import { CommonModule } from "@angular/common";
import { InputSelectComponent } from "./shared/input-select/input-select.component";
import { NgScrollbarModule } from "ngx-scrollbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    ChemistryGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
