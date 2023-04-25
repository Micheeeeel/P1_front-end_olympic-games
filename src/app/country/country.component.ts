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

  countryName: string = '';
  olympic$: Observable<Olympic | undefined> = of(undefined);
  nbMedalsPerYear$: Observable<{ name: string; value: number }[]> = of([]);
  // nbEntries$: Observable<number> = of(0);
  nbEntries: number | undefined = 0;
  TotalNbMedals: number = 0;
  TotalNbAthletes: number = 0;

  constructor(
    private olympicService: OlympicService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.countryName = this.activatedRoute.snapshot.params['countryName'];
    this.olympic$ = this.olympicService.getOlympicByCountry(this.countryName);

    if (this.olympic$) {
      this.nbMedalsPerYear$ = this.olympicService.getMedalsPerYear(
        this.countryName
      );
    }

    // this.nbMedalsPerYear$.subscribe((MedalsPerYear) => {
    //   console.log(MedalsPerYear);
    // });

    // this.nbEntries$ = this.olympicService.getParticipationCount(
    //   this.countryName
    // );

    this.olympicService
      .getOlympicByCountry(this.countryName)
      .subscribe((olympicValue) => {
        this.nbEntries = olympicValue?.participations.length;
        this.TotalNbMedals =
          this.olympicService.getTotalMedalsForCountry(olympicValue);
        this.TotalNbAthletes =
          this.olympicService.getTotalAthletesForCountry(olympicValue);
      });
  }
}
