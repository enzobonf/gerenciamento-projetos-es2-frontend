import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'c-open-filter-button',
  templateUrl: './c-open-filter-button.component.html',
  styleUrls: ['./c-open-filter-button.component.scss'],
})
export class COpenFilterButtonComponent implements OnInit {
  @Input() title = '';
  @Input() value?: string | null = null;
  @Input() selected: boolean | undefined = undefined;
  @Input() icon?: string | null = null;
  @Input() disabled?: boolean = false;

  @Output() handleClick: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.handleClick.emit(true);
  }
}
