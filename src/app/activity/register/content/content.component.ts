import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ErrorPageService, WizardService, LoaderService } from 'app/shared/shared.module';
import { ActivityRegisterService } from '../register.services';

@Component({
	selector: 'app-activity-register-content',
	templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {
	@ViewChild("contentFrame") contentFrame: ElementRef;
	@ViewChild("submitButton") submitButton: ElementRef;
	private form: FormGroup;
	public activityCode: string;
	private checkCaptchaHash: string;

	constructor(
		private route: ActivatedRoute,
		private activityRegisterService: ActivityRegisterService,
		private errorPageService: ErrorPageService,
		private loaderService: LoaderService,
		private wizardService: WizardService
	) {
	}

	ngOnInit() {
		this.contentFrame.nativeElement.onload = this.frameLoaded.bind(this);
		this.route.data.subscribe(data => {
			this.activityCode = data.data.Code;
			this.form = data.form;
			this.checkCaptchaHash = data.checkCaptchaHash;
			this.loaderService.display(true);
			const doc = this.contentFrame.nativeElement['contentWindow'].document;
			doc.open();
			doc.write(data.contentHtml);
			// doc.write("<div class='btn-sign'>click me</div>");
			doc.close();
		});
	}

	frameLoaded() {
		this.loaderService.display(false);
		$(this.contentFrame.nativeElement).contents().find(".btn-sign").find("a").click(() => {
			// this.wizardService.GoToNextStep will not work if calling this.submit() directly.
			// this.submit();
			this.submitButton.nativeElement.click();
		});
	}

	async submit() {
		const response = await this.activityRegisterService.Register(
			this.activityCode, this.form.value.id, this.form.value.captcha, this.checkCaptchaHash);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			// this.route.data.subscribe(data => data.seq = response.Result.Seq);
			// this.wizardService.GoToNextStep();
			this.errorPageService.display("登錄成功！" + " 序號為: " + response.Result.Seq, false);
		}
	}
}
