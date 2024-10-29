import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { VcaptchaService, MyFormControl, FormValidator, ErrorPageService, SharedService } from 'app/shared/shared.module';
import { LeaveMessageService } from './leave-message.services';
import { ApplyCardService } from '../applycard/services/applycard.services';
import { CnamePattern } from 'app/shared/utilities';
import { AgreenRegulationHandleService, GetAgreementDataRequest, InsertAgreementRecordRequest } from 'app/shared/agreen-regulation-handle.service';



@Component({
	selector: 'app-leave-message',
	templateUrl: './leave-message.component.html'
})
export class LeaveMessageComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public vcaptchaUrl: SafeUrl | string;
	public cardnames: string[];
	public personalDataTermsUrl: string;
	InsertAgreementRecordModel = new InsertAgreementRecordRequest();
	public isReadPersonalDataTerms = false;

	constructor(
		private vcaptchaService: VcaptchaService,
		private leaveMessageService: LeaveMessageService,
		private errorPageService: ErrorPageService,
		private sharedService: SharedService,
		private applyCardService: ApplyCardService,
		private agreenregulationhandleservice: AgreenRegulationHandleService
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'product',
				ErrMsg: '請選擇申請項目',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'cardname',
				ErrMsg: '',
				Control: new FormControl()
			},
			{
				Name: 'name',
				ErrMsg: '姓名未填寫或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern(CnamePattern)
					])
				)
			},
			{
				Name: 'tel',
				ErrMsg: '',
				Control: new FormControl()
			},
			{
				Name: 'mobile',
				ErrMsg: '請輸入正確的手機號碼',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(10)
					])
				)
			},
			{
				Name: 'cardHolder',
				ErrMsg: '請選擇是否為卡友',
				Control: new FormControl(
					false,
					Validators.compose([
						Validators.required
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
			},
			{
				Name: 'checkAgreement',
				ErrMsg: '請詳閱並勾選同意事項',
				Control: new FormControl(
					false,
					Validators.compose([
					])
				)
			}
		];
		this.form = this.formValidator.MakeFormGroup(controls);
	}

	async ngOnInit() {
		this.form.value.cardname = null;
		this.getData();
		await this.GetCardNames();
		await this.changeVcaptcha();
	}

	//取得調款的URL and 版號,並先設好回寫的request
	async getData () {
		let model: GetAgreementDataRequest ={Title: "電話留言_永豐銀行個人資料蒐集、處理及利用告知義務內容", Source: "EWEB"}
		const response = await this.agreenregulationhandleservice.GetAgreementData(model);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.personalDataTermsUrl = response.Result.Content;
			this.InsertAgreementRecordModel.Source = "EWEB";
			this.InsertAgreementRecordModel.Title = "永豐銀行個人資料蒐集、處理及利用告知義務內容";
			this.InsertAgreementRecordModel.Version = response.Result.Version;
		};
	}

	async changeVcaptcha() {
		this.vcaptchaUrl = await this.vcaptchaService.getVcaptchaUrl();
	}

	async GetCardNames()
	{
		const response = await this.applyCardService.getAllCardInfo();
		if (!this.errorPageService.validateResponse(response, { redirect: false })) {
			return;
		}

		const cards = response.Result.ApplyCardApplications.filter(item=> item.ProductType == 1 || item.ProductType == 9 ||item.ProductType == 10);
		this.cardnames = Array.from(new Set(cards.map(item => item.Title.replace('<br>', ''))));
		this.cardnames.push('其它');
	}

	async submit() {
		if (!this.formValidator.Validate()) { return; };
		const value = this.form.value;

		if (!this.isReadPersonalDataTerms) {
			this.isReadPersonalDataTerms = true;
			this.errorPageService.display("請詳閱「永豐銀行個人資料蒐集、處理及利用告知義務內容」", false, () => {
				window.open(this.personalDataTermsUrl, "_blank");
			});
		}
		else {
			if (!value.checkAgreement) {
				this.errorPageService.display("請詳閱並勾選同意事項", false);
				return;
			}

			//防止有人輸入+886 或 886
			if (value.mobile.startsWith("+886")){
				this.InsertAgreementRecordModel.ID = value.mobile.Substring(0, 4).Replace("+886", "0");
			}
			else if (value.mobile.startsWith("886")){
				this.InsertAgreementRecordModel.ID = value.mobile.Substring(0, 3).Replace("886", "0");
			}
			else{
				this.InsertAgreementRecordModel.ID = value.mobile
			}

			//把個資使用同意調款回寫Table紀錄
			await this.agreenregulationhandleservice.InsertAgreementRecord(this.InsertAgreementRecordModel);

			if ( value.product !== "信用卡"){ value.cardname = '';};
			const response = await this.leaveMessageService.apply(
				value.product, value.cardname, value.name, value.tel, value.mobile, value.cardHolder, value.captcha
			);
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.errorPageService.confirm("留言成功", "回首頁", "", (ok) => {
					if(ok)
						location.href = 'https://bank.sinopac.com/sinopacBT/index.html';
				},false);
			}
			this.changeVcaptcha();
		}
	}

	reset() {
		this.form.reset();
		this.form.patchValue({ cardHolder: false });
	}
}
