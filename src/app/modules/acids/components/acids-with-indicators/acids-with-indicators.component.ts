import { Component, OnInit } from '@angular/core';
import { ChemicalElement, Reaction, ChemicalType, ContainerType } from '../../models/chemistry.models';

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
    acid: null,
    indicator: null,
    resultColor: 'transparent'
  };

  animating = false;

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.acids = [
      {
        id: 1,
        name: 'Соляная кислота (HCl)',
        type: ChemicalType.ACID,
        color: 'rgba(240, 240, 240, 0.8)',
        container: ContainerType.FLASK
      },
      {
        id: 2,
        name: 'Серная кислота (H2SO4)',
        type: ChemicalType.ACID,
        color: 'rgba(240, 240, 240, 0.8)',
        container: ContainerType.FLASK
      },
      {
        id: 3,
        name: 'Азотная кислота (HNO3)',
        type: ChemicalType.ACID,
        color: 'rgba(240, 240, 240, 0.8)',
        container: ContainerType.FLASK
      },
    ];

    this.indicators = [
      {
        id: 5,
        name: 'Лакмус',
        type: ChemicalType.INDICATOR,
        color: 'purple',
        container: ContainerType.PIPETTE,
        reactions: {
          'Соляная кислота (HCl)': 'red',
          'Серная кислота (H2SO4)': 'red',
          'Азотная кислота (HNO3)': 'red',
          'Уксусная кислота (CH3COOH)': 'pink'
        }
      },
      {
        id: 6,
        name: 'Метиловый оранжевый',
        type: ChemicalType.INDICATOR,
        color: 'orange',
        container: ContainerType.PIPETTE,
        reactions: {
          'Соляная кислота (HCl)': 'red',
          'Серная кислота (H2SO4)': 'red',
          'Азотная кислота (HNO3)': 'red',
          'Уксусная кислота (CH3COOH)': 'orange-red'
        }
      },
      {
        id: 7,
        name: 'Фенолфталеин',
        type: ChemicalType.INDICATOR,
        color: 'transparent',
        container: ContainerType.PIPETTE,
        reactions: {
          'Соляная кислота (HCl)': 'transparent',
          'Серная кислота (H2SO4)': 'transparent',
          'Азотная кислота (HNO3)': 'transparent',
          'Уксусная кислота (CH3COOH)': 'transparent'
        }
      },
    ];
  }

  selectAcid(acid: ChemicalElement) {
    this.selectedAcid = acid;
    this.currentReaction.acid = acid;
    this.updateResult();
  }

  selectIndicator(indicator: ChemicalElement) {
    this.selectedIndicator = indicator;
    this.currentReaction.indicator = indicator;
    this.updateResult();
  }

  updateResult() {
    if (this.currentReaction.acid && this.currentReaction.indicator) {
      const reactions = this.currentReaction.indicator.reactions || {};
      const resultColor = reactions[this.currentReaction.acid.name] || 'transparent';
      this.animateColorChange(resultColor);
    }
  }

  animateColorChange(newColor: string) {
    this.animating = true;
    setTimeout(() => {
      this.currentReaction.resultColor = newColor;
      this.animating = false;
    }, 1000);
  }

  resetExperiment() {
    this.selectedAcid = null;
    this.selectedIndicator = null;
    this.currentReaction = {
      acid: null,
      indicator: null,
      resultColor: 'transparent'
    };
  }
}
