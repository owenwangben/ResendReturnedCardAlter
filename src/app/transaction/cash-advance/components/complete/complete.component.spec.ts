import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

import { CompleteComponent } from './complete.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { DisplayComponent } from '../display/display.component';
import { WizardService } from 'app/shared/wizard/wizard.service';

describe('CompleteComponent', () => {
  let component: CompleteComponent;
  let fixture: ComponentFixture<CompleteComponent>;
  let wizardService: WizardService;

  beforeEach(async(() => {
    wizardService = new WizardService();
    TestBed.configureTestingModule({
      declarations: [ CompleteComponent, DisplayComponent ],
      imports: [ReactiveFormsModule, SharedModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: Observable.from([{
              form: {},
              result: {
                RefNo: 'RefNo'
              }
            }])
          }
        },
        {
          provide: WizardService,
          useValue: wizardService
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
