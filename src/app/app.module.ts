import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChemistryGameComponent } from "./modules/chemistry-game/chemistry-game.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    ChemistryGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
