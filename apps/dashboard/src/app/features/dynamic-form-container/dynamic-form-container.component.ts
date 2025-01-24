import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnDemandCacheService } from '../../services/on-demand-cache.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'lhind-dynamic-form-container',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './dynamic-form-container.component.html',
  styleUrls: ['./dynamic-form-container.component.css'],
})
export class DynamicFormContainerComponent<T extends { id: number } & Record<string, any>> {
  formGroup!: FormGroup;
  public selectedObject!: T;

  public onDemandCacheService = inject(OnDemandCacheService);

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
      this.formGroup = this.fb.group({}); // Fallback to an empty FormGroup
      return;
    }

    const group: { [key: string]: any } = {};

    Object.keys(this.selectedObject)
      .filter((key) => key !== 'id') // Exclude 'id'
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
    if(!this.formGroup.valid) return;
    const currentData = this.onDemandCacheService.currentOnDemandDataSubject.getValue();

    // Find the index of the element to update
    const index = currentData.findIndex((element) => element.id === updatedElement.id);

    if (index !== -1) {
      // Replace the old element with the updated one
      currentData[index] = { ...currentData[index], ...updatedElement };

      // Push the updated array back to the BehaviorSubject
      this.onDemandCacheService.currentOnDemandDataSubject.next([...currentData]);
    } else {
      this.onDemandCacheService.currentOnDemandDataSubject.next([...currentData,updatedElement]);
      console.error('Element not found in currentOnDemandDataSubject');
    }
  }
}
