import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WizardService } from 'app/shared/shared.module';
import { IsFromApp } from 'app/shared/utilities';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-registered-inquiry-result',
	templateUrl: './result.component.html',
})
export class ResultComponent implements OnInit {
	model: any;
  isMobile = environment.IsMobile;
  public isApp = IsFromApp();

	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
    private router: Router,
	) {
		this.route.data.subscribe(data => this.model = data.data);
	}

	ngOnInit() {
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}

  public redirectToEStatementChange():void{
    if(this.isApp){
      location.href = 'sinopacaction:{estatementchange}{}';
    }else{
      this.router.navigateByUrl('/Application/EStatementChange');
    }
  }
}
