import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'select-input',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
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
export class InputSelectComponent implements OnInit {
  listVisability: boolean = false;
  defaultRender = false;

  @Input() disabled: boolean = false;
  @Input() items: Array<any>;
  @Input() selectedItem: any;
  @Input() nameOfDict: string;
  @Input() placeholder: string = 'Выберите вариант';
  @Output() selectItem = new EventEmitter<any>();

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

    if (!this.selectedItem?.icon){
      this.defaultRender = true;
    }
  }

  changeVisability(): void {
    this.listVisability = !this.listVisability;
  }

  onSelectItem(item: string): void {
    this.selectedItem = item;
    this.selectItem.emit(item);
    this.changeVisability();
  }

  svg = {
    'Video': `<svg class="icon" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
    </svg>`,
    'Article': `<svg class="icon" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>`,
    'HomeWork': `<svg class="icon" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 16" stroke-width="1" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M1 5.9987L7 1.33203L13 5.9987V13.332C13 13.6857 12.8595 14.0248 12.6095 14.2748C12.3594 14.5249 12.0203 14.6654 11.6667 14.6654H2.33333C1.97971 14.6654 1.64057 14.5249 1.39052 14.2748C1.14048 14.0248 1 13.6857 1 13.332V5.9987Z" />
    </svg>`,
    'Test': `<svg class="icon" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" stroke-width="1" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 7.33464L8 9.33464L14.6667 2.66797" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M14 8V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H10.6667" />
    </svg>`,
    'Link': `<svg class="icon" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 425.2 425.2" stroke-width="1" stroke="currentColor">
      <path fill="currentColor" d="M230,104.2c0-18.8,0.1-36.9-0.1-55c-0.1-6.4,0.7-12.1,7.2-15.1c6.4-2.9,11.1,0.4,15.7,4.6c44.9,40.3,90,80.5,135,120.7   c6.6,5.9,6.6,13.5,0,19.4c-45.6,40.7-91.2,81.4-136.7,122.1c-4.2,3.7-8.8,5.3-14.1,2.9c-5.3-2.4-7.1-6.9-7.1-12.5   c0.1-18.9,0-37.7,0-57.4c-6.4,0.4-12.6,0.5-18.7,1.2c-36.9,4.4-68,20.6-94.4,46.3c-28.7,28-46.9,62.1-57.9,100.4   c-0.3,1-0.5,1.9-0.8,2.9c-1.9,5.5-6.9,8.8-12.4,8.3c-5.6-0.5-9.8-4.6-10.7-10.4C28.7,337.8,33.5,294.3,49,252   c14.9-40.7,37.8-76.2,70.8-104.6c23.6-20.3,50.4-34.6,81.2-40.4c7.9-1.5,16.1-1.9,24.2-2.8C226.6,104,228.1,104.2,230,104.2z    M58,319.1c0.8-0.6,1.1-0.7,1.2-0.9c0.5-0.7,0.9-1.5,1.3-2.2c11.4-20,25.1-38.2,41.9-54c38.9-36.2,84.4-54.7,138-51.3   c9,0.6,13.5,5.2,13.5,14.1c0,12.5,0,25,0,37.5c0,1.1,0.1,2.1,0.2,3.8c36.5-32.6,72.4-64.8,108.6-97.1   c-36.3-32.4-72.2-64.4-109-97.2c0,2.4,0,3.7,0,5.1c0,12.6,0.1,25.2,0,37.9c-0.1,8.6-5.2,13.5-13.7,13.2   c-38.8-1.2-73.1,11.3-102.8,35.7C88.7,203.7,65.8,257.2,58,319.1z" />
    </svg>`,
    'FeedBack': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M11 5.882V19.24C10.9997 19.6545 10.8531 20.0555 10.5861 20.3725C10.3191 20.6896 9.9488 20.9022 9.54041 20.9729C9.13203 21.0437 8.71178 20.968 8.35369 20.7593C7.99561 20.5506 7.72267 20.2222 7.58297 19.832L5.43597 13.682M5.43597 13.682C4.58719 13.3211 3.88915 12.6791 3.46 11.8627C3.03084 11.0463 2.89692 10.1067 3.0809 9.2029C3.26488 8.29912 3.75546 7.48665 4.46962 6.903C5.18378 6.31935 6.07765 6.00035 6.99997 6H8.83197C12.932 6 16.457 4.766 18 3V17C16.457 15.234 12.933 14 8.83197 14H6.99997C6.4626 14.0008 5.93062 13.892 5.43597 13.682ZM18 13C18.7956 13 19.5587 12.6839 20.1213 12.1213C20.6839 11.5587 21 10.7956 21 10C21 9.20435 20.6839 8.44129 20.1213 7.87868C19.5587 7.31607 18.7956 7 18 7V13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  }
  getPageTypeSvg(type: string) {
    let typeSvg = this.svg[type];
    if (typeSvg){
      return this.sanitizer.bypassSecurityTrustHtml(typeSvg);
    }
    return '';
  }

}
