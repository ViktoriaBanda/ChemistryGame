import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcidsWithIndicatorsComponent } from './components/acids-with-indicators/acids-with-indicators.component';
import { AcidsWithMetalsComponent } from './components/acids-with-metals/acids-with-metals.component';
import { AcidsWithAlkaliComponent } from './components/acids-with-alkali/acids-with-alkali.component';
import { AcidsWithOxidesComponent } from "./components/acids-with-oxides/acids-with-oxides.component";
import { AcidsWithSaltsComponent } from "./components/acids-with-salts/acids-with-salts.component";

const routes: Routes = [
  { path: 'indicators', component: AcidsWithIndicatorsComponent },
  { path: 'metals', component: AcidsWithMetalsComponent },
  { path: 'oxides', component: AcidsWithOxidesComponent },
  { path: 'alkali', component: AcidsWithAlkaliComponent },
  { path: 'salts', component: AcidsWithSaltsComponent },
  { path: '', redirectTo: 'indicators', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcidsRoutingModule { }
