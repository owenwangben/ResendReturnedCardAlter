import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetAgreementDataRequest, InsertAgreementRecordRequest } from 'app/shared/agreen-regulation-handle.service';
import { AgreenRegulationHandleService, ErrorPageService, MemoryStorage, PageInfoService, WizardService } from 'app/shared/shared.module';
import { InstallmentService } from './services/installment.service';

@Component({
	selector: 'app-installment-agreement',
	templateUrl: './installment-agreement.component.html',
	styleUrls: ['./installment-agreement.component.scss']
})
export class InstallmentAgreementComponent implements OnInit {
	public form: FormGroup;
	private returnUrl: string;
	Regulation: string;
	InsertAgreementRecordModel = new InsertAgreementRecordRequest();

	constructor(
		public pageinfo: PageInfoService,
		private errorPageService: ErrorPageService,
		private route: ActivatedRoute,
		private router: Router,
		private service: InstallmentService,
		private agreenregulationhandleservice: AgreenRegulationHandleService,
		private fb: FormBuilder,
		private storage: MemoryStorage
	) {
		this.form = fb.group({
			IsSignedInstallmentAgreement: [false]
		});
	}

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.return;
		});

		this.getData()
	}

	async getData () {
		let model: GetAgreementDataRequest ={Title: "信用卡消費分期付款功能申請書", Source: "EWEB"}
		const response = await this.agreenregulationhandleservice.GetAgreementData(model);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.Regulation = response.Result.Content
			this.InsertAgreementRecordModel.ID = this.storage.CustId
			this.InsertAgreementRecordModel.Source = "EWEB"
			this.InsertAgreementRecordModel.Title = "信用卡消費分期付款功能申請書"
			this.InsertAgreementRecordModel.Version = response.Result.Version
		}

	}

	async onSubmit($event) {
		if (this.form.value.IsSignedInstallmentAgreement === false) {
			this.errorPageService.display("需同意本服務條款才可以繼續", false);
			return;
		}
		await this.agreenregulationhandleservice.InsertAgreementRecord(this.InsertAgreementRecordModel);
		const response = await this.service.SetInstallmentAgreementStatus();
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			if (this.returnUrl) { this.router.navigateByUrl(this.returnUrl); }
			else { this.errorPageService.display("更新成功", false); }
		}
	}
}
