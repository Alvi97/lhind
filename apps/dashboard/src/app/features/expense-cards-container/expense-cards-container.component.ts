import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OnDemandCacheService } from '../../services/on-demand-cache.service';
import { carRental } from '../../utils/car-rental-data';
import { ExpenseCard } from '../../utils/expense-cards.model';
import { combineLatest, map, Observable } from 'rxjs';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'lhind-expense-cards-container',
  standalone:true,
  imports: [CommonModule,MatCardModule,MatIconModule],
  templateUrl: './expense-cards-container.component.html',
  styleUrl: './expense-cards-container.component.css',
})
export class ExpenseCardsContainerComponent {

  public onDemandCacheService = inject(OnDemandCacheService);
  selectedTrip$: Observable<Trip | null> = this.onDemandCacheService.selectedTrip$;
  public selectedItem:string = '';
  public filteredCards$: Observable<ExpenseCard[]>;

  constructor() {
    this.filteredCards$ = this.buildFilteredCards();
  }

  public cards :ExpenseCard[]= [
    { icon: 'flight', name: 'Flight',ident:'flight' ,expenseData:this.onDemandCacheService.currentFlights$},
    { icon: 'hotel', name: 'Hotels',ident:'hotel',expenseData:this.onDemandCacheService.currentHotels$ },
    { icon: 'directions_car', name: 'Car Rentals',ident:'carRental',expenseData:this.onDemandCacheService.currentCarRental$ },
    { icon: 'taxi', name: 'Taxi',ident:'taxi',expenseData:this.onDemandCacheService.currentTaxis$ },
  ];

  private buildFilteredCards(): Observable<ExpenseCard[]> {
    return combineLatest([
      this.selectedTrip$,
      this.onDemandCacheService.selectedOnDemandTypeSubject$,
    ]).pipe(
      map(([selectedTrip, currentType]) => {
        return this.cards.map((card) => {
          if (card.name === currentType) {
            card.expenseData.pipe(
              map((expenseData) => {
                if (!selectedTrip) {
                  this.onDemandCacheService.currentOnDemandDataSubject.next([]);
                  return [];
                }
                const filteredData = expenseData.filter(
                  (expense: any) => expense.tripId === selectedTrip.id
                );
                this.onDemandCacheService.currentOnDemandDataSubject.next(filteredData);
                return filteredData;
              })
            ).subscribe();
          }

          return {
            ...card,
            expenseData: card.expenseData.pipe(
              map((expenseData) => {
                if (!selectedTrip) {
                  return [];
                }
                return expenseData.filter(
                  (expense: any) => expense.tripId === selectedTrip.id
                );
              })
            ),
          };
        });
      })
    );
  }

  public selectType(item:ExpenseCard){

  this.onDemandCacheService.currentOnDemandElementSubject.next(null);
  if (this.selectedItem === item.ident) {
    this.onDemandCacheService.resetToTrips();
    this.selectedItem = '';
    return;
  }
    switch (item.ident){
      case 'carRental':
        this.selectedItem = item.ident;
        this.onDemandCacheService.selectedOnDemandTypeSubject.next(item.name);
        const carRental = this.onDemandCacheService.carRentals;
       const filteredCarRentalData = this.buildFilteredOnTripData(carRental);
        this.onDemandCacheService.currentOnDemandDataSubject.next(filteredCarRentalData);
        break;

      case 'flight':
        this.selectedItem = item.ident;
        this.onDemandCacheService.selectedOnDemandTypeSubject.next(item.name);
        const flights = this.onDemandCacheService.getFlights;
        const filteredFlightData = this.buildFilteredOnTripData(flights);
        this.onDemandCacheService.currentOnDemandDataSubject.next(filteredFlightData);
        break;

      case 'hotel':
        this.selectedItem = item.ident;
        this.onDemandCacheService.selectedOnDemandTypeSubject.next(item.name);
        const hotels = this.onDemandCacheService.getHotels;
        const filteredHotelData = this.buildFilteredOnTripData(hotels);
        this.onDemandCacheService.currentOnDemandDataSubject.next(filteredHotelData);
        break;

      case 'taxi':
        this.selectedItem = item.ident;
        this.onDemandCacheService.selectedOnDemandTypeSubject.next(item.name);
        const taxiData = this.onDemandCacheService.getTaxis;
        const filteredTaxiData = this.buildFilteredOnTripData(taxiData);
        this.onDemandCacheService.currentOnDemandDataSubject.next(filteredTaxiData);
        break;
    }
  }

  private buildFilteredOnTripData(data: any[]): any[] {
    const selectedTrip = this.onDemandCacheService.selectedTrip;

    if (!selectedTrip) {
      console.warn('No selected trip available for filtering.');
      return [];
    }

    return data.filter((item) => item.tripId === selectedTrip.id);
  }

}
