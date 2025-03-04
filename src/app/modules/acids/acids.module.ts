import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcidsRoutingModule } from './acids-routing.module';
import { AcidsWithIndicatorsComponent } from './components/acids-with-indicators/acids-with-indicators.component';
import { AcidsWithMetalsComponent } from './components/acids-with-metals/acids-with-metals.component';
import { AcidsWithBasesComponent } from './components/acids-with-bases/acids-with-bases.component';
import { ReactionResultComponent } from './components/reaction-result/reaction-result.component';
import { ChemicalContainerComponent } from './components/chemical-container/chemical-container.component';
import { AcidsWithOxidesComponent } from "./components/acids-with-oxides/acids-with-oxides.component";
import { AcidsWithSaltsComponent } from "./components/acids-with-salts/acids-with-salts.component";

@NgModule({
  declarations: [
    AcidsWithIndicatorsComponent,
    AcidsWithMetalsComponent,
    AcidsWithBasesComponent,
    ReactionResultComponent,
    ChemicalContainerComponent,
    AcidsWithOxidesComponent,
    AcidsWithSaltsComponent
  ],
  imports: [
    CommonModule,
    AcidsRoutingModule
  ]
})
export class AcidsModule { }
