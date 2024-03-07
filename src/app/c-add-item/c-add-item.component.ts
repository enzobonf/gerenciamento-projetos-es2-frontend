import { Component, Input } from '@angular/core';

@Component({
  selector: 'c-add-item',
  templateUrl: './c-add-item.component.html',
  styleUrls: ['./c-add-item.component.scss'],
})
export class CAddItemComponent {
  @Input() titulo?: string = 'Adicionar';
  ngOnInit(): void {}
}
