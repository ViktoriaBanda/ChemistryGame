import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChemicalElement, Reaction, ChemicalType, ContainerType, ReactionResult } from '../../models/chemistry.models';

@Component({
  selector: 'app-acids-with-indicators',
  templateUrl: './acids-with-indicators.component.html',
  styleUrls: ['./acids-with-indicators.component.scss']
})
export class AcidsWithIndicatorsComponent implements OnInit {
  acids: ChemicalElement[] = [];
  indicators: ChemicalElement[] = [];

  selectedAcid: ChemicalElement | null = null;
  selectedIndicator: ChemicalElement | null = null;

  currentReaction: Reaction = {
    first: null,
    second: null,
    result: {}
  };

  animating = false;
  isResultAlreadyExist = false;

  // Состояние групп веществ
  isGroupExpanded: { [key: string]: boolean } = {
    acids: true,
    oxides: false,
    bases: false
  };

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initializeData();
  }

  toggleGroup(groupName: string) {
    this.isGroupExpanded[groupName] = !this.isGroupExpanded[groupName];
  }

  initializeData() {
    this.acids = [
      {
        id: 1,
        name: 'Соляная кислота (HCl)',
        type: ChemicalType.ACID,
        color: 'rgba(255, 255, 255, 0.6)',
        container: ContainerType.FLASK
      },
      {
        id: 2,
        name: 'Серная кислота (H2SO4)',
        type: ChemicalType.ACID,
        color: 'rgba(255, 255, 255, 0.6)',
        container: ContainerType.FLASK
      },
    ];

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

  selectAcid(acid: ChemicalElement) {
    if (this.selectedAcid && this.selectedIndicator) {
      this.setResultIsFull();
      return;
    }

    this.selectedAcid = acid;
    this.currentReaction.first = acid;
    this.updateResult();
  }

  selectIndicator(indicator: ChemicalElement) {
    if (this.selectedAcid && this.selectedIndicator) {
      this.setResultIsFull();
      return;
    }

    this.selectedIndicator = indicator;
    this.currentReaction.second = indicator;
    this.updateResult();
  }

  updateResult() {
    if (this.currentReaction.first && this.currentReaction.second) {
      const reactions = this.currentReaction.second.reactions || {};
      const result = reactions[this.currentReaction.first.name];
      this.animateResult(result);
    } else if (this.currentReaction.first) {
      this.animating = false;
      this.currentReaction.result = { color: this.currentReaction.first.color };
    }
    else {
      this.animating = false;
    }
  }

  animateResult(result: ReactionResult) {
    this.animating = true;
    this.currentReaction.result = result;
    this._changeDetectorRef.detectChanges();
  }

  resetExperiment() {
    this.isResultAlreadyExist = false;
    this.selectedAcid = null;
    this.selectedIndicator = null;
    this.currentReaction = {
      first: null,
      second: null,
      result: {}
    };
  }

  private setResultIsFull(): void {
    this.isResultAlreadyExist = true;
    setTimeout(() => {
      this.isResultAlreadyExist = false;
    }, 1000);
  }
}
