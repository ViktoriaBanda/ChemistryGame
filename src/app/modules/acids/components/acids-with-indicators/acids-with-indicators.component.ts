import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    metal: null,
    indicator: null,
    resultColor: 'transparent'
  };

  animating = false;
  isResultAlreadyExist = false;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
  }

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
          'Соляная кислота (HCl)': 'rgba(220, 20, 60, 0.8)',
          'Серная кислота (H2SO4)': 'rgba(220, 20, 60, 0.8)',
          'Азотная кислота (HNO3)': 'rgba(220, 20, 60, 0.8)',
        }
      },
      {
        id: 6,
        name: 'Метиловый оранжевый',
        type: ChemicalType.INDICATOR,
        color: 'rgba(255, 165, 0, 1)',
        container: ContainerType.PIPETTE,
        reactions: {
          'Соляная кислота (HCl)': 'rgba(220, 20, 60, 0.8)',
          'Серная кислота (H2SO4)': 'rgba(220, 20, 60, 0.8)',
          'Азотная кислота (HNO3)': 'rgba(220, 20, 60, 0.8)',
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
    if (this.selectedAcid && this.selectedIndicator) {
      this.setResultIsFull();
      return;
    }

    this.selectedAcid = acid;
    this.currentReaction.metal = acid;
    this.updateResult();
  }

  selectIndicator(indicator: ChemicalElement) {
    if (this.selectedAcid && this.selectedIndicator) {
      this.setResultIsFull();
      return;
    }

    this.selectedIndicator = indicator;
    this.currentReaction.indicator = indicator;
    this.updateResult();
  }

  updateResult() {
    if (this.currentReaction.metal && this.currentReaction.indicator) {
      const reactions = this.currentReaction.indicator.reactions || {};
      const resultColor = reactions[this.currentReaction.metal.name];
      this.animateColorChange(resultColor);
    } else if (this.currentReaction.metal) {
      this.animating = false;
      this.currentReaction.resultColor = this.currentReaction.metal.color;
    }
    else {
      this.animating = false;
    }
  }

  animateColorChange(newColor: string) {
    this.animating = true;
    this.currentReaction.resultColor = newColor;
    this._changeDetectorRef.detectChanges();
  }

  resetExperiment() {
    this.isResultAlreadyExist = false;
    this.selectedAcid = null;
    this.selectedIndicator = null;
    this.currentReaction = {
      metal: null,
      indicator: null,
      resultColor: 'transparent'
    };
  }

  private setResultIsFull(): void {
    this.isResultAlreadyExist = true;
    setTimeout(() => {
      this.isResultAlreadyExist = false;
    }, 1000);
  }
}
