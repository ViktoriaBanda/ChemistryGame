import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IItemSelect } from "../../core/interfaces/item-select.interface";

@Component({
  selector: 'menu-select-input',
  templateUrl: './menu-input-select.component.html',
  styleUrls: ['./menu-input-select.component.scss'],
  animations: [
    trigger('openListTriger', [
      transition(':enter', [
        style({ height: 0}),
        animate('.2s', style({ height: '*' })),
      ]),
      transition(':leave', [
        animate('.2s', style({ height: 0 })),
      ]),
    ]),
    trigger('openListArrowTriger', [
      state('close', style({ transform: 'rotate(-90deg)' })),
      state('open', style({ transform: 'rotate(0deg)' })),
      transition('* <=> *', animate('0.3s')),
    ]),
    trigger('openListArrowColorTriger',[
      state('close', style({ stroke: '#6F727!important' })),
      state('open', style({ stroke: '#4c54f4!important' })),
      transition('* <=> *', animate('0.3s')),
    ])
  ]
})
export class MenuInputSelectComponent implements OnInit {
  listVisability: boolean = false;

  @Input() disabled: boolean = false;
  @Input() items: IItemSelect[];
  @Input() selectedItem: any;
  @Input() nameOfDict: string;
  @Input() placeholder: string = 'Выберите вариант';
  @Output() selectItem = new EventEmitter<IItemSelect>();

  @ViewChild('list') list: ElementRef;
  @ViewChild('head') head: ElementRef;
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    if (this.listVisability){
      if (!this.list.nativeElement.contains(event.target) &&
          !this.head.nativeElement.contains(event.target) ) {
        this.listVisability = false;
      }
    }
  }

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    if(!this.selectedItem && !this.placeholder) {
      this.selectedItem = this.items[0];
    }
  }

  changeVisability(): void {
    this.listVisability = !this.listVisability;
  }

  onSelectItem(item: IItemSelect): void {
    this.selectedItem = item;
    this.selectItem.emit(item);
    this.changeVisability();
  }

  reset(): void {
    this.selectedItem = null;
  }
}
