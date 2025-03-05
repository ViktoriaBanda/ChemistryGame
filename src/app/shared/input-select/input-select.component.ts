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

  @Input() disabled: boolean = false;
  @Input() items: Array<any>; // массив иконка - название
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
  }

  changeVisability(): void {
    this.listVisability = !this.listVisability;
  }

  onSelectItem(item: string): void {
    this.selectedItem = item;
    this.selectItem.emit(item);
    this.changeVisability();
  }

  reset(): void {
    this.selectedItem = null;
  }

  svg = {
    'Лакмус': ` <svg width="50px" height="60px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999">
      <path style="fill:#EDEEF0;"
            d="M230.135,163.994l78.389,78.389L167.489,383.418l-99.093,20.704L89.1,305.03L230.135,163.994z"/>
      <polygon style="fill:#DCDEE2;" points="308.523,242.383 269.329,203.188 68.396,404.121 167.488,383.416 "/>
      <path style="fill:#444242;"
            d="M228.311,165.816L377.919,16.209c21.612-21.612,56.777-21.612,78.388,0  c21.612,21.612,21.612,56.777,0,78.389L306.699,244.205L228.311,165.816z"/>
      <g>
        <path style="fill:#3A3839;"
              d="M456.308,94.597c21.612-21.612,21.612-56.777,0-78.389L267.506,205.01l39.194,39.194L456.308,94.597   z"/>

        <rect x="221.538" y="178.162" transform="matrix(0.7071 0.7071 -0.7071 0.7071 219.4007 -138.5644)"
              style="fill:#3A3839;" width="110.849" height="34.791"/>
      </g>
      <rect x="268.825" y="197.771" transform="matrix(0.7071 0.7071 -0.7071 0.7071 239.0002 -146.6642)"
            style="fill:#262626;" width="55.429" height="34.791"/>
      <rect x="196.918" y="202.78" transform="matrix(0.7071 0.7071 -0.7071 0.7071 229.5967 -113.9457)"
            style="fill:#DCDEE2;" width="110.849" height="34.791"/>
      <rect x="244.231" y="222.364" transform="matrix(0.7071 0.7071 -0.7071 0.7071 249.1867 -122.0708)"
            style="fill:#B7B9C0;" width="55.429" height="34.791"/>
      <rect x="191.506" y="189.585" transform="matrix(0.7071 0.7071 -0.7071 0.7071 224.4968 -126.2455)"
            style="fill:#444242;" width="146.269" height="36.568"/>
      <polygon style="fill:rgba(138, 43, 226, 1);"
               points="237.382,276.433 154.472,359.343 102.267,370.25 203.865,268.652 170.349,260.871   113.174,318.046 102.267,370.25 154.472,359.343 "/>
      <polygon style="fill:rgba(138, 43, 226, 1);" points="102.267,370.25 154.472,359.343 237.382,276.433 203.865,268.652 "/>
      <path style="fill:rgba(138, 43, 226, 1);"
            d="M68.396,428.389c0,0,28.914,32.061,28.914,54.696c0,15.969-12.946,28.914-28.914,28.914  s-28.914-12.946-28.914-28.914C39.482,460.45,68.396,428.389,68.396,428.389z"/>
      <path style="fill:rgba(138, 43, 226, 1);"
            d="M68.396,428.389c0,0,28.914,32.061,28.914,54.696c0,15.969-12.946,28.914-28.914,28.914  C68.396,491.127,68.396,428.389,68.396,428.389z"/>
      <rect x="253.937" y="215.449" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 330.6512 604.426)"
            style="fill:#3A3839;" width="73.139" height="36.568"/>
    </svg>`,
    'Фенолфталеин': ` <svg width="50px" height="60px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999">
      <path style="fill:#EDEEF0;"
            d="M230.135,163.994l78.389,78.389L167.489,383.418l-99.093,20.704L89.1,305.03L230.135,163.994z"/>
      <polygon style="fill:#DCDEE2;" points="308.523,242.383 269.329,203.188 68.396,404.121 167.488,383.416 "/>
      <path style="fill:#444242;"
            d="M228.311,165.816L377.919,16.209c21.612-21.612,56.777-21.612,78.388,0  c21.612,21.612,21.612,56.777,0,78.389L306.699,244.205L228.311,165.816z"/>
      <g>
        <path style="fill:#3A3839;"
              d="M456.308,94.597c21.612-21.612,21.612-56.777,0-78.389L267.506,205.01l39.194,39.194L456.308,94.597   z"/>

        <rect x="221.538" y="178.162" transform="matrix(0.7071 0.7071 -0.7071 0.7071 219.4007 -138.5644)"
              style="fill:#3A3839;" width="110.849" height="34.791"/>
      </g>
      <rect x="268.825" y="197.771" transform="matrix(0.7071 0.7071 -0.7071 0.7071 239.0002 -146.6642)"
            style="fill:#262626;" width="55.429" height="34.791"/>
      <rect x="196.918" y="202.78" transform="matrix(0.7071 0.7071 -0.7071 0.7071 229.5967 -113.9457)"
            style="fill:#DCDEE2;" width="110.849" height="34.791"/>
      <rect x="244.231" y="222.364" transform="matrix(0.7071 0.7071 -0.7071 0.7071 249.1867 -122.0708)"
            style="fill:#B7B9C0;" width="55.429" height="34.791"/>
      <rect x="191.506" y="189.585" transform="matrix(0.7071 0.7071 -0.7071 0.7071 224.4968 -126.2455)"
            style="fill:#444242;" width="146.269" height="36.568"/>
      <polygon style="rgba(255, 255, 255, 0.6)"
               points="237.382,276.433 154.472,359.343 102.267,370.25 203.865,268.652 170.349,260.871   113.174,318.046 102.267,370.25 154.472,359.343 "/>
      <polygon style="rgba(255, 255, 255, 0.6)" points="102.267,370.25 154.472,359.343 237.382,276.433 203.865,268.652 "/>
      <path style="rgba(255, 255, 255, 0.6)"
            d="M68.396,428.389c0,0,28.914,32.061,28.914,54.696c0,15.969-12.946,28.914-28.914,28.914  s-28.914-12.946-28.914-28.914C39.482,460.45,68.396,428.389,68.396,428.389z"/>
      <path style="rgba(255, 255, 255, 0.6)"
            d="M68.396,428.389c0,0,28.914,32.061,28.914,54.696c0,15.969-12.946,28.914-28.914,28.914  C68.396,491.127,68.396,428.389,68.396,428.389z"/>
      <rect x="253.937" y="215.449" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 330.6512 604.426)"
            style="fill:#3A3839;" width="73.139" height="36.568"/>
    </svg>`,
    'Метилоранж': ` <svg width="50px" height="60px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999">
      <path style="fill:#EDEEF0;"
            d="M230.135,163.994l78.389,78.389L167.489,383.418l-99.093,20.704L89.1,305.03L230.135,163.994z"/>
      <polygon style="fill:#DCDEE2;" points="308.523,242.383 269.329,203.188 68.396,404.121 167.488,383.416 "/>
      <path style="fill:#444242;"
            d="M228.311,165.816L377.919,16.209c21.612-21.612,56.777-21.612,78.388,0  c21.612,21.612,21.612,56.777,0,78.389L306.699,244.205L228.311,165.816z"/>
      <g>
        <path style="fill:#3A3839;"
              d="M456.308,94.597c21.612-21.612,21.612-56.777,0-78.389L267.506,205.01l39.194,39.194L456.308,94.597   z"/>

        <rect x="221.538" y="178.162" transform="matrix(0.7071 0.7071 -0.7071 0.7071 219.4007 -138.5644)"
              style="fill:#3A3839;" width="110.849" height="34.791"/>
      </g>
      <rect x="268.825" y="197.771" transform="matrix(0.7071 0.7071 -0.7071 0.7071 239.0002 -146.6642)"
            style="fill:#262626;" width="55.429" height="34.791"/>
      <rect x="196.918" y="202.78" transform="matrix(0.7071 0.7071 -0.7071 0.7071 229.5967 -113.9457)"
            style="fill:#DCDEE2;" width="110.849" height="34.791"/>
      <rect x="244.231" y="222.364" transform="matrix(0.7071 0.7071 -0.7071 0.7071 249.1867 -122.0708)"
            style="fill:#B7B9C0;" width="55.429" height="34.791"/>
      <rect x="191.506" y="189.585" transform="matrix(0.7071 0.7071 -0.7071 0.7071 224.4968 -126.2455)"
            style="fill:#444242;" width="146.269" height="36.568"/>
      <polygon style="fill:rgba(255, 165, 0, 1)"
               points="237.382,276.433 154.472,359.343 102.267,370.25 203.865,268.652 170.349,260.871   113.174,318.046 102.267,370.25 154.472,359.343 "/>
      <polygon style="fill:rgba(255, 165, 0, 1)" points="102.267,370.25 154.472,359.343 237.382,276.433 203.865,268.652 "/>
      <path style="fill:rgba(255, 165, 0, 1)"
            d="M68.396,428.389c0,0,28.914,32.061,28.914,54.696c0,15.969-12.946,28.914-28.914,28.914  s-28.914-12.946-28.914-28.914C39.482,460.45,68.396,428.389,68.396,428.389z"/>
      <path style="fill:rgba(255, 165, 0, 1)"
            d="M68.396,428.389c0,0,28.914,32.061,28.914,54.696c0,15.969-12.946,28.914-28.914,28.914  C68.396,491.127,68.396,428.389,68.396,428.389z"/>
      <rect x="253.937" y="215.449" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 330.6512 604.426)"
            style="fill:#3A3839;" width="73.139" height="36.568"/>
    </svg>`,
  }
  getPageTypeSvg(type: string) {
    let typeSvg = this.svg[type];
    if (typeSvg) {
      return this.sanitizer.bypassSecurityTrustHtml(typeSvg);
    }
    return '';
  }

}
