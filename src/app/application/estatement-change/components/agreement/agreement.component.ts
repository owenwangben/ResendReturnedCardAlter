import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, FormValidator, MyFormControl, WizardService } from 'app/shared/shared.module';

@Component({
	selector: 'app-estatement-change-agreement',
	templateUrl: './agreement.component.html',
	styles: []
})
export class AgreementComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;

	constructor(
		private wizardService: WizardService,
		private errorPageService: ErrorPageService
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

	ngOnInit() {}

	submit() {
		if (!this.formValidator.Validate()) { return; }
		this.wizardService.GoToNextStep();
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}

}
