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
  nbMedalsPerCountry$: Observable<{ name: string; value: number }[]> = of([]);
  nBJOs: number = 0;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.nbMedalsPerCountry$ = this.olympicService.getTotalMedalsPerCountry();

    // pas terrible... On considère que le nombre de JOs participé est le même pour chaque pays.
    // A défaut, faut t'il considérer le nombre de JO, et donc d'année différentes présentes dans le fichier source ?
    this.olympicService
      .getMedalsPerYear('France')
      .subscribe((MedalsPerYear) => {
        this.nBJOs = MedalsPerYear.length;
      });
  }
}
