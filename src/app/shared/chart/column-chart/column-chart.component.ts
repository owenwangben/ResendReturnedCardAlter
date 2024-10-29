import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';

declare var Highcharts: any;

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css']
})
export class ColumnChartComponent implements OnInit, OnChanges {
  @Input() display: string;
  @Input() quantity: string;
  @Input() color: string;
  @Input() data: { [key: string]: string }[];
  @ViewChild('chart') chart: ElementRef;

  constructor() { }

  ngOnInit() {
	Highcharts.setOptions({
		lang: {
			thousandsSep: ','
		}
	});
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
		data: [item[this.quantity]],
		color: item[this.color]
      };
    });
    return {
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
        width: 700,
        height: 400
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        categories: '',
        labels: {
          enabled: false
        },
        title: {
          text: null
        }
      },
      yAxis: {
        tickInterval: 5000,
        labels: {
          format: '{value:,.0f}',
          style: {
            color: '#474747',
            fontSize: '15px',
            fontWeight: 'normal'
          }
        },
        gridLineDashStyle: 'dash',
        title: {
          enabled: false
        }
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        series: {
          groupPadding: 0.01,
          pointPadding: 0.15
        }
      },
      series: data,
      legend: {
        enabled: true,
        borderRadius: 5,
        borderWidth: 1,
        align: 'right',
        width: 620,
        itemDistance: 15,
        borderColor: '#dddddd',
        margin: 20,
        padding: 10,
        itemMarginTop: 4,
        itemMarginBottom: 4,
        itemStyle: {
          color: '#474747',
          fontSize: '15px',
          fontWeight: 'normal',
          align: 'center',
        }
      }
    }
  }

}
