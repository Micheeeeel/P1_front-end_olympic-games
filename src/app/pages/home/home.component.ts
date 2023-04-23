import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  olympics$: Observable<Olympic[]> = of([]);
  listOfCountries$: Observable<string[]> = of([]);
  nbMedalsPerCountry$: Observable<{ country: string; totalMedals: number }[]> =
    of([]);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.listOfCountries$ = this.olympicService.getListOfCountries();
    this.nbMedalsPerCountry$ = this.olympicService.getTotalMedalsPerCountry();
  }
}
