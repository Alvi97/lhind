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
export class DynamicFormContainerComponent<T extends { userId: number } & { id: number } & { tripId: number; setForApproval?: boolean } & Record<string, any>> {
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
        this.isDisabled = (parentTrip?.setForApproval || this.selectedObject.setForApproval) ?? false;
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
      .filter((key) => key !== 'id' && key !== 'userId' && key !== 'setForApproval' && key !== 'tripId')
      .forEach((key) => {
        group[key] = this.fb.control(
          { value: this.selectedObject[key] || '', disabled: this.isDisabled },
          Validators.required
        );
      });

    this.formGroup = this.fb.group(group);

    // Subscribe to form changes if not disabled
    if (!this.isDisabled) {
      this.formGroup.valueChanges
        .pipe(distinctUntilChanged(), debounceTime(50))
        .subscribe((updatedValues) => {
          const updatedObject = { ...this.selectedObject, ...updatedValues };
          this.updateOnDemandElement(updatedObject);
        });
    }
  }

  sendForApproval() {
    this.selectedObject.setForApproval = true;
    this.updateOnDemandElement(this.selectedObject);
    this.disableAllWithTripId(this.selectedObject.id);

    this.isDisabled = true;
    this.buildForm();

    // Trigger change detection
    this.cdr.detectChanges();
  }

  disableAllWithTripId(tripId: number): void {
    debugger
    // Update related elements in currentOnDemandDataSubject
    const currentData = this.onDemandCacheService.currentOnDemandDataSubject.getValue();
    const updatedData = currentData.map((element) => {
      // Disable only elements with the matching tripId
      if (element.tripId === tripId) {
        return { ...element, setForApproval: true };
      }
      return element;
    });
    this.onDemandCacheService.currentOnDemandDataSubject.next(updatedData);

    // Update only the selected trip in currentTripsSubject
    const currentTrips = this.onDemandCacheService.currentTripsSubject.getValue();
    const updatedTrips = currentTrips.map((trip) => {
      // Disable only the trip with the matching id
      if (trip.id === tripId) {
        return { ...trip, setForApproval: true };
      }
      return trip;
    });
    this.onDemandCacheService.currentTripsSubject.next(updatedTrips as Trip[]);

  }



  updateOnDemandElement(updatedElement: T): void {
    // Existing logic to update the on-demand element
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
}


