import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lhind-expense-cards-container',
  standalone:true,
  imports: [CommonModule,MatCardModule,MatIconModule],
  templateUrl: './expense-cards-container.component.html',
  styleUrl: './expense-cards-container.component.css',
})
export class ExpenseCardsContainerComponent {

  public cards = [
    { icon: 'flight', name: 'Travel' },
    { icon: 'hotel', name: 'Hotels' },
    { icon: 'directions_car', name: 'Car Rentals' },
    { icon: 'taxi', name: 'Taxi' },
  ];

}
