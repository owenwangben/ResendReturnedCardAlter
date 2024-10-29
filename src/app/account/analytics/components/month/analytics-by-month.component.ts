import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BillAnalyticsByMonthItem } from '../../services/typings';
import { DropdownOption } from 'app/shared/period-query/period-query.component';

@Component({
	selector: 'app-analytics-by-month',
	templateUrl: './analytics-by-month.component.html'
})
export class AnalyticsByMonthComponent implements OnInit {
	ResultModel: any;
	Records: BillAnalyticsByMonthItem[];
	HalfYearRecords: BillAnalyticsByMonthItem[][];
	cardtype = -1;
	cardtypeOptions: DropdownOption[];
	colors = ['#7cb5ec', '#90ed7d', '#f7a35c', '#f45550', '#ff7599', '#bf463d',
				'#44a9a8', '#82dad9', '#815e8d', '#a5aad9', '#fdec6d', '#538ec7'];

	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.ResultModel = data.Result;
			this.ResultModel.Items = this.ResultModel.Items
				.map(item => {
					item.Month = item.Month.replace(/(\d{4})(\d{2})/gi, '$1/$2');
					return item;
				});

			this.Records = this.getRecords(-1);
			this.HalfYearRecords = [ this.Records.slice(0, 6), this.Records.slice(6, 12)];
			const cards: any[] = data.Result.Cards;
			this.cardtypeOptions = cards.map(x => { return { Value: x.Index, DisplayName: x.Name }; });
		});
	}

	getRecords(cardIdx: number) {
		const items = cardIdx === -1 ? this.getSumItems() : this.ResultModel.Items.filter(x => x.CardIdx === cardIdx);

		const today = new Date();
		const records = Array.apply(null, { length: 12 }).map((item: any, idx: number) => {
			const date = new Date(today.getFullYear(), today.getMonth() - idx, 1);
			return date.getFullYear() + '/' + (date.getMonth() > 8 ? '' : '0') + (date.getMonth() + 1);
		}).map(month => {
			let item = items.find(p => p.Month === month);
			item = item || { Month: month, Amount: 0 };
			return item;
		}).reverse();
		for (let i = 0; i < this.colors.length; i++) {
			records[i].Color = this.colors[i];
		}
		return records;
	}

	getSumItems() {
		const sumItems = [];
		this.ResultModel.Items.reduce(function (res, value) {
			if (!res[value.Month]) {
				res[value.Month] = { Month: value.Month, Amount: 0 };
				sumItems.push(res[value.Month]);
			}
			res[value.Month].Amount += value.Amount;
			return res;
		}, {});
		return sumItems;
	}

	onSelectCardtypeChange(idx) {
		this.Records = this.getRecords(+idx);
		this.HalfYearRecords = [ this.Records.slice(0, 6), this.Records.slice(6, 12)];
	}
}
