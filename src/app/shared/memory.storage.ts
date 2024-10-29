import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IsFromApp } from './utilities';

@Injectable()
export class MemoryStorage {
	// private _custId = "";
	// private _userId = "";
	// private _mobileNo = "";
	// private _sessionKey = "";

	public get ApplicationName(): string {
		let appName = environment.applicationName;
		if (environment.IsMobile) {
			const app = IsFromApp();
			if (app) { appName = app; }
		}
		return appName;
	}

	public get CustId(): string {
		return sessionStorage.getItem("MemoryStorage.CustId");
		// return this._custId;
	}
	public set CustId(value: string) {
		sessionStorage.setItem("MemoryStorage.CustId", value);
		// this._custId = value;
	}

	public get UserId(): string {
		return sessionStorage.getItem("MemoryStorage.UserId");
		// return this._userId;
	}
	public set UserId(value: string) {
		sessionStorage.setItem("MemoryStorage.UserId", value);
		// this._userId = value;
	}

	public get MobileNo(): string {
		return sessionStorage.getItem("MemoryStorage.MobileNo");
		// return this._mobileNo;
	}
	public set MobileNo(value: string) {
		sessionStorage.setItem("MemoryStorage.MobileNo", value);
		// this._mobileNo = value;
	}

  public get SessionKey(): string {
		return sessionStorage.getItem("MemoryStorage.SessionKey");
		// return this._sessionKey;
	}
	public set SessionKey(value: string) {
		sessionStorage.setItem("MemoryStorage.SessionKey", value);
		// this.sessionKey = value;
	}

	public get Token(): string {
		return sessionStorage.getItem("MemoryStorage.Token");
	}
	public set Token(value: string) {
		sessionStorage.setItem("MemoryStorage.Token", value);
	}

	public get CardTitle(): string {
		return sessionStorage.getItem("MemoryStorage.CardTitle");
	}
	public set CardTitle(value: string) {
		sessionStorage.setItem("MemoryStorage.CardTitle", value);
	}

	public get CardType(): string {
		return sessionStorage.getItem("MemoryStorage.CardType");
	}
	public set CardType(value: string) {
		sessionStorage.setItem("MemoryStorage.CardType", value);
	}

	public get ApplyCardSource(): string {
		return sessionStorage.getItem("MemoryStorage.ApplyCardSource");
	}
	public set ApplyCardSource(value: string) {
		sessionStorage.setItem("MemoryStorage.ApplyCardSource", value);
	}

	public get CardFace(): string {
		return sessionStorage.getItem("MemoryStorage.CardFace");
	}
	public set CardFace(value: string) {
		sessionStorage.setItem("MemoryStorage.CardFace", value);
	}

	public get IsBankUser() {
		return sessionStorage.getItem("MemoryStorage.IsBankUser");
	}

	public set IsBankUser(value: string) {
		sessionStorage.setItem("MemoryStorage.IsBankUser", value);
	}

	public get AuthType() {
		return sessionStorage.getItem("MemoryStorage.AuthType");
	}

	public set AuthType(value: string) {
		sessionStorage.setItem("MemoryStorage.AuthType", value);
	}

	public get CifType(): string {
		return sessionStorage.getItem("MemoryStorage.CifType");
	}
	public set CifType(value: string) {
		sessionStorage.setItem("MemoryStorage.CifType", value);
	}

	public get WorkTXN(): string {
		return sessionStorage.getItem("MemoryStorage.WorkTXN");
	}

	public set WorkTXN(value: string) {
		sessionStorage.setItem("MemoryStorage.WorkTXN", value);
	}
  //LoginType為單筆分期和帳單分期用來申請時，做為不同身分的判斷，分為OTP及MMA兩種
  public get LoginType(): string {
		return sessionStorage.getItem("MemoryStorage.LoginType");
	}
	public set LoginType(value: string) {
		sessionStorage.setItem("MemoryStorage.LoginType", value);
	}

  /**近期是否異動手機門號(打FEP:VAA2566) 預設:空白 Y:是 N:否 */
  public get CellPhoneChg(): string {
		return sessionStorage.getItem("MemoryStorage.CellPhoneChg");
	}
	public set CellPhoneChg(value: string) {
		sessionStorage.setItem("MemoryStorage.CellPhoneChg", value);
	}
}
