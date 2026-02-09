import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type BtnVariant = 'primary' | 'secondary' | 'ghost';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button type="button" [ngClass]="klass" [disabled]="disabled">
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: BtnVariant = 'secondary';
  @Input() disabled = false;

  get klass() {
    const base =
      'inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition ' +
      'disabled:opacity-50 disabled:cursor-not-allowed';

    const map: Record<BtnVariant, string> = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50',
      ghost: 'text-slate-700 hover:bg-slate-100',
    };

    return `${base} ${map[this.variant]}`;
  }
}
