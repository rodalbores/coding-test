import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type Padding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section [ngClass]="cardClass">
      <ng-content></ng-content>
    </section>
  `,
})
export class CardComponent {
  @Input() padding: Padding = 'md';

  get cardClass() {
    const pad: Record<Padding, string> = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    return ['rounded-xl bg-white shadow-sm ring-1 ring-slate-200', pad[this.padding]].join(' ');
  }
}
