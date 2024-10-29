import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonIconComponent } from './carbon-icon.component';

describe('CarbonIconComponent', () => {
  let component: CarbonIconComponent;
  let fixture: ComponentFixture<CarbonIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarbonIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarbonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
