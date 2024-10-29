import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { FormValidator, WizardService, MyFormControl, VcaptchaService, ErrorPageService, SsoService } from 'app/shared/shared.module';
import { ApplyCardService } from '../../../applycard/services/applycard.services';
import { GetLanguage, LocaleMessages } from '../../shared/LocaleMessages';

@Component({
	selector: 'app-applycard-intl-check-id',
	templateUrl: './check-id.component.html'
})
export class CheckIdComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public vcaptchaUrl: SafeUrl | string;
	language = GetLanguage();
	message = LocaleMessages[this.language].CheckId;
	btnMessage = LocaleMessages[this.language].Button;
	type: number = null;
	private errorPageBtnText: string = this.btnMessage.Confirm ? this.btnMessage.Confirm + "<br>" + "確定" : "確定";

	constructor(
		private route: ActivatedRoute,
		private vcaptchaService: VcaptchaService,
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService,
		private wizardService: WizardService,
		private ssoService: SsoService,
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'ARCNumber',
				ErrMsg:  this.message.ErrMsg.ARCIdError + '<br>統一證號為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(10),
						Validators.required, Validators.pattern('^[a-zA-Z][a-dA-D0-9][0-9]{8}$')
					])
				)
			},
			{
				Name: 'Captcha',
				ErrMsg: this.message.ErrMsg.VerError + '<br>驗證碼為空或格式錯誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(6)
					])
				)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	public async ngOnInit() {
		const ARCNumber = await this.ssoService.getSsoCustId();
		if (ARCNumber) {
			this.route.data.subscribe(data => {
				data.IDNumber = ARCNumber;
				this.wizardService.GoToNextStep();
			});
		}

		this.route.queryParams.subscribe(data => {
			if (!isNaN(data.type)) {
				this.type = data.type;
			}
		});

		await this.changeVcaptcha();
	}

	public async changeVcaptcha() {
		this.vcaptchaUrl = await this.vcaptchaService.getVcaptchaUrl();
	}

	async submit() {
		if (!this.formValidator.Validate(null, this.errorPageBtnText)) { return; }
		const value = this.form.value;
		const response = await this.applyCardService.checkARCId(value.ARCNumber, value.Captcha, this.type);
		var errMsg = "";
		if (response.ResultCode === "01" || response.ResultCode === "02" || response.ResultCode === "03") {
			errMsg = this.message.ResultMessage[response.ResultCode] ?
				this.message.ResultMessage[response.ResultCode] + '<br>' + "統一證號為空或格式有誤[" + response.ResultCode + "]" : "統一證號為空或格式有誤[" + response.ResultCode + "]";
		} else {
			errMsg = this.message.ResultMessage[response.ResultCode] ?
				this.message.ResultMessage[response.ResultCode] + '<br>' + response.ResultMessage : response.ResultMessage;
		}
		if (this.errorPageService.validateResponse(response, { redirect: false, errMessage: errMsg }, this.errorPageBtnText)) {
			this.route.data.subscribe(data => {
				data.IDNumber = value.ARCNumber;
				data.ArcIsExpired = response.Result.ArcIsExpired;
				this.wizardService.GoToNextStep();
			});
		}
	}
}
