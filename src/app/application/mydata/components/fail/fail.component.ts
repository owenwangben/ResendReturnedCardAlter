import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageInfoService } from 'app/shared/page-info.service';
import { MyDataDoRequestModel, MyDataLoginRequestModel, MyDataLoginResponseModel } from 'app/shared/shared.models';
import { SharedService } from 'app/shared/shared.services';
import { IsFromApp, GetQueryParam, StoreMyDataLoginData } from 'app/shared/utilities';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-fail',
	templateUrl: './fail.component.html',
	styles: [`
		@media (max-width: 960px)
		.icon-error {
			width: 6.0416666667vw;
			height: 6.0416666667vw;
		}
		.icon-error {
			display: inline-block;
			width: 58px;
			height: 58px;
			background: url(/mma8/card/images/icon-no-bordered.svg) no-repeat center center;
			background-size: 100% 100%;
		}
	`]

})
export class FailComponent implements OnInit {
	success: boolean;
	public isApp = IsFromApp();
	rc = '';
	code = '';
	title = '';
	msg = '';
	homeUrl = '';
	custId = '';
	birthday = '';
	email = '';
	type: number;
	public isMobile = environment.IsMobile;
	public mydataForm: MyDataLoginResponseModel;
	errorPageService: any;

	constructor(
		private route: ActivatedRoute,
		private sharedService: SharedService,
		public pageinfo: PageInfoService,
		private router: Router) {
		// this.route.queryParams.subscribe(params => this.success = params.rc !== '1');
	}

	ngOnInit() {
		this.rc = this.route.snapshot.queryParamMap.get('rc');
		this.code = this.route.snapshot.queryParamMap.get('code');
		this.custId = localStorage.getItem('CustId');
		this.birthday = localStorage.getItem('Birthday');
		this.email = localStorage.getItem('Email');
		this.route.params.subscribe(params => this.type = +params.type);

		switch (this.type) {
			case 1:
				this.pageinfo.name = "線上辦卡";
				this.homeUrl = "/Application/ApplyCard";
				break;
			case 2:
				this.pageinfo.name = "上傳缺補文件";
				this.homeUrl = "/Application/ApplyCard/Upload";
				break;
			case 3:
				this.pageinfo.name = "永久額度調整";
				this.homeUrl = "/Transaction/PermCLI";
				break;
			default:
				break;
		}

		if (this.rc === '2') {
			this.title = '憑證密碼輸入錯誤';
			this.msg = '您輸入的憑證密碼已連續錯誤達5次，為了您的交易安全，系統將自動刪除憑證，請於申請/設定服務>憑證管理重新申請憑證及設定新密碼。';
		} else if (this.rc === '3') {
			this.title = '憑證驗證失敗';
			this.msg = '錯誤碼：' + this.code;
		}
	}

	async getToken() {
		const model = {
			ID: this.custId,
			FunctionCode: this.type,
			IsMobile: this.isMobile,
			Birthday: this.birthday,
			Email: this.email,
			Mode: 2
		} as MyDataLoginRequestModel;
		const response = await this.sharedService.mydataLogin(model);
		if (response.ResultCode === "0000" || response.ResultCode === "0") {
			console.log(response.Result);
			this.mydataForm = response.Result;
			StoreMyDataLoginData(this.mydataForm);
			return true;
		}

		return false;
	}

	// 申請憑證
	softCertSetting() {
		location.href = "sinopacaction:{softcertsetting}{}";
	}

	// 重新驗證
	async reCheck() {
		const success = await this.getToken();
		if (success) {
			const model = {
				VerifyNo: this.mydataForm.VerifyNo
			} as MyDataDoRequestModel;
			await this.sharedService.mydataDo(model);

			location.href = window['eweb_config'].soft_cert_url;
		}
		else {
			this.errorPageService.display('系統整理中，請稍後再試', false);
		}
	}

	// 返回步驟1
	gotoHome() {
		this.router.navigateByUrl(this.homeUrl);
		/* location.href = this.homeUrl; */
	}

	ExitWebView() {
		window['ExitWebview']();
	}
}
