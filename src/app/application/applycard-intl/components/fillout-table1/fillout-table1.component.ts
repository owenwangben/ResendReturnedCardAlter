import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { WizardService, FormValidator, MyFormControl, ErrorPageService,
			CustomerInfoModel, MemoryStorage } from 'app/shared/shared.module';
import { CardInfo, SendApplyInfoRequestModel, AccountDetail } from '../../../applycard/services/applycard.models';
import { ApplyCardService } from '../../../applycard/services/applycard.services';
import { OpenLightbox, ApplyCardPushGTM,
	ApplyCardPageName, SensorsTrackSubmit } from 'app/shared/utilities';
import { GetLanguage, LocaleMessages } from '../../shared/LocaleMessages';
import { dateValidator } from 'app/shared/validators/date.validator';

@Component({
	selector: 'app-applycard-intl-fillout-table1',
	templateUrl: './fillout-table1.component.html'
})
export class FillOutTable1Component implements OnInit, OnDestroy {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public cardinfo: CardInfo;
	public cminfo: CustomerInfoModel;
	private branch: string;
	public isOtherCardAuth: boolean;
	public isOtherBankAuth: boolean;
	private referrer: string;
	public twdAccounts: AccountDetail[];
	public showTwdAuthDebitUI: boolean;
	language: string = GetLanguage();
	message = LocaleMessages[this.language].FillOutTable1;
	btnMessage = LocaleMessages[this.language].Button;
	exceedDay = 180 ;
	showCustomerInfo = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService,
		private wizardService: WizardService,
		private storage: MemoryStorage,
	) {
		const expDate = new Date(new Date().setDate(new Date().getDate() + this.exceedDay));
		const max_ed = expDate.getFullYear() * 10000 + (expDate.getMonth() + 1) * 100 + expDate.getDate() ;
		const controls: Array<MyFormControl> = [
			{
				Name: 'NotAutoBonus',
				ErrMsg: this.message.ErrMsg.SelectEasyCard + '<br>請選擇悠遊卡是否自動加值功能',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'CName',
				ErrMsg: this.message.ErrMsg.CName + '<br>中文姓名為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(2)
					])
				)
			},
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
				Name: 'ArcExpireDate',
				ErrMsg: this.message.ErrMsg.Less180Day + '<br>您無法申辦因居留期限少於180天',
				Control: new FormControl(
					undefined,
					Validators.compose([
						dateValidator(),
						Validators.required, Validators.minLength(8), Validators.min(max_ed)
					])
				),
				RedirectURL: 'https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/excellence-business-card-only-foreigner.html'
			},
			{
				Name: 'Mobile',
				ErrMsg: this.message.ErrMsg.MobileNum + '<br>行動電話為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^09[0-9]{8}$')
					])
				)
			},
			{
				Name: 'Email',
				ErrMsg: this.message.ErrMsg.Email + '<br>電子信箱為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*[.][a-zA-Z]+$')
					])
				)
			},
			{
				Name: 'StmtDeliverWay',
				ErrMsg: this.message.ErrMsg.StmtDeliverWay + '<br>您的帳單寄送方式尚未選擇',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'Referrer',			// 推薦人
				Control: new FormControl(undefined)
			},
			{
				Name: 'EmailSendContract',	// 是否同意貴行以電子郵件寄送信用卡契約
				Control: new FormControl(undefined)
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
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	private patchFormValue(applyinfo: SendApplyInfoRequestModel) {
		this.form.patchValue({
			NotAutoBonus: applyinfo.NotAutoBonus,
			CName: applyinfo.Name,
			ID: applyinfo.IDNumber,
			ArcExpireDate: applyinfo.ArcExpireDate,
			Mobile: applyinfo.Mobile,
			Email: applyinfo.Email,
			StmtDeliverWay: applyinfo.StmtDeliverWay,
			Referrer: applyinfo.Referrer,
			EmailSendContract: applyinfo.EmailSendContract,
			IBankAgreement: applyinfo.IBankAgreement,
		});
	}

	async ngOnInit() {
		this.route.queryParams.subscribe(params => {
			this.branch = params.br;
			this.referrer = params.ref;
		});
		this.route.data.subscribe(async (data) => {
			this.cardinfo = data.cardinfo;
			this.cminfo = data.cminfo;
			this.storage.CardTitle = this.cardinfo ? this.cardinfo.Title : "";
			this.storage.CardType = this.cardinfo ? this.cardinfo.FullCardType : "";
			this.storage.ApplyCardSource = "";
			ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.辦卡流程step1, this.storage.ApplyCardSource);
			if (!data.applyinfo) {
				data.applyinfo = new SendApplyInfoRequestModel();
				const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
				applyinfo.MemberType = data.MemberType;
				applyinfo.ProductType = this.cardinfo.ProductType;
				applyinfo.ApplyCardCategory = this.cardinfo.Id;
				applyinfo.UploadFileIds = new Array(2).fill(undefined);
				applyinfo.ImageIds = new Array(2).fill(undefined);
				applyinfo.Referrer = this.referrer;

				if (this.cminfo) {
					applyinfo.IsCardMember = this.cminfo.IsCardMember;
					applyinfo.IsTwoFactorMember = true;
					applyinfo.Name = this.cminfo.CName;
					applyinfo.IDNumber = this.cminfo.ID;
					applyinfo.ArcExpireDate = sessionStorage.getItem("ApplyCardIntl.ArcExpireDate");
					applyinfo.Mobile = this.cminfo.Mobile;
					applyinfo.Email = this.cminfo.Email;

				}
				else {
					applyinfo.IsCardMember = false;
					applyinfo.IsTwoFactorMember = false;
				}
			}
			data.applyinfo.isOtherBankAuth = this.isOtherBankAuth = data.MemberType === 11;
			this.patchFormValue(data.applyinfo);
		});
	}

	ngOnDestroy() {
		$('.lboxed').remove();
	}

	private async checkCardMember(id: string, applyinfo: SendApplyInfoRequestModel) {
		const response = await this.applyCardService.checkCardMember(id);
		if (response.ResultCode === "00" || response.ResultCode === "01") {
			applyinfo.IsCardMember = response.Result.IsCardMember;
		}
	}

	async submit() {
		if (!this.formValidator.Validate()) { return; }

		// 檢查是否重複辦卡
		const response = await this.applyCardService.DupCheck(
			this.form.value.ID, this.cardinfo.CardFace, (this.cminfo && this.cminfo.ID && this.cminfo.ID.length > 0)
		);
		if (response.ResultCode === "01") {
			const CErrMsg = '您在本行已持有相同卡別或卡片仍在審核中，恕無法重覆申辦。如有申請文件需捕上傳，請按下方連結。';
			const ErrMsg: string = this.message.SameTypeCard ? this.message.SameTypeCard + '<br>' + CErrMsg : CErrMsg;
			const CConfirmBtnText = "上傳缺補文件";
			const ConfirmBtnText = this.message.Button.UploadSupp ? this.message.Button.UploadSupp + "<br>" + CConfirmBtnText : CConfirmBtnText
			this.errorPageService.confirm(ErrMsg, ConfirmBtnText, null, (ok) => {
				if (ok) {
					this.router.navigateByUrl("/Application/ApplyCard/Intl/{0}/Upload".replace('{0}', this.language));
				}
			});
			return;
		}

		if (!this.isOtherCardAuth && !this.isOtherBankAuth && this.cminfo && this.form.value.CName !== this.cminfo.CName) {
			const CErrMsg = '您填具的姓名與本行資料不符，請再次確認'
			const ErrMsg: string = this.message.FillNameError ? this.message.FillNameError + '<br>' + CErrMsg : CErrMsg;
			this.errorPageService.confirm(ErrMsg, "確認無誤", "重新輸入", (ok) => {
				if (ok) {
					this.doSubmit();
				}
				else {
					this.formValidator.SetFocus("CName");
				}
			});
		}
		else {
			this.doSubmit();
		}
	}

	doSubmit() {
		this.route.data.subscribe(async(data) => {
			const value = this.form.value;
			const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
			applyinfo.NotAutoBonus = value.NotAutoBonus;
			applyinfo.Name = value.CName;
			applyinfo.IDNumber = value.ID;
			applyinfo.ArcExpireDate = value.ArcExpireDate;
			applyinfo.Mobile = value.Mobile;
			applyinfo.Email = value.Email;
			applyinfo.StmtDeliverWay = value.StmtDeliverWay;
			applyinfo.Referrer = value.Referrer;
			if (!value.EmailSendContract) {
				applyinfo.EmailSendContract = false;
			} else {
				applyinfo.EmailSendContract = value.EmailSendContract;
			}
			applyinfo.IBankAgreement = value.IBankAgreement;

			if (!applyinfo.IsCardMember) {
				await this.checkCardMember(value.ID, applyinfo);
			}
			const response = await this.applyCardService.step(
        value.CName, value.Mobile, applyinfo.IsCardMember, this.cardinfo.Id, applyinfo.IDNumber
			);
			if (response.ResultCode === "00") {
				applyinfo.StepRowId = response.Result.RowId;
			}

			SensorsTrackSubmit('CardApplicationFirstInformationSubmission', this.storage.CardTitle, this.storage.CardType,
				true, '', !!this.storage.UserId, !!this.cminfo,
				applyinfo.IsCardMember, applyinfo.IsOtherCardAuth, applyinfo.Source, this.isOtherBankAuth ? '他行臺幣存款帳戶驗證申請' : null);

			if (!this.cminfo || !this.cminfo.IsCardMember) {
				const CErrMsg = '提醒您，若您透過網路辦卡，系統將預設為使用電子/行動帳單，不再寄送紙本帳單。若您需紙本帳單，請於核卡後透過客服專線申請。';
				let ErrMsg: string = this.message.submitNotice ? this.message.submitNotice + '<br>' + CErrMsg : CErrMsg;
				this.errorPageService.display(ErrMsg, false, () => {
					this.wizardService.GoToNextStep();
				});
			}
			else {
				this.wizardService.GoToNextStep();
			}
		});
	}

	public goNext() {
		this.closelbox();
		this.wizardService.GoToNextStep();
	}

	public openlbox(lboxid) {
		OpenLightbox(lboxid);
	}

	private closelbox() {
		$('.lboxed').trigger('close');
	}
}
