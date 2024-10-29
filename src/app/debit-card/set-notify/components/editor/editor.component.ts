import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorPageService, FormValidator, MyFormControl, WizardService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { GetSetNotifyInfoResultModel } from '../../services/set-notify.model';

@Component({
	selector: 'app-set-notify-editor',
	templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public readonly isMobile = environment.IsMobile;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'Email',
				Control: new FormControl()
			},
			{
				Name: 'IsApplyConsumerCollection',
				Control: new FormControl()
			},
			{
				Name: 'IsApplyEaper',
				Control: new FormControl()
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	ngOnInit() {
		this.route.data.subscribe(data => {
			const formValue = data.formValue;
			const info: GetSetNotifyInfoResultModel = data.data;
			if (formValue) {
				this.form.patchValue({
					Email: info.Email.trim(),
					IsApplyConsumerCollection: formValue.IsApplyConsumerCollection,
					IsApplyEaper: formValue.IsApplyEaper
				});
			}
			else {
				this.form.patchValue({
					Email: info.Email.trim(),
					IsApplyConsumerCollection: info.IsApplyConsumerCollection,
					IsApplyEaper: info.IsApplyEaper
				});
			}
		});
	}

	onChangeEmail() {
		this.router.navigateByUrl('/Application/ChangeEmail?return=/DebitCard/SetNotify');
	}

	onSubmit() {
		if (!this.form.value.Email) {
			this.errorPageService.display("請先設定Email", false);
			return;
		}
		this.route.data.subscribe(data => {
			data.formValue = this.form.value;

			const info: GetSetNotifyInfoResultModel = data.data;
			this.wizardService.GoToNextStep();
		});
	}

}
