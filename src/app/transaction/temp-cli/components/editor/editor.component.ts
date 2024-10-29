import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ErrorPageService, WizardService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { TempCLIService } from '../../services/temp-cli.service';

const componentbase = {
	selector: 'app-temp-cli-editor',
};
const component: Component = {
	selector: componentbase.selector,
	templateUrl: './editor.component.html'
};
const mobileComponent: Component = {
	selector: componentbase.selector,
	templateUrl: './editor.component.mobile.html'
};
@Component(environment.IsMobile ? mobileComponent : component)
export class EditorComponent implements OnInit {
	data: TemporaryCreditViewModel;
	reasonOptions: { key, value, desc }[];
	minDate: Date;
	consent: boolean;
	private ValidateRules = {
		'請輸入申請增加額度': (form) => form.controls.IncreaseCredit.invalid,
		'申請增加額度以仟為單位': (form: NgForm) => form.value.IncreaseCredit % 1000 > 0,
		'至少勾選一張卡片':  (form: NgForm) => this.data.ApplyCards.filter(item => item.IsChecked).length === 0,
		'申請結束日必須大於申請開始日,且不可超過30天(且不可為假日)': async (form: NgForm) => {
			// const wday = new Date(form.value.DatePeriodTo).getDay();
			// return form.controls.DatePeriodTo.invalid || wday === 0 || wday === 6;
			return await this.isHoliday(form.value.DatePeriodTo) || form.controls.DatePeriodTo.invalid;
		},
		'請選擇申請原因': (form: NgForm) => form.controls.Reason.invalid,
		'申請原因說明為必填欄位': (form: NgForm) => form.controls.ReasonDesc.invalid,
		'請輸入聯絡方式': (form: NgForm) => form.controls.ContactType.invalid,
		'請同意永豐商業銀行提高臨時信用額度注意事項': (form: NgForm) => !form.value.consent
	};

	public constructor(
		private route: ActivatedRoute,
		private service: TempCLIService,
		private errorPageService: ErrorPageService,
		private wizardService: WizardService
	) {
		this.reasonOptions = [
			{ key: '01', value: '出國', desc: '請簡述出國目的地及時間，用途為機票住宿或是國外消費使用。例：5/2~5/8、 日本、機票及國外購物' },
			{ key: '02', value: '搬家', desc: '請簡述用途為購屋訂金或是裝潢或添購家具….等。例：房屋訂金。' },
			{ key: '03', value: '結婚', desc: '請簡述用途為飯店宴客、或結婚用品(如首飾、喜餅)之購買。例：XX飯店喜宴費用。' },
			{ key: '04', value: '公務', desc: '請簡述用途為出差費用或先幫公司代墊之項目。例：XX飯店會議室預訂之費用。' },
			{ key: '05', value: '其他', desc: '若選項中無適合之項目，請簡單說明臨調用途。例：百貨公司周年慶。' },
			{ key: '06', value: '繳稅', desc: '請說明繳納之稅款類別，如所得稅、房屋地價稅、燃料牌照稅….等，並請說明需繳納之約略金額。例：所得稅，約25萬。' }
		];
	}

	public getReasonDesc() {
		const found = this.reasonOptions.find(item => item.key === this.data.Reason);
		return found && found.desc;
	}

	public ngOnInit() {
		this.route.data.subscribe(data => {
			this.data = data.data;
			if (!this.data.IncreaseCredit) {
				this.data.IncreaseCredit = null;
			}
			this.minDate = new Date(this.data.BeginDate);
			this.minDate.setDate(this.minDate.getDate() + 1);
			data.reasonOptions = this.reasonOptions;
		});
	}

	public getTotalCredit(): number {
		const n1 = this.data.AvailableCredit ? +this.data.AvailableCredit : 0;
		const n2 = this.data.IncreaseCredit ? +this.data.IncreaseCredit : 0;
		return n1 + n2;
	}

	public async onSubmit(form: NgForm) {
		if (!await this.Validate(form)) { return; }
		if (!await this.inspect()) { return; }
		if (form.value.IncreaseCredit < 0){
			this.errorPageService.display("申請增加信用額度欄位，不可輸入負值", false);
			this.data.IncreaseCredit = null
			return;
		}
		this.wizardService.GoToNextStep();
	}

	private async Validate(form: NgForm): Promise<boolean> {
		form.controls.ContactType.setErrors(!form.value.IsContactByMobile && !form.value.ContactType ? { required: true } : null);
		for (const desc in this.ValidateRules) {
			if (this.ValidateRules.hasOwnProperty(desc) === true) {
				const func = this.ValidateRules[desc];
				if (await func(form) === true) {
					this.errorPageService.display(desc, false);
					return false;
				}
			}
		}
		return form.valid;
	}

	private async isHoliday(date: Date): Promise<boolean> {
		const response = await this.service.checkHoliday(date);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			return response.Result.IsHoliday;
		}
		return false;
	}

	public onCheckChange(card) {
		let matchNumber = card.CardNo;
		if (card.CardTypeDesc === "主卡") { return true; }
		else if (card.CardTypeDesc !== "主卡" && card.IsChecked === true) {
			matchNumber = matchNumber.slice(0,matchNumber.length-2)
		}

		if( !this.inspectMainCard(matchNumber) ) {return false}
		else { return true; }
	}

	public inspectMainCard(matchNumber) {
		let cardGroup = this.data.ApplyCards;
		let isShowErrorMessage: boolean = false;
		for (let cards in cardGroup) {
			let masterCard = cardGroup[cards];
			let masterCardNo = masterCard.CardNo;
			let inspectmasterCard = masterCardNo.slice(0,masterCardNo.length-1);
			if (inspectmasterCard.match(matchNumber) && inspectmasterCard.match(/0$/) && masterCard.IsChecked === false) {
				masterCard.IsChecked = true;
				isShowErrorMessage = true;
			}
		}

		if (isShowErrorMessage) {
			this.errorPageService.display('附卡臨時信用額度，需連同正卡一併調高。', false);
			return false;
		}
		else { return true; }
	}

	private async inspect() {
		let cardGroup = this.data.ApplyCards;
		let type:boolean = true;
		for (let i = 0; i < cardGroup.length; i++) {
			if (!this.onCheckChange(cardGroup[i])) {
				type = false;
			}
		}
		return type;
	}
}
