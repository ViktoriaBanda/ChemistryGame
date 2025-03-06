import { Component, OnInit } from '@angular/core';
import { ChemicalElement, ChemicalType } from '../../models/chemistry.models';
import { ReactionBase } from "../../../reactionBase";

@Component({
  selector: 'app-acids-with-indicators',
  templateUrl: './acids-with-indicators.component.html',
  styleUrls: ['./acids-with-indicators.component.scss']
})
export class AcidsWithIndicatorsComponent extends ReactionBase implements OnInit {
  indicators: ChemicalElement[] = [];

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.indicators = [
      {
        id: 5,
        name: 'Лакмус',
        type: ChemicalType.INDICATOR,
        color: 'rgba(138, 43, 226, 1)',
        reactions: {
          'Соляная кислота (HCl)': {
            color: 'rgba(220, 20, 60, 0.6)',
          },
          'Серная кислота (H2SO4)': {
            color: 'rgba(220, 20, 60, 0.6)',
          }
        }
      },
      {
        id: 6,
        name: 'Метилоранж',
        type: ChemicalType.INDICATOR,
        color: 'rgba(255, 165, 0, 1)',
        reactions: {
          'Соляная кислота (HCl)': {
            color: 'rgba(220, 20, 60, 0.6)',
          },
          'Серная кислота (H2SO4)': {
            color: 'rgba(220, 20, 60, 0.6)',
          }
        }
      },
      {
        id: 7,
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
    let indicator = this.indicators[index];

    this.selectedReagent = indicator;
    this.currentReaction.second = indicator;
    this.updateResult();
  }
}
