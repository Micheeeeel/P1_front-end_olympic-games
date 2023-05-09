import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { LegendPosition } from '@swimlane/ngx-charts';
import { ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @Input() countryName!: string;
  @Input() data: { name: string; value: number }[] = [];
  dataSeries: { name: string; series: { name: string; value: number }[] }[] =
    [];

  view: [number, number] = [500, 200];

  // options
  legend: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Below;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Medals';
  timeline: boolean = false;
  showGridLines: boolean = true;
  autoScale: boolean = false;
  showRefLines: boolean = true;
  showRefLabels: boolean = true;
  schemeType: ScaleType = ScaleType.Ordinal;
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  // colorScheme = {
  //   domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  // };
  tooltipDisabled: boolean = false;

  constructor(private router: Router) {
    // Object.assign(this, { dataList: this.dataSeries });
  }

  ngOnInit(): void {
    // create an array of objects of only one object:
    const objectData = {
      name: this.countryName,
      series: this.data,
    };

    this.dataSeries.push(objectData);
  }

  /**
   * Formats a numeric date value into a year string using the Intl.DateTimeFormat API.
   *
   * @param val The numeric date value to format.
   * @returns A string representing the year of the date value.
   */
  dateTickFormatting(val: number): string {
    // Convert the numeric value to a timestamp
    const timestamp = Date.parse(val.toString());
    // Create a new Date object from the timestamp
    const date = new Date(timestamp);
    // Use the Intl.DateTimeFormat API to format the year from the date object
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(
      date
    );
    return year;
  }

  // onClick(): void {
  //   console.log(this.dataSeries[0].name);
  //   this.dataSeries[0].series.forEach((item) => {
  //     console.log('name:', item.name);
  //     console.log('value:', item.value);
  //   });
  // }
}
