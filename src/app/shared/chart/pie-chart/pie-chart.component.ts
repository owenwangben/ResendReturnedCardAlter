import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';

declare var Highcharts: any;

@Component({
	selector: 'app-pie-chart',
	templateUrl: './pie-chart.component.html',
	styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges {
	@Input() display: string;
	@Input() quantity: string;
	@Input() color: string;
	@Input() data: { [key: string]: string }[];
	@ViewChild('chart') chart: ElementRef;

	constructor() { }

	ngOnInit() {
		this.draw();
	}

	ngOnChanges() {
		this.draw();
	}

	private draw() {
		if (this.data) {
			const option = this.getChartOption();
			$(this.chart.nativeElement).highcharts(option);
		}
	}

	private getChartOption() {
		const data = this.data.map(item => {
			return {
				name: item[this.display],
				y: item[this.quantity],
				color: item[this.color]
			};
		});
		let ySum = 0;
		return {
			lang: {
				thousandsSep: ','
			},
			credits: {
				enabled: false
			},
			chart: {
				type: 'pie',
				width: 800,
				height: 400,
				margin: [20, 300, 0, 0],
				events: {
					load: function () {
						Highcharts.each(this.series[0].points, function (p) {
							ySum += p.y;
						});
						this.setTitle({
							text: '合計金額： ' + Highcharts.numberFormat(ySum, 0, '', ',') + ' 元',
							align: 'left',
							verticalAlign: 'bottom',
							y: -93,
							x: 573,
							style: {
								fontWeight: 'bold',
								fontSize: '13',
								width: '200'
							},
						});
					}
				}
			},
			title: {
				text: ''
			},
			tooltip: {
				pointFormat: '{point.y} <b>({point.percentage:.0f}%)</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					depth: 35,
					dataLabels: {
						enabled: false,
						format: '{point.name}'
					},
					showInLegend: true
				}
			},
			legend: {
				align: 'right',
				verticalAlign: 'middle',
				x: -50,
				y: 0,
				layout: 'vertical',
				itemMarginBottom: 5,
				labelFormatter: function () {
					return this.name + '：' + window['Highcharts'].numberFormat(this.y, 0, '', ',') + ' (' + this.percentage.toFixed(0) + '%)';
				}
			},
			series: [{
				type: 'pie',
				point: {
					events: {
						legendItemClick: function (event) {
							const chart = this.series.chart;

							if (this.visible) {
								// this.series.visible = false;
								ySum = ySum - event.target.options.y;
							} else {
								ySum = ySum + event.target.options.y;
							}
							chart.setTitle({
								text: '合計金額： ' + Highcharts.numberFormat(ySum, 0, '', ',') + ' 元',
							}, false, false);

							return true;
						}
					}
				},
				data: (function () {
					return data;
				}())
			}]
		}
	}
}
