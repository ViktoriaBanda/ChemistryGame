import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChemicalElement, ReactionResult } from '../acids/models/chemistry.models';

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

  isTooltipVisible = false;
  tooltipText = '';
  tooltipPosition = {top: '0px', left: '0px'};

  indicators: string[] = ['Лакмус', 'Метилоранж', 'Фенолфталеин'];
  selectedIndicator: number;

  onSelectIndicator(item: string): void {
    this.selectedIndicator = this.indicators.findIndex(complexity => complexity === item);
  }

  get showGas(): boolean {
    return this.result.gas || false;
  }

  get showPrecipitate(): boolean {
    return this.result.precipitate || false;
  }

  get resultColor(): string {
    return this.result.color || 'transparent';
  }

  get products(): string {
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

  get description() : string {
    return this.result.description || '';
  }

  resetExperiment() {
    this.animating = false;
    this.reagent1 = null;
    this.reagent2 = null;
    this.reset.emit();
  }

  hideTooltip(event?: TouchEvent) {
    this.isTooltipVisible = false;
  }

  showTooltip(event: MouseEvent, text: string) {
    this.isTooltipVisible = true;
    this.tooltipText = text;
    this.updateTooltipPosition(event);
  }

  updateTooltipPosition(event: MouseEvent) {
    const tooltipOffset = 10;
    this.tooltipPosition = {
      top: `${event.clientY + tooltipOffset * 2}px`,
      left: `${event.clientX + tooltipOffset}px`
    };
  }
}
