import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcidsRoutingModule } from './acids-routing.module';
import { AcidsWithIndicatorsComponent } from './components/acids-with-indicators/acids-with-indicators.component';
import { AcidsWithMetalsComponent } from './components/acids-with-metals/acids-with-metals.component';
import { AcidsWithBasesComponent } from './components/acids-with-bases/acids-with-bases.component';
import { ReactionResultComponent } from './components/reaction-result/reaction-result.component';
import { ChemicalContainerComponent } from './components/chemical-container/chemical-container.component';

@NgModule({
  declarations: [
    AcidsWithIndicatorsComponent,
    AcidsWithMetalsComponent,
    AcidsWithBasesComponent,
    ReactionResultComponent,
    ChemicalContainerComponent
  ],
  imports: [
    CommonModule,
    AcidsRoutingModule
  ]
})
export class AcidsModule { } 