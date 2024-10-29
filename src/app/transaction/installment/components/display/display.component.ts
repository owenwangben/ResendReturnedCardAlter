import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewModels } from '../../services/typings';

@Component({
	selector: 'app-display',
	templateUrl: './display.component.html',
	styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
	Info: ViewModels.InstallmentInfo;
	Today: Date = new Date();
	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			const installment: ViewModels.BaseInstallmentData = data.data;
			this.Info = installment.InstallmentInfo;
		});
	}

}
