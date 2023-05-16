import { Component, OnInit, OnDestroy } from '@angular/core';
import { Input } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { ScaleType } from '@swimlane/ngx-charts';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Subscription } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnDestroy {
  @Input() countryName!: string;
  @Output() countryNotFound = new EventEmitter<boolean>();

  // @Input() data: { name: string; value: number }[] = [];
  nbMedalsPerYear: { name: string; value: number }[] = [];
  medalsPerYearSubscription!: Subscription;

  // options
  dataSeries: { name: string; series: { name: string; value: number }[] }[] =
    [];
  view: [number, number] = [500, 300];
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
  autoScale: boolean = true;
  showRefLines: boolean = true;
  showRefLabels: boolean = true;
  schemeType: ScaleType = ScaleType.Ordinal;
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  tooltipDisabled: boolean = false;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    // get the medals per year for the country to feed the chart
    this.medalsPerYearSubscription = this.olympicService
      .getMedalsPerYear(this.countryName)
      .subscribe((value) => {
        console.log(this.countryName);
        console.log(value); // Ajoutez cette ligne pour imprimer les données dans la console

        if (value.length === 0) {
          this.countryNotFound.emit(true); // emit an event to the parent component to navigate to the not-found page
        } else {
          this.nbMedalsPerYear = value;
        }
      });

    // create an array of objects of only one object:
    const objectData = {
      name: this.countryName,
      series: this.nbMedalsPerYear,
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

  onResize(event: any) {
    this.view = [event.target.innerWidth / 1.5, 300];
  }

  ngOnDestroy(): void {
    this.medalsPerYearSubscription.unsubscribe();
  }
}
