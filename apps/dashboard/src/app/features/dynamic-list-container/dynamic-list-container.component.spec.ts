import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicListContainerComponent } from './dynamic-list-container.component';

describe('DynamicListContainerComponent', () => {
  let component: DynamicListContainerComponent;
  let fixture: ComponentFixture<DynamicListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicListContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
