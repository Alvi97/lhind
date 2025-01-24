import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DynamicFormContainerComponent } from '../dynamic-form-container/dynamic-form-container.component';
import { DynamicListContainerComponent } from '../dynamic-list-container/dynamic-list-container.component';
import { ExpenseCardsContainerComponent } from '../expense-cards-container/expense-cards-container.component';
import { OnDemandCacheService } from '../../services/on-demand-cache.service';

@Component({
  selector: 'lhind-declarative',
  standalone:true,
  imports: [CommonModule, MatSidenavModule, DynamicFormContainerComponent, DynamicListContainerComponent, ExpenseCardsContainerComponent],
  templateUrl: './declarative.component.html',
  styleUrl: './declarative.component.css',
})
export class DeclarativeComponent {
  public onDemandCacheService = inject(OnDemandCacheService);
}
