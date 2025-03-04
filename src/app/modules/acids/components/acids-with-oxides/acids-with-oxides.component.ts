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
        color: 'rgba(255, 255, 255, 0.6)',
        container: ContainerType.JAR,
        reactions: {
          'Серная кислота (H2SO4)': {
            color: 'rgba(255, 255, 255, 0.6)',
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
            color: 'rgba(0, 150, 255, 0.8)',
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
            color: 'rgba(50, 180, 70, 0.8)'
          },
        }
      }
    ];
  }
}
