import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicAccordionDisplayComponent } from './dynamic-accordion-display.component';

describe('DynamicAccordionDisplayComponent', () => {
  let component: DynamicAccordionDisplayComponent;
  let fixture: ComponentFixture<DynamicAccordionDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicAccordionDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicAccordionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
