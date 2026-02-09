import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <app-card>
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="text-xs text-slate-500">{{ label }}</div>
          <div class="mt-2 text-2xl font-semibold tracking-tight">
            {{ value ?? '—' }}
          </div>
          @if (hint) {
            <div class="mt-1 text-xs text-slate-500">{{ hint }}</div>
          }
        </div>

        @if (rightSlot) {
          <div class="text-xs text-slate-500">
            <ng-content></ng-content>
          </div>
        }
      </div>
    </app-card>
  `,
})
export class KpiCardComponent {
  @Input() label = '';
  @Input() value: string | number | null = null;
  @Input() hint?: string;

  /** If you project content, set this to true to reserve space on the right */
  @Input() rightSlot = false;
}
