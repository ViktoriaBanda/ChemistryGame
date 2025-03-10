import { Component, OnInit } from '@angular/core';
import { Chemical, ChemicalElement, ChemicalType, createReactionKey } from "../../../../core/models/chemistry.models";
import { ReactionBase } from "../../../reactionBase";
import { getChemicalName } from "../../../../core/utils/helpers";

@Component({
  selector: 'app-acids-with-alkali',
  templateUrl: './acids-with-oxides.component.html',
  styleUrls: ['./acids-with-oxides.component.scss']
})
export class AcidsWithOxidesComponent extends ReactionBase implements OnInit {
  oxides: ChemicalElement[] = [];

  constructor() {
    super();
    this.initializeReactions();
  }

  ngOnInit() {
    this.initializeData();
  }

  private initializeReactions() {
    this.reactions = new Map([
      [createReactionKey([Chemical.H2SO4, Chemical.MgO]), {
        hasReaction: true,
        color: 'rgb(240, 248, 255)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.CuO]), {
        hasReaction: true,
        color: 'rgba(0, 150, 255, 0.6)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.NiO]), {
        hasReaction: true,
        color: 'rgba(50, 180, 70, 0.6)',
      }],
    ]);
  }

  initializeData() {
    this.acids.shift();
    this.oxides = [
      {
        id: 8,
        chemical: Chemical.MgO,
        type: ChemicalType.OXIDE,
        color: 'rgba(255, 255, 255, 1)',
      },
      {
        id: 9,
        chemical: Chemical.CuO,
        type: ChemicalType.OXIDE,
        color: 'rgba(30, 30, 30, 1)',
      },
      {
        id: 10,
        chemical: Chemical.NiO,
        type: ChemicalType.OXIDE,
        color: 'rgba(150, 190, 120, 1)',
      }
    ];

    this.impacts = [
      {
        id: 11,
        chemical: Chemical.Temperature,
        type: ChemicalType.IMPACT
      },
    ];
  }

  protected readonly getChemicalName = getChemicalName;
  protected readonly ChemicalType = ChemicalType;
}
