import { Component, OnInit } from '@angular/core';
import { ChemicalElement, ChemicalType, Chemical, ReactionResult, createReactionKey } from '../../models/chemistry.models';
import { ReactionBase } from "../../../reactionBase";
import { getChemicalName } from "../../../../core/utils/helpers";

@Component({
  selector: 'app-acids-with-indicators',
  templateUrl: './acids-with-indicators.component.html',
  styleUrls: ['./acids-with-indicators.component.scss']
})
export class AcidsWithIndicatorsComponent extends ReactionBase implements OnInit {
  constructor() {
    super();
    this.initializeReactions();
  }

  ngOnInit() {
    this.initializeData();
  }

  private initializeReactions() {
    this.reactions = new Map([
      // HCl + индикаторы
      [createReactionKey([Chemical.HCl, Chemical.LITMUS]), {
        color: 'rgba(220, 20, 60, 0.6)', // красный
        description: 'Лакмус в кислой среде краснеет'
      }],
      [createReactionKey([Chemical.HCl, Chemical.METHYL_ORANGE]), {
        color: 'rgba(220, 20, 60, 0.6)', // красный
        description: 'Метилоранж в кислой среде краснеет'
      }],
      [createReactionKey([Chemical.HCl, Chemical.PHENOLPHTHALEIN]), {
        color: 'rgba(255, 255, 255, 0.3)', // бесцветный
        description: 'Фенолфталеин в кислой среде бесцветный'
      }],

      // H2SO4 + индикаторы
      [createReactionKey([Chemical.H2SO4, Chemical.LITMUS]), {
        color: 'rgba(220, 20, 60, 0.6)', // красный
        description: 'Лакмус в кислой среде краснеет'
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.METHYL_ORANGE]), {
        color: 'rgba(220, 20, 60, 0.6)', // красный
        description: 'Метилоранж в кислой среде краснеет'
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.PHENOLPHTHALEIN]), {
        color: 'rgba(255, 255, 255, 0.3)', // бесцветный
        description: 'Фенолфталеин в кислой среде бесцветный'
      }]
    ]);
  }

  initializeData() {
    this.indicators = [
      {
        id: 5,
        chemical: Chemical.LITMUS,
        type: ChemicalType.INDICATOR,
        color: 'rgba(138, 43, 226, 1)'
      },
      {
        id: 6,
        chemical: Chemical.METHYL_ORANGE,
        type: ChemicalType.INDICATOR,
        color: 'rgba(255, 165, 0, 1)'
      },
      {
        id: 7,
        chemical: Chemical.PHENOLPHTHALEIN,
        type: ChemicalType.INDICATOR,
        color: 'rgba(255, 255, 255, 0.3)'
      }
    ];
  }

  protected readonly getChemicalName = getChemicalName;
  protected readonly ChemicalType = ChemicalType;
}
