import { Component, OnInit, Input } from '@angular/core';
// import { Olympic } from '../core/models/Olympic';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';
import { Olympic } from '../core/models/Olympic';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  // @Input() olympic!: Olympic;

  olympic$: Observable<Olympic | undefined> = of(undefined);
  nbMedalsPerYear$: Observable<{ name: number; value: number }[]> = of([]);

  constructor(
    private olympicService: OlympicService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // if (this.olympic && this.olympic.country) {
    //   this.nbMedalsPerYear$ = this.olympicService.getMedalsPerYear(
    //     this.olympic.country
    //   );
    // }

    const snappedCountry = this.activatedRoute.snapshot.params['countryName'];
    this.olympic$ = this.olympicService.getOlympicByCountry(snappedCountry);
  }
}
