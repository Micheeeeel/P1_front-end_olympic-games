import { Component, OnInit, Input } from '@angular/core';
import { LegendPosition, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input() dataList: { name: string; value: number }[] = [];

  view: [number, number] = [500, 500];
  // colorScheme: Color = {
  //   name: 'custom',
  //   selectable: true,
  //   group: ScaleType.Linear,
  //   domain: [
  //     '#5AA454',
  //     '#A10A28',
  //     '#C7B42C',
  //     '#AAAAAA',
  //     '#8c6d31',
  //     '#e8175d',
  //     '#474747',
  //     '#9c27b0',
  //   ],
  // };
  gradient: boolean = true;
  legend: boolean = false;
  // legendPosition: LegendPosition = LegendPosition.Below;
  explodeSlices: boolean = false;
  arcWidth: number = 0.3;
  tooltipDisabled: boolean = false;
  labels: boolean = true;
  doughnut: boolean = false;
  showLegend: boolean = false;

  constructor() {
    Object.assign(this, { dataList: this.dataList });
  }

  onSelect(data: { name: string; value: number }): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  // onActivate(data): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }

  ngOnInit(): void {}
}
