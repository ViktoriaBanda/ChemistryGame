import { Component, OnInit } from '@angular/core';
import {
  Chemical,
  ChemicalElement,
  ChemicalType,
  ContainerType,
  createReactionKey
} from "../../models/chemistry.models";
import { ReactionBase } from "../../../reactionBase";
import { getChemicalName } from "../../../../core/utils/helpers";

@Component({
  selector: 'app-acids-with-alkali',
  templateUrl: './acids-with-salts.component.html',
  styleUrls: ['./acids-with-salts.component.scss']
})
export class AcidsWithSaltsComponent extends ReactionBase implements OnInit {
  salts: ChemicalElement[] = [];

  constructor() {
    super();
    this.initializeReactions();
  }

  ngOnInit() {
    this.initializeData();
  }

  private initializeReactions() {
    this.reactions = new Map([
      // HCl
      [createReactionKey([Chemical.HCl, Chemical.CaCO3]), {
        hasReaction: true,
        color: 'rgba(255, 255, 255, 0.3)',
        description: 'Углекислый газ (CO2)',
        hasGas: true
      }],
      [createReactionKey([Chemical.HCl, Chemical.AgNO3]), {
        hasReaction: true,
        color: 'rgba(255, 255, 255, 0.3)',
        hasPrecipitate: true,
        precipitate: {chemical: Chemical.Zn, type: ChemicalType.METAL, color: 'rgba(255, 255, 255, 1)'},
      }],

      // H2SO4
      [createReactionKey([Chemical.H2SO4, Chemical.NaCl]), {
        hasReaction: false,
        color: 'rgba(255, 255, 255, 0.3)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.MgNO32]), {
        hasReaction: false,
        color: 'rgba(255, 255, 255, 0.3)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.Na2CO3]), {
        hasReaction: true,
        color: 'rgba(255, 255, 255, 0.3)',
        hasGas: true,
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.BaCl2]), {
        hasReaction: true,
        color: 'rgba(255, 255, 255, 0.3)',
        hasPrecipitate: true,
        precipitate: {chemical: Chemical.Cu, type: ChemicalType.METAL, color: 'rgba(255, 255, 255, 1)'},
      }]
    ]);
  }

  initializeData() {
    this.salts = [
      {
        id: 8,
        chemical: Chemical.NaCl,
        type: ChemicalType.SALT,
        color: 'rgba(255, 255, 255, 0.3)'
      },
      {
        id: 9,
        chemical: Chemical.MgNO32,
        type: ChemicalType.SALT,
        color: 'rgba(255, 255, 255, 0.3)'
      },
      {
        id: 10,
        chemical: Chemical.Na2CO3,
        type: ChemicalType.SALT,
        color: 'rgba(255, 255, 255, 0.3)'
      },
      {
        id: 11,
        chemical: Chemical.BaCl2,
        type: ChemicalType.SALT,
        color: 'rgba(255, 255, 255, 0.3)'
      },
      {
        id: 12,
        chemical: Chemical.CaCO3,
        type: ChemicalType.SALT,
        container: ContainerType.JAR,
        color: 'rgba(255, 255, 255, 0.3)'
      },
      {
        id: 13,
        chemical: Chemical.AgNO3,
        type: ChemicalType.SALT,
        color: 'rgba(255, 255, 255, 0.3)'
      },
    ];
  }

  protected readonly getChemicalName = getChemicalName;
}
