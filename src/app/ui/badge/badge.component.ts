import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="klass">
      <ng-content></ng-content>
    </span>
  `,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'neutral';

  get klass() {
    const map: Record<BadgeVariant, string> = {
      neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
      success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
      warning: 'bg-amber-50 text-amber-800 ring-amber-200',
      danger: 'bg-rose-50 text-rose-700 ring-rose-200',
      info: 'bg-blue-50 text-blue-700 ring-blue-200',
    };

    return ['inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1', map[this.variant]].join(' ');
  }
}
