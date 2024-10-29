import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService, WizardService } from 'app/shared/shared.module';
import { OffDMService } from './off-dm.services';

@Component({
	selector: 'app-off-dm',
	templateUrl: './off-dm.component.html'
})
export class OffDMComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	isOnlyDebitCard = false;

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private offDMService: OffDMService,
		private errorPageService: ErrorPageService
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'Consent',
				ErrMsg: '',
				Control: new FormControl()
			}
		];
		this.form = this.formValidator.MakeFormGroup(controls);
	}

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.form.controls.Consent.setValue(data.data && data.data.IsAgree);
			this.isOnlyDebitCard = (data.data && data.data.IsOnlyDebitCard);
		});
	}

	async onSubmit($event) {
		if (!this.formValidator.Validate()) { return; }
		const response = await this.offDMService.UpdateThirdPartySellFlag(this.form.value.Consent);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.errorPageService.display("更新成功", false);
		}
	}
}
