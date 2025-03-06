import { Component } from '@angular/core';
import { ChemicalElement, ChemicalType, ContainerType } from "../../models/chemistry.models";
import { ReactionBase } from "../../../reactionBase";

@Component({
  selector: 'app-acids-with-alkali',
  templateUrl: './acids-with-alkali.component.html',
  styleUrls: ['./acids-with-alkali.component.scss']
})
export class AcidsWithAlkaliComponent extends ReactionBase {
  alkalis: ChemicalElement[] = [];
  indicators: ChemicalElement[] = [];
  impacts: ChemicalElement[] = [];

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.acids.shift();
    this.alkalis = [
      {
        id: 3,
        name: 'Гидроксид натрия (NaOH)',
        type: ChemicalType.ALKALI,
        color: 'rgba(255, 255, 255, 0.6)',
        reactions: {
          'Серная кислота (H2SO4)': {
            hasReaction: true,
            color: 'rgba(255, 255, 255, 0.6)',
          }
        }
      },
      {
        id:4,
        name: 'Гидроксид магния (Mg(OH)2)',
        type: ChemicalType.ALKALI,
        container: ContainerType.JAR,
        color: 'rgba(255, 255, 255, 1)',
        reactions: {
          'Серная кислота (H2SO4)': {
            hasReaction: false,
            color: 'rgba(255, 255, 255, 0.6)',
            hasPrecipitate: true,
            precipitate: {name: 'Гидроксид магния (Mg(OH)2)', color: 'rgba(255, 255, 255, 1)'}
          }
        }
      },
      {
        id: 5,
        name: 'Гидроксид меди II (Cu(OH)2)',
        type: ChemicalType.ALKALI,
        container: ContainerType.JAR,
        color: 'rgba(50, 140, 255, 1)',
        reactions: {
          'Серная кислота (H2SO4)': {
            hasReaction: false,
            color: 'rgba(255, 255, 255, 0.6)',
            hasPrecipitate: true,
            precipitate: {name: 'Гидроксид меди II (Cu(OH)2)', color: 'rgba(50, 140, 255, 1)'}
          }
        }
      },
      {
        id: 6,
        name: 'Гидроксид никеля (Ni(OH)2)',
        type: ChemicalType.ALKALI,
        container: ContainerType.JAR,
        color: 'rgba(80, 200, 120, 1)',
        reactions: {
          'Серная кислота (H2SO4)': {
            hasReaction: false,
            color: 'rgba(255, 255, 255, 0.6)',
            hasPrecipitate: true,
            precipitate: {name: 'Гидроксид никеля (Ni(OH)2)', color: 'rgba(80, 200, 120, 1)'}
          }
        }
      },
    ];

    this.indicators = [
      {
        id: 7,
        name: 'Лакмус',
        type: ChemicalType.INDICATOR,
        color: 'rgba(138, 43, 226, 1)',
        reactions: {
          'Соляная кислота (HCl)': {
            color: 'rgba(220, 20, 60, 0.8)',
          },
          'Серная кислота (H2SO4)': {
            color: 'rgba(220, 20, 60, 0.8)',
          }
        }
      },
      {
        id: 8,
        name: 'Метилоранж',
        type: ChemicalType.INDICATOR,
        color: 'rgba(255, 165, 0, 1)',
        reactions: {
          'Соляная кислота (HCl)': {
            color: 'rgba(220, 20, 60, 0.8)',
          },
          'Серная кислота (H2SO4)': {
            color: 'rgba(220, 20, 60, 0.8)',
          }
        }
      },
      {
        id: 9,
        name: 'Фенолфталеин',
        type: ChemicalType.INDICATOR,
        color: 'rgba(255, 255, 255, 0.6)',
        reactions: {
          'Соляная кислота (HCl)': {
            color: 'rgba(255, 255, 255, 0.6)',
          },
          'Серная кислота (H2SO4)': {
            color: 'rgba(255, 255, 255, 0.6)',
          }
        }
      },
    ];
  }

  selectReagent(reagent?:ChemicalElement, index?: number) {
    if (this.currentReaction.first && this.currentReaction.second && this.currentReaction.third) {
      this.setResultIsFull();
      return;
    }

    this.selectedReagent = reagent;

    if (this.currentReaction.second) {
      this.currentReaction.third = reagent;
      this.updateResult();
      return;
    }
    else {
      this.currentReaction.second = reagent;
      this.updateResult();
      return;
    }
  }

  updateResult() {
    if (this.currentReaction.first && this.currentReaction.second && this.currentReaction.third) {
      const reactions = this.currentReaction.third.reactions || {};
      let result = reactions[this.currentReaction.second.name];
      this.reactionCompleted = true;
      this.animateResult(result);
    } else if (this.currentReaction.first && this.currentReaction.second) {
      const reactions = this.currentReaction.second.reactions || {};
      this.currentReaction.result = reactions[this.currentReaction.first.name];
      this.reactionCompleted = true;
    } else if (this.currentReaction.first) {
      this.resetReactionsFlags();
      this.currentReaction.result = {color: this.currentReaction.first.color};
    } else if (this.currentReaction.second) {
      this.resetReactionsFlags();
      this.currentReaction.result = {
        precipitate: {
          name: this.currentReaction.second.name,
          color: this.currentReaction.second.color
        }, hasPrecipitate: true
      };
    } else {
      this.resetReactionsFlags();
    }
  }
}
