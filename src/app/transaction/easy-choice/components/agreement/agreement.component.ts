import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, FormValidator, MemoryStorage, MyFormControl, WizardService } from 'app/shared/shared.module';
import { AgreenRegulationHandleService, GetAgreementDataRequest, InsertAgreementRecordRequest } from 'app/shared/agreen-regulation-handle.service';

@Component({
	selector: 'app-easy-choice-agreement',
	templateUrl: './agreement.component.html',
	styles: []
})
export class AgreementComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	Regulation: string;
	InsertAgreementRecordModel = new InsertAgreementRecordRequest();

	constructor(
		private wizardService: WizardService,
		private errorPageService: ErrorPageService,
		private agreenregulationhandleservice: AgreenRegulationHandleService,
		private storage: MemoryStorage
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
		this.getData ()
	}

	async submit() {
		await this.agreenregulationhandleservice.InsertAgreementRecord(this.InsertAgreementRecordModel);
		if (!this.formValidator.Validate()) { return; }
		this.wizardService.GoToNextStep();
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}

	async getData () {
		let model: GetAgreementDataRequest ={Title: "預借現金分期條款", Source: "EWEB"}
		const response = await this.agreenregulationhandleservice.GetAgreementData(model);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.Regulation = response.Result.Content
			this.InsertAgreementRecordModel.ID = this.storage.CustId
			this.InsertAgreementRecordModel.Source = "EWEB"
			this.InsertAgreementRecordModel.Title = "預借現金分期條款"
			this.InsertAgreementRecordModel.Version = response.Result.Version
		}

	}

}
