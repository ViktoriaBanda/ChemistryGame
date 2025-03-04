import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() animating: boolean;
  @Input() isResultAlreadyExist: boolean;

  @Output() reset = new EventEmitter();

  get reactionDescription(): string {
    if (this.reagent1 && this.reagent2) {
      return `${this.reagent1.name} + ${this.reagent2.name}`;
    }
    else if (this.reagent1) {
      return `${this.reagent1.name}`;
    }
    else if (this.reagent2) {
      return `${this.reagent2.name}`;
    }
    return '';
  }

  resetExperiment() {
    this.animating = false;
    this.reagent1 = null;
    this.reagent2 = null;
    this.resultColor = 'transparent';
    this.reset.emit();
  }
}
