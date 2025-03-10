import { Component, OnInit } from '@angular/core';
import {
  Chemical,
  ChemicalElement,
  ChemicalType,
  createReactionKey,
} from "../../../../core/models/chemistry.models";
import { ReactionBase } from "../../../reactionBase";
import { getChemicalName } from "../../../../core/utils/helpers";

@Component({
  selector: 'app-acids-with-metals',
  templateUrl: './acids-with-metals.component.html',
  styleUrls: ['./acids-with-metals.component.scss']
})
export class AcidsWithMetalsComponent extends ReactionBase implements OnInit {
  metals: ChemicalElement[] = [];

  constructor() {
    super();
    this.initializeReactions();
  }

  ngOnInit() {
    this.initializeData();
  }

  private initializeReactions() {
    this.reactions = new Map([
      // HCl + металлы
      [createReactionKey([Chemical.HCl, Chemical.Mg]), {
        hasReaction: true,
        color: 'rgb(240, 248, 255)',
        hasGas: true,
        gas: {chemical: Chemical.H2, type: ChemicalType.GAS, color: 'rgb(240, 248, 255)'},
      }],
      [createReactionKey([Chemical.HCl, Chemical.Zn]), {
        hasReaction: true,
        color: 'rgb(240, 248, 255)',
        hasGas: true,
        gas: {chemical: Chemical.H2, type: ChemicalType.GAS, color: 'rgb(240, 248, 255)'},
      }],
      [createReactionKey([Chemical.HCl, Chemical.Cu]), {
        color: 'rgb(240, 248, 255)',
        hasPrecipitate: true,
        precipitate: {chemical: Chemical.Cu, type: ChemicalType.METAL, color: 'rgba(184, 115, 51, 1)'},
      }],

      // H2SO4 + металлы
      [createReactionKey([Chemical.H2SO4, Chemical.Mg]), {
        hasReaction: true,
        color: 'rgb(240, 248, 255)',
        hasGas: true,
        gas: {chemical: Chemical.H2, type: ChemicalType.GAS, color: 'rgb(240, 248, 255)'},
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.Zn]), {
        hasReaction: true,
        color: 'rgb(240, 248, 255)',
        hasGas: true,
        gas: {chemical: Chemical.H2, type: ChemicalType.GAS, color: 'rgb(240, 248, 255)'},
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.Cu]), {
        color: 'rgb(240, 248, 255)',
        hasPrecipitate: true,
        precipitate: {chemical: Chemical.Cu, type: ChemicalType.METAL, color: 'rgba(184, 115, 51, 1)'},
      }]
    ]);
  }

  initializeData() {
    this.metals = [
      {
        id: 8,
        chemical: Chemical.Mg,
        type: ChemicalType.METAL,
        color: 'rgba(169, 169, 169, 1)'
      },
      {
        id: 9,
        chemical: Chemical.Zn,
        type: ChemicalType.METAL,
        color: 'rgba(179, 179, 179, 1)',
      },
      {
        id: 10,
        chemical: Chemical.Cu,
        type: ChemicalType.METAL,
        color: 'rgba(184, 115, 51, 1)',
      }
    ];
  }

  protected readonly getChemicalName = getChemicalName;
}
