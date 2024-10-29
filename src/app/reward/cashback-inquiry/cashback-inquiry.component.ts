import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormValidator, MyFormControl, ErrorPageService, PageInfoService } from 'app/shared/shared.module';
import {
	InquiryTypeOptions, QueryDcurFeedbackResultModel, DcurFeedbackSummary, DcurFeedbackDetailA,
	DcurFeedbackDetailB, QueryFeedbackMenuResultModel
} from './cashback-inquiry-models';
import { CashbackInquiryService } from './cashback-inquiry.service';
import { environment } from 'environments/environment';
import { IsFromApp } from 'app/shared/utilities';
import { ActivatedRoute } from '@angular/router';

const componentbase = {
	selector: 'app-cashback-inquiry'
};
const component: Component = {
	selector: componentbase.selector,
	templateUrl: './cashback-inquiry.component.html',
	styles: [],
	providers: [DatePipe]
};
const mobileComponent: Component = {
	selector: componentbase.selector,
	templateUrl: './cashback-inquiry.component.mobile.html',
	styles: [],
	providers: [DatePipe]
};

@Component(environment.IsMobile ? mobileComponent : component)
export class CashbackInquiryComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public periodOptions: string[];
	public foreignFeedbackOptions: string[];
	public typeOptions = [...InquiryTypeOptions];
	public inquiryTypeName: string;
	public inquiryType: number;
	public inquiryPeriod;
	public inquiryCardGroupCode;
	public resultModel: QueryDcurFeedbackResultModel;
	public detailMode = false;
	public detailA: DcurFeedbackDetailA;
	public detailB: DcurFeedbackDetailB;
	public isMobile = environment.IsMobile;
	public source = "";
	public feedbackCardMenuResultModel: QueryFeedbackMenuResultModel;
  public dawayNewCardMemberFeedbackDeadLine:string;

	constructor(
		private route: ActivatedRoute,
		public pageinfo: PageInfoService,
		private pipe: DatePipe,
		private cashbackInquiryService: CashbackInquiryService,
		private errorPageService: ErrorPageService
	) {
		this.periodOptions = this.GetDateOptions();
		const controls: Array<MyFormControl> = [
			{
				Name: 'InquiryType',
				ErrMsg: '請選擇查詢項目',
				Control: new FormControl('', Validators.required)
			},
			{
				Name: 'InquiryPeriod',
				ErrMsg: '請選擇查詢期間',
				Control: new FormControl('', Validators.required)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	async ngOnInit() {
    this.getQueryFeedbackMenu();
    this.form.controls.InquiryType.setValue(undefined);
    this.form.controls.InquiryPeriod.setValue(undefined);
		this.route.queryParams.subscribe(async (queryParams) => {
      const inquiryType = +queryParams.type;
			if (inquiryType === 1 || inquiryType === 2 || inquiryType === 4 || inquiryType === 5) {
				this.inquiryType = inquiryType;
				this.form.controls.InquiryType.setValue(inquiryType.toString());

				const today = new Date();
				this.form.controls.InquiryPeriod.setValue(new Date(today.getFullYear(), today.getMonth(), 1));

				if (!isNaN(queryParams.dfd)) {
					const year = queryParams.dfd.substring(0, 4);
					const month = queryParams.dfd.substring(4);
					if (!isNaN(year) && !isNaN(month)) {
						const parmDate = new Date(year, (month - 1), 1);
						if (!isNaN(parmDate.getMonth())) {
							for (let index = 0; index < this.periodOptions.length; index++) {
								if (this.periodOptions[index] == parmDate.toString()) {
									this.form.controls.InquiryPeriod.setValue(new Date(parmDate.getFullYear(), parmDate.getMonth(), 1));
									this.source = "1"; // 從 MMA 銀行帳戶明細連過來查的
								}
							}
						}
					}
				}

				await this.Query(+inquiryType);
			}
		});
	}

	async getQueryFeedbackMenu() {
		const response = await this.cashbackInquiryService.QueryFeedbackMenu(this.source);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.feedbackCardMenuResultModel = response.Result;
			this.feedbackCardMenuResultModel.Items.forEach((Card) => {
				this.typeOptions.push({
					Type: 5,
					Name: Card.CardName,
					CardGroupCode: Card.CardGroupCode
				});
			})
      this.typeOptions.sort((a,b) => a.Type - b.Type);
		}
	}

	async onSubmit() {
		if (!this.formValidator.Validate()) { return; }
		this.inquiryType = +this.form.value.InquiryType;
		await this.Query(this.inquiryType);
	}

	async Query(inquiryType: number) {
		this.inquiryTypeName = this.typeOptions.find(item => item.Type === inquiryType).Name;
		this.inquiryPeriod = this.form.value.InquiryPeriod;
		this.inquiryCardGroupCode = this.typeOptions.find(item => item.Type === inquiryType).CardGroupCode

		if (inquiryType === 1) {
			const response = await this.cashbackInquiryService.QueryDcurFeedback(this.pipe.transform(this.inquiryPeriod, 'yMM'));
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.resultModel = response.Result;
			}
		}
		else if (inquiryType === 2) {
			const response = await this.cashbackInquiryService.QueryDawhoFeedback(this.pipe.transform(this.inquiryPeriod, 'yMM'), this.source);
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.resultModel = response.Result;
			}
		}
		else if (inquiryType === 3) {
			const response = await this.cashbackInquiryService.QueryForeignFeedback(this.inquiryPeriod);
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.resultModel = response.Result;
			}
		}
		else if (inquiryType === 4) {
			const response = await this.cashbackInquiryService.QuerySportFeedback(this.pipe.transform(this.inquiryPeriod, 'yMM'));
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.resultModel = response.Result;
			}
		}
		else if (inquiryType === 5) {
			const response = await this.cashbackInquiryService.CashCartFeedback(this.pipe.transform(this.inquiryPeriod, 'yMM'), this.inquiryCardGroupCode)
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.resultModel = response.Result;
			}
		}
		else if (inquiryType === 6) {
			const response = await this.cashbackInquiryService.QueryMitsuiFeedback(this.pipe.transform(this.inquiryPeriod, 'yMM'));
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.resultModel = response.Result;
			}
		}
		else if (inquiryType === 7) {
			const response = await this.cashbackInquiryService.QueryDawayFeedback(this.pipe.transform(this.inquiryPeriod, 'yMM'));
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.resultModel = response.Result;
        this.dawayNewCardMemberFeedbackDeadLine = this.formatDate(response.Result.DeadLine);
			}
		}
	}

	slideToggle(atitle) {
		$(atitle).unbind();
		$(atitle).toggleClass('active');
		$(atitle).next('div.acontent').slideToggle();
	}

	showDetail(item: DcurFeedbackSummary) {
		this.detailA = null;
		this.detailB = null;

		this.detailA = this.resultModel.DetailA.filter(p => p.Code === item.Code)[0];
		if (!this.detailA) {
			this.detailB = this.resultModel.DetailB.filter(p => p.Code === item.Code)[0];
		}

		if (this.detailA || this.detailB) {
			this.setHeaderTitle(item.Name);
			this.detailMode = true;
		}
	}

	onBack() {
		this.setHeaderTitle("消費回饋查詢");
		this.detailMode = false;
	}

	setHeaderTitle(title: string) {
		if (IsFromApp()) {
			window['cardsetback'](title, '');
		}
		else {
			window['setheader']('永豐銀行', title, '/m/m_menu.aspx?num=2', '');
		}
	}

	GetDateOptions() {
		const today = new Date();
		return Array.apply(null, { length: 6 })
			.map((item: any, idx: number) => {
				const day = new Date(today.getFullYear(), today.getMonth() - idx, 1);
				return day;
			});
	}

	async onSelectInquiryType($event) {
		console.log('$event =', $event);
		if (!$event || this.inquiryType === +$event) {
			// 這裡的條件，只適用於小網。
			// 因為執行完 onBack() 後 $event 會先變成空值，才又回復正常的值，所以這裡會被執行兩次，可能是變更偵測造成的。
			// 如果選相同的查詢項目，也不做任何事。
			return;
		}

		const inquireType: number = +$event;
		this.inquiryType = inquireType;
		this.inquiryPeriod = "";
		if (inquireType === 3) {
			if (this.foreignFeedbackOptions) {
				this.periodOptions = this.foreignFeedbackOptions;
			}
			else {
				const response = await this.cashbackInquiryService.QueryForeignFeedbackOptions();
				if (this.errorPageService.validateResponse(response, { redirect: false })) {
					this.periodOptions = response.Result.Items;
					this.foreignFeedbackOptions = this.periodOptions;
				}
			}
		}
		else {
			this.periodOptions = this.GetDateOptions();
		}
		this.form.controls.InquiryPeriod.setValue(undefined);
	}

  public formatDate(value: string){
    return value && value.length === 8 ? `${value.slice(0, 4)}/${value.slice(4, 6)}/${value.slice(6, 8)}` : value;
  }
}
