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
    first: null,
    second: null,
    resultColor: 'transparent'
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
        id: 8,
        name: 'Магний (Mg)',
        type: ChemicalType.METAL,
        color: 'rgba(169, 169, 169, 1)',
        container: ContainerType.METAL,
        reactions: {
          'Соляная кислота (HCl)': 'rgba(255, 255, 255, 0.6)',
          'Серная кислота (H2SO4)': 'rgba(255, 255, 255, 0.6)',
          'Азотная кислота (HNO3)': 'rgba(255, 255, 255, 0.6)',
          'Гидроксид натрия (NaOH)': 'rgba(255, 192, 203, 0.8)',
          'Гидроксид калия (KOH)': 'rgba(255, 192, 203, 0.8)',
        }
      },
      {
        id: 9,
        name: 'Цинк (Zn)',
        type: ChemicalType.METAL,
        color: 'rgba(179, 179, 179, 1)',
        container: ContainerType.METAL,
        reactions: {
          'Соляная кислота (HCl)': 'rgba(255, 255, 255, 0.6)',
          'Серная кислота (H2SO4)': 'rgba(255, 255, 255, 0.6)',
          'Азотная кислота (HNO3)': 'rgba(255, 255, 255, 0.6)',
          'Гидроксид натрия (NaOH)': 'rgba(255, 192, 203, 0.8)',
          'Гидроксид калия (KOH)': 'rgba(255, 192, 203, 0.8)',
        }
      },
      {
        id: 10,
        name: 'Медь (Cu)',
        type: ChemicalType.METAL,
        color: 'rgba(184, 115, 51, 1)',
        container: ContainerType.METAL,
        reactions: {
          'Соляная кислота (HCl)': 'rgba(255, 255, 255, 0.6)',
          'Серная кислота (H2SO4)': 'rgba(255, 255, 255, 0.6)',
          'Азотная кислота (HNO3)': 'rgba(255, 255, 255, 0.6)',
          'Гидроксид натрия (NaOH)': 'rgba(255, 192, 203, 0.8)',
          'Гидроксид калия (KOH)': 'rgba(255, 192, 203, 0.8)',
        }
      }
    ];
  }

  selectAcid(acid: ChemicalElement) {
    if (this.selectedAcid && this.selectedMetal) {
      this.setResultIsFull();
      return;
    }

    this.selectedAcid = acid;
    this.currentReaction.first = acid;
    this.updateResult();
  }

  selectMetal(indicator: ChemicalElement) {
    if (this.selectedAcid && this.selectedMetal) {
      this.setResultIsFull();
      return;
    }

    this.selectedMetal = indicator;
    this.currentReaction.second = indicator;
    this.updateResult();
  }

  updateResult() {
    if (this.currentReaction.first && this.currentReaction.second) {
      const reactions = this.currentReaction.second.reactions || {};
      const resultColor = reactions[this.currentReaction.first.name];
      this.animateColorChange(resultColor);
    } else if (this.currentReaction.first) {
      this.animating = false;
      this.currentReaction.resultColor = this.currentReaction.first.color;
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
      first: null,
      second: null,
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
