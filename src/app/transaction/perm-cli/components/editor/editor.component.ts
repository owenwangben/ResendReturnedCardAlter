import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ErrorPageService, ErrorPageButton, MemoryStorage, WizardService, SharedService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { PermCLIService } from '../../services/perm-cli.service';
import { CityAreaZipCode } from 'app/application/applycard/services/applycard.models';

@Component({
	selector: 'app-perm-cli-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
	data: PermanentCreditViewModel;
	reasonOptions: any;
	fileUploadUrl = 'api/Finance/UploadPermanentCreditAttachment';
	additionalParameter: { [key: string]: any };
	isMobile = environment.IsMobile;
	isMortgageCM = false;
	public cityAreaZip: CityAreaZipCode[];
	public cities: string[];

	private ValidateRules = {
		'請輸入申請增加額度': (form) => form.controls.IncreaseCredit.invalid,
		'申請增加額度以仟為單位': (form: NgForm) => form.value.IncreaseCredit % 1000 > 0,
		'請選擇申請原因': (form: NgForm) => !this.data.IsSmsList && form.controls.Reason.invalid,
		'請填寫說明原因': (form: NgForm) => !this.data.IsSmsList && form.controls.ReasonDesc.invalid,
		'請填寫服務機構名稱': (form: NgForm) => !this.data.IsSmsList && form.controls.Company.invalid,
		'請選擇財力證明類型': (form: NgForm) => !this.isMortgageCM && (!this.data.IsSmsList || this.data.IsRequireFinancialProof) &&
			!form.value.FinancialProofType,
		'請上傳財力證明': (form: NgForm) => (this.isMortgageCM && !this.data.IsFinancialCustomer &&
				this.data.AttachmentRefs.length === 0) ||
				((!this.isMortgageCM && (!this.data.IsSmsList || this.data.IsRequireFinancialProof)) &&
					form.value.FinancialProofType === 2 && this.data.AttachmentRefs.length === 0),
		'請同意聲明': (form: NgForm) => form.controls.agree.invalid,
		'請同意全部注意事項': (form: NgForm) => (this.data.IsSmsList && !this.data.IsRequireFinancialProof) &&
			form.controls.IsFinancialCustomer.invalid,
		'請選擇不動產謄本地址': (form: NgForm) => !this.isMortgageCM && (!this.data.IsSmsList || this.data.IsRequireFinancialProof) &&
			form.value.FinancialProofType === 3 && !form.value.LandRegisterAddressType,
		'請輸入不動產謄本地址': (form: NgForm) => !this.isMortgageCM && (!this.data.IsSmsList || this.data.IsRequireFinancialProof) &&
			form.value.FinancialProofType === 3 && form.value.LandRegisterAddressType === 3 &&
			(form.controls.LandRegisterAddress1.invalid || form.controls.LandRegisterZipCodeId.invalid ||
				form.controls.LandRegisterAddress3.invalid )
	};

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private sharedService: SharedService,
		private permCLIService: PermCLIService,
		private errorPageService: ErrorPageService,
		private wizardService: WizardService,
		private storage: MemoryStorage
	) {
		this.reasonOptions = [
			{ key: '01', value: '出國' },
			{ key: '02', value: '搬家' },
			{ key: '03', value: '結婚' },
			{ key: '04', value: '公務' },
			{ key: '06', value: '繳稅' },
			{ key: '05', value: '其他' }
		];

		this.additionalParameter = {
			ID: storage.CustId,
			ApplicationName: storage.ApplicationName
		};
	}

	async ngOnInit() {
		this.route.data.subscribe(async(data) => {
			data.reasonOptions = this.reasonOptions;
			this.data = data.data;
			if (this.data.IsSmsList && this.data.DefaultIncreaseCredit) {
				this.data.IncreaseCredit = this.data.DefaultIncreaseCredit;
				this.data.ReasonDesc = "簡訊邀請專案";
				console.log("this.data.ReasonDesc:", this.data.ReasonDesc);
			}
			if (data.houseFun) {
				this.fileUploadUrl = 'api/Finance/UploadPermanentCreditAttachment2';
				if (!this.data.IsCardMember) {
					this.errorPageService.display('您沒有任何有效卡，按下確定後將前往線上申辦好房卡。', false,
						() => this.router.navigateByUrl('/Application/ApplyCard?IsHouseLoanCard=true'));
				}
				else {
					this.isMortgageCM = await this.isMortgageCustomer();
					this.data.IsMortgageCM = this.isMortgageCM;
					if (!this.isMortgageCM) {
						let lmhref = 'https://mma.sinopac.com/Share/HouseLoan/ApplyHouseLoanComTM.aspx?ProjectID=M03&stage=0303';
						if (this.isMobile) {
							lmhref = 'https://m.sinopac.com/m/share/houseLoan/m_ApplyHouseLoanTM.aspx?ProjectID=M04&Stage=0303';
						}
						const buttons: Array<ErrorPageButton> = [
							{ caption: '一般信用卡額度調整', href: '', link: '/Transaction/PermCLI'},
							{ caption: '留下聯絡資訊', href: lmhref, link: '' }
						];
						this.errorPageService.display('很抱歉，經核對身分您目前無法申請好房卡額度調整，請改申請一般信用卡額度調整或留下聯絡資訊，我們將致電與您聯繫，謝謝！', true, undefined, buttons);
					}
				}
			}
			await this.getZipCodeData();
		});
	}

	async getZipCodeData() {
		const response = await this.sharedService.getZip3Code();
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.cityAreaZip = response.Result.Items.map((x, i) => {
				return {
					Id: i,
					City: x.City,
					Area: x.Area,
					ZipCode: x.ZipCode
				} as CityAreaZipCode;
			});

			this.cities = Array.from(new Set(this.cityAreaZip.map(item => item.City)));
		}
	}

	getAreas(city: string) {
		return this.cityAreaZip && this.cityAreaZip
			.filter(item => item.City === city)
			.map(item => item);
	}

	getArea(zipCodeId: number) {
		const areas = this.cityAreaZip && this.cityAreaZip
			.filter(item => item.Id === zipCodeId)
			.map(item => item.Area);
		return areas[0];
	}

	async isMortgageCustomer() {
		const response = await this.permCLIService.isMortgageCustomer();
		return this.errorPageService.validateResponse(response, { showMessage: false });
	}

	getTotalCredit(): number {
		const n1 = this.data.OriginalCredit ? +this.data.OriginalCredit : 0;
		const n2 = this.data.IncreaseCredit ? +this.data.IncreaseCredit : 0;
		return n1 + n2;
	}

	onFileUploadedSuccess($evt) {
		if ($evt.response.Result.Success === false) {
			if ($evt.response.Result.ResultMessage) {
				this.errorPageService.display('[' + $evt.response.Result.ResultCode + ']' + $evt.response.Result.ResultMessage, false);
			}
			return;
		}
		const attachment: Attachment = {
			FileName: <string>$evt.file.name,
			ReferenceNo: $evt.response.Result.ReferenceNo
		};
		this.data.AttachmentRefs.push(attachment);
		this.errorPageService.display(`${attachment.FileName} 上傳成功`, false);
	}

	onFileUploadedFailed($evt) {
		this.errorPageService.display($evt.response, false);
	}

	onSubmit(form: NgForm) {
		if (!this.Validate(form)) { return; }
		if (form.value.IncreaseCredit < 0){
			this.errorPageService.display("申請增加信用額度欄位，不可輸入負值", false);
			this.data.IncreaseCredit = null
			return;
		}
		if (this.data.IsSmsList && !this.data.IsRequireFinancialProof && form.value.IncreaseCredit != this.data.DefaultIncreaseCredit) {
			this.errorPageService.confirm("如您欲調整預設之信用額度，經銀行評估後，若需補充財力證明，將有專人與您聯繫，謝謝。", "確認", null, (ok) => {
				if (ok) {
					this.wizardService.GoToNextStep();
				}
			});
		}
		else {
			if (!this.isMortgageCM) {
				if (this.data.FinancialProofType === 3 && this.data.LandRegisterAddressType === 3) {
					this.data.LandRegisterAddress2 = this.getArea(this.data.LandRegisterZipCodeId);
					this.data.LandRegisterAddress = this.data.LandRegisterAddress1 + this.data.LandRegisterAddress2 + this.data.LandRegisterAddress3;
				}
				this.data.IsFinancialCustomer = (this.data.FinancialProofType === 1);
				if (this.data.FinancialProofType !== 3) {
					this.data.LandRegisterAddressType = undefined;
				}
				if (this.data.FinancialProofType !== 2) {
					this.data.AttachmentRefs = [];
				}

				if (this.data.LandRegisterAddressType !== 3) {
					this.data.LandRegisterAddress = undefined;
					this.data.LandRegisterAddress1 = undefined;
					this.data.LandRegisterAddress2 = undefined;
					this.data.LandRegisterAddress3 = undefined;
					this.data.LandRegisterZipCodeId = undefined;
				}
			}

			this.route.data.subscribe(data => {
				this.wizardService.GoToNextStep();
			});
		}
	}

	/**
	 * 驗證
	 * @param form 要驗證的表單
	 */
	Validate(form: NgForm): boolean {
		if (!this.data.IsSmsList) {
			form.controls.ReasonDesc.setErrors(form.value.Reason === '05' && !form.value.ReasonDesc ? { required: true } : null);
		}

		for (const desc in this.ValidateRules) {
			if (this.ValidateRules.hasOwnProperty(desc) === true) {
				const func = this.ValidateRules[desc];
				if (func(form) === true) {
					this.errorPageService.display(desc, false);
					return false;
				}
			}
		}
		return form.valid;
	}
}
