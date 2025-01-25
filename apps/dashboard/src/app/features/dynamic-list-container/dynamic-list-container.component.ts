import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionDirective } from '../../directives/permission.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatMiniFabButton } from '@angular/material/button';
import { Permission } from '../../models/user.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { OnDemandCacheService } from '../../services/on-demand-cache.service';
import { DynamicAccordionDisplayComponent } from './dynamic-accordion-display/dynamic-accordion-display.component';
import { Trip, TripData } from '../../models/trip.model';
import { deepEqual } from '../../utils/deepCompare';
import { CarRentalData } from '../../models/car-rental.model';
import { HotelData } from '../../models/hotel.model';
import { UserService } from '@lhind/data-access-user';
import { FlightData } from '../../models/flight.model';
import { TaxiData } from '../../models/taxi.model';
import { FinanceStatus, TripStatus } from '../../utils/trip-data';

export const broadcastChannel = new BroadcastChannel('demo-broadcast-channel');

@Component({
  selector: 'lhind-dynamic-list-container',
  imports: [CommonModule, PermissionDirective, MatIconModule, MatButtonModule, MatMiniFabButton, MatExpansionModule, DynamicAccordionDisplayComponent],
  standalone:true,
  templateUrl: './dynamic-list-container.component.html',
  styleUrl: './dynamic-list-container.component.css',
})
export class DynamicListContainerComponent<T> implements OnInit{

  public OnDemandCacheService = inject(OnDemandCacheService);
  public userService = inject(UserService);
  private bc = new BroadcastChannel('test_channel');
  ngOnInit(){
    broadcastChannel.onmessage = (ev) => {
      if(ev.data === 'selectElement') {
        const element = this.OnDemandCacheService.getFromStorage('selectedElement');
        this.OnDemandCacheService.currentOnDemandElementSubject.next(element);
        this.OnDemandCacheService.selectedTripSubject.next(element as Trip) ;
      }
    }

  }

  public selectElement(element: object) {
    localStorage.setItem('selectedElement', JSON.stringify(element));
    broadcastChannel.postMessage('selectElement')
    if (this.OnDemandCacheService.selectedonDemandType === 'Trips') {
      const currentTrip = this.OnDemandCacheService.selectedTripSubject.getValue();
      const isTripSelectedAgain = currentTrip && deepEqual(element, currentTrip);

      if (isTripSelectedAgain) {
        this.OnDemandCacheService.selectedTripSubject.next(null);
      } else {
        this.OnDemandCacheService.selectedTripSubject.next(element as Trip);
      }
    }
    const isSelectedAgain = deepEqual(
      element,
      this.OnDemandCacheService.currentOnDemandElementSubject.value
    );

    if (isSelectedAgain) {
      this.OnDemandCacheService.currentOnDemandElementSubject.next(null);
    } else {
      this.OnDemandCacheService.currentOnDemandElementSubject.next(element);
    }
  }


  public addElement(){
    const type = this.OnDemandCacheService.selectedonDemandType;
    switch (type){

      case 'Trips':
        const newTrip = new TripData();
        newTrip.id= this.OnDemandCacheService.currentTrips.length + 1;
        this.OnDemandCacheService.currentOnDemandElementSubject.next(newTrip);
        break;
      case 'Car Rentals':
        const newCarRental = new CarRentalData();
        newCarRental.id= this.OnDemandCacheService.carRentals.length + 1;
        newCarRental.userId = this.userService.currentUser?.id ?? 0;
        this.OnDemandCacheService.currentOnDemandElementSubject.next(newCarRental);
        break;
      case 'Hotels':
        const hotel = new HotelData();
        hotel.id= this.OnDemandCacheService.getHotels.length + 1;
        hotel.userId = this.userService.currentUser?.id ?? 0;
        this.OnDemandCacheService.currentOnDemandElementSubject.next(hotel);
        break;
      case 'Flight':
        const flight = new FlightData();
        flight.id= this.OnDemandCacheService.getFlights.length + 1;
        flight.userId = this.userService.currentUser?.id ?? 0;
        this.OnDemandCacheService.currentOnDemandElementSubject.next(flight);
        break;
      case 'Taxi':
        const taxi = new TaxiData();
        taxi.id= this.OnDemandCacheService.getTaxis.length + 1;
        taxi.userId = this.userService.currentUser?.id ?? 0;
        this.OnDemandCacheService.currentOnDemandElementSubject.next(taxi);
        break;
    }
  }

  protected readonly TripStatus = TripStatus;
  protected readonly FinanceStatus = FinanceStatus;
}



