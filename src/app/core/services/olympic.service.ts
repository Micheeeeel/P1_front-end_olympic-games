import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';
import { __values } from 'tslib';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getListOfCountries() {
    return this.olympics$.asObservable().pipe(
      map((value) => {
        const countries = value?.map((olympic) => olympic.country);
        return countries;
      })
    );
  }

  getMedalsPerYear(
    country: String
  ): Observable<{ year: number; medalsCount: number }[]> {
    return this.olympics$
      .asObservable()
      .pipe(
        map((olympics) =>
          this.mapOlympicsToMedalsPerYear(
            olympics?.find((o) => o.country === country)
          )
        )
      );
  }

  private mapOlympicsToMedalsPerYear(
    olympic: Olympic | undefined
  ): { year: number; medalsCount: number }[] {
    if (!olympic) {
      return [];
    }

    return olympic.participations.map((participation) => ({
      year: participation.year,
      medalsCount: participation.medalsCount,
    }));
  }

  getTotalMedalsPerCountry(): Observable<
    { country: string; totalMedals: number }[]
  > {
    return this.olympics$
      .asObservable()
      .pipe(map((olympics) => this.mapOlympicsToTotalMedals(olympics)));
  }

  private mapOlympicsToTotalMedals(
    olympics: Olympic[] | undefined
  ): { country: string; totalMedals: number }[] {
    if (!olympics) {
      return [];
    }

    return olympics.map((olympic: Olympic) => {
      const totalMedals = this.getTotalMedalsForCountry(olympic);
      return {
        country: olympic.country,
        totalMedals,
      };
    });
  }

  private getTotalMedalsForCountry(olympic: Olympic): number {
    return olympic.participations.reduce(
      (sum, participation) => sum + participation.medalsCount,
      0
    );
  }
}
