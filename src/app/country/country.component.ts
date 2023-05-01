import { Component, OnInit, Input, OnDestroy } from '@angular/core';
// import { Olympic } from '../core/models/Olympic';
import {  Subscription,  } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit, OnDestroy {
  countryName: string = '';
  nbEntries: number | undefined = 0;
  TotalNbMedals: number = 0;
  TotalNbAthletes: number = 0;
  nbMedalsPerYear: { name: string; value: number }[] = [];
  private olympicsSubscription!: Subscription;
  medalsPerYearSubscription!: Subscription;
  olympicByCountrySubscription!: Subscription;

  constructor(
    private olympicService: OlympicService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.olympicsSubscription = this.olympicService.loadInitialData().subscribe((olympics) => {
      // get the country name from the route
    this.countryName = this.activatedRoute.snapshot.params['countryName'];

    // get the medals per year for the country to feed the chart
    this.medalsPerYearSubscription = this.olympicService.getMedalsPerYear(
      this.countryName
      ).subscribe((value) => {
        console.log(this.countryName);
        console.log(value); // Ajoutez cette ligne pour imprimer les données dans la console

        this.nbMedalsPerYear = value;
      });;

    // get various variables to show in the template for that country
    this.olympicByCountrySubscription = this.olympicService
      .getOlympicByCountry(this.countryName)
      .subscribe((olympicValue) => {
        this.nbEntries = olympicValue?.participations.length;
        this.TotalNbMedals =
          this.olympicService.getTotalMedalsForCountry(olympicValue);
        this.TotalNbAthletes =
          this.olympicService.getTotalAthletesForCountry(olympicValue);
      });
    }); 

    
  }

  ngOnDestroy(): void {
    this.medalsPerYearSubscription.unsubscribe();
    this.olympicByCountrySubscription.unsubscribe();
    this.olympicsSubscription.unsubscribe();
  }
}
