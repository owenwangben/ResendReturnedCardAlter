import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService, WizardService } from 'app/shared/shared.module';
import { ChangeEmailService } from './change-email.service';

@Component({
	selector: 'app-change-email',
	templateUrl: './change-email.component.html'
})
export class ChangeEmailComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public returnUrl: string;

	constructor(
		public pageinfo: PageInfoService,
		private router: Router,
		private route: ActivatedRoute,
		private changeEmailService: ChangeEmailService,
		private errorPageService: ErrorPageService
	) {
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.return;
		});
		const controls: Array<MyFormControl> = [
			{
				Name: 'Email',
				ErrMsg: '請輸入正確的Email',
				Control: new FormControl(
					undefined, Validators.pattern('^([a-zA-Z0-9._+-]+@[a-zA-Z0-9_.-]+([.]{1,1}[a-zA-Z]{2,8})+)$')
				)
			},
			{
				Name: 'ConfirmEmail',
				ErrMsg: '請輸入正確的Email',
				Control: new FormControl(
					undefined, Validators.pattern('^([a-zA-Z0-9._+-]+@[a-zA-Z0-9_.-]+([.]{1,1}[a-zA-Z]{2,8})+)$')
				)
			}
		];
		this.form = this.formValidator.MakeFormGroup(controls, () => {
			if (this.form.value.Email !== this.form.value.ConfirmEmail) {
				errorPageService.display("兩次輸入的Email不一致", false);
				return false;
			}
			return true;
		});
	}

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.form.controls.Email.setValue(data.data && data.data.Email.trim());
		});
	}

	onCancel() {
		this.router.navigateByUrl(this.returnUrl);
	}

	async onSubmit() {
		if (!this.formValidator.Validate()) { return; }
		const response = await this.changeEmailService.UpdateEmail(this.form.value);
		if (this.errorPageService.validateResponse(response, { redirect: false  })) {
			this.errorPageService.display("更新成功", false, this.returnUrl ? () => this.router.navigateByUrl(this.returnUrl) : null);
		}
	}
}
