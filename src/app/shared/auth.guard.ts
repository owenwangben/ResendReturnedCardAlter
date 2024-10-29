import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SsoService, SsoResult, AuthResult } from './sso.service';
import { PageInfoService, AUTH_TYPE } from './page-info.service';
import { MemoryStorage } from './memory.storage';
import { environment } from 'environments/environment';
import { SharedService } from './shared.services';
import { ErrorPageService } from './errorpage/errorpage.service';

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(
		private router: Router,
		private ssoService: SsoService,
		private storage: MemoryStorage,
		private sharedService: SharedService,
		private errorPageService: ErrorPageService,
		private pageinfo: PageInfoService
	) { }

	public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		try {
			try {
				const url = state.url.split("?")[0];
				const result = await this.sharedService.SuspendCheck(url); // 檢查功能是否在暫停期間
				if (result.ResultCode === '01') {
					this.errorPageService.display(result.ResultMessage, true);
					return false;
				}
			}
			catch (error) {
				console.error(error);
			}
			const token = route.params.token;
			const sso = await this.getSsoResult();
			const auth = await this.ssoService.getAuthResult();
			const auth_types = this.pageinfo.auth;
			// console.log(sso, auth, auth_types);
			const source = route.queryParams.source;
			const lang = route.queryParams.lang;
			return !auth_types || auth_types.every(auth_type => {
				let auth_result;
				if (auth_type === AUTH_TYPE.SSO) {
					if (!(auth_result = !!sso)) {
						window.location.href = environment.login + state.url;
					}
				}
				else if (!(auth_result = (!!sso && auth_type < AUTH_TYPE.SSO) || this.checkAuthResult(auth_type, auth, token))) {
					if (auth_type === AUTH_TYPE.MMA) { // 移除MMA驗證，直接導回線上辦卡首頁
						this.router.navigate(["/Application/ApplyCard"]);
					}
					else {
						const auth_url = this.getAuthUrl(auth_type, lang);
						this.router.navigate([auth_url.value], {
							queryParams: { token: token || this.storage.Token, return: state.url, source: source, t: Date.now().toString() }
						});
					}
				}
				// console.log(auth_type, auth_result, state.url);
        if(sso) {
          //如果是MMA登入則在storage紀錄為MMA，目前僅有單筆、帳單分期使用到(2023.03.28)
          this.storage.LoginType = "MMA"
        }
				return auth_result;
			});
		}
		catch (error) {
			console.error(error);
			return false;
		}
	}

	private async getSsoResult(): Promise<SsoResult> {
		const result = await this.ssoService.getSsoResult();
		if (result) {
			if (result.ID && result.ID !== this.storage.CustId) {
				await this.sharedService.ClearAuth();
			}

			this.storage.CustId = result.ID;
			this.storage.UserId = result.SsoUserData && result.SsoUserData.USERID;
		}
		return result;
	}

	private checkAuthResult(auth_type, result: AuthResult, token: string): boolean {
		if (result) {
			let auth_ID;
			switch (auth_type) {
				case AUTH_TYPE.AUTH11:
					auth_ID = result.Auth1_1 && result.Auth1_1.ID;
					break;
				case AUTH_TYPE.AUTH12:
					auth_ID = result.Auth1_2 && result.Auth1_2.ID;
					break;
				case AUTH_TYPE.AUTH13:
					auth_ID = result.Auth1_3 && result.Auth1_3.ID;
					break;
				case AUTH_TYPE.AUTH14:
					auth_ID = result.Auth1_4 && result.Auth1_4.ID;
					break;
				case AUTH_TYPE.AUTH15:
					auth_ID = result.Auth1_5 && result.Auth1_5.ID;
					break;
				case AUTH_TYPE.AUTH16:
					auth_ID = result.Auth1_6 && result.Auth1_6.ID;
					break;
				case AUTH_TYPE.AUTH17:
					auth_ID = result.Auth1_7 && result.Auth1_7.ID;
					break;
				case AUTH_TYPE.AUTH18:
					auth_ID = result.Auth1_8 && result.Auth1_8.ID;
					break;
				case AUTH_TYPE.AUTH2:
					auth_ID = result.Auth2 && result.Auth2.ID;
					break;
				case AUTH_TYPE.AUTH3:
					auth_ID = result.Auth3 && result.Auth3.ID;
					break;
				case AUTH_TYPE.MMA:
					auth_ID = result.AuthMMA && result.AuthMMA.ID;
					break;
				case AUTH_TYPE.CARD:
					auth_ID = result.AuthCard && result.AuthCard.ID;
					break;
				case AUTH_TYPE.CARD_IP:
					auth_ID = result.AuthCard && result.AuthCard.ID;
					break;
				case AUTH_TYPE.ACCOUNT:
					auth_ID = result.AuthAccount && result.AuthAccount.ID;
					break;
				case AUTH_TYPE.ACCOUNT_IP:
					auth_ID = result.AuthAccount && result.AuthAccount.ID;
					break;
				case AUTH_TYPE.CARD_OR_ACCOUNT:
					auth_ID = result.AuthCARD_OR_BANK && result.AuthCARD_OR_BANK.ID;
					break;
				case AUTH_TYPE.DAWHO:
					auth_ID = result.AuthDAWHO && result.AuthDAWHO.ID;
					break;
				case AUTH_TYPE.QUICKACCOUNT:
					auth_ID = result.AuthQuickAccount && result.AuthQuickAccount.ID;
					break;
				case AUTH_TYPE.OTHERCARD:
					auth_ID = result.AuthOtherCard && result.AuthOtherCard.ID;
					break;
					case AUTH_TYPE.OTHERBANK:
						auth_ID = result.AuthOtherBank && result.AuthOtherBank.ID;
						break;
				case AUTH_TYPE.SELECT:
					break;
				case AUTH_TYPE.MBILL:
					if (result.AuthMobileStatement) {
						auth_ID = result.AuthMobileStatement.ID;
						if (!sessionStorage.getItem("MBILL.STMTDATE")) {
							sessionStorage.setItem("MBILL.STMTDATE", result.AuthMobileStatement.Data.Item1);
						}
						this.storage.Token = result.AuthMobileStatement.Token;
					}
					break;
				case AUTH_TYPE.OTP1:
				case AUTH_TYPE.OTP2:
				case AUTH_TYPE.OTP3:
				case AUTH_TYPE.OTP4:
				case AUTH_TYPE.OTP5:
				case AUTH_TYPE.OTP6:
				case AUTH_TYPE.OTP8:
				case AUTH_TYPE.OTP9:
				case AUTH_TYPE.OTP10:
				case AUTH_TYPE.OTP11:
				case AUTH_TYPE.OTP13:
				case AUTH_TYPE.OTP14:
				case AUTH_TYPE.OTP15:
				case AUTH_TYPE.OTP16:
				case AUTH_TYPE.OTP17:
				case AUTH_TYPE.OTP18:
				case AUTH_TYPE.OTP19:
				case AUTH_TYPE.OTP20:
				case AUTH_TYPE.OTP21:
				case AUTH_TYPE.OTP22:
					auth_ID = result.OTP && result.OTP.ID;
					break;
				case AUTH_TYPE.OTP7:
					auth_ID = result.OTP2 && result.OTP2.ID;
					break;
			}
			if (auth_ID) {
				this.storage.CustId = auth_ID;
			}
			// console.log(this.storage.Token, token, this.storage.CustId, auth_ID);
			return auth_ID && (!this.storage.Token || !token || this.storage.Token === token);
		}
		return false;
	}

	private getAuthUrl(auth_type, lang) {
		if (lang) {
			const langUrls = [
				{ key: AUTH_TYPE.CARD_OR_ACCOUNT, value: `/Auth/CardOrAccount/Intl/${lang}` },
				{ key: AUTH_TYPE.OTHERBANK, value: `/Auth/OtherBank/Intl/${lang}` },
				{ key: AUTH_TYPE.OTP1, value: `/Auth/OTP/Intl/${lang}/1` },
			];
			return langUrls.find(item => item.key === auth_type);
		}

		const urls = [
			{ key: AUTH_TYPE.AUTH2, value: '/Auth/Auth2' },
			{ key: AUTH_TYPE.AUTH3, value: '/Auth/Auth3' },
			{ key: AUTH_TYPE.AUTH11, value: '/Auth/Auth1/1' },
			{ key: AUTH_TYPE.AUTH12, value: '/Auth/Auth1/2' },
			{ key: AUTH_TYPE.AUTH13, value: '/Auth/Auth1/3' },
			{ key: AUTH_TYPE.AUTH14, value: '/Auth/Auth1/4' },
			{ key: AUTH_TYPE.AUTH15, value: '/Auth/Auth1/5' },
			{ key: AUTH_TYPE.AUTH16, value: '/Auth/Auth1/6' },
			{ key: AUTH_TYPE.AUTH17, value: '/Auth/Auth1/7' },
			{ key: AUTH_TYPE.AUTH18, value: '/Auth/Auth1/8' },
			{ key: AUTH_TYPE.OTP1, value: '/Auth/OTP/1' },
			{ key: AUTH_TYPE.OTP2, value: '/Auth/OTP/2' },
			{ key: AUTH_TYPE.OTP3, value: '/Auth/OTP/3' },
			{ key: AUTH_TYPE.OTP4, value: '/Auth/OTP/4' },
			{ key: AUTH_TYPE.OTP5, value: '/Auth/OTP/5' },
			{ key: AUTH_TYPE.OTP6, value: '/Auth/OTP/6' },
			{ key: AUTH_TYPE.OTP7, value: '/Auth/OTP/7' },
			{ key: AUTH_TYPE.OTP8, value: '/Auth/OTP/8' },
			{ key: AUTH_TYPE.OTP9, value: '/Auth/OTP/9' },
			{ key: AUTH_TYPE.OTP10, value: '/Auth/OTP/10' },
			{ key: AUTH_TYPE.OTP11, value: '/Auth/OTP/11' },
			{ key: AUTH_TYPE.OTP13, value: '/Auth/OTP/13' },
			{ key: AUTH_TYPE.OTP14, value: '/Auth/OTP/14' },
			{ key: AUTH_TYPE.OTP15, value: '/Auth/OTP/15' },
			{ key: AUTH_TYPE.OTP16, value: '/Auth/OTP/16' },
			{ key: AUTH_TYPE.OTP17, value: '/Auth/OTP/17' },
			{ key: AUTH_TYPE.OTP18, value: '/Auth/OTP/18' },
			{ key: AUTH_TYPE.OTP19, value: '/Auth/OTP/19' },
			{ key: AUTH_TYPE.OTP20, value: '/Auth/OTP/20' },
			{ key: AUTH_TYPE.OTP21, value: '/Auth/OTP/21' },
			{ key: AUTH_TYPE.OTP22, value: '/Auth/OTP/22' },
			{ key: AUTH_TYPE.MMA, value: '/Application/ApplyCard' },
			{ key: AUTH_TYPE.CARD, value: '/Auth/Card' },
			{ key: AUTH_TYPE.CARD_IP, value: '/Auth/Card/1' },
			{ key: AUTH_TYPE.ACCOUNT, value: '/Auth/Account' },
			{ key: AUTH_TYPE.ACCOUNT_IP, value: '/Auth/Account/1' },
			{ key: AUTH_TYPE.CARD_OR_ACCOUNT, value: '/Auth/CardOrAccount' },
			{ key: AUTH_TYPE.DAWHO, value: '/Auth/Dawho' },
			{ key: AUTH_TYPE.OTHERCARD, value: '/Auth/OtherCard' },
			{ key: AUTH_TYPE.OTHERBANK, value: '/Auth/OtherBank' },
			{ key: AUTH_TYPE.SELECT, value: '/Auth/Select' },
			{ key: AUTH_TYPE.MBILL, value: '/Auth/MBill' },
			{ key: AUTH_TYPE.QUICKACCOUNT, value: '/Auth/QuickAccount' },
		];
		return urls.find(item => item.key === auth_type);
	}
}
