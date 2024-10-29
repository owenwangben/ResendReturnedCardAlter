import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PageInfoService, FormValidator, WizardService, MyFormControl, ErrorPageService, MemoryStorage,
			CustomerInfoModel } from 'app/shared/shared.module';
import { SendApplyInfoRequestModel, CardInfo, AccountDetail } from '../../../applycard/services/applycard.models';
import { OpenLightbox, ApplyCardPushGTM, ApplyCardPageName, SensorsTrackSubmit } from 'app/shared/utilities';
import { ApplyCardService } from '../../../applycard/services/applycard.services';
import { GetLanguage, LocaleMessages } from '../../shared/LocaleMessages';

@Component({
	selector: 'app-applycard-intl-agreement',
	templateUrl: './agreement.component.html'
})
export class AgreementComponent implements OnInit, OnDestroy {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public cardinfo: CardInfo;
	public cminfo: CustomerInfoModel;
	public twdAccounts: AccountDetail[];
	language:string = GetLanguage();
	message = LocaleMessages[this.language].Agreement;
	btnMessage = LocaleMessages[this.language].Button;
	showTaiwanDepositAccount = false;

	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService,
		private storage: MemoryStorage,
		private applyCardService: ApplyCardService,
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'AgreeTnC',
				ErrMsg: this.message.ErrMsg.AgreeTnC + '<br>請同意信用卡申請書同意條款暨約定事項',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'AgreeTwdAuthDebit',
				ErrMsg: this.message.ErrMsg.AgreeTwdAuthDebit + '<br>您的「永豐信用卡自動扣繳申請及注意事項」尚未選擇',
				Control: new FormControl(
					undefined, Validators.required
				)
			},
			{
				Name: 'TaiwanDepositAccount',
				ErrMsg: this.message.ErrMsg.TaiwanDepositAccount + '<br>您的「臺幣帳款自動扣繳帳號」尚未設定或格式有誤',
				Control: new FormControl(
					null,
					Validators.compose([
						Validators.required, Validators.minLength(14)
					])
				)
			},
			{
				Name: 'TwdAuthDebitAmount',
				ErrMsg: this.message.ErrMsg.TwdAuthDebitAmount + '<br>您的「授權扣繳金額」尚未選擇',
				Control: new FormControl(undefined, Validators.required)
			},
			{
				Name: 'AgreeBrandedCard',
				ErrMsg: this.message.ErrMsg.AgreeBrandedCard + '<br>請同意聯名卡/認同機構之個人資料使用同意條款',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'AgreeAllCompany',
				ErrMsg: this.message.ErrMsg.AgreeAllCompany + '<br>請選擇是否同意共同行銷/合作推廣個人資料',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	async ngOnInit() {
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.同意條款, this.storage.ApplyCardSource);
		this.route.data.subscribe(async (data) => {
			this.cardinfo = data.cardinfo;
			this.cminfo = data.cminfo;
			this.twdAccounts = await this.getBankAccounts(1);
			const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
			this.form.patchValue({
				AgreeTnC: applyinfo.AgreeTnC,
				AgreeTwdAuthDebit: applyinfo.AgreeTwdAuthDebit,
				TaiwanDepositAccount: applyinfo.TaiwanDepositAccount,
				TwdAuthDebitAmount: applyinfo.TwdAuthDebitAmount,
				AgreeBrandedCard: applyinfo.AgreeBrandedCard,
				AgreeAllCompany: applyinfo.AgreeAllCompany,
			});
		});
	}

	async getBankAccounts(currencyType: number): Promise<AccountDetail[]> {
		const response = await this.applyCardService.getBankAccounts(currencyType);
		if (this.errorPageService.validateResponse(response, { showMessage: false })) {
			return response.Result.Accounts;
		}
		return [];
	}

	ngOnDestroy() {
		$('.lboxed').remove();
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}

	submit() {
		if (!this.formValidator.Validate()) { return; }
		this.route.data.subscribe(data => {
			const value = this.form.value;
			const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
			applyinfo.AgreeTnC = value.AgreeTnC;
			applyinfo.AgreeTwdAuthDebit = value.AgreeTwdAuthDebit;
			applyinfo.TaiwanDepositAccount = value.TaiwanDepositAccount;
			applyinfo.TwdAuthDebitAmount = value.TwdAuthDebitAmount;
			applyinfo.AgreeBrandedCard = value.AgreeBrandedCard;
			applyinfo.AgreeAllCompany = value.AgreeAllCompany;

			SensorsTrackSubmit('CardApplicationCommonClausesSubmission', this.storage.CardTitle, this.storage.CardType,
				true, '', !!this.storage.UserId, !!this.cminfo,
				applyinfo.IsCardMember, applyinfo.IsOtherCardAuth, applyinfo.Source);

			this.wizardService.GoToNextStep();
		});
	}

	public openlbox(lboxid) {
		OpenLightbox(lboxid);
	}

	switchDepositAccount(): void {
		this.showTaiwanDepositAccount = !this.showTaiwanDepositAccount;
		if (!this.showTaiwanDepositAccount) {
			this.form.patchValue({
				TaiwanDepositAccount: null
			});
		}
	}
}
