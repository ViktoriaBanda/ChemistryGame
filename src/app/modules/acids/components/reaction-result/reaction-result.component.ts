import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChemicalElement, ReactionResult } from '../../models/chemistry.models';

@Component({
  selector: 'app-reaction-result',
  templateUrl: './reaction-result.component.html',
  styleUrls: ['./reaction-result.component.scss']
})
export class ReactionResultComponent {
  @Input() reagent1: ChemicalElement | null = null;
  @Input() reagent2: ChemicalElement | null = null;
  @Input() result: ReactionResult = {};
  @Input() animating = false;
  @Input() isResultAlreadyExist = false;

  @Output() reset = new EventEmitter<void>();

  get showGas(): boolean {
    return this.result.gas || false;
  }

  get showPrecipitate(): boolean {
    return this.result.precipitate || false;
  }

  get resultColor(): string {
    return this.result.color || 'transparent';
  }

  get description(): string {
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
    this.reset.emit();
  }
}
