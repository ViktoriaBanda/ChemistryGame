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
      {
        id: 3,
        name: 'Азотная кислота (HNO3)',
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
          'Соляная кислота (HCl)': 'rgba(220, 20, 60, 1)',
          'Серная кислота (H2SO4)': 'rgba(220, 20, 60, 1)',
          'Азотная кислота (HNO3)': 'rgba(220, 20, 60, 1)',
        }
      },
      {
        id: 6,
        name: 'Метиловый оранжевый',
        type: ChemicalType.INDICATOR,
        color: 'rgba(255, 165, 0, 1)',
        container: ContainerType.PIPETTE,
        reactions: {
          'Соляная кислота (HCl)': 'rgba(220, 20, 60, 1)',
          'Серная кислота (H2SO4)': 'rgba(220, 20, 60, 1)',
          'Азотная кислота (HNO3)': 'rgba(220, 20, 60, 1)',
        }
      },
      {
        id: 7,
        name: 'Фенолфталеин',
        type: ChemicalType.INDICATOR,
        color: 'rgba(255, 255, 255, 0.6)',
        container: ContainerType.PIPETTE,
        reactions: {
          'Соляная кислота (HCl)': 'rgba(255, 255, 255, 0.6)',
          'Серная кислота (H2SO4)': 'rgba(255, 255, 255, 0.6)',
          'Азотная кислота (HNO3)': 'rgba(255, 255, 255, 0.6)',
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
