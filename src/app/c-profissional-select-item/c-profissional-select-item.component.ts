import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'c-profissional-select-item',
  templateUrl: './c-profissional-select-item.component.html',
  styleUrls: ['./c-profissional-select-item.component.scss'],
})
export class CProfissionalSelectItemComponent {
  @Input() id: number = -1;
  @Input() nome: string = 'a';
  @Input() sobrenome: string = 'a';
  @Input() nome_especialidade: string = 'a';
  @Input() selected: boolean;

  @Output() handleClick: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  click() {
    this.handleClick.emit(true);
  }
}
