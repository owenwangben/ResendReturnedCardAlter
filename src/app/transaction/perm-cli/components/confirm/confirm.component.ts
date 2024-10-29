import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, SessionStorage, SsoService, WizardService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { PermCLILogRequestModel } from '../../services/perm-cli.models';
import { PermCLIService } from '../../services/perm-cli.service';

@Component({
	selector: 'app-perm-cli-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
	isMobile = environment.IsMobile;
	isHouseFun = false;
	public sso = false;
	private permCli = new SessionStorage<PermCLILogRequestModel>(PermCLILogRequestModel);

	constructor(
		private route: ActivatedRoute,
		private service: PermCLIService,
		private ssoService: SsoService,
		private errorPageService: ErrorPageService,
		private wizardService: WizardService
	) { }

	ngOnInit() {
		this.route.data.subscribe(data => this.isHouseFun = data.houseFun);
	}

	async onSubmit(model: PermanentCreditViewModel) {
		this.sso = !!await this.ssoService.getSsoResult();
		if (!this.sso) {
			model.OTPCellNo = this.permCli.GetValue('OTPCellNo');
			model.OTPReqDT = this.permCli.GetValue('OTPReqDT');
			model.OTPRespDT = this.permCli.GetValue('OTPRespDT');
		}
		else {
			model.OTPCellNo = null;
			model.OTPReqDT = null;
			model.OTPRespDT = null;
		}

		const response = await (
			this.isHouseFun ? this.service.postPermanentCredit2(model) : this.service.postPermanentCredit(model)
		);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			const refNo = response.Result.RefNo;
			this.route.data.subscribe(data => {
				data.RefNo = refNo;
				this.wizardService.GoToNextStep();
			});
		}
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}
}
