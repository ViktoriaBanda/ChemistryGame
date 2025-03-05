import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChemicalElement, Reaction, ChemicalType, ContainerType, ReactionResult } from '../../models/chemistry.models';
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

  toggleGroup(groupName: string) {
    this.isGroupExpanded[groupName] = !this.isGroupExpanded[groupName];
  }

  initializeData() {
    this.indicators = [
      {
        id: 5,
        name: 'Лакмус',
        type: ChemicalType.INDICATOR,
        color: 'rgba(138, 43, 226, 1)',
        container: ContainerType.PIPETTE,
        reactions: {
          'Соляная кислота (HCl)': {
            color: 'rgba(220, 20, 60, 0.8)',
            description: 'Лакмус окрашивается в красный цвет'
          },
          'Серная кислота (H2SO4)': {
            color: 'rgba(220, 20, 60, 0.8)',
            description: 'Лакмус окрашивается в красный цвет'
          }
        }
      },
      {
        id: 6,
        name: 'Метилоранж',
        type: ChemicalType.INDICATOR,
        color: 'rgba(255, 165, 0, 1)',
        container: ContainerType.PIPETTE,
        reactions: {
          'Соляная кислота (HCl)': {
            color: 'rgba(220, 20, 60, 0.8)',
            description: 'Метилоранж окрашивается в красный цвет'
          },
          'Серная кислота (H2SO4)': {
            color: 'rgba(220, 20, 60, 0.8)',
            description: 'Метилоранж окрашивается в красный цвет'
          }
        }
      },
      {
        id: 7,
        name: 'Фенолфталеин',
        type: ChemicalType.INDICATOR,
        color: 'rgba(255, 255, 255, 0.6)',
        container: ContainerType.PIPETTE,
        reactions: {
          'Соляная кислота (HCl)': {
            color: 'rgba(255, 255, 255, 0.6)',
            description: 'Фенолфталеин остается бесцветным'
          },
          'Серная кислота (H2SO4)': {
            color: 'rgba(255, 255, 255, 0.6)',
            description: 'Фенолфталеин остается бесцветным'
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
