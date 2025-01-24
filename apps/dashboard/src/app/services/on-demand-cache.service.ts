import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Trip } from '../models/trip.model';
import { TRIPS } from '../utils/trip-data';
import { UserService } from '@lhind/data-access-user';
import { CarRental } from '../models/car-rental.model';
import { carRental } from '../utils/car-rental-data';

@Injectable({
  providedIn: 'root'
})
export class OnDemandCacheService<T>{

  private userService = inject(UserService);

  constructor() {

    this.setInitialData();
    this.resetToTrips();
    this.currentTripsSubject.next(TRIPS);
  }

  private currentTripsSubject = new BehaviorSubject<Trip[] | []>([]);
  currentTrips$: Observable<Trip[] | []> = this.currentTripsSubject.asObservable();

  private currentCarRentalSubject = new BehaviorSubject<CarRental[] | []>([]);
  currentCarRental$: Observable<CarRental[] | []> = this.currentCarRentalSubject.asObservable();


  currentOnDemandDataSubject = new BehaviorSubject<any[]>([]);
  currentOnDemandDataSubject$: Observable<T[] | []> = this.currentOnDemandDataSubject.asObservable();
  selectedOnDemandTypeSubject = new BehaviorSubject<string>('');
  selectedOnDemandTypeSubject$: Observable<string> = this.selectedOnDemandTypeSubject.asObservable();
  currentOnDemandElementSubject = new BehaviorSubject<any>(null);
  currentOnDemandElementSubject$: Observable<any> = this.currentOnDemandElementSubject.asObservable();




  public resetToTrips(){
  this.currentOnDemandDataSubject.next(TRIPS);
    this.selectedOnDemandTypeSubject.next('Trips');
  }

  public get currentTrips():Trip[]{
    return this.currentTripsSubject.value;
  }

  public get carRentals():CarRental[]{
    return this.currentCarRentalSubject.value;
  }


  public get selectedonDemandType() :string{
    return this.selectedOnDemandTypeSubject.value;
  }


  private setInitialData() {
    this.currentOnDemandDataSubject.next(TRIPS);
    this.currentCarRentalSubject.next(carRental);

  }
}
