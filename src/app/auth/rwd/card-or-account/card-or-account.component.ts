import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms/';
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService, VcaptchaService,
	MemoryStorage, SharedService, SessionStorage } from 'app/shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { ApplyCardPushGTM, ApplyCardPageName, GetQueryParam, SensorsTrack, OpenLightbox } from 'app/shared/utilities';
import { AgreenRegulationHandleService, GetAgreementDataRequest, InsertAgreementRecordRequest } from 'app/shared/agreen-regulation-handle.service';
import { ApplyInfoLogRequestModel } from 'app/application/applycard/services/applycard.models';

@Component({
	selector: 'app-auth-card-or-account',
	templateUrl: './card-or-account.component.html'
})
export class AuthCardOrAccountComponent implements OnInit {
	private source: number;
	private prodtype: number;
	public cardface: string;
	private returnUrl: string;
	private formValidator = new FormValidator();
	public form: FormGroup;
	public vcaptchaUrl: SafeUrl | string;
	public personalDataTermsUrl = '';
	private Token: string;
	private session = new SessionStorage<ApplyInfoLogRequestModel>(ApplyInfoLogRequestModel);

	public constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private router: Router,
		private vcaptchaService: VcaptchaService,
		private authService: AuthService,
		private errorPageService: ErrorPageService,
		private sharedService: SharedService,
		private storage: MemoryStorage,
	) {
		this.route.queryParams.subscribe(params => {
			const src = +params.source;
			this.source = !isNaN(src) ? src : 0;
			this.returnUrl = params.return;
			const prodtypeParam = +GetQueryParam(this.returnUrl, "prodtype");
			this.cardface = GetQueryParam(this.returnUrl, "CardFace");
			this.Token = GetQueryParam(this.returnUrl, "token");
			this.prodtype = isNaN(prodtypeParam) ? 0 : prodtypeParam;
		});

		const controls: Array<MyFormControl> = [
			{
				Name: 'ID',
				ErrMsg: '身分證字號為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(10)
					])
				)
			},
			{
				Name: 'DOB',
				ErrMsg: '出生年月日為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(8)
					])
				)
			},
			{
				Name: 'Captcha',
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

	public async ngOnInit() {
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.卡友或存戶身份認證, this.storage.ApplyCardSource);
		const response = await this.sharedService.ApplyCardTermsUrl();
		this.storage.AuthType = "CardOrAccount";
		if (response.ResultCode === "00") {
			this.personalDataTermsUrl = response.Result.PersonalDataTermsUrl;
		}
		await this.changeVcaptcha();

	}

	public async changeVcaptcha() {
		this.vcaptchaUrl = await this.vcaptchaService.getVcaptchaUrl();
	}

	public async submit() {
		if (!this.formValidator.Validate()) { return; }
		if (await this.checkMMALimitIntranetUsage(this.form.value.ID.toUpperCase())) {
			return;
		}
		const value = this.form.value;
		const response = await this.authService.verifyCardOrAccount(this.source, this.prodtype, value.ID, value.DOB, false, value.Captcha, this.Token, this.cardface);
		this.storage.IsBankUser = response.Result.IsBankUser? 'true':'false';
		if (this.source === 1 && response.ResultCode === "03") {
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType, '',
			'永豐卡友/存戶', false, response.ResultMessage);
			this.errorPageService.display(response.ResultMessage, false, () => {
				this.router.navigateByUrl("/Application/ApplyCard?" + this.getQueryParamsPair(this.returnUrl, "CardFace"));
			});
		}
		else if (this.prodtype === 4 && response.ResultCode === "U1") {
			// 不符「永豐財富無限卡」申辦資格
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType, '',
			'永豐卡友/存戶', false, response.ResultMessage);
			this.errorPageService.display("<p style='font-weight: 400; text-align: left;'>感謝您申請，「永豐財富無限卡」是專為本行尊榮理財貴賓打造的信用卡，" +
					"現行為邀請制，暫未開放申辦，尚祈見諒！" +
					"誠摯邀請您成為本行尊榮理財貴賓，享有專屬於您的禮遇，詳情歡迎洽詢永豐銀行各分行理財專員。" +
					"<br/><br/>*尊榮理財貴賓：於本行往來資產規模維持在等值新台幣300萬元(含)以上。</p>", false, () => {
				this.router.navigateByUrl("/Application/ApplyCard");
			});
		}
		else if (this.prodtype === 7 && response.ResultCode === "U2") {
			// 大車隊身份證字號錯誤
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType,
				'永豐卡友/存戶', '', false, response.ResultMessage);
			this.errorPageService.confirm(response.ResultMessage, "確定", "返回辦卡頁", (ok) => {
				if (!ok) {
					window.location.href = 'https://app-api.taiwantaxi.com.tw/SinoPacCard/Apply';
				}
			});
		}
		else if (this.prodtype === 7 && response.ResultCode === "U3") {
			// 大車隊身份證字號錯誤
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType,
				'永豐卡友/存戶', '', false, response.ResultMessage);
			this.errorPageService.confirm("申請人之身份證字號需與大車隊會員驗證頁相同，請確認是否輸入正確喔！", "確定", "返回辦卡頁", (ok) => {
				if (!ok) {
					window.location.href = 'https://app-api.taiwantaxi.com.tw/SinoPacCard/Apply';
				}
			});
		}
		else if ((this.cardface === "273088" || this.cardface === "273089") && response.ResultCode === "U5") {
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType,
				'永豐卡友/存戶', '', false, response.ResultMessage);
			this.errorPageService.display("感謝您申請，「永傳世界卡」為邀請制，暫未開放申辦，尚祈見諒！" +
			"誠摯邀請您成為本行尊榮理財永傳會員，享有專屬於您的禮遇，詳情歡迎洽詢永豐銀行各分行理財專員。", false, () => {
				this.router.navigateByUrl("/Application/ApplyCard");
		});
	}
		else if (this.errorPageService.validateResponse(response, { redirect: false })) {
			SensorsTrack('CardApplicationVerificationSubmit', this.storage.CardTitle, this.storage.CardType, '',
			'永豐卡友/存戶', true, '');
			this.session.SetValue({
				Auth1:"知識詢問+OTP",
				Auth2:response.Result.IsBankUser ? "本行存戶":"本行卡友"
			} as ApplyInfoLogRequestModel);
      sessionStorage.setItem("ApplyCardIntl.DOB", value.DOB);
			this.router.navigateByUrl(this.returnUrl);
		}
	}

	async checkMMALimitIntranetUsage(id: string) {
		const auth = await this.authService.QueryMMALimitIntranetUsage(id);
		if (this.errorPageService.validateResponse(auth, { redirect: false })) {
			if (auth.Result.Status) {
				this.errorPageService.display("依行內政策禁止行員代理他人申辦", false);
				return true;
			}
			else {
				return false;
			}
		}
		return true;
	}

	getQueryParamsPair(url: string, key: string) {
		const urlPair = url.split('?');
		if (urlPair.length >= 2) {
			const queryParams = urlPair[1].split('&');
			for (let i = 0; i < queryParams.length; i++) {
				const pair = queryParams[i].split('=');
				if (pair.length === 2 && pair[0] === key) {
					return pair[0] + "=" + pair[1];
				}
			}
		}
		return null;
	}

	public openlbox(lboxid) {
		OpenLightbox(lboxid);
	}
}
