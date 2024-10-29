import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms/';
import { SafeUrl } from '@angular/platform-browser';
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService, VcaptchaService,
	SharedService, MemoryStorage, SessionStorage } from 'app/shared/shared.module';
import { OpenLightbox, IsContainsFullWidthChar, IsValidId } from 'app/shared/utilities';
import { BankViewModel } from 'app/shared/shared.models';
import { CanAuthOtherBanks } from 'app/auth/services/auth.models';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/auth/services/auth.service';
import { GetLanguage, LocaleMessages } from 'app/application/applycard-intl/shared/LocaleMessages';
import { ApplyInfoLogRequestModel } from 'app/application/applycard/services/applycard.models';
import * as moment from 'moment';

@Component({
	selector: 'app-applycard-intl-auth-otherbank',
	templateUrl: './otherbank.component.html',
})
export class AuthOtherBankIntlComponent implements OnInit {
	private returnUrl: string;
	private returnParams: string;
	private formValidator = new FormValidator();
	public form: FormGroup;
	public vcaptchaUrl: SafeUrl | string;
	readonly months: string[] = Array.apply(null, { length: 12 }).map((item, idx) => (idx >= 9 ? '' : '0') + (idx + 1));
	readonly thisYear: number = new Date().getFullYear();
	readonly years: number[] = Array.apply(null, { length: 12 }).map((item, idx) => this.thisYear + idx);
	public Banks: BankViewModel[];
	public bankServiceTermsUrl = '';
	public personalDataTermsUrl = '';
	language: string = GetLanguage();
	message = LocaleMessages[this.language].OtherBank;
	btnMessage = LocaleMessages[this.language].Button;
	MasterTitle = LocaleMessages[this.language].shard.Title.OthBanksVer;
	exceedDay = 180;
	otherBankHtmlPath: string;
	private session = new SessionStorage<ApplyInfoLogRequestModel>(ApplyInfoLogRequestModel);

	constructor(
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
			this.returnUrl = params.return;
			this.returnParams = this.returnUrl && this.returnUrl.split('?')[1];
		});
		const expDate = new Date(new Date().setDate(new Date().getDate() + this.exceedDay));
		const max_ed = expDate.getFullYear() * 10000 + (expDate.getMonth() + 1) * 100 + expDate.getDate();
		const controls: Array<MyFormControl> = [
			{
				Name: 'ID',
				ErrMsg: this.message.ErrMsg.ID + '<br>居留證統一證號為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(10)
					])
				)
			},
			{
				Name: 'DOB',
				ErrMsg: this.message.ErrMsg.DOB + '<br>出生年月日為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(8)
					])
				)
			},
			{
				Name: 'PeriodOfStay',
				ErrMsg: this.message.ErrMsg.Less180Day + '<br>您無法申辦因居留期限少於180天',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(8), Validators.min(max_ed)
					])
				),
				RedirectURL: 'https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/excellence-business-card-only-foreigner.html',
			},
			{
				Name: 'MobileNo',
				ErrMsg: this.message.ErrMsg.MobileNum + '<br>行動電話號碼為空或格式有誤',
				Control: new FormControl(
					"",
					Validators.compose([
						Validators.required, Validators.minLength(10)
					])
				)
			},
			{
				Name: 'BankCode',
				ErrMsg: this.message.ErrMsg.SelectBankCode + '<br>請選擇銀行代號',
				Control: new FormControl(
					"",
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'DepositAccountNo',
				ErrMsg: this.message.ErrMsg.FillCorrectDeposytAccount + '<br>請輸入正確完整存款帳號',
				Control: new FormControl(
					"",
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'captcha',
				ErrMsg: this.message.ErrMsg.VerError + '<br>驗證碼為空或格式錯誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(6)
					])
				)
			},
			{
				Name: 'PIIAgreement',
				ErrMsg: this.message.ErrMsg.TermsOfPersonalInfoAgreement + '<br>請同意個人資料同意使用條款',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'IBankAgreement',
				ErrMsg: this.message.ErrMsg.IBankAgreement + '<br>請同意個人網路銀行服務條款',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'OtherBankAuthAgreement',
				ErrMsg: this.message.ErrMsg.DataAuthAgreement + '<br>請同意資料驗證作業',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	public async ngOnInit() {
		$('body').addClass('bilingual-version');
		this.pageinfo.name = '他行臺幣存款帳戶認證';

		this.route.params.subscribe(async params => {
			const response = await this.sharedService.ApplyCardTermsUrl(params.lang);
			if (response.ResultCode === "00") {
				this.bankServiceTermsUrl = response.Result.BankServiceTermsUrl;
				this.personalDataTermsUrl = response.Result.PersonalDataTermsUrl;
			}
		});

		this.Banks = await this.sharedService.GetBankList();
		this.Banks = this.Banks.filter(x => CanAuthOtherBanks.find(item => item === x.BankCode));
		this.form.controls.BankCode.setValue('');
		const path = '/mma8/card/htmls/他行臺幣帳戶身分驗證指定銀行_{0}.html';
		this.otherBankHtmlPath = path.replace('{0}', this.language);

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
		if (IsContainsFullWidthChar(value.ID)) {
			this.errorPageService.display("居留證統一證號請勿輸入全形", false);
			return;
		}
		else if (!IsValidId(value.ID)) {
			this.errorPageService.display("居留證統一證號請輸入正確格式", false);
			return;
		}

		let sTime = moment().format("YYYYMMDDHHmmss");
		const response = await this.authService.verifyOtherBank(value.ID, value.BankCode, value.DepositAccountNo,
			value.DOB, value.MobileNo, value.captcha );
		const errMsg = this.message.ResultMessage[response.ResultCode] ?
			this.message.ResultMessage[response.ResultCode] + '<br>' + response.ResultMessage : response.ResultMessage;
		if (this.errorPageService.validateResponse(response, { redirect: false, errMessage: errMsg })) {
			let vTime = moment().format("YYYYMMDDHHmmss");
			sessionStorage.setItem("ApplyCardIntl.ArcExpireDate", value.PeriodOfStay);
			sessionStorage.setItem("ApplyCardIntl.DOB", value.DOB);
			this.session.SetValue({
				Auth1:"財經核驗平台+OTP",
				Auth2:"他行帳戶",
				OtherAuthQryDT:sTime,
				OtherAuthRcvDT:vTime
			} as ApplyInfoLogRequestModel);
			this.storage.MobileNo = value.MobileNo;
			this.storage.SessionKey = response.Result.SessionKey;
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

	public openlbox(lboxid) {
		OpenLightbox(lboxid);
	}
}
