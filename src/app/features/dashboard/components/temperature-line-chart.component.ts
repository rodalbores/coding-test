import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { ReadingPoint } from '../../../core/api/models';

@Component({
  selector: 'app-temperature-line-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="w-full" style="height: 240px">
      <canvas baseChart [data]="chartData" [options]="chartOptions" [type]="chartType"></canvas>
    </div>
  `,
})
export class TemperatureLineChartComponent implements OnInit, OnChanges {
  @Input() data: ReadingPoint[] = [];

  chartType = 'line' as const;
  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Temperature (°C)',
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: false,
        pointRadius: 0,
      },
    ],
  };
  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false, // Disable all animations
    transitions: {
      active: {
        animation: {
          duration: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#e2e8f0',
        },
        border: {
          display: false,
        },
      },
    },
  };

  ngOnInit() {
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  private updateChart() {
    if (!this.data || this.data.length === 0) {
      this.chartData = {
        labels: [],
        datasets: [
          {
            ...this.chartData.datasets[0],
            data: [],
          },
        ],
      };
      return;
    }

    const labels = this.data.map((point) => {
      const date = new Date(point.ts);
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    });

    this.chartData = {
      labels,
      datasets: [
        {
          ...this.chartData.datasets[0],
          data: this.data.map((point) => point.tempC),
        },
      ],
    };
  }
}
