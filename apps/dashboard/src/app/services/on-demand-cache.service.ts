import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Trip } from '../models/trip.model';
import { TRIPS } from '../utils/trip-data';
import { UserService } from '@lhind/data-access-user';
import { CarRental } from '../models/car-rental.model';
import { carRental } from '../utils/car-rental-data';
import { Flight } from '../models/flight.model';
import { Hotel } from '../models/hotel.model';
import { Taxi } from '../models/taxi.model';
import { taxiData } from '../utils/taxi-data';
import { flights } from '../utils/flight-data';
import { hotels } from '../utils/hotel-data';

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

  public currentTripsSubject = new BehaviorSubject<Trip[] | []>([]);
  currentTrips$: Observable<Trip[] | []> = this.currentTripsSubject.asObservable();

  public currentCarRentalSubject = new BehaviorSubject<CarRental[] | []>([]);
  currentCarRental$: Observable<CarRental[] | []> = this.currentCarRentalSubject.asObservable();

  public currenFlightsSubject = new BehaviorSubject<Flight[] | []>([]);
  currentFlights$: Observable<Flight[] | []> = this.currenFlightsSubject.asObservable();

  public currentHotelsSubject = new BehaviorSubject<Hotel[] | []>([]);
  currentHotels$: Observable<Hotel[] | []> = this.currentHotelsSubject.asObservable();

  public currentTaxisSubject = new BehaviorSubject<Taxi[] | []>([]);
  currentTaxis$: Observable<Taxi[] | []> = this.currentTaxisSubject.asObservable();

  public  selectedTripSubject = new BehaviorSubject<Trip | null>(null);
  selectedTrip$: Observable<Trip | null> = this.selectedTripSubject.asObservable();


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

  public set carRentalsData(carRentalData:CarRental[]){
    const newData = carRentalData ?? [];
    this.currentCarRentalSubject.next([...this.carRentals, ...newData]);
  }

  public get getHotels():Hotel[]{
    return this.currentHotelsSubject.value;
  }

  public get getFlights():Flight[]{
    return this.currenFlightsSubject.value;
  }

  public get getTaxis():Taxi[]{
    return this.currentTaxisSubject.value;
  }

  public get selectedonDemandType() :string{
    return this.selectedOnDemandTypeSubject.value;
  }

  public get selectedTrip():Trip | null{
    return this.selectedTripSubject.value;
  }


  private setInitialData() {
    this.currentOnDemandDataSubject.next(TRIPS);
    this.currentCarRentalSubject.next(carRental);
    this.currentTaxisSubject.next(taxiData);
    this.currenFlightsSubject.next(flights)
    this.currentHotelsSubject.next(hotels)
  }
}
