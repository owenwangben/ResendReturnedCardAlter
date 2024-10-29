import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ErrorPageService, FastQueryOption } from 'app/shared/shared.module';
import { AnalyticsService } from '../../services/analytics.service';
import { BillAnalyticsByCategoryItem } from '../../services/typings';
import { FastQueryOptionYYYYMM } from 'app/shared/period-query/period-query.component';

@Component({
	selector: 'app-analytics-by-category',
	templateUrl: './analytics-by-category.component.html',
	providers: [DatePipe]
})
export class AnalyticsByCategoryComponent implements OnInit {
	start: string;
	end: string;
	fastQueryOptions: FastQueryOptionYYYYMM[];
	dropdownOptions: FastQueryOptionYYYYMM[];
	Records: BillAnalyticsByCategoryItem[];
	selectedIndex: number;

	constructor(
		private pipe: DatePipe,
		private route: ActivatedRoute,
		private errorPageService: ErrorPageService,
		private service: AnalyticsService
	) {
		const today = new Date();
		this.fastQueryOptions =
			Array.apply(null, { length: 6 })
				.map((item: any, idx: number) => {
					const day = new Date(today.getFullYear(), today.getMonth() - idx, 1);
					return {
						DisplayName: pipe.transform(day, 'y/MM'),
						Value: pipe.transform(day, 'yMM')
					};
				});
		this.dropdownOptions =
		Array.apply(null, { length: 12 })
			.map((item: any, idx: number) => {
				const day = new Date(today.getFullYear(), today.getMonth() - idx, 1);
				return {
					DisplayName: pipe.transform(day, 'y/MM'),
					Value: pipe.transform(day, 'yMM')
				};
			});
		this.start = this.fastQueryOptions[0].Value;
		this.end = this.fastQueryOptions[0].Value;
	}

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.Records = data.Records;
			this.setChartColors();
		});
	}

	async onSearch() {
		this.Records = await this.service.GetBillAnalyticsByCategory(this.start, this.end);
		this.setChartColors();
	}

	get subtotal() {
		return this.Records && this.Records.map(item => item.Subtotal).reduce((acc, cur) => acc + cur);
	}

	onSelectChange($event) {
		this.onClickMonthLink(this.fastQueryOptions[this.selectedIndex].Value);
	}

	onClickMonthLink(yyyymm: string) {
		this.start = yyyymm;
		this.end = yyyymm;
		this.onSearch();
	}

	setChartColors() {
		this.Records.forEach(item => {
			switch (item.CategoryName) {
				case '餐廳飲食':
					item.Color = '#ff847c';
					break;
				case '購物消費':
					item.Color = '#e84a5f';
					break;
				case '家庭開銷':
					item.Color = '#d99be6';
					break;
				case '休閒旅遊':
					item.Color = '#fdec6d';
					break;
				case '交通運輸':
					item.Color = '#8abceb';
					break;
				case '金融服務':
					item.Color = '#6bddb9';
					break;
				case '其他消費':
					item.Color = '#fecea8';
					break;
			}
		});
	}
}
