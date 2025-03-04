import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChemicalElement, ChemicalType, ContainerType, Reaction } from "../../models/chemistry.models";

@Component({
  selector: 'app-acids-with-metals',
  templateUrl: './acids-with-metals.component.html',
  styleUrls: ['./acids-with-metals.component.scss']
})
export class AcidsWithMetalsComponent implements OnInit {
  acids: ChemicalElement[] = [];
  metals: ChemicalElement[] = [];

  selectedAcid: ChemicalElement | null = null;
  selectedMetal: ChemicalElement | null = null;

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

    this.metals = [
      {
        id: 5,
        name: 'Магний',
        type: ChemicalType.METAL,
        color: 'rgba(138, 43, 226, 1)',
        container: ContainerType.CRYSTAL,
        reactions: {
          'Соляная кислота (HCl)': 'rgba(220, 20, 60, 1)',
          'Серная кислота (H2SO4)': 'rgba(220, 20, 60, 1)',
          'Азотная кислота (HNO3)': 'rgba(220, 20, 60, 1)',
        }
      },
      {
        id: 6,
        name: 'Цинк',
        type: ChemicalType.METAL,
        color: 'rgba(255, 165, 0, 1)',
        container: ContainerType.CRYSTAL,
        reactions: {
          'Соляная кислота (HCl)': 'rgba(220, 20, 60, 1)',
          'Серная кислота (H2SO4)': 'rgba(220, 20, 60, 1)',
          'Азотная кислота (HNO3)': 'rgba(220, 20, 60, 1)',
        }
      },
      {
        id: 7,
        name: 'Медь',
        type: ChemicalType.METAL,
        color: 'rgba(255, 255, 255, 0.6)',
        container: ContainerType.CRYSTAL,
        reactions: {
          'Соляная кислота (HCl)': 'rgba(255, 255, 255, 0.6)',
          'Серная кислота (H2SO4)': 'rgba(255, 255, 255, 0.6)',
          'Азотная кислота (HNO3)': 'rgba(255, 255, 255, 0.6)',
        }
      },
    ];
  }

  selectAcid(acid: ChemicalElement) {
    if (this.selectedAcid && this.selectedMetal) {
      this.setResultIsFull();
      return;
    }

    this.selectedAcid = acid;
    this.currentReaction.metal = acid;
    this.updateResult();
  }

  selectMetal(indicator: ChemicalElement) {
    if (this.selectedAcid && this.selectedMetal) {
      this.setResultIsFull();
      return;
    }

    this.selectedMetal = indicator;
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
    this.selectedMetal = null;
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
