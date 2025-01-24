import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionDirective } from '../../directives/permission.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatMiniFabButton } from '@angular/material/button';
import { Permission } from '../../models/user.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { OnDemandCacheService } from '../../services/on-demand-cache.service';
import { DynamicAccordionDisplayComponent } from './dynamic-accordion-display/dynamic-accordion-display.component';
import { TripData } from '../../models/trip.model';
import { deepEqual } from '../../utils/deepCompare';

@Component({
  selector: 'lhind-dynamic-list-container',
  imports: [CommonModule, PermissionDirective, MatIconModule, MatButtonModule, MatMiniFabButton, MatExpansionModule, DynamicAccordionDisplayComponent],
  standalone:true,
  templateUrl: './dynamic-list-container.component.html',
  styleUrl: './dynamic-list-container.component.css',
})
export class DynamicListContainerComponent<T> {

  public OnDemandCacheService = inject(OnDemandCacheService);

  connstructor(){

  }

  public getKeys(obj: any): string[] {
    return Object.keys(obj).filter((key) => key !== 'id' && key !== 'name');
  }

  public selectElement(element:object){
    const isSelectedAgain = deepEqual(element,this.OnDemandCacheService.currentOnDemandElementSubject.value);
    if(isSelectedAgain) {this.OnDemandCacheService.currentOnDemandElementSubject.next(null);}else
    this.OnDemandCacheService.currentOnDemandElementSubject.next(element);
  }

  public addElement(){
    const type = this.OnDemandCacheService.selectedonDemandType;
    console.log(type , "1231313");
    switch (type){

      case 'Trips':
        const newTrip = new TripData();
        newTrip.id= this.OnDemandCacheService.currentTrips.length + 1;
        this.OnDemandCacheService.currentOnDemandElementSubject.next(newTrip);
    }
  }

}



