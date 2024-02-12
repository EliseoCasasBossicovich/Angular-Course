import { Component, Input } from '@angular/core';

@Component({
  selector: 'iga-title',
  templateUrl: './iga-title.component.html',
  styleUrl: './iga-title.component.scss',
})
export class IgaTitleComponent {
  @Input() titleText: string;

  constructor() {
    this.titleText = '';
  }
}
