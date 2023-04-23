import { Component, OnInit, Input } from '@angular/core';
import { Olympic } from '../core/models/Olympic';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  @Input() country!: Olympic;

  nbMedalsPerYear$: Observable<{ year: number; medalsCount: number }[]> = of(
    []
  );

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    if (this.country && this.country.country) {
      this.nbMedalsPerYear$ = this.olympicService.getMedalsPerYear(
        this.country.country
      );
    }
  }
}
