import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms/';
import { ErrorPageService, FormValidator, MemoryStorage, MyFormControl, PageInfoService, SharedService } from 'app/shared/shared.module';
import { AuthService } from '../services/auth.service';
import { AuthByBirthdayRequestModel } from '../services/auth.models';
import * as moment from 'moment';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-auth1',
	templateUrl: './auth1.component.html'
})
export class Auth1Component implements OnInit {
	private returnUrl: string;
	private formValidator = new FormValidator();
	public form: FormGroup;
	public defDate: string;
	public code: number;
	public isMobile = environment.IsMobile;
	public isSelectedAuthMethod = false;
	public isShowOtherLinks = false;
	public queryStatusMemoText: string;
	public queryStatusUrl: string;
	public registerMemberUrl: string;
	public method: string;

	public constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private router: Router,
    private storage: MemoryStorage,
		private authService: AuthService,
		private sharedService: SharedService,
		private errorPageService: ErrorPageService,
	) {
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.return;
			console.log(this.returnUrl);
			this.registerMemberUrl = this.isMobile ? "https://m.sinopac.com/m/member/apply/m_apply_home.aspx" :
						"https://mma.sinopac.com/MemberPortal/Member/ApplyMmaIndex.aspx";
			switch (this.returnUrl) {
				case "/Application/EStatementChange":
					pageinfo.name = "行動/電子帳單 通知設定";
					break;
				case "/Transaction/TempCLI":
					pageinfo.name = "信用卡臨時額度調整";
					this.isShowOtherLinks = true;
					this.queryStatusMemoText = "欲查詢信用卡額度調整進度";
					this.queryStatusUrl = this.isMobile ? "/m/SinoCard/Transaction/TempCLIStatus" :
						"/SinoCard/Transaction/TempCLIStatus";
					break;
				case "/Transaction/PermCLI":
						pageinfo.name = "信用卡永久額度調整";
						this.isShowOtherLinks = true;
						this.queryStatusMemoText = "欲查詢信用卡額度調整進度";
						this.queryStatusUrl = this.isMobile ? "/m/SinoCard/Transaction/PermCLIStatus" :
							"/SinoCard/Transaction/PermCLIStatus";
						break;
				case "/Transaction/CashAdvance":
						pageinfo.name = "預借現金";
					break;
				case "/Transaction/EasyChoice":
						pageinfo.name = "預借現金分期(易通財)";
						this.isShowOtherLinks = true;
						this.queryStatusMemoText = "欲使用信用卡預借現金分期(易通財)查詢";
						this.queryStatusUrl = this.isMobile ? "/m/SinoCard/Transaction/EasyChoiceStatus" :
							"/SinoCard/Transaction/EasyChoiceStatus";
					break;
				case "/Transaction/RTEStmt":
						pageinfo.name = "帳單分期";
						this.isShowOtherLinks = true;
						this.queryStatusMemoText = "欲查詢帳單分期資訊";
						this.queryStatusUrl = this.isMobile ? "/m/SinoCard/Transaction/RTEStmtRecords" :
							"/SinoCard/Transaction/RTEStmtRecords";
					break;
				case "/Transaction/RTE":
						pageinfo.name = "單筆消費分期";
					break;
				case "/Transaction/RTEAgreement":
						pageinfo.name = "消費分期約定事項";
					break;
			}

			// 若有設定method，直接前往指定驗證方式
			this.method = params.method;
			const methodList = ['MMA', 'CARD'];
			if (this.method && methodList.indexOf(this.method.toUpperCase()) !== -1) {
				this.auth(this.method.toUpperCase());
			}
		});
		this.route.params.subscribe(params => this.code = +params.code);
		const controls: Array<MyFormControl> = [
			{
				Name: 'idNumber',
				ErrMsg: '身分證字號為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(8)
					])
				)
			},
			{
				Name: 'birthday',
				ErrMsg: '生日為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required,
					])
				)
			},
			{
				Name: 'agree',
				ErrMsg: '請勾選已審閱',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'captcha',
				ErrMsg: '驗證碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(6)
					])
				)
			},
		];

		this.form = this.formValidator.MakeFormGroup(controls);
		this.defDate = moment().add(-30, 'years').format('YYYYMMDD');
	}

	public async ngOnInit() {
		await this.sharedService.ClearAuth(['OTP']);
	}

	async submit() {
		if (!this.formValidator.Validate()) { return; }
		// 全行IP檢查 (臨調/永調)
		if (this.code === 3 || this.code === 4) {
			if (await this.checkMMALimitIntranetUsage(this.form.value.idNumber)){
				return;
			}
		}
		const model: AuthByBirthdayRequestModel = {
			ID: this.form.value.idNumber,
			Birthday: this.form.value.birthday,
			Captcha: this.form.value.captcha,
			Code: this.code
		};
		const response = await this.authService.authByBirthday(model);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
      this.storage.LoginType = "OTP"
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

	public auth(method: string) {
		if (method === "MMA") {
			window.location.href = environment.login + this.returnUrl;
		}
		else {
			this.pageinfo.name = "信用卡卡友驗證";
			this.isSelectedAuthMethod = true;
		}
	}
}
