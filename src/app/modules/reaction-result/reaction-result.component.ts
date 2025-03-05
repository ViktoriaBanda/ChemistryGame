import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChemicalElement, ReactionResult } from '../acids/models/chemistry.models';
import { InputSelectComponent } from "../../shared/input-select/input-select.component";
import { IItemSelect } from "../../core/interfaces/item-select.interface";

@Component({
  selector: 'app-reaction-result',
  templateUrl: './reaction-result.component.html',
  styleUrls: ['./reaction-result.component.scss']
})
export class ReactionResultComponent {
  @ViewChild('selectIndicator') selectIndicator : InputSelectComponent;
  @ViewChild('selectImpact') selectImpact : InputSelectComponent;

  @Input() reagent1: ChemicalElement | null = null;
  @Input() reagent2: ChemicalElement | null = null;
  @Input() result: ReactionResult = {};
  @Input() animating = false;
  @Input() isResultAlreadyExist = false;
  @Input() hasIndicators = false;
  @Input() hasImpact = false;
  @Input() canChooseIndicator = false;
  @Input() canChooseImpact = false;
  @Input() reactionCompleted = false;

  @Output() reset = new EventEmitter<void>();
  @Output() indicatorSelected = new EventEmitter<number>();
  @Output() impactSelected = new EventEmitter<number>();

  isTooltipVisible = false;
  tooltipText = '';
  tooltipPosition = {top: '0px', left: '0px'};

  indicators: IItemSelect[] = [
    {id: 1, title: 'Лакмус', icon: 'assets/icons/lakmus.svg'},
    {id: 2, title: 'Метилоранж', icon: 'assets/icons/methylorange.svg'},
    {id: 3, title: 'Фенолфталеин', icon: 'assets/icons/phenolphtaleini.svg'}
   ];

  impacts: IItemSelect[] = [
    {id: 1, title: 'Нагревание', icon: 'assets/icons/temperature.svg'}
  ];

  selectedIndicatorIndex: number;
  selectedImpactIndex: number;

  onSelectIndicator(itemSelect: IItemSelect): void {
    this.selectedIndicatorIndex = this.indicators.findIndex(item => item === itemSelect);
    this.indicatorSelected.emit(this.selectedIndicatorIndex);
  }

  onSelectImpact(itemSelect: IItemSelect): void {
    this.selectedImpactIndex = this.impacts.findIndex(item => item === itemSelect);
    this.impactSelected.emit(this.selectedImpactIndex);
  }

  get hasReaction(): boolean {
    return this.result && this.result.hasReaction;
  }

  get showGas(): boolean {
    return this.result.hasGas || false;
  }

  get showPrecipitate(): boolean {
    return this.result.hasPrecipitate || false;
  }

  get resultColor(): string {
    return this.result.color || 'transparent';
  }

  get precipitateColor(): string {
    if (this.reagent1 && this.reagent2) {
      return this.result.precipitate?.color;
    }
    else if (this.reagent1) {
      return this.reagent1.color;
    }
    else if (this.reagent2) {
      return this.reagent2.color;
    }
    return 'transparent';
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
    this.result = {};
    this.reactionCompleted = false;
    this.selectIndicator.reset();
    this.selectImpact.reset();
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
