import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardService } from 'app/shared/shared.module';
import { applyinfoModel } from '../../automatic-debit.models';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html'
})
export class SuccessComponent implements OnInit {
	public FirstFlag: boolean;
	public FlagResponse: boolean;
	public EffectDate: string;
	public SecondApply: boolean;

  constructor(
	private route: ActivatedRoute,
	private wizardService: WizardService,
  ) { }

  ngOnInit() {
	this.route.data.subscribe(
		async(data) => {
			if(data.applyinfo) {
			const applyinfo: applyinfoModel = data.applyinfo;
				this.FirstFlag = applyinfo.FirstFlag;
				this.FlagResponse = applyinfo.FlagResponse;
				this.EffectDate = applyinfo.EffectDate;
				this.SecondApply = applyinfo.SecondApply;
			}
		}
	)
  }

  return(){
	  if(this.FirstFlag) {
		this.wizardService.GoToStep(3);
	  }
	  else if(!this.FirstFlag) {
		this.wizardService.GoToStep(2);
	  }

  }
}
