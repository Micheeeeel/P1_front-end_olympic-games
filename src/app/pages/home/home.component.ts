import { Component, OnDestroy, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  nBJOs: number = 0;
  private olympicsSubscription!: Subscription;
  private totalMedalsPerCountrySubscription!: Subscription;
  private medalsPerYearSubscription!: Subscription;
  
  totalMedalsPerCountry: { name: string; value: number }[] = [];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {

    this.olympicsSubscription = this.olympicService.loadInitialData().subscribe((olympics) => {
      this.totalMedalsPerCountrySubscription = this.olympicService
      .getTotalMedalsPerCountry()
      .subscribe((olympicValue) => {
        this.totalMedalsPerCountry = olympicValue;
      });
  
      // pas terrible... On considère que le nombre de JOs participé est le même pour chaque pays.
      // A défaut, faut t'il considérer le nombre de JO, et donc d'année différentes présentes dans le fichier source ?
      this.medalsPerYearSubscription = this.olympicService 
        .getMedalsPerYear('France')
        .subscribe((MedalsPerYear) => {
          this.nBJOs = MedalsPerYear.length;
        });
      });  



  }

  ngOnDestroy(): void {
    this.totalMedalsPerCountrySubscription.unsubscribe();
    this.medalsPerYearSubscription.unsubscribe();
    this.olympicsSubscription.unsubscribe();
  }

}
