import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'c-select-item',
  templateUrl: './c-select-item.component.html',
  styleUrls: ['./c-select-item.component.scss'],
})
export class CSelectItemComponent implements OnInit {
  constructor() {}

  @Input() titulo: string;
  @Input() selected: boolean;
  @Input() color?: string;
  @Input() iconName?: string = 'radio_button_unchecked';
  @Input() checkedIcon?: string = 'check_circle';

  ngOnInit(): void {}
}
