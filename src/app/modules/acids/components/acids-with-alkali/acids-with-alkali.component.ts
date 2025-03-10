import { Component, OnInit } from '@angular/core';
import {
  Chemical,
  ChemicalElement,
  ChemicalType,
  ContainerType,
  createReactionKey
} from "../../../../core/models/chemistry.models";
import { ReactionBase } from "../../../reactionBase";
import { getChemicalName } from "../../../../core/utils/helpers";

@Component({
  selector: 'app-acids-with-alkali',
  templateUrl: './acids-with-alkali.component.html',
  styleUrls: ['./acids-with-alkali.component.scss']
})
export class AcidsWithAlkaliComponent extends ReactionBase implements OnInit {
  alkalis: ChemicalElement[] = [];

  constructor() {
    super();
    this.initializeReactions();
  }

  ngOnInit() {
    this.reagentsCount = 3;
    this.reagentsCountWithoutAdditions = 2;
    this.initializeData();
  }

  private initializeReactions() {
    this.reactions = new Map([
      // H2SO4 + индикаторы
      [createReactionKey([Chemical.H2SO4, Chemical.LITMUS]), {
        hasReaction: true,
        hasReactionWithIndicator: true,
        color: 'rgba(220, 20, 60, 0.6)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.METHYL_ORANGE]), {
        hasReaction: true,
        hasReactionWithIndicator: true,
        color: 'rgba(220, 20, 60, 0.6)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.PHENOLPHTHALEIN]), {
        hasReaction: true,
        hasReactionWithIndicator: true,
        color: 'rgb(240, 248, 255)',
      }],
      // Основания + Индикаторы
      [createReactionKey([Chemical.NaOH, Chemical.LITMUS]), {
        hasReaction: true,
        hasReactionWithIndicator: true,
        color: 'rgba(0, 0, 255, 0.6)',
      }],
      [createReactionKey([Chemical.NaOH, Chemical.METHYL_ORANGE]), {
        hasReaction: true,
        hasReactionWithIndicator: true,
        color: 'rgba(255, 255, 0, 0.6)',
      }],
      [createReactionKey([Chemical.NaOH, Chemical.PHENOLPHTHALEIN]), {
        hasReaction: true,
        hasReactionWithIndicator: true,
        color: 'rgba(255, 0, 255, 0.6)',
      }],
      // H2SO4 + основания
      [createReactionKey([Chemical.H2SO4, Chemical.NaOH]), {
        hasReaction: true,
        color: 'rgb(240, 248, 255)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.MgOH2]), {
        hasReaction: true,
        color: 'rgb(240, 248, 255)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.CuOH2]), {
        hasReaction: true,
        color: 'rgba(0, 150, 255, 0.6)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.NiOH2]), {
        hasReaction: true,
        color: 'rgba(50, 180, 70, 0.6)',
      }],
      // H2SO4 + основания + индикаторы
      [createReactionKey([Chemical.H2SO4, Chemical.NaOH, Chemical.LITMUS]), {
        hasReaction: true,
        color: 'rgba(138, 43, 226, 0.6)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.NaOH, Chemical.METHYL_ORANGE]), {
        hasReaction: true,
        color: 'rgba(255, 165, 0, 0.6)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.NaOH, Chemical.PHENOLPHTHALEIN]), {
        hasReaction: true,
        color: 'rgb(240, 248, 255)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.MgOH2, Chemical.LITMUS]), {
        hasReaction: true,
        color: 'rgb(240, 248, 255)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.MgOH2, Chemical.METHYL_ORANGE]), {
        hasReaction: true,
        color: 'rgb(240, 248, 255)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.MgOH2, Chemical.PHENOLPHTHALEIN]), {
        hasReaction: true,
        color: 'rgb(240, 248, 255)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.CuOH2, Chemical.LITMUS]), {
        hasReaction: true,
        color: 'rgba(0, 150, 255, 0.6)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.CuOH2, Chemical.METHYL_ORANGE]), {
        hasReaction: true,
        color: 'rgba(0, 150, 255, 0.6)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.CuOH2, Chemical.PHENOLPHTHALEIN]), {
        hasReaction: true,
        color: 'rgba(0, 150, 255, 0.6)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.NiOH2, Chemical.LITMUS]), {
        hasReaction: true,
        color: 'rgba(50, 180, 70, 0.6)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.NiOH2, Chemical.METHYL_ORANGE]), {
        hasReaction: true,
        color: 'rgba(50, 180, 70, 0.6)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.NiOH2, Chemical.PHENOLPHTHALEIN]), {
        hasReaction: true,
        color: 'rgba(50, 180, 70, 0.6)',
      }],
    ]);
  }

  initializeData() {
    this.acids.shift();
    this.alkalis = [
      {
        id: 3,
        chemical: Chemical.NaOH,
        type: ChemicalType.ALKALI,
        color: 'rgb(240, 248, 255)'
      },
      {
        id:4,
        chemical: Chemical.MgOH2,
        type: ChemicalType.ALKALI,
        container: ContainerType.JAR,
        color: 'rgba(255, 255, 255, 1)',
      },
      {
        id: 5,
        chemical: Chemical.CuOH2,
        type: ChemicalType.ALKALI,
        container: ContainerType.JAR,
        color: 'rgba(50, 140, 255, 1)',
      },
      {
        id: 6,
        chemical: Chemical.NiOH2,
        type: ChemicalType.ALKALI,
        container: ContainerType.JAR,
        color: 'rgba(80, 200, 120, 1)',
      },
    ];

    this.indicators = [
      {
        id: 7,
        chemical: Chemical.LITMUS,
        type: ChemicalType.INDICATOR,
        color: 'rgba(138, 43, 226, 1)'
      },
      {
        id: 8,
        chemical: Chemical.METHYL_ORANGE,
        type: ChemicalType.INDICATOR,
        color: 'rgba(255, 165, 0, 1)'
      },
      {
        id: 9,
        chemical: Chemical.PHENOLPHTHALEIN,
        type: ChemicalType.INDICATOR,
        color: 'rgb(240, 248, 255)'
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
