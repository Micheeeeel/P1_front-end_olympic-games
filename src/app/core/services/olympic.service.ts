import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';
import { __values } from 'tslib';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

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
      catchError((error: HttpErrorResponse, caught) => {
        this.handleError(error);
        // Inform the user that something went wrong by updating the observable with an empty array
        this.olympics$.next([]);
        // return to the original observable to coninue the chain of observables
        return caught;
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getOlympicByCountry(countryName: string): Observable<Olympic | undefined> {
    return this.olympics$.asObservable().pipe(
      map((olympics) => {
        return olympics?.find((o) => o.country === countryName);
      })
    );
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
    countryName: String
  ): Observable<{ name: string; value: number }[]> {
    return this.olympics$
      .asObservable()
      .pipe(
        map((olympics) =>
          this.mapOlympicsToMedalsPerYear(
            olympics?.find((o) => o.country === countryName)
          )
        )
      );
  }

  private mapOlympicsToMedalsPerYear(
    olympic: Olympic | undefined
  ): { name: string; value: number }[] {
    if (!olympic) {
      return [];
    }

    return olympic.participations.map((participation) => ({
      name: participation.year,
      value: participation.medalsCount,
    }));
  }

  getTotalMedalsPerCountry(): Observable<{ name: string; value: number }[]> {
    return this.olympics$
      .asObservable()
      .pipe(map((olympics) => this.mapOlympicsToTotalMedals(olympics)));
  }

  private mapOlympicsToTotalMedals(
    olympics: Olympic[] | undefined
  ): { name: string; value: number }[] {
    if (!olympics) {
      return [];
    }

    return olympics.map((olympic: Olympic) => {
      const totalMedals = this.getTotalMedalsForCountry(olympic);
      return {
        name: olympic.country,
        value: totalMedals,
      };
    });
  }

  public getTotalMedalsForCountry(olympic: Olympic | undefined): number {
    if (!olympic) {
      return 0;
    } else if (olympic.participations) {
      return olympic.participations.reduce(
        (sum, participation) => sum + participation.medalsCount,
        0
      );
    } else return 0;
  }

  public getTotalAthletesForCountry(olympic: Olympic | undefined): number {
    if (!olympic) {
      return 0;
    } else if (olympic.participations) {
      return olympic.participations.reduce(
        (sum, participation) => sum + participation.athleteCount,
        0
      );
    } else return 0;
  }

  // getParticipationCount(countryName: string): Observable<number> {
  //   return this.getOlympicByCountry(countryName).pipe(
  //     map((olympic) => {
  //       if (olympic) {
  //         return olympic.participations.length;
  //       } else {
  //         return 0;
  //       }
  //     })
  //   );
  // }
}
