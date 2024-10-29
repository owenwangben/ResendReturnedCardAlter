import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, PageInfoService } from 'app/shared/shared.module';
import { pad } from 'app/shared/utilities';
import { TpointsService } from './tpoints.service';
import { DatePipe } from '@angular/common';
import { TPointsRedemptionRecordsResultModel } from './tpoints.models';
import * as moment from 'moment';

@Component({
	selector: 'app-tpoints-redemption-records',
	templateUrl: './tpoints-redemption-records.component.html',
	styles: [],
	providers: [DatePipe]
})
export class TpointsRedemptionRecordsComponent implements OnInit {
	public inquiryPeriod;
	selectedMonth: string;
	billMonth: string;
	billMonths: string[];
	public resultModel: TPointsRedemptionRecordsResultModel;
	public TPointsSettingName: string;
	public AvailablePoints: number;
	public ExpiryDate: string;
	IsMobile = environment.IsMobile;

	constructor(
		private route: ActivatedRoute,
		public pageinfo: PageInfoService,
		private tpointsService: TpointsService,
		private pipe: DatePipe,
		private errorPageService: ErrorPageService
	) { }

	async ngOnInit() {
		const today = new Date();
		this.inquiryPeriod = new Date(today.getFullYear(), today.getMonth(), 1);
		this.selectedMonth = moment().format('YYYY/MM');
		await this.getData("");
	}

	async onAppointChannels() {
		let msg = "";
		if (this.resultModel.IsRedeemSpecificChannels != null) {
			if (this.IsMobile) {
				if (this.resultModel.IsRedeemSpecificChannels) {
					msg = "確定要關閉「折抵信用卡帳單」設定？";
				}
				else {
					msg = "確定要開啟「折抵信用卡帳單」設定？";
				}
			}
			else {
				if (this.resultModel.IsRedeemSpecificChannels) {
					msg = "您已開啟「折抵信用卡帳單」設定，<br>確定要關閉嗎？";
				}
				else {
					msg = "您已關閉「折抵信用卡帳單」設定，<br>確定要開啟嗎？";
				}
			}

			this.errorPageService.confirm(msg, "是", "否", (ok) => {
				if (ok) {
					this.ChangeTPointSeting();
				}
			});
		}
		else {
			this.errorPageService.display("您的55688聯名卡須待T Points點數產生後，方能異動折抵信用卡帳單設定", false);
		}
	}

	async ChangeTPointSeting() {
		const response2 = await this.tpointsService.TPointsSetting(!this.resultModel.IsRedeemSpecificChannels);
		if (this.errorPageService.validateResponse(response2, { redirect: false })) {
			this.resultModel.IsRedeemSpecificChannels = !this.resultModel.IsRedeemSpecificChannels;
			if (this.resultModel.IsRedeemSpecificChannels) {
				this.TPointsSettingName = "開啟";
			}
			else {
				this.TPointsSettingName = "關閉";
			}
		}
	}

	onSelectMonth(month: string) {
		this.selectedMonth = month;
		const yyyymm = month.replace("/", "");
        var yyyy = parseInt(yyyymm.substring(0, 4));
        var mm = parseInt(yyyymm.substring(4, 6)) - 1;
		this.inquiryPeriod = new Date(yyyy, mm, 1);
        
		this.getData(yyyymm);
	}

	private createMonthData(billMonth: string) {
		this.billMonth = billMonth;
		this.selectedMonth = this.billMonth;
		// 產生月份下拉清單及月份連結的顯示名稱
		this.billMonths = [];
		const currentDate = new Date(this.billMonth + "/01");
		for (let index = 0; index < 6; index++) {
			const month = pad("00", (currentDate.getMonth() + 1).toString());
			this.billMonths.push(currentDate.getFullYear().toString() + "/" + month);
			currentDate.setMonth(currentDate.getMonth() - 1);
		}
	}

	async getData(yyyymm: string) {
		if (!yyyymm) {
			const billMonth = moment().format('YYYY/MM');
			this.createMonthData(billMonth);
		}

		const response = await this.tpointsService.TPointsRedemptionRecords(this.pipe.transform(this.inquiryPeriod, 'yMM'));
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.resultModel = response.Result;

			if (this.resultModel.IsRedeemSpecificChannels) {
				this.TPointsSettingName = "開啟";
			}
			else{
				this.TPointsSettingName = "關閉";
			}

			if (!yyyymm) {
				this.AvailablePoints = this.resultModel.AvailablePoints;
				this.ExpiryDate = this.resultModel.ExpiryDate;
			}
		}
	}
}
