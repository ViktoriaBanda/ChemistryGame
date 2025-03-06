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
    this.initializeData();
  }

  private initializeReactions() {
    this.reactions = new Map([
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
        color: 'rgba(255, 255, 255, 0.6)', // бесцветный
        description: 'Фенолфталеин в кислой среде бесцветный'
      }],
      // H2SO4 + основания
      [createReactionKey([Chemical.H2SO4, Chemical.NaOH]), {
        hasReaction: true,
        color: 'rgba(255, 255, 255, 0.6)',
      }],
      // Основания + Индикаторы
      [createReactionKey([Chemical.NaOH, Chemical.LITMUS]), {
        hasReaction: true,
        color: 'rgba(0, 0, 255, 0.6)',
      }],
      [createReactionKey([Chemical.NaOH, Chemical.METHYL_ORANGE]), {
        hasReaction: true,
        color: 'rgba(255, 165, 0, 0.6)',
      }],
      [createReactionKey([Chemical.NaOH, Chemical.PHENOLPHTHALEIN]), {
        hasReaction: true,
        color: 'rgba(255, 0, 255, 0.6)',
      }],
      // Нагревание
      [createReactionKey([Chemical.H2SO4, Chemical.MgOH2, Chemical.PHENOLPHTHALEIN]), {
        hasReaction: true,
        color: 'rgba(255, 255, 255, 0.6)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.CuOH2, Chemical.Temperature]), {
        hasReaction: true,
        color: 'rgba(0, 150, 255, 0.6)',
      }],
      [createReactionKey([Chemical.H2SO4, Chemical.NiOH2, Chemical.Temperature]), {
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
        color: 'rgba(255, 255, 255, 0.6)'
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
        color: 'rgba(255, 255, 255, 0.6)'
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

  /*selectReagent(reagent?:ChemicalElement, index?: number) {
    if (this.currentReaction.first && this.currentReaction.second && this.currentReaction.third) {
      this.setResultIsFull();
      return;
    }
    else if (this.currentReaction.first && this.currentReaction.second && this.reagents.every(reagent => reagent.type !== ChemicalType.INDICATOR)) {
      this.setResultIsFull();
      return;
    }

    if (this.currentReaction.second) {
      this.reagents.pop();
    }

    if (reagent && reagent.type !== ChemicalType.ACID) {
      this.selectedReagent = reagent;
    }
    else if(reagent && reagent.type === ChemicalType.ACID) {
      this.selectedAcid = reagent;
    }

    if (!reagent && index != null) {
      reagent = this.indicators[index];
    }
    else {
      this.reagents.push(reagent);
    }

    if(!this.currentReaction.first) {
      this.currentReaction.first = reagent;
    }

    else if (this.currentReaction.second && this.currentReaction.second.type !== reagent.type) {
      this.currentReaction.third = reagent;
      this.updateResult();
      return;
    }
    else {
      this.currentReaction.second = reagent;
      this.updateResult();
    }
  }*/

  /*updateResult() {
    if (this.currentReaction.first && this.currentReaction.second && this.currentReaction.third) {
      const reactions = this.currentReaction.third.reactions || {};
      let result = reactions[this.currentReaction.second.name];
      this.reactionCompleted = true;
      this.animateResult(result);
    } else if (this.currentReaction.first && this.currentReaction.second) {
      const reactions = this.currentReaction.second.reactions || {};
      this.currentReaction.result = reactions[this.currentReaction.first.name];
      this.reactionCompleted = true;
    } else if (this.currentReaction.second && this.currentReaction.third) {
        const reactions = this.currentReaction.third.reactions || {};
        this.currentReaction.result = reactions[this.currentReaction.second.name];
        this.reactionCompleted = false;
    } else if (this.currentReaction.first) {
      this.resetReactionsFlags();
      this.currentReaction.result = {color: this.currentReaction.first.color};
    } else if (this.currentReaction.second) {
      this.resetReactionsFlags();
      this.currentReaction.result = {
        precipitate: {
          name: this.currentReaction.second.name,
          color: this.currentReaction.second.color
        },
        hasPrecipitate: this.currentReaction.second.container === ContainerType.JAR,
        color: this.currentReaction.second.container !== ContainerType.JAR ? this.currentReaction.second.color : 'transparent',
      };
    } else {
      this.resetReactionsFlags();
    }
  }*/

  protected readonly getChemicalName = getChemicalName;
  protected readonly ChemicalType = ChemicalType;
}
