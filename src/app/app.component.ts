import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    //the subscribe() method is called on the Observable to initiate the subscription.
    //the take(1) operator ensures that the subscription only receives one value and then unsubscribes automatically.
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }
}
