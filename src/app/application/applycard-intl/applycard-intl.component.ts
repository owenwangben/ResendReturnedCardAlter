import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageInfoService, WizardStep } from 'app/shared/shared.module';
import { UploadDocComponent } from './components/upload-doc/upload-doc.component';
import { CompleteComponent } from './components/complete/complete.component';
import { CheckIdComponent } from './components/check-id/check-id.component';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ApplyCardService } from '../applycard/services/applycard.services';
import { GetLanguage, LocaleMessages } from './shared/LocaleMessages';
import { SelectCardComponent } from './components/select-card/select-card.component';
import { FillOutTable1Component } from './components/fillout-table1/fillout-table1.component';
import { FillOutTable3Component } from './components/fillout-table3/fillout-table3.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { AgreementComponent } from './components/agreement/agreement.component';

@Component({
	selector: "app-apply-card-intl",
	templateUrl: "./applycard-intl.component.html",
})
export class ApplyCardIntlComponent implements OnInit {
	current = 0;
	steps: WizardStep[];
	step: number;
	MemberType: number;
	homeUrl: string;
	language :string;
	MasterTitleIntl;
	lastPingTicks = new Date().getTime();
	id: any;

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private router: Router,
		private applyCardService: ApplyCardService,
		private idle: Idle,
		private keepalive: Keepalive
	) {
		if (this.keepalive.onPing.observers.length === 0) {
			this.setKeepAlive();
		}
	}

	ngOnInit() {
		const urlArray = this.router.url.split('/');
		sessionStorage.setItem("applycardintl.Language", urlArray[4]);
		this.language = GetLanguage();
		this.route.data.subscribe((data) => {
			this.route.queryParams.subscribe((params) => {
				const dsno = params.DsNo;
				if (dsno && dsno.length === 6) {
					this.pageinfo.name = '線上辦卡(業務人員)';
				}
			});
			this.step = data.step;
			if (this.step >= 0) {
				this.steps = [
					{ StepName: '選擇卡片', Component: SelectCardComponent },
					{ StepName: '填寫基本資料', Component: FillOutTable1Component },
					{ StepName: '填寫詳細資料', Component: FillOutTable3Component },
					{ StepName: '同意條款', Component: AgreementComponent },
					{ StepName: '確認申請資料', Component: ConfirmComponent },
					{ StepName: '上傳文件', Component: UploadDocComponent },
					{ StepName: '完成申請', Component: CompleteComponent }
				];
				this.current = this.step;
				this.homeUrl = "/SinoCard/Application/ApplyCard/Intl/en";
				this.MasterTitleIntl = LocaleMessages[this.language].shard.Title.ApplyCard;
				if (this.step === 1) {
					this.setIdle()
					this.id = 	setInterval(() => {
									if (new Date().getTime() - this.lastPingTicks >= 10 * 60 * 1000) {
										this.applyCardService.clearAuth();
										window.location.href = this.homeUrl;
									}
								}, 1000);
				}
			} else {
				this.steps = [
					{ StepName: '檢查身分證字號', Component: CheckIdComponent },
					{ StepName: '上傳文件', Component: UploadDocComponent },
					{ StepName: '完成申請', Component: CompleteComponent }
				];
				this.homeUrl = "/SinoCard/Application/ApplyCard/Intl/Upload/en";
				this.MasterTitleIntl = LocaleMessages[this.language].shard.Title.Upload;
			}
		});
	}

	ngOnDestroy() {
		if (this.id) {
	   		clearInterval(this.id);
		}
		this.idle.stop();
		// 離開applycardComponent時要將keepalive還原，避免影響setInterval的this錯亂
		this.keepalive.onPing.observers = [];
	}

	setKeepAlive() {
		this.keepalive.interval(60);
		this.keepalive.onPing.subscribe(() => {
			console.log('onPing');
			this.applyCardService.KeepSessionAlive();
			this.lastPingTicks = new Date().getTime();
		});
	}

	setIdle() {
		this.idle.stop();
		this.idle.setIdle(10 * 60);
		this.idle.setTimeout(3);
		this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

		if (this.idle.onIdleStart.observers.length === 0) {
			this.idle.onIdleStart.subscribe(() => {
				console.log('You\'ve gone idle!', new Date());
			});
		}
		if (this.idle.onIdleEnd.observers.length === 0) {
			this.idle.onIdleEnd.subscribe(() => {
				console.log("onIdleEnd");
			});
		}
		if (this.idle.onTimeoutWarning.observers.length === 0) {
			this.idle.onTimeoutWarning.subscribe((countdown) => {
				console.log('You will time out in ' + countdown + ' seconds!');
			});
		}
		if (this.idle.onTimeout.observers.length === 0) {
			this.idle.onTimeout.subscribe(() => {
				console.log("onTimeout", new Date());
				this.applyCardService.clearAuth();
				window.location.href = this.homeUrl;
				//this.setIdle();
			});
		}
		this.idle.watch();
	}
}
