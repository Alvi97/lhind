import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormContainerComponent } from './dynamic-form-container.component';

describe('DynamicFormContainerComponent', () => {
  let component: DynamicFormContainerComponent;
  let fixture: ComponentFixture<DynamicFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
