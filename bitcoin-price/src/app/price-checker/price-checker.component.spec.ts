import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCheckerComponent } from './price-checker.component';

describe('PriceCheckerComponent', () => {
  let component: PriceCheckerComponent;
  let fixture: ComponentFixture<PriceCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceCheckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
