import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnDemandCacheService } from '../../services/on-demand-cache.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { PermissionDirective } from '../../directives/permission.directive';
import { UserService } from '@lhind/data-access-user';
import { Trip } from '../../models/trip.model';
import { FinanceStatus, TripStatus } from '../../utils/trip-data';

@Component({
  selector: 'lhind-dynamic-form-container',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    PermissionDirective
  ],
  templateUrl: './dynamic-form-container.component.html',
  styleUrls: ['./dynamic-form-container.component.css'],
})
export class DynamicFormContainerComponent<T extends { userId: number } & { id: number } & { status: TripStatus } & { financeStatus: FinanceStatus }  & { tripId: number; setForApproval?: boolean } & Record<string, any>> {
  formGroup!: FormGroup;
  public selectedObject!: T;
  isDisabled = false;

  public onDemandCacheService = inject(OnDemandCacheService);
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({});
    this.onDemandCacheService.currentOnDemandElementSubject$
      .pipe(
        filter((currentElement): currentElement is T => {
          return !!currentElement && typeof currentElement === 'object' && !Array.isArray(currentElement);
        })
      )
      .subscribe((currentElement) => {
        console.log(currentElement, 'in the form');
        this.selectedObject = currentElement as T;
        const parentTrip =this.onDemandCacheService.currentTrips.find((x=>x.id === this.selectedObject.tripId));
        this.isDisabled = (parentTrip?.setForApproval || this.selectedObject.setForApproval || this.userService.currentUser?.role ==='Approver') ?? false;
        this.buildForm();
      });
  }

  buildForm(): void {
    if (!this.selectedObject) {
      this.formGroup = this.fb.group({});
      return;
    }

    const group: { [key: string]: any } = {};

    Object.keys(this.selectedObject)
      .filter((key) => key !== 'id' && key !== 'userId'
        && key !== 'setForApproval'
        && key !== 'tripId'
        && key !== 'note'
        && key !== 'status'
        && key !== 'financeStatus'
      )
      .forEach((key) => {
        group[key] = this.fb.control(
          { value: this.selectedObject[key] || '', disabled: this.isDisabled },
          Validators.required
        );
      });

    if (this.userService.currentUser?.role === 'Approver') {
      group['note'] = this.fb.control(
        { value: this.selectedObject['note'] || '', disabled: false }
      );
    }

    this.formGroup = this.fb.group(group);

      this.formGroup.valueChanges
        .pipe(distinctUntilChanged(), debounceTime(50))
        .subscribe((updatedValues) => {
          const updatedObject = { ...this.selectedObject, ...updatedValues };
          this.updateOnDemandElement(updatedObject);
        });
    // }
  }

  public approveOrCancel(action:string){
    switch (action){
      case 'approve':
        this.selectedObject.status = TripStatus.Approved
        break
      case 'cancel':
        this.selectedObject.status = TripStatus.Cancel
        break
    }
    this.updateOnDemandElement(this.selectedObject);
  }

  public manageFinance(action:string){
    switch (action){
      case 'inprocess':
        this.selectedObject.financeStatus = FinanceStatus.InProcess
        break
      case 'refund':
        this.selectedObject.financeStatus = FinanceStatus.Refunded
        break
    }
    this.updateOnDemandElement(this.selectedObject);
  }


  sendForApproval() {
    this.selectedObject.setForApproval = true;
    this.selectedObject = this.formGroup.value;
    this.updateOnDemandElement(this.selectedObject);
    this.disableAllWithTripId(this.selectedObject.id);

    this.isDisabled = true;
    this.buildForm();

    this.cdr.detectChanges();
  }

  disableAllWithTripId(tripId: number): void {
    debugger
    const currentData = this.onDemandCacheService.currentOnDemandDataSubject.getValue();
    const updatedData = currentData.map((element) => {
      if (element.tripId === tripId) {
        return { ...element, setForApproval: true };
      }
      return element;
    });
    this.onDemandCacheService.currentOnDemandDataSubject.next(updatedData);

    const currentTrips = this.onDemandCacheService.currentTripsSubject.getValue();
    const updatedTrips = currentTrips.map((trip) => {
      if (trip.id === tripId) {
        return { ...trip, setForApproval: true };
      }
      return trip;
    });
    this.onDemandCacheService.currentTripsSubject.next(updatedTrips as Trip[]);

  }

  public getKeys(): string[] {
    return Object.keys(this.formGroup.controls);
  }

  public getFieldType(value: any): string {
    if (typeof value === 'number') {
      return 'number';
    } else if (value instanceof Date) {
      return 'date';
    } else if (typeof value === 'boolean') {
      return 'checkbox';
    } else {
      return 'text';
    }
  }

  updateOnDemandElement(updatedElement: T): void {
    if (!this.formGroup.valid) return;

    const currentType = this.onDemandCacheService.selectedOnDemandTypeSubject.getValue();
    const currentTrip = this.onDemandCacheService.selectedTripSubject.getValue();
    if (!currentType ) {
      console.error('No type selected for the current data.');
      return;
    }

    if (currentType === 'Trips') {
      const currentTrips: Trip[] = this.onDemandCacheService.currentTripsSubject.getValue();

      if (!Array.isArray(currentTrips)) {
        console.error('Current trips data is not an array.');
        return;
      }

      if (this.isTrip(updatedElement)) {
        updatedElement.userId = this.userService.currentUser?.id ?? 0;

        const tripIndex = currentTrips.findIndex((trip) => trip.id === updatedElement.id);

        if (tripIndex !== -1) {
          currentTrips[tripIndex] = { ...currentTrips[tripIndex], ...updatedElement };
        } else {
          currentTrips.push(updatedElement);
        }

        this.onDemandCacheService.currentTripsSubject.next([...currentTrips]);
        this.onDemandCacheService.currentOnDemandDataSubject.next(currentTrips)
        console.log('Trips updated:', currentTrips);
      } else {
        console.error('Updated element is not a Trip.');
      }

      return;
    }



    const typeSubjectMap: { [key: string]: BehaviorSubject<any[]> } = {
      'Car Rentals': this.onDemandCacheService.currentCarRentalSubject,
      Flight: this.onDemandCacheService.currenFlightsSubject,
      Hotels: this.onDemandCacheService.currentHotelsSubject,
      Taxi: this.onDemandCacheService.currentTaxisSubject,
    };

    const selectedSubject = typeSubjectMap[currentType];

    if (!selectedSubject) {
      console.error(`No subject found for type: ${currentType}`);
      return;
    }

    const currentData = selectedSubject.getValue();

    if (!Array.isArray(currentData)) {
      console.error('Current data is not an array.');
      return;
    }

    const index = currentData.findIndex((element: any) => element.id === updatedElement.id);

    updatedElement['userId'] = this.userService.currentUser?.id ?? 0;
    updatedElement['tripId'] = currentTrip?.id as number;
    if (index !== -1) {
      currentData[index] = { ...currentData[index], ...updatedElement };
    } else {
      currentData.push(updatedElement);
    }

    selectedSubject.next([...currentData]);
    this.onDemandCacheService.selectedOnDemandTypeSubject.next(currentType);
    console.log(`${currentType} updated:`, currentData);
  }




  //just a dummy check
  isTrip(element: any): element is Trip {
    return element.name.includes('rip');
  }
}
