import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetAgreementDataRequest, InsertAgreementRecordRequest } from 'app/shared/agreen-regulation-handle.service';
import { AgreenRegulationHandleService, ErrorPageService, MemoryStorage, WizardService } from 'app/shared/shared.module';

@Component({
	selector: 'app-announcements',
	templateUrl: './announcements.component.html'
})
export class AnnouncementsComponent implements OnInit {
	public disablNextButton = true;
	Regulation: string;
	InsertAgreementRecordModel = new InsertAgreementRecordRequest();


	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService,
		private agreenregulationhandleservice: AgreenRegulationHandleService,
		private storage: MemoryStorage
	) {
	}

	ngOnInit() {
		this.getData ()
	}

	async getData () {
		let model: GetAgreementDataRequest ={Title: "掛失注意事項", Source: "EWEB"}
		const response = await this.agreenregulationhandleservice.GetAgreementData(model);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.Regulation = response.Result.Content
			this.InsertAgreementRecordModel.ID = this.storage.CustId
			this.InsertAgreementRecordModel.Source = "EWEB"
			this.InsertAgreementRecordModel.Title = "掛失注意事項"
			this.InsertAgreementRecordModel.Version = response.Result.Version
		}

	}

	ClickAgree(event) {
		const IsChecked = $(event.target).prop('checked');
		$('#next').prop('disabled', !IsChecked);
		this.disablNextButton = !IsChecked;
	}

	async submit() {
		await this.agreenregulationhandleservice.InsertAgreementRecord(this.InsertAgreementRecordModel);
		this.wizardService.GoToNextStep();
	}
}
