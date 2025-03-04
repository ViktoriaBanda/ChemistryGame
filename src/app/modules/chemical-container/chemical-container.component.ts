import { Component, Input } from '@angular/core';
import { ChemicalElement, ContainerType } from '../acids/models/chemistry.models';

@Component({
  selector: 'app-chemical-container',
  templateUrl: './chemical-container.component.html',
  styleUrls: ['./chemical-container.component.scss']
})
export class ChemicalContainerComponent {
  @Input() element!: ChemicalElement;
  ContainerType = ContainerType; // для использования в шаблоне
}
