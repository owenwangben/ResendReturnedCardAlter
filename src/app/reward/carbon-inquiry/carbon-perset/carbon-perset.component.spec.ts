import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonPersetComponent } from './carbon-perset.component';

describe('CarbonPersetComponent', () => {
  let component: CarbonPersetComponent;
  let fixture: ComponentFixture<CarbonPersetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarbonPersetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarbonPersetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
