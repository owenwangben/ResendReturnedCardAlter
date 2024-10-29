import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BillAnalyticsByMonthItem } from '../../services/typings';

@Component({
	selector: 'app-analytics-by-month',
	templateUrl: './analytics-by-month.component.html'
})
export class AnalyticsByMonthComponent implements OnInit {
	Records: BillAnalyticsByMonthItem[];
	HalfYearRecords: BillAnalyticsByMonthItem[][];
	colors = ['#7cb5ec', '#90ed7d', '#f7a35c', '#f45550', '#ff7599', '#bf463d',
				'#44a9a8', '#82dad9', '#815e8d', '#a5aad9', '#fdec6d', '#538ec7'];

	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.Records = data.Records;
			for (let i = 0; i < this.Records.length; i++) {
				this.Records[i].Color = this.colors[i];
			}
			this.HalfYearRecords = [
				this.Records.slice(0, 6),
				this.Records.slice(6, 12)];
		});
	}
}
