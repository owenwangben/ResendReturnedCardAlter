import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WizardService, ErrorPageService } from 'app/shared/shared.module';
import { ApplicationStatusResult, ApplicationStatusData } from "./application-status.models";
import { environment } from 'environments/environment';
import { NgForm } from '@angular/forms';
import { ApplicationStatusService } from './application-status.services';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
	moduleId: module.id,
	selector: 'app-application-status-result',
	templateUrl: './application-status-result.component.html',
})
export class ApplicationStatusResultComponent implements OnInit {
	isMobile = environment.IsMobile;
	model: ApplicationStatusResult;
	detail: ApplicationStatusData = null;
	requireUploadFile = false;
	requireDownloadFile = false;
	showDesc = false;
	showApplyUrgentCaseUI = false;
	appliedUrgentCase = false;
	reasonOptions: any;
	Reason = '';
	ReasonDesc = '';
	private ValidateRules = {
		'請選擇申請原因': (form: NgForm) => form.controls.Reason.invalid
	};
	downloadlink: SafeUrl = this.sanitizer.bypassSecurityTrustUrl('javascript:void(0)');

	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService,
		private progressService: ApplicationStatusService,
		private sanitizer: DomSanitizer
	) {
		this.reasonOptions = [
			'近期將出國',
			'代繳保費',
			'一般消費',
			'其他'
		];
	}

	ngOnInit(): void {
		this.route.data.subscribe(data => {
			this.model = data.result;
			for ( let item of this.model.Items) {
				if ( item["UploadFileMessages"] === null ) {
					item["UploadFileMessages"] = []
				}
				if ( item["DownloadFileMessages"] === null ) {
					item["DownloadFileMessages"] = []
				}
				if (item["ServiceMessages"] === null  ) {
					item["ServiceMessages"] = []
				}
			}
			this.showDesc = this.model.Items.filter(it => it.ServiceMessages.length > 0 || it.UploadFileMessages.length > 0 || it.DownloadFileMessages.length > 0 || it.Memo).length > 0;
			this.requireUploadFile = this.model.Items.filter(it => it.UploadFileMessages.length > 0).length > 0;
			this.requireDownloadFile = this.model.Items.filter(it => it.DownloadFileMessages.length > 0).length > 0;
			this.model.Items.filter(it => {
				if (it.DOC_STATUS.includes("2F")) {
					this.downloadlink = "https://bank.sinopac.com/MMA8/DocDownload/CPM-206.pdf#open-browser"
				}
				if (it.LetterCode.includes("B") || it.LetterCode.includes("D")) {
					this.downloadlink = "https://bank.sinopac.com/MMA8/DocDownload/CPM-207.pdf#open-browser"
				}
			});
		});
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}

	showDetail(record: ApplicationStatusData) {
		if (!this.isMobile) { return; }

		if (record && (record.ServiceMessages.length > 0 || record.UploadFileMessages.length > 0 || record.DownloadFileMessages.length > 0 || record.Memo)) {
			window.scrollTo(0, 0);
			this.detail = record;
		}
		if (record === null) {
			this.detail = record;
		}
	}

	private async Validate(form: NgForm): Promise<boolean> {
		for (const desc in this.ValidateRules) {
			if (this.ValidateRules.hasOwnProperty(desc) === true) {
				const func = this.ValidateRules[desc];
				if (await func(form) === true) {
					this.errorPageService.display(desc, false);
					return false;
				}
			}
		}
		return form.valid;
	}

	async onSubmit(form: NgForm) {
		if (!await this.Validate(form)) { return; }

		const response = await this.progressService.sendWorkflow(this.model.PID,
			form.value.Reason + (form.value.ReasonDesc ? '(' + form.value.ReasonDesc + ')' : ''));
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.errorPageService.display('資料將為您盡速處理，再次感謝您的等候。', false);
			this.appliedUrgentCase = true;
			this.showApplyUrgentCaseUI = false;
		}
	}
}
