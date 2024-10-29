import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErrorPageService, FormValidator, MyFormControl, WizardService, MemoryStorage } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { CashAdvanceService } from '../../services/cash-advance.service';
import * as CashAdvance from '../../services/cash-advance.model';
import { AuthService } from 'app/auth/services/auth.service';
import { OpenLightbox } from 'app/shared/utilities';

const componentbase = {
	selector: 'app-cash-advance-confirm',
};
const component: Component = {
	selector: componentbase.selector,
	templateUrl: './confirm.component.html'
};
const mobileComponent: Component = {
	selector: componentbase.selector,
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.mobile.css']
};
@Component(environment.IsMobile ? mobileComponent : component)
export class ConfirmComponent implements OnInit {
	// mobile setup
	public readonly isMobile = environment.IsMobile;
	private formValidator = new FormValidator();
	form: FormGroup;
	showOTP: Boolean;
	timer: Boolean;
	pinType: number;
	countdown = 0;
	shutdowntimer = false;
	interval;
	otpcounter = 0;
	optwrong = 0;
	mobileNo: string;
	sessionKey: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService,
		private service: CashAdvanceService,
		private storage: MemoryStorage,
		private authService: AuthService,
	) {
		{
			const controls: Array<MyFormControl> = [
				{
					Name: 'PIN',
					ErrMsg: '請輸入四碼數字預借現金密碼',
					Control: new FormControl(
						undefined, Validators.compose([
							Validators.required, Validators.pattern(/^\d{4}$/)
						])
					)
				},
				{
					Name: 'OTP',
					ErrMsg: '驗證簡訊動態密碼為空或格式有誤',
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
	}

	async ngOnInit() {
		this.route.data.subscribe(data => {
			this.pinType = data.form.PinType;
			this.mobileNo = data.MobileNo;
			this.sessionKey = data.SessionKey;
			this.showOTP = (this.pinType === 2);
		});
	}

	async onSubmit(formData: CashAdvance.ApplyCashAdvanceViewModel) {
		if (!this.formValidator.Validate()) { return; }
		formData.OTP = this.form.value.OTP;
		formData.PIN = this.pinType === 1 ? this.form.value.PIN : this.form.value.OTP;
		formData.PinType = this.pinType;
		const response = await this.service.ApplyCashAdvance(formData);
		if (response.ResultCode === "00") {
			this.route.data.subscribe(data => {
				data.result = response.Result;
				this.wizardService.GoToNextStep();
			});
		}
		else {
			if (response.Result && response.Result.IsPinError) {
				// 預現密碼或簡訊動態密碼錯誤
				this.errorPageService.display(response.ResultMessage, false);
			}
			else {
				// 其他錯誤要回前一頁
				this.errorPageService.display(response.ResultMessage, false, () => {
					this.wizardService.GoToPrevStep();
				});
			}
		}
	}

	async generateOTP() {
		const response = await this.authService.generateOTP(this.mobileNo, 12, this.sessionKey);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.countdown = 120;
		}
	}
	goPrev() {
		this.wizardService.GoToPrevStep();
	}
	public openlbox(lboxid) {
		OpenLightbox(lboxid);
	}
	async checkOTP() {
		this.generateOTP();
		this.startTimer();
	}
	// ** 開始計時 */
	startTimer() {
		this.timer = true;
		this.interval = setInterval(() => {
			if (this.countdown > 0) {
				this.countdown--;
			}
			else {
				clearInterval(this.interval);
				this.timer = false;
				if (this.shutdowntimer = false) {
					this.errorPageService.display("密碼已失效請重新傳送", false);
				}
			}
		}, 1000);
	}
	pauseTimer() {
		clearInterval(this.interval);
	}
}
