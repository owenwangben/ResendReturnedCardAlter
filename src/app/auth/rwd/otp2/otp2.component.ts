import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms/';
import { setInterval } from 'timers';
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService, SharedService, MemoryStorage, SessionStorage } from 'app/shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { ApplyCardService } from 'app/application/applycard/services/applycard.services';
import { ApplyCardPushGTM, ApplyCardPageName, SensorsTrack, GetQueryParam } from 'app/shared/utilities';
import { ApplyInfoLogRequestModel } from 'app/application/applycard/services/applycard.models';
import * as moment from 'moment';
@Component({
	selector: 'app-auth-otp2',
	templateUrl: './otp2.component.html'
})
export class OTP2Component implements OnInit, OnDestroy {
	private returnUrl: string;
	private returnParams: string;
	private formValidator = new FormValidator();
	public form: FormGroup;
	public code: number;
	public countdown = 0;
	private token: string;
	private cardface: number;
	private session = new SessionStorage<ApplyInfoLogRequestModel>(ApplyInfoLogRequestModel);

	public constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService,
		private sharedService: SharedService,
		private errorPageService: ErrorPageService,
		private storage: MemoryStorage,
		private applyCardService: ApplyCardService,
	) {
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.return;
			this.returnParams = this.returnUrl && this.returnUrl.split('?')[1];
			this.token = GetQueryParam(this.returnUrl, "token");
		});
		this.route.params.subscribe(params => this.code = +params.code);
		// * code: Number (功能代碼)
		// * 1: ApplyCardTwoFactor, 線上辦卡(雙因)
		// * 2: ApplyCardNonTwoFactor, 線上辦卡(非雙因) --> not used
		// * 3: ApplyHouseCardTwoFactor, 線上申請好房卡(雙因)
		// * 4: TempAdjust, 臨調
		// * 5: PermanentAdjust, 永調
		// * 6: HouseCardPermanentAdjust, 好房卡永調
		const controls: Array<MyFormControl> = [
			{
				Name: 'mobileNo',
				ErrMsg: '驗證簡訊動態密碼為空或格式有誤',
				Control: new FormControl(undefined,
					Validators.compose([
						Validators.required
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

	public async ngOnInit() {
		this.cardface = +this.storage.CardFace;
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.OTP驗證, this.storage.ApplyCardSource);
		setInterval(() => {
			if (this.countdown > 0) {
				this.countdown--;
			}
		}, 1000);
	}

	ngOnDestroy() {
		$('.lboxed').remove();
	}

	async generateOTP() {
		let success = false;
		let msg = '';
		if (this.form.controls.mobileNo.invalid) {
			msg = "手機號碼為空或格式有誤";
			this.errorPageService.display(msg, false);
		}
		else if (this.countdown > 0) {
			msg = "您剛剛傳送的簡訊密碼尚未失效!";
			this.errorPageService.display(msg, false);
		}
		else {
			const response = await this.authService.generateOTP(this.form.value.mobileNo, this.code, ''); // 已無此驗證方式(自行輸入手機)，先將SessionKey塞入空值
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.countdown = 120;
				this.storage.MobileNo = this.form.value.mobileNo;
			}
			success = response.ResultCode === "00";
			msg = response.ResultMessage;
		}
		this.trackGenerateOTP(success, msg);
	}

	routeToApplyCard() {
		this.router.navigateByUrl('/Application/ApplyCard/New?' + this.returnParams, { relativeTo: this.route });
	}

	async submit() {
		if (!this.formValidator.Validate()) { return; }
		let sTime = moment().format("YYYYMMDDHHmmss");
		const response = await this.authService.verifyOTP(this.code, this.form.value.OTP);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			await this.updateApplyStatus(this.cardface.toString(), this.token);
			let vTime = moment().format("YYYYMMDDHHmmss");
			this.session.SetValue({
				OTP:this.form.value.OTP,
				OTPReqDT:sTime,
				OTPRespDT:vTime,
			} as ApplyInfoLogRequestModel);
			this.router.navigateByUrl(this.returnUrl);
		}
		this.trackSubmit(response.ResultCode === "00", response.ResultMessage);
	}

	trackGenerateOTP(success: boolean, msg: string) {
		if (this.code === 7) {
			const authType = '他行信用卡驗證申請';
			SensorsTrack('CardApplicationSMS', this.storage.CardTitle, this.storage.CardType, '', authType, success, success ? '' : msg);
		}
	}

	trackSubmit(success: boolean, msg: string) {
		if (this.code === 7) {
			const authType = '他行信用卡驗證申請';
			SensorsTrack('CardApplicationSMSVerification', this.storage.CardTitle, this.storage.CardType, '', authType, success, success ? '' : msg);
		}
	}

	async updateApplyStatus(cardface: string, Data: string) {
		const response = await this.applyCardService.updateApplyStatus(cardface, Data);
		return (response.ResultCode === "00");
	}
}
