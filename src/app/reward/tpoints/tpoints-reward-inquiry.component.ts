import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';
import { FormValidator, MyFormControl, ErrorPageService, PageInfoService } from 'app/shared/shared.module';
import { DatePipe } from '@angular/common';
import { TpointsService } from './tpoints.service';
import { TPointsQueryFeedbackResultModel, TPointsFeedbackDetailModel, TPointsFeedbackSummary } from './tpoints.models';
import { IsFromApp } from 'app/shared/utilities';

const componentbase = {
	selector: 'app-tpoints-reward-inquiry'
};
const component: Component = {
	selector: componentbase.selector,
	templateUrl: './tpoints-reward-inquiry.component.html',
	styles: [],
	providers: [DatePipe]
};
const mobileComponent: Component = {
	selector: componentbase.selector,
	templateUrl: './tpoints-reward-inquiry.component.mobile.html',
	styles: [],
	providers: [DatePipe]
};

@Component(environment.IsMobile ? mobileComponent : component)
export class TpointsRewardInquiryComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public inquiryPeriod;
	public resultModel: TPointsQueryFeedbackResultModel;
	public detailModel: TPointsFeedbackDetailModel[] = [];
	public detailA: TPointsFeedbackDetailModel;
	public monthOptions: string[];
	public detailMode = false;
	IsMobile = environment.IsMobile;

	constructor(
		private route: ActivatedRoute,
		public pageinfo: PageInfoService,
		private tpointsService: TpointsService,
		private pipe: DatePipe,
		private errorPageService: ErrorPageService
	) {
		this.monthOptions = this.GetDateOptions();
		const controls: Array<MyFormControl> = [
			{
				Name: 'InquiryPeriod',
				ErrMsg: '請選擇查詢月份',
				Control: new FormControl('', Validators.required)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	async ngOnInit() {

	}

	async onSubmit() {
		this.inquiryPeriod = this.form.value.InquiryPeriod;
		const response = await this.tpointsService.TPointsQueryFeedback(this.pipe.transform(this.inquiryPeriod, 'yMM'));
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.Reset();
			this.resultModel = response.Result;

			for (let i = 0; i < this.resultModel.Summary.length; i ++) {
				const DataList = new Array();
				const tmpModel: TPointsFeedbackDetailModel = {
					SummaryID: this.resultModel.Summary[i].SummaryID,
					DataType: this.resultModel.Summary[i].DataType,
					DataName: this.resultModel.Summary[i].Name,
					Items: this.resultModel.Details.filter(p => p.SummaryID === this.resultModel.Summary[i].SummaryID)};
				this.detailModel.push(tmpModel);
			}
		}
	}

	slideToggle(atitle) {
		$(atitle).toggleClass('active');
		$(atitle).next('div.acontent').slideToggle();
	}

	GetDateOptions() {
		const today = new Date();
		return Array.apply(null, { length: 6 })
				.map((item: any, idx: number) => {
					const day = new Date(today.getFullYear(), today.getMonth() - idx, 1);
					return day;
				});
	}

	Reset() {
		this.detailModel = [];
	}

	showDetail(item: TPointsFeedbackSummary) {
		this.detailA = null;

		this.detailA = this.detailModel.filter(p => p.SummaryID === item.SummaryID)[0];
		this.setHeaderTitle(item.Name);
		this.detailMode = true;
	}

	onBack() {
		this.setHeaderTitle("T Point回饋計畫");
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
}
