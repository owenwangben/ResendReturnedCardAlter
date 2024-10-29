import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IsFromApp } from 'app/shared/utilities';

@Component({
	selector: 'app-activity-register-complete',
	templateUrl: './complete.component.html'
})
export class CompleteComponent implements OnInit {
	public activityName: string;
	public seq: string;
	public isApplyElectronicBill: number;
  public isApp = IsFromApp();

	constructor(
      private route: ActivatedRoute,
      private router:Router
    ) {
		this.route.data.subscribe(data => {
			this.activityName = data.data.Name;
			this.seq = data.seq;
      this.isApplyElectronicBill = data.isApplyElectronicBill;
		});
	}

	ngOnInit() {
	}

  public redirectToEStatementChange():void{
    if(this.isApp){
      location.href = 'sinopacaction:{estatementchange}{}';
    }else{
      this.router.navigateByUrl('/Application/EStatementChange');
    }
  }
}
