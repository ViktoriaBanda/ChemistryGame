import { Component, Input } from '@angular/core';
import { ChemicalElement } from '../../models/chemistry.models';

@Component({
  selector: 'app-reaction-result',
  templateUrl: './reaction-result.component.html',
  styleUrls: ['./reaction-result.component.scss']
})
export class ReactionResultComponent {
  @Input() reagent1: ChemicalElement | null = null;
  @Input() reagent2: ChemicalElement | null = null;
  @Input() resultColor: string = 'transparent';
  @Input() animating: boolean = false;

  get reactionDescription(): string {
    if (this.reagent1 && this.reagent2) {
      return `${this.reagent1.name} + ${this.reagent2.name}`;
    }
    return '';
  }
} 