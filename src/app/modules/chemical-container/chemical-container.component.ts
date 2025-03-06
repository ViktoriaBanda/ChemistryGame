import { Component, Input } from '@angular/core';
import { ChemicalElement, ChemicalType, ContainerType } from '../acids/models/chemistry.models';

@Component({
  selector: 'app-chemical-container',
  templateUrl: './chemical-container.component.html',
  styleUrls: ['./chemical-container.component.scss']
})
export class ChemicalContainerComponent {
  @Input() element: ChemicalElement;
  protected readonly ChemicalType = ChemicalType;
  protected readonly ContainerType = ContainerType;
}
