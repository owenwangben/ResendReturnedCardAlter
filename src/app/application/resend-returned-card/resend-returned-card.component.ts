import { Component, OnInit } from '@angular/core';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { CompleteComponent } from './components/complete/complete.component'
import { FilloutTableComponent } from './components/fillout-table/fillout-table.component';
import { PageInfoService , WizardStep } from 'app/shared/shared.module';


@Component({
  selector: 'app-resend-returned-card',
  templateUrl: './resend-returned-card.component.html',
  styles: []
})
export class ResendReturnedCardComponent implements OnInit {
  current = 0;
  steps : WizardStep[];
  step : number = this.current;

  constructor(public pageinfo : PageInfoService) { }

  ngOnInit() {
    this.steps = [
      { StepName : '填寫資料' , Component : FilloutTableComponent , StepNo : 0 },
      { StepName : '再次確認' , Component : ConfirmComponent , StepNo : 1 },
      { StepName : '申請結果' , Component : CompleteComponent , StepNo : 2 }
    ];
  }

  onWizardCurrentChange(step:number){
    this.step = step;
  }

}
