import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

import { ConfirmComponent } from './confirm.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { DisplayComponent } from '../display/display.component';
import { WizardService } from 'app/shared/wizard/wizard.service';
import { CashAdvanceService } from '../../service/cash-advance.service';

describe('ConfirmComponent', () => {
  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>;
  let wizardService: WizardService;
  let service: CashAdvanceService;

  beforeEach(async(() => {
    wizardService = new WizardService();
    service = new CashAdvanceService(null, null, null);
    TestBed.configureTestingModule({
      declarations: [ ConfirmComponent, DisplayComponent ],
      imports: [ReactiveFormsModule, SharedModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: Observable.from([{
              form: {}
            }])
          }
        },
        {
          provide: WizardService,
          useValue: wizardService
        }, {
          provide: CashAdvanceService,
          useValue: service
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
