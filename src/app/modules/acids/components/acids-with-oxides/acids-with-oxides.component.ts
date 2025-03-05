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
  impacts: ChemicalElement[] = [];

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
            precipitate: {name: 'Оксид Магния (MgO)', color: 'rgba(255, 255, 255, 1)'},
            description: 'Оксид Магния (MgO)'
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
            precipitate: {name: 'Оксид Меди (CuO)', color: 'rgba(30, 30, 30, 1)'},
            description: 'Оксид Меди (CuO)'
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
            precipitate: {name: 'Оксид Никеля (NiO)', color: 'rgba(150, 190, 120, 1)'},
            description: 'Оксид Никеля (NiO)'
          },
        }
      }
    ];

    this.impacts = [
      {
        id: 5,
        name: 'Нагревание',
        type: ChemicalType.IMPACT,
        reactions: {
          'Оксид Магния (MgO)': {
            hasReaction: true,
            color: 'rgba(255, 255, 255, 0.6)',
            hasPrecipitate: false,
            precipitate: {name: '', color: 'rgba(255, 255, 255, 1)'}
          },
          'Оксид Меди (CuO)': {
            hasReaction: true,
            color: 'rgba(0, 150, 255, 0.6)',
            hasPrecipitate: false,
            precipitate: {name: '', color: 'rgba(30, 30, 30, 1)'}
          },
          'Оксид Никеля (NiO)': {
            hasReaction: true,
            color: 'rgba(50, 180, 70, 0.6)',
            hasPrecipitate: false,
            precipitate: {name: '', color: 'rgba(150, 190, 120, 1)'}
          }
        }
      },
    ];
  }

  selectImpact(index?: number) {
    let impact = this.impacts[index];
    this.currentReaction.third = impact;
    this.updateResult();
  }

  updateResult() {
    if (this.currentReaction.first && this.currentReaction.second && this.currentReaction.third) {
      const reactions = this.currentReaction.third.reactions || {};
      let result = reactions[this.currentReaction.second.name];
      this.reactionCompleted = true;
      this.animateResult(result);
    } else if (this.currentReaction.first && this.currentReaction.second) {
      const reactions = this.currentReaction.second.reactions || {};
      this.currentReaction.result = reactions[this.currentReaction.first.name];
      this.reactionCompleted = true;
    } else if (this.currentReaction.first) {
      this.resetReactionsFlags();
      this.currentReaction.result = {color: this.currentReaction.first.color};
    } else if (this.currentReaction.second) {
      this.resetReactionsFlags();
      this.currentReaction.result = {
        precipitate: {
          name: this.currentReaction.second.name,
          color: this.currentReaction.second.color
        }, hasPrecipitate: true
      };
    } else {
      this.resetReactionsFlags();
    }
  }
}
