import { Component, OnInit } from '@angular/core';
import { ChemicalElement, ChemicalType, ContainerType } from "../../models/chemistry.models";
import { ReactionBase } from "../../../reactionBase";

@Component({
  selector: 'app-acids-with-bases',
  templateUrl: './acids-with-oxides.component.html',
  styleUrls: ['./acids-with-oxides.component.scss']
})
export class AcidsWithOxidesComponent extends ReactionBase implements OnInit {
  oxides: ChemicalElement[] = [];

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.acids.shift();
    this.oxides = [
      {
        id: 8,
        name: 'Оксид Магния (MgO)',
        type: ChemicalType.OXIDE,
        color: 'rgba(255, 255, 255, 1)',
        container: ContainerType.JAR,
        reactions: {
          'Серная кислота (H2SO4)': {
            color: 'rgba(255, 255, 255, 0.6)',
            hasPrecipitate: true,
            precipitate: {color: 'rgba(255, 255, 255, 1)'}
          }
        }
      },
      {
        id: 9,
        name: 'Оксид Меди (CuO)',
        type: ChemicalType.OXIDE,
        color: 'rgba(30, 30, 30, 1)',
        container: ContainerType.JAR,
        reactions: {
          'Серная кислота (H2SO4)': {
            color: 'rgba(255, 255, 255, 0.6)',
            hasPrecipitate: true,
            precipitate: {color: 'rgba(30, 30, 30, 1)'}
          }
        }
      },
      {
        id: 10,
        name: 'Оксид Никеля (NiO)',
        type: ChemicalType.OXIDE,
        color: 'rgba(150, 190, 120, 1)',
        container: ContainerType.JAR,
        reactions: {
          'Серная кислота (H2SO4)': {
            color: 'rgba(255, 255, 255, 0.6)',
            hasPrecipitate: true,
            precipitate: {color: 'rgba(150, 190, 120, 1)'}
          },
        }
      }
    ];
  }

  updateResult() {
    if (this.currentReaction.first && this.currentReaction.second) {
      const reactions = this.currentReaction.second.reactions || {};
      this.currentReaction.result = reactions[this.currentReaction.first.name];
      this.reactionCompleted = true;
    } else if (this.currentReaction.first) {
      this.resetReactionsFlags();
      this.currentReaction.result = { color: this.currentReaction.first.color };
    }
    else if (this.currentReaction.second) {
      this.resetReactionsFlags();
      this.currentReaction.result = { precipitate: {color: this.currentReaction.second.color}, hasPrecipitate: true };
    }
    else {
      this.resetReactionsFlags();
    }
  }
}
