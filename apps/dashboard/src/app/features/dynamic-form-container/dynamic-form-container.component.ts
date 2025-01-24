import { Component, inject } from '@angular/core';
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
export class DynamicFormContainerComponent<T extends { userId: number } & { id: number } & { tripId: number } & Record<string, any>> {
  formGroup!: FormGroup;
  public selectedObject!: T;

  public onDemandCacheService = inject(OnDemandCacheService);
  private userService = inject(UserService);
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
        this.buildForm();
      });
  }

  buildForm(): void {
    if (!this.selectedObject) {
      console.error('No object provided for dynamic form!');
      this.formGroup = this.fb.group({});
      return;
    }

    const group: { [key: string]: any } = {};

    Object.keys(this.selectedObject)
      .filter((key) => key !== 'id' && key !== 'userId'  && key !== 'setForApproval' && key !=='tripId' )
      .forEach((key) => {
        group[key] = this.fb.control(this.selectedObject[key] || '', Validators.required);
      });

    this.formGroup = this.fb.group(group);

    // Subscribe to form changes
    this.formGroup.valueChanges.pipe(distinctUntilChanged(),
      debounceTime(50)).subscribe((updatedValues) => {
      const updatedObject = { ...this.selectedObject, ...updatedValues };
      this.updateOnDemandElement(updatedObject);
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('Form Data:', this.formGroup.value);
    } else {
      console.log('Form is invalid!');
    }
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
      return 'text'; // Default to text for strings and other types
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

      return; // Exit here to avoid further logic
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



  sendForApproval(){
    this.formGroup.controls['setForApproval'].setValue(true);
  }

  isTrip(element: any): element is Trip {
    return (
      element &&
      typeof element.id === 'number' &&
      typeof element.name === 'string' &&
      element.startDate instanceof Date &&
      element.endDate instanceof Date
    );
  }
}
