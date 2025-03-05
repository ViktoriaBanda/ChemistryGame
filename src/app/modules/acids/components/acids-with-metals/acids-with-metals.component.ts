import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChemicalElement, ChemicalType, ContainerType, Reaction, ReactionResult } from "../../models/chemistry.models";
import { ReactionBase } from "../../../reactionBase";

@Component({
  selector: 'app-acids-with-metals',
  templateUrl: './acids-with-metals.component.html',
  styleUrls: ['./acids-with-metals.component.scss']
})
export class AcidsWithMetalsComponent extends ReactionBase implements OnInit {
  metals: ChemicalElement[] = [];

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.metals = [
      {
        id: 8,
        name: 'Магний (Mg)',
        type: ChemicalType.METAL,
        color: 'rgba(169, 169, 169, 1)',
        container: ContainerType.METAL,
        reactions: {
          'Соляная кислота (HCl)': {
            hasReaction: true,
            color: 'rgba(255, 255, 255, 0.6)',
            hasGas: true,
            hasPrecipitate: true,
            precipitate: {name: 'Магний (Mg)', color: 'rgba(169, 169, 169, 1)'},
            description: 'Водород (H2)'
          },
          'Серная кислота (H2SO4)': {
            hasReaction: true,
            color: 'rgba(255, 255, 255, 0.6)',
            hasGas: true,
            hasPrecipitate: true,
            precipitate: {name: 'Магний (Mg)', color: 'rgba(169, 169, 169, 1)'},
            description: 'Водород (H2)'
          }
        }
      },
      {
        id: 9,
        name: 'Цинк (Zn)',
        type: ChemicalType.METAL,
        color: 'rgba(179, 179, 179, 1)',
        container: ContainerType.METAL,
        reactions: {
          'Соляная кислота (HCl)': {
            hasReaction: true,
            color: 'rgba(255, 255, 255, 0.6)',
            hasGas: true,
            hasPrecipitate: true,
            precipitate: {name: 'Цинк (Zn)', color: 'rgba(179, 179, 179, 1)'},
            description: 'Водород (H2)'
          },
          'Серная кислота (H2SO4)': {
            hasReaction: true,
            color: 'rgba(255, 255, 255, 0.6)',
            hasGas: true,
            hasPrecipitate: true,
            precipitate: {name: 'Цинк (Zn)', color: 'rgba(179, 179, 179, 1)'},
            description: 'Водород (H2)'
          }
        }
      },
      {
        id: 10,
        name: 'Медь (Cu)',
        type: ChemicalType.METAL,
        color: 'rgba(184, 115, 51, 1)',
        container: ContainerType.METAL,
        reactions: {
          'Соляная кислота (HCl)': {
            color: 'rgba(255, 255, 255, 0.6)',
            hasPrecipitate: true,
            precipitate: {name: 'Медь (Cu)', color: 'rgba(184, 115, 51, 1)'},
          },
          'Серная кислота (H2SO4)': {
            color: 'rgba(255, 255, 255, 0.6)',
            hasPrecipitate: true,
            precipitate: {name: 'Медь (Cu)', color: 'rgba(184, 115, 51, 1)'},
          },
        }
      }
    ];
  }

  updateResult() {
    if (this.currentReaction.first && this.currentReaction.second) {
      const reactions = this.currentReaction.second.reactions || {};
      const result = reactions[this.currentReaction.first.name];
      this.reactionCompleted = true;
      this.animateResult(result);
    } else if (this.currentReaction.first) {
      this.resetReactionsFlags();
      this.currentReaction.result = { color: this.currentReaction.first.color };
    }
    else if (this.currentReaction.second) {
      this.resetReactionsFlags();
      this.currentReaction.result = { precipitate: {name: this.currentReaction.second.name, color: this.currentReaction.second.color}, hasPrecipitate: true };
    }
    else {
      this.resetReactionsFlags();
    }
  }
}
