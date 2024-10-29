import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RedemptionResult, RedemptionItemResult } from '../../../services/redemption.models';
import { IsFromApp } from 'app/shared/utilities';

@Component({
	selector: 'app-reward-redemption-complete',
	templateUrl: './complete.component.html'
})
export class CompleteComponent implements OnInit, AfterViewInit {
	Items: RedemptionItemResult[];
	TotalPoints: number;
	IsApplyElectronicBill: number;
  public isApp = IsFromApp();

	constructor(
    private route: ActivatedRoute,
    private router:Router
	) {
	}

	ngOnInit() {
		this.TotalPoints = 0;
		this.route.data.subscribe(data => {
			const result: RedemptionResult = data.Result;
			this.Items = result.Items;
      this.IsApplyElectronicBill = result.IsApplyElectronicBill;
			this.Items.forEach(item =>
				this.TotalPoints += item.IsExchangeSuccess ? item.Item.TotalPoints : 0
			);
		});
	}

	ngAfterViewInit() {
		$('.tip').tipr();
	}

  public redirectToEStatementChange():void{
    if(this.isApp){
      location.href = 'sinopacaction:{estatementchange}{}';
    }else{
      this.router.navigateByUrl('/Application/EStatementChange');
    }
  }
}
