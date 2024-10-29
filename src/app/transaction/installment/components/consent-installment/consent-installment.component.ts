import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgreenRegulationHandleService, ErrorPageService, FormValidator, MemoryStorage, MyFormControl, WizardService } from 'app/shared/shared.module';
import { StagingSensorsTrack } from 'app/shared/utilities';
import { GetAgreementDataRequest, InsertAgreementRecordRequest } from 'app/shared/agreen-regulation-handle.service';


@Component({
	selector: 'app-consent-installment',
	templateUrl: './consent-installment.component.html',
	styles: []
})
export class ConsentInstallmentComponent implements OnInit {
	StmtRTE: string;
	private formValidator = new FormValidator();
	public form: FormGroup;
	InsertAgreementRecordModel = new InsertAgreementRecordRequest();
	RegulationUrl: string;

	constructor(
		private wizardService: WizardService,
		private errorPageService: ErrorPageService,
		private storage: MemoryStorage,
		private agreenregulationhandleservice: AgreenRegulationHandleService,
		private route: ActivatedRoute
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'consent',
				ErrMsg: '請勾選同意後才可繼續操作',
				Control: new FormControl(undefined, Validators.requiredTrue)
			}
		];
		this.form = this.formValidator.MakeFormGroup(controls);
	}

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.StmtRTE = data.stmtrte;
		});

		this.getData ()
	}

	async getData () {
		let model: GetAgreementDataRequest ={Title: "單筆消費分期注意事項", Source: "EWEB"}
		const response = await this.agreenregulationhandleservice.GetAgreementData(model);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.RegulationUrl = response.Result.Content;
			this.InsertAgreementRecordModel.ID = this.storage.CustId;
			this.InsertAgreementRecordModel.Source = "EWEB";
			this.InsertAgreementRecordModel.Title = "單筆消費分期注意事項";
			this.InsertAgreementRecordModel.Version = response.Result.Version;
		}

	}

	async submit() {
		if (!this.formValidator.Validate()) { return; }
		//神策數據：事件追踪(信用卡分期)
		StagingSensorsTrack("InstallmentPrecaution",this.StmtRTE,true,"");
		await this.agreenregulationhandleservice.InsertAgreementRecord(this.InsertAgreementRecordModel);
		this.wizardService.GoToNextStep();
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}

}
