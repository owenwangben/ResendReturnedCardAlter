import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, MemoryStorage, WizardService } from 'app/shared/shared.module';
import { AutomaticDebitService } from'../../automatic-debit.services';

@Component({
  selector: 'app-apply-revise',
  templateUrl: './apply-revise.component.html'
})
export class ApplyReviseComponent implements OnInit {

  constructor(
	private AutomaticDebitService: AutomaticDebitService,
	private wizardService: WizardService,
	private storage: MemoryStorage,
	private errorPageService: ErrorPageService,
	private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

//設定本期扣款金額
  async submit1() {
	var totalamt
	this.route.data.subscribe(
		async(data) => {
			if(data.applyinfo) {
				//取回來的應繳金額帶逗點，執行移除
				totalamt = data.applyinfo.TotalAmt.split(",").join("");
				//設定本期扣款金額SecondApply= true
				data.applyinfo.SecondApply = true;
			}
		}
	)
	//如果本期應繳金額小於等於0，則不進入設定
	if(+totalamt <= 0) {
		this.errorPageService.display("本期帳單無法設定扣款金額。",false);
	} else {
		this.wizardService.GoToStep(4);
	}
  }

//扣繳方式變更設定
  submit2() {
	this.route.data.subscribe(
		async(data) => {
			if(data.applyinfo) {
				//扣繳方式變更設定SecondApply= false
				data.applyinfo.SecondApply = false;
			}
		}
	)
	this.wizardService.GoToStep(4);
  }

}
