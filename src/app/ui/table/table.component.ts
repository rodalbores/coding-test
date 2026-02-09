import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-auto" [class.rounded-lg]="rounded" [class.ring-1]="ring" [class.ring-slate-200]="ring">
      <table class="w-full text-left text-sm">
        <ng-content></ng-content>
      </table>
    </div>
  `,
})
export class TableComponent {
  @Input() rounded = false; // usually false because the parent card is already rounded
  @Input() ring = false;
}
