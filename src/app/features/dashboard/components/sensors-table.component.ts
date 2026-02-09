import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableComponent } from '../../../ui/table/table.component';
import { ThDirective, TdDirective, TrDirective } from '../../../ui/table/table.directives';
import { Sensor } from '../../../core/api/models';

@Component({
  selector: 'app-sensors-table',
  standalone: true,
  imports: [CommonModule, TableComponent, ThDirective, TdDirective, TrDirective],
  template: `
    <app-table>
      <thead class="border-b">
        <tr>
          <th appTh>Sensor ID</th>
          <th appTh>Avg temp (°C)</th>
          <th appTh class="text-right">Reading count</th>
        </tr>
      </thead>

      <tbody>
        <tr
          appTr
          [clickable]="true"
          *ngFor="let s of sensors"
          (click)="selectSensor.emit(s.id)"
          [class.bg-slate-50]="s.id === selectedId"
        >
          <td appTd class="font-medium text-slate-800">{{ s.name }}</td>
          <td appTd>{{ s.avgTempC.toFixed(1) }}</td>
          <td appTd class="text-right">{{ s.readingCount }}</td>
        </tr>
      </tbody>
    </app-table>
  `,
})
export class SensorsTableComponent {
  @Input() sensors: Sensor[] = [];
  @Input() selectedId: string | null = null;
  @Output() selectSensor = new EventEmitter<string>();
}
