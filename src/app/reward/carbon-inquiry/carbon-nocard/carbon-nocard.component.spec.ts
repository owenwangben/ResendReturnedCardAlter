import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonNocardComponent } from './carbon-nocard.component';

describe('CarbonNocardComponent', () => {
  let component: CarbonNocardComponent;
  let fixture: ComponentFixture<CarbonNocardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarbonNocardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarbonNocardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
