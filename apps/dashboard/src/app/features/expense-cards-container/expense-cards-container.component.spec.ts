import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseCardsContainerComponent } from './expense-cards-container.component';

describe('ExpenseCardsContainerComponent', () => {
  let component: ExpenseCardsContainerComponent;
  let fixture: ComponentFixture<ExpenseCardsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseCardsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseCardsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
