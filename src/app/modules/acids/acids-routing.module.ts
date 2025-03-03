import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcidsWithIndicatorsComponent } from './components/acids-with-indicators/acids-with-indicators.component';
import { AcidsWithMetalsComponent } from './components/acids-with-metals/acids-with-metals.component';
import { AcidsWithBasesComponent } from './components/acids-with-bases/acids-with-bases.component';

const routes: Routes = [
  { path: 'indicators', component: AcidsWithIndicatorsComponent },
  { path: 'metals', component: AcidsWithMetalsComponent },
  { path: 'bases', component: AcidsWithBasesComponent },
  { path: '', redirectTo: 'indicators', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcidsRoutingModule { } 