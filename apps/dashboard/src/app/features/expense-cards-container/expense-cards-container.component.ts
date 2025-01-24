import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OnDemandCacheService } from '../../services/on-demand-cache.service';
import { carRental } from '../../utils/car-rental-data';
import { ExpenseCard } from '../../utils/expense-cards.model';
import { flights } from '../../utils/flight-data';
import { hotels } from '../../utils/hotel-data';
import { taxiData } from '../../utils/taxi-data';

@Component({
  selector: 'lhind-expense-cards-container',
  standalone:true,
  imports: [CommonModule,MatCardModule,MatIconModule],
  templateUrl: './expense-cards-container.component.html',
  styleUrl: './expense-cards-container.component.css',
})
export class ExpenseCardsContainerComponent {

  public onDemandCacheService = inject(OnDemandCacheService);
  public selectedItem:string = '';
  public cards :ExpenseCard[]= [
    { icon: 'flight', name: 'Flight',ident:'flight' },
    { icon: 'hotel', name: 'Hotels',ident:'hotel' },
    { icon: 'directions_car', name: 'Car Rentals',ident:'carRental' },
    { icon: 'taxi', name: 'Taxi',ident:'taxi' },
  ];

  public selectType(item:ExpenseCard){
  this.onDemandCacheService.currentOnDemandElementSubject.next(null);
  if (this.selectedItem === item.ident) {
    this.onDemandCacheService.resetToTrips();
    this.selectedItem = '';
    return;
  }
    switch (item.ident){
      case 'carRental' :
        this.selectedItem = item.ident;
        this.onDemandCacheService.selectedOnDemandTypeSubject.next(item.name)
        this.onDemandCacheService.currentOnDemandDataSubject.next(carRental);
        break;
      case 'flight' :
        this.selectedItem = item.ident;
        this.onDemandCacheService.selectedOnDemandTypeSubject.next(item.name)
        this.onDemandCacheService.currentOnDemandDataSubject.next(flights);
        break;
      case 'hotel' :
        this.selectedItem = item.ident;
        this.onDemandCacheService.selectedOnDemandTypeSubject.next(item.name)
        this.onDemandCacheService.currentOnDemandDataSubject.next(hotels);
        break;
      case 'taxi' :
        this.selectedItem = item.ident;
        this.onDemandCacheService.selectedOnDemandTypeSubject.next(item.name)
        this.onDemandCacheService.currentOnDemandDataSubject.next(taxiData);
        break;
    }
  }

  private fallbackToTripList() {

  }
}
