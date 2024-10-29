import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService } from 'app/shared/shared.module';
import { ATMPinSetupService } from './atmpin-setup.services';

@Component({
	selector: 'app-atmpin-setup',
	templateUrl: './atmpin-setup.component.html',
	providers: [ATMPinSetupService]
})
export class ATMPinSetupComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public cardNos: string[] = [];

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private atmPinSetupService: ATMPinSetupService,
		private errorPageService: ErrorPageService
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'cardNo',
				ErrMsg: '卡號為空或格式錯誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(15)
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
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	ngOnInit() {
	}

	async submit() {
		if (!this.formValidator.Validate()) { return; }

		const response = await this.atmPinSetupService.ApplyATMPin(
			this.form.value.cardNo, this.form.value.captcha
		);
		if (response.ResultCode === "00") {
			this.errorPageService.display("申請預借現金密碼函成功。<br />密碼函將以限時信函寄出，感謝您的申請!", false);
		}
		else if (response.ResultCode === "26") {
			this.errorPageService.display("同一天不得重複申請預借現金密碼函", false);
		}
		else {
			this.errorPageService.display(response.ResultMessage, false);
		}
	}
}
