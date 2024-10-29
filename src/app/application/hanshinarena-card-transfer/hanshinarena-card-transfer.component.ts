import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { ErrorPageService, FormValidator, MyFormControl, VcaptchaService } from 'app/shared/shared.module';
import { HanshinarenaCardTransferService } from './hanshinarena-card-transfer.service';

@Component({
	selector: 'app-hanshinarena-card-transfer',
	templateUrl: './hanshinarena-card-transfer.component.html',
	styles: []
})
export class HanshinarenaCardTransferComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public vcaptchaUrl: SafeUrl | string;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private activityRegisterService: HanshinarenaCardTransferService,
		private vcaptchaService: VcaptchaService,
		private errorPageService: ErrorPageService
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'id',
				ErrMsg: '身分證字號為空或格式錯誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(10)
					])
				)
			},
			{
				Name: 'captcha',
				ErrMsg: '驗證碼為空或格式錯誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(6)
					])
				)
			},
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	async ngOnInit() {
		await this.changeVcaptcha();
	}

	async changeVcaptcha() {
		this.vcaptchaUrl = await this.vcaptchaService.getVcaptchaUrl();
	}

	async submit() {
		if (!this.formValidator.Validate()) { return; }

		const response = await this.activityRegisterService.HanshinarenaCardTransfer(this.form.value.id, this.form.value.captcha);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.errorPageService.display("您已完成變動，本行將不會為您換發新卡，謝謝！", false);
		}
	}
}
