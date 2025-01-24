import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Trip } from '../models/trip.model';
import { TRIPS, TripStatus } from '../utils/trip-data';
import { UserService } from '@lhind/data-access-user';
import { CarRental } from '../models/car-rental.model';
import { carRental } from '../utils/car-rental-data';
import { Flight } from '../models/flight.model';
import { Hotel } from '../models/hotel.model';
import { Taxi } from '../models/taxi.model';
import { taxiData } from '../utils/taxi-data';
import { flights as flightData} from '../utils/flight-data';
import { hotels as hotelData} from '../utils/hotel-data';

@Injectable({
  providedIn: 'root'
})
export class OnDemandCacheService<T> {
  private userService = inject(UserService);

  constructor() {
    this.initializeFromStorage();
    this.resetToTrips();
  }

  // Subjects for each data type
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

  public selectedTripSubject = new BehaviorSubject<Trip | null>(null);
  selectedTrip$: Observable<Trip | null> = this.selectedTripSubject.asObservable();

  currentOnDemandDataSubject = new BehaviorSubject<any[]>([]);
  currentOnDemandDataSubject$: Observable<T[] | []> = this.currentOnDemandDataSubject.asObservable();

  selectedOnDemandTypeSubject = new BehaviorSubject<string>('');
  selectedOnDemandTypeSubject$: Observable<string> = this.selectedOnDemandTypeSubject.asObservable();

  currentOnDemandElementSubject = new BehaviorSubject<any>(null);
  currentOnDemandElementSubject$: Observable<any> = this.currentOnDemandElementSubject.asObservable();

  // Reset to trips
  public resetToTrips() {

    const isFinance = this.userService.currentUser?.role === 'Finance';

    const trips = isFinance
      ? this.currentTrips.filter((trip) => trip.status === TripStatus.Approved)
      : this.currentTrips;

    this.currentOnDemandDataSubject.next(trips);
    this.selectedOnDemandTypeSubject.next('Trips');
  }

  public get currentTrips(): Trip[] {
    return this.currentTripsSubject.value;
  }

  public get carRentals(): CarRental[] {
    return this.currentCarRentalSubject.value;
  }

  public get getHotels(): Hotel[] {
    return this.currentHotelsSubject.value;
  }

  public get getFlights(): Flight[] {
    return this.currenFlightsSubject.value;
  }

  public get getTaxis(): Taxi[] {
    return this.currentTaxisSubject.value;
  }

  public get selectedonDemandType(): string {
    return this.selectedOnDemandTypeSubject.value;
  }

  public get selectedTrip(): Trip | null {
    return this.selectedTripSubject.value;
  }

  public set carRentalsData(carRentalData: CarRental[]) {
    const newData = carRentalData ?? [];
    const updatedData = [...this.carRentals, ...newData];
    this.currentCarRentalSubject.next(updatedData);
    this.saveToStorage('carRentals', updatedData);
  }

  private initializeFromStorage() {
    const trips = this.getFromStorage<Trip[]>('trips') || TRIPS;
    const carRentals = this.getFromStorage<CarRental[]>('carRentals') || carRental;
    const flights:Flight[] = this.getFromStorage<Flight[]>('flights') || flightData;
    const hotels:Hotel[] = this.getFromStorage<Hotel[]>('hotels') || hotelData;
    const taxis = this.getFromStorage<Taxi[]>('taxis') || taxiData;

    this.currentTripsSubject.next(trips);
    this.currentCarRentalSubject.next(carRentals);
    this.currenFlightsSubject.next(flights);
    this.currentHotelsSubject.next(hotels);
    this.currentTaxisSubject.next(taxis);
  }

  updateStorage(): void {
    this.saveToStorage('trips', this.currentTrips);
    this.saveToStorage('carRentals', this.carRentals);
    this.saveToStorage('flights', this.getFlights);
    this.saveToStorage('hotels', this.getHotels);
    this.saveToStorage('taxis', this.getTaxis);
  }

  private saveToStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private getFromStorage<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  ngOnDestroy(){
    console.log('destroy cache service');
  }
}
