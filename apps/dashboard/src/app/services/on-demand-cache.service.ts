import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Trip } from '../models/trip.model';
import { TRIPS } from '../utils/trip-data';
import { UserService } from '@lhind/data-access-user';

@Injectable({
  providedIn: 'root'
})
export class OnDemandCacheService<T>{

  private userService = inject(UserService);

  constructor() {

    this.loadOnDemandData();
    this.currentTripsSubject.next(TRIPS);
    this.selectedOnDemandTypeSubject.next('Trips');
  }

  private currentTripsSubject = new BehaviorSubject<Trip[] | []>([]);
  currentTrips$: Observable<Trip[] | []> = this.currentTripsSubject.asObservable();
  currentOnDemandDataSubject = new BehaviorSubject<any[]>([]);
  currentOnDemandDataSubject$: Observable<T[] | []> = this.currentOnDemandDataSubject.asObservable();
  selectedOnDemandTypeSubject = new BehaviorSubject<string>('');
  selectedOnDemandTypeSubject$: Observable<string> = this.selectedOnDemandTypeSubject.asObservable();
  currentOnDemandElementSubject = new BehaviorSubject<any>(null);
  currentOnDemandElementSubject$: Observable<any> = this.currentOnDemandElementSubject.asObservable();


  private loadOnDemandData(){
  this.currentOnDemandDataSubject.next(TRIPS);
  }

  public get currentTrips():Trip[]{
    return this.currentTripsSubject.value;
  }

  public get selectedonDemandType() :string{
    return this.selectedOnDemandTypeSubject.value;
  }



}
