import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

import { EditorComponent } from './editor.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { DisplayComponent } from '../display/display.component';
import { WizardService } from 'app/shared/wizard/wizard.service';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let wizardService: WizardService;

  beforeEach(async(() => {
    wizardService = new WizardService();
    TestBed.configureTestingModule({
      declarations: [ EditorComponent ],
      imports: [ReactiveFormsModule, SharedModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: Observable.from([{
              data: {
                CardList: [],
                Bank: []
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
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
