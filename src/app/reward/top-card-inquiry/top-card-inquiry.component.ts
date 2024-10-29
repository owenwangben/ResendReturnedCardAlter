import { Type } from './../../shared/type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormValidator, MyFormControl, ErrorPageService, PageInfoService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';
import { TopCardInquiryService } from './top-card-inquiry.service';
import { QueryTopCardFeedBackResult } from './top-card-inquiry-models';

const componentbase = {
	selector: 'app-top-card-inquiry'
};
const component: Component = {
	selector: componentbase.selector,
	templateUrl: './top-card-inquiry.component.html'
};
const mobileComponent: Component = {
	selector: componentbase.selector,
	templateUrl: './top-card-inquiry.component.mobile.html'
};
@Component(environment.IsMobile ? mobileComponent : component)
export class TopCardInquiryComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public inquiryType: number;
	public cardgroup: any;
	/** month2用來傳送API用，差別再1-9月份前面要補0 */
	public month2 : string;
	public month: string;
	public year: string;
	public day: string;
	public periodOptions = [{Name:"當月一般消費金額累積",Flag:1}];
	public resultModel: QueryTopCardFeedBackResult;
	public inquiryName: string;


	constructor(
		private route: ActivatedRoute,
		public pageinfo: PageInfoService,
		private errorPageService: ErrorPageService,
		private TopCardInquiryService: TopCardInquiryService
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'InquiryType',
				ErrMsg: '請選擇查詢卡別',
				Control: new FormControl('', Validators.required)
			},
			{
				Name: 'InquiryPeriod',
				ErrMsg: '請選擇查詢項目',
				Control: new FormControl('', Validators.required)
			}
		];
		this.form = this.formValidator.MakeFormGroup(controls);
	}

  	ngOnInit() {
		this.querytopcard ()
		this.getdate()
  	}

	async querytopcard() {
		const response = await this.TopCardInquiryService.QueryTopCardMenu();
		if (response.Result.Items.length != 0) {
			this.cardgroup = response.Result.Items;
			this.form.controls.InquiryType.setValue(this.cardgroup[0].FeedBackType);
			this.form.controls.InquiryPeriod.setValue(this.periodOptions[0].Flag);
		} else {
			this.errorPageService.display('本服務功能提供「永豐財富無限卡」、「永豐世界卡」或「美安悠遊無限卡」正卡持卡人查詢，未持有前述任一有效正卡之持卡人無法使用本服務功能，尚祈見諒!' , true);
		}

	}

	async onSubmit() {
		if (!this.formValidator.Validate()) { return; }
		this.Query();
	}

	async Query() {
		const FeedBackType = this.form.controls.InquiryType.value;
		const flag = this.form.controls.InquiryPeriod.value;
		this.inquiryName = this.cardgroup.find( e => e.FeedBackType === +FeedBackType ).CardName;
		const response = await this.TopCardInquiryService.QueryTopCardFeedback(FeedBackType,this.year+this.month2+this.day,flag);
		this.resultModel = response.Result;
	}

	getdate () {
		let today = new Date();
		this.year = today.getFullYear().toString();
		this.month = (today.getMonth()+1).toString();
		this.month2 = ((today.getMonth()+1) >= 10? (today.getMonth()+1) : ("0" + (today.getMonth()+1))).toString();
		this.day = (today.getDate() < 10 ? ("0"+today.getDate()) : today.getDate()).toString();
	}

}
