import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { AnalyticsService, FeedbackAnalyticsResultModel, FeedbackAnalyticsBonus } from '../../services/analytics.service';

declare var Highcharts: any;

@Component({
	selector: 'app-feedback-analytics',
	templateUrl: './feedback-analytics.component.html',
	styles: []
})
export class FeedbackAnalyticsComponent implements OnInit {
	ResultModel: FeedbackAnalyticsResultModel;
	RewardItems: FeedbackAnalyticsRewardSummary[];
	BonusItems: FeedbackAnalyticsBonus[];
	QueryType = 1;

	constructor(
		private route: ActivatedRoute,
		private errorPageService: ErrorPageService,
		private service: AnalyticsService
	) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.ResultModel = data.Result;
			this.RewardItems = this.getRewardSumItems();

			this.BonusItems = this.ResultModel.Bonus.map(x => {
				x.Month = x.Month.substring(0, 4) + '/' + x.Month.substring(4, 6);
				return x;
			});

			const today = new Date();
			this.BonusItems = Array.apply(null, { length: 12 }).map((item: any, idx: number) => {
				const date = new Date(today.getFullYear(), today.getMonth() - idx, 1);
				return date.getFullYear() + '/' + (date.getMonth() > 8 ? '' : '0') + (date.getMonth() + 1);
			}).map(month => {
				let item = this.BonusItems.find(p => p.Month === month);
				item = item || { Month: month, Point: 0 } as FeedbackAnalyticsBonus;
				return item;
			});

			this.query(this.QueryType);
		});
	}

	onChangType(type) {
		this.QueryType = +type;
		this.query(this.QueryType);
	}

	query(type: number) {
		// 1:現金回饋; 2:紅利回饋
		if (type === 1) {
			const rewardItems = [...this.RewardItems].reverse();
			const month = rewardItems.map(x => x.Month);
			const amt1 = rewardItems.map(x => x.Amount1);
			const amt2 = rewardItems.map(x => x.Amount2);
			const amt3 = rewardItems.map(x => x.Amount3);

			const _data = [
				{
					name: "大戶帳戶",
					data: amt1,
					color: "#d4b572"
				},
				{
					name: "銀行帳戶",
					data: amt2,
					color: "#69b5e0"
				},
				{
					name: "信用卡帳單",
					data: amt3,
					color: "#9fdf61"
				}
			];
			const _year = month;

			this.drawHighcharts(_data, _year, '金額 ( 單位：元 )', ' 元');
		}
		else if (type === 2) {
			const bonusItems = [...this.BonusItems].reverse();
			const _data = [
				{
					name: "紅利回饋",
					data: bonusItems.map(x => x.Point),
					color: "#ff9090"
				}
			];
			const _year = bonusItems.map(x => x.Month);
			this.drawHighcharts(_data, _year, '點數 ( 單位：點 )', ' 點');
		}
	}

	getRewardSumItems() {
		const sumItems = [] as FeedbackAnalyticsRewardSummary[];
		this.ResultModel.Reward.reduce(function (res, value) {
			if (!res[value.Month]) {
				res[value.Month] =
				{
					Month: value.Month.substring(0, 4) + '/' + value.Month.substring(4, 6),
					Amount1: 0,
					Amount2: 0,
					Amount3: 0 } as FeedbackAnalyticsRewardSummary;
				sumItems.push(res[value.Month]);
			}
			switch (value.Type) {
				case 1:
					res[value.Month].Amount1 += value.Amount;
					break;
				case 2:
					res[value.Month].Amount2 += value.Amount;
					break;
				case 3:
					res[value.Month].Amount3 += value.Amount;
					break;
				default:
					break;
			}

			return res;
		}, {});

		const today = new Date();
		const resultItems = Array.apply(null, { length: 12 }).map((item: any, idx: number) => {
				const date = new Date(today.getFullYear(), today.getMonth() - idx, 1);
				return date.getFullYear() + '/' + (date.getMonth() > 8 ? '' : '0') + (date.getMonth() + 1);
			}).map(month => {
				let item = sumItems.find(p => p.Month === month);
				item = item || { Month: month, Amount1: 0, Amount2: 0, Amount3: 0 } as FeedbackAnalyticsRewardSummary;
				return item;
			});
		return resultItems;
	}

	drawHighcharts(_data, _year, yAxisTitle, tooltipSuffix) {
		// highcharts 設定
		const exporting = { enabled: false };
		const chart = {
			type: "column",
			width: 700,
			height: 400
		};
		const title = '';
		const xAxis = {
			categories: _year
		};
		const yAxis = {
			title: {
				text: yAxisTitle
			},
			min: 0,
			stackLabels: {
				enabled: true,
				style: {
					fontWeight: "bold"
				}
			},
		};
		const tooltip = {
			shared: true,
			hideDelay: 99999,
			enabled: true,
			split: false,
			valueSuffix: tooltipSuffix,
			crosshairs: [true, true],
		};
		const plotOptions = {
			column: {
				stacking: 'normal',
				dataLabels: {
					enabled: false,
				},
				point: {
					events: {
						click: function () {
						}
					}
				}
			}
		};
		const credits = { enabled: false };
		const series = _data;
		const options = {} as any;
		options.exporting = exporting;
		options.chart = chart;
		options.title = title;
		options.xAxis = xAxis;
		options.yAxis = yAxis;
		options.tooltip = tooltip;
		options.plotOptions = plotOptions;
		options.credits = credits;
		options.series = series;

		// 建立 highcharts
		Highcharts.setOptions({
			lang: {
				thousandsSep: ','
			}
		});
		$("#chart-container").highcharts(options);
	}
}

/**現金回饋統計 */
export interface FeedbackAnalyticsRewardSummary {
	/**帳單年月(格式：YYYY/MM) */
	Month: string;

	/**回饋金額(大戶帳戶) */
	Amount1: number;

	/**回饋金額(銀行帳戶) */
	Amount2: number;

	/**回饋金額(信用卡帳單) */
	Amount3: number;
}
