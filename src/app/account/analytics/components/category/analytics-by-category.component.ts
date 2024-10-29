import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ErrorPageService } from 'app/shared/shared.module';
import { AnalyticsService } from '../../services/analytics.service';
import { BillAnalyticsByCategoryItem } from '../../services/typings';
import { FastQueryOptionYYYYMM, DropdownOption } from 'app/shared/period-query/period-query.component';

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
	cardtype = -1;
	cardtypeOptions: DropdownOption[];
	Records: BillAnalyticsByCategoryItem[];
	ResultItems: any[];

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
			this.ResultItems = data.Result.Items;
			this.Records = this.getRecords(-1);
			const cards: any[] = data.Result.Cards;
			this.cardtypeOptions = cards.map(x => { return { Value: x.Index, DisplayName: x.Name }; });
		});
	}

	onClickMonthLink(yyyymm: string) {
		this.start = yyyymm;
		this.end = yyyymm;
		this.onSearch();
	}

	async onSearch() {
		if (!this.start) {
			this.errorPageService.display("請輸入正確的查詢區間起日", false);
			return;
		}
		else if (!this.end) {
			this.errorPageService.display("請輸入正確的查詢區間訖日", false);
			return;
		}
		const result = await this.service.GetBillAnalyticsByCategory(this.start, this.end);
		this.ResultItems = result.Items;
		this.Records = this.getRecords(-1);
		const cards: any[] = result.Cards;
		this.cardtypeOptions = cards.map(x => { return { Value: x.Index, DisplayName: x.Name }; });
	}

	onSelectCardtypeChange(idx) {
		this.Records = this.getRecords(+idx);
	}

	getRecords(cardIdx: number) {
		if (this.ResultItems.length <= 0) {
			return [];
		}

		const items = cardIdx === -1 ? this.ResultItems : this.ResultItems.filter(x => x.CardIdx == cardIdx);
		const Subtotal1 = items.map(item => item.Subtotal1).reduce((acc, cur) => acc + cur);
		const Subtotal2 = items.map(item => item.Subtotal2).reduce((acc, cur) => acc + cur);
		const Subtotal3 = items.map(item => item.Subtotal3).reduce((acc, cur) => acc + cur);
		const Subtotal4 = items.map(item => item.Subtotal4).reduce((acc, cur) => acc + cur);
		const Subtotal5 = items.map(item => item.Subtotal5).reduce((acc, cur) => acc + cur);
		const Subtotal6 = items.map(item => item.Subtotal6).reduce((acc, cur) => acc + cur);
		const Subtotal7 = items.map(item => item.Subtotal7).reduce((acc, cur) => acc + cur);

		const records: BillAnalyticsByCategoryItem[] = new Array(7).fill({} as BillAnalyticsByCategoryItem);
		records[0] = { CategoryName: '餐廳飲食', Subtotal: Subtotal1, Color: '#ff847c' } as BillAnalyticsByCategoryItem;
		records[1] = { CategoryName: '購物消費', Subtotal: Subtotal2, Color: '#e84a5f' } as BillAnalyticsByCategoryItem;
		records[2] = { CategoryName: '家庭開銷', Subtotal: Subtotal3, Color: '#d99be6' } as BillAnalyticsByCategoryItem;
		records[3] = { CategoryName: '休閒旅遊', Subtotal: Subtotal4, Color: '#fdec6d' } as BillAnalyticsByCategoryItem;
		records[4] = { CategoryName: '交通運輸', Subtotal: Subtotal5, Color: '#8abceb' } as BillAnalyticsByCategoryItem;
		records[5] = { CategoryName: '金融服務', Subtotal: Subtotal6, Color: '#6bddb9' } as BillAnalyticsByCategoryItem;
		records[6] = { CategoryName: '其他消費', Subtotal: Subtotal7, Color: '#fecea8' } as BillAnalyticsByCategoryItem;

		return records;
	}

	get subtotal() {
		return this.Records.length ? this.Records && this.Records.map(item => item.Subtotal).reduce((acc, cur) => acc + cur) : 0;
	}
}
