import { Component, ElementRef, HostListener, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SharedService, ErrorPageService, MyFormControl, FormValidator, MemoryStorage, WizardService } from 'app/shared/shared.module';
import { TransferAccountViewModel } from 'app/shared/shared.models';
import { ApplyService, ApplyDebitCardRequestModel, UpdateMMAMemberDataRequestModel } from '../../apply.service';
import { CityAreaZipCode } from 'app/application/applycard/services/applycard.models';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';
import { OpenLightbox } from 'app/shared/utilities';
import { AgreenRegulationHandleService, GetAgreementDataRequest, InsertAgreementRecordRequest } from 'app/shared/agreen-regulation-handle.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-apply-page2',
	templateUrl: './apply-page2.component.html'
})
export class ApplyPage2Component implements OnInit, OnDestroy {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public canSubmit = true;
	public digitmark: boolean;
	isMobile = environment.IsMobile;
	public accountOpeningGeneralAgreement = new InsertAgreementRecordRequest();
	public accountOpeningGeneralAgreementUrl="";
	public safeurl;

	@HostListener('window:message', ['$event'])
	onMessage(event) {
		if (event.data === 'pdf-scroll-down') {
			$(".btn-agree").prop('disabled', false);
		} else {
			$(".btn-agree").prop('disabled', true);
		}
	}

	constructor(
		private sharedService: SharedService,
		private errorPageService: ErrorPageService,
		private wizardService: WizardService,
		private storage: MemoryStorage,
		private applyService: ApplyService,
		private route: ActivatedRoute,
		private agreenregulationhandleservice: AgreenRegulationHandleService,
		private sanitizer: DomSanitizer
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'CardType',
				ErrMsg: '請選擇卡片種類',
				Control: new FormControl(
					1,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'EasyCardAutoload',
				ErrMsg: '請選擇開啟/關閉悠遊卡自動加值功能',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'AgreeBrandedCard',
				ErrMsg: '請同意聯名卡/認同機構之個人資料使用同意條款',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'AgreeThirdParty',
				ErrMsg: '請選擇是否同意第三人行銷個人資料同意條款',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'AgreeEasyCard',
				ErrMsg: '請選擇是否同意提供個人資料予悠遊卡公司作為行銷業務之特定目的使用',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'AgreeTnC',
				ErrMsg: '請同意「永豐銀行開立帳戶總約定書」內各項條款，並於合理期間審閱相關條款。',
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

	ngOnInit() {
		this.route.data.subscribe(async (data) => {
			if (data.applyinfo) {
				const applyinfo = data.applyinfo;
				const controls = this.form.controls;
				if (((applyinfo.digitmark ===2) || (controls.CardType.value === 1)) && applyinfo.digitmark) {
					controls.CardType.setValue(2);
				}


				controls.EasyCardAutoload.setValue(applyinfo.EasyCardAutoload);
				controls.AgreeBrandedCard.setValue(applyinfo.AgreeBrandedCard);
				controls.AgreeEasyCard.setValue(applyinfo.AgreeEasyCard);
				controls.AgreeTnC.setValue(applyinfo.AggreeApplyDebitCard);
				this.digitmark = applyinfo.digitmark
			}
		})
		this.getData("永豐銀行開立帳戶總約定書");
	}

	async getData (name) {
		let model: GetAgreementDataRequest ={Title: name, Source: "EWEB"}
		const response = await this.agreenregulationhandleservice.GetAgreementData(model);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			if (name = "永豐銀行開立帳戶總約定書") {
				//URL前面那段是用來開啟PDF閱讀套件
				this.accountOpeningGeneralAgreementUrl = "/mma8/card/pdfjs-dist/web/viewer.html?file=" + response.Result.Content;
				this.safeurl = this.sanitizer.bypassSecurityTrustResourceUrl(this.accountOpeningGeneralAgreementUrl);
				this.accountOpeningGeneralAgreement.ID = this.storage.CustId;
				this.accountOpeningGeneralAgreement.Source = "EWEB";
				this.accountOpeningGeneralAgreement.Title = "永豐銀行開立帳戶總約定書";
				this.accountOpeningGeneralAgreement.Version = response.Result.Version;
			}
		};
	}

	async submit() {
		if (!this.formValidator.Validate()) { return; }
		await this.agreenregulationhandleservice.InsertAgreementRecord(this.accountOpeningGeneralAgreement);
		this.canSubmit = false;
		this.route.data.subscribe(async (data) => {
			const applyinfo: ApplyDebitCardRequestModel = data.applyinfo;
			const value = this.form.value;
			applyinfo.CardType = value.CardType;
			applyinfo.EasyCardAutoload = value.EasyCardAutoload;
			applyinfo.AgreeBrandedCard = value.AgreeBrandedCard;
			applyinfo.AgreeEasyCard = value.AgreeEasyCard;
			applyinfo.AggreeApplyDebitCard = value.AgreeTnC;

			const response = await this.applyService.ApplyDebitCard(applyinfo);
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.errorPageService.display('您已經申請完成，卡片約5至7天以掛號郵件寄送至通訊地址，' +
					'因卡片需轉檔製作，若有任何問題，建請您一個工作天後洽客服專線(02)2528-7776，謝謝您的耐心等候。提醒您欲使用國外提款功能，請臨櫃辦理開通。', false,
					() => {
						this.gotoMyAssetPage();
					});
			}
		});
	}

	gotoMyAssetPage() {
		window.location.href = this.isMobile ? '/m/m_home.aspx' : '/MemberPortal/Member/NextWebLogin.aspx';
	};

	prestep() {
		this.route.data.subscribe(async (data) => {
			const applyinfo: ApplyDebitCardRequestModel = data.applyinfo;
			const value = this.form.value;
			applyinfo.CardType = value.CardType;
			applyinfo.EasyCardAutoload = value.EasyCardAutoload;
			applyinfo.AgreeBrandedCard = value.AgreeBrandedCard;
			applyinfo.AgreeEasyCard = value.AgreeEasyCard;
			applyinfo.AggreeApplyDebitCard = value.AgreeTnC;
		})
		this.wizardService.GoToPrevStep();
	}

	public openlbox(lboxid) {
		$(".btn-agree").prop('disabled', true);
		OpenLightbox(lboxid);
	}

	ngOnDestroy() {
		$('.lboxed').remove();
	}
}
