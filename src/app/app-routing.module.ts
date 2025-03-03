import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChemistryGameComponent } from "./modules/chemistry-game/chemistry-game.component";

const routes: Routes = [
  {
    path: '',
    component: ChemistryGameComponent,
    children: [
      {
        path: 'acids',
        loadChildren: () => import('./modules/acids/acids.module').then(m => m.AcidsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
