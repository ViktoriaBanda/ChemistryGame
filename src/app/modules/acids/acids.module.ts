import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcidsRoutingModule } from './acids-routing.module';
import { AcidsWithIndicatorsComponent } from './components/acids-with-indicators/acids-with-indicators.component';
import { AcidsWithMetalsComponent } from './components/acids-with-metals/acids-with-metals.component';
import { ReactionResultComponent } from '../reaction-result/reaction-result.component';
import { ChemicalContainerComponent } from '../chemical-container/chemical-container.component';
import { AcidsWithSaltsComponent } from "./components/acids-with-salts/acids-with-salts.component";
import { SharedModule } from "../../shared/shared.module";
import { AcidsWithOxidesComponent } from "./components/acids-with-oxides/acids-with-oxides.component";
import { AcidsWithAlkaliComponent } from "./components/acids-with-alkali/acids-with-alkali.component";

@NgModule({
  declarations: [
    AcidsWithIndicatorsComponent,
    AcidsWithMetalsComponent,
    ReactionResultComponent,
    ChemicalContainerComponent,
    AcidsWithSaltsComponent,
    AcidsWithOxidesComponent,
    AcidsWithAlkaliComponent
  ],
  imports: [
    CommonModule,
    AcidsRoutingModule,
    SharedModule,
  ]
})
export class AcidsModule { }
