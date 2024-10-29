import { Component, OnInit } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { GetAgreementDataResultModel } from '../services/carbon-inquiry-models';
import { CarbonInquiryService } from '../services/carbon-inquiry.service';

@Component({
	selector: 'app-carbon-icon',
	templateUrl: './carbon-icon.component.html',
	styleUrls: ['./carbon-icon.component.css']
})
export class CarbonIconComponent implements OnInit {
	showbox: boolean = true;
	disable: boolean = true;
	agree: boolean | undefined;
	agreementData: GetAgreementDataResultModel | undefined;
	agreeSuccess: boolean; // 條款啟用成功flag

	constructor(
		public carbonInquiryService: CarbonInquiryService,
		private errorPageService: ErrorPageService,
	) { }

	async ngOnInit() {
		this.carbonInquiryService.agree$.subscribe((carbonStart)=>{
			this.agreeSuccess=carbonStart
		})
		const agreementData = await this.carbonInquiryService.GetAgreementData();
		if (this.errorPageService.validateResponse(agreementData)) {
			this.agreementData = agreementData.Result;
		}
	}

	confirm() {
		if (this.agree) {
			// 新增同意條款紀錄
			this.carbonInquiryService.InsertAgreementRecord(this.agreementData.Version)
			this.showbox = false;
			this.agreeSuccess = true;
		} else {
			//未勾選同意
			//TODO 待迪普向永豐確認是否要跳轉或是其他動作
			return
		}
		this.cancel();
	}

	cancel() {
		this.showbox = false;
	}

	/**
	 *
	 * @param state disable的狀態
	 */
	changeState(state: boolean) {
		if (!state) {
			this.agree = state;
		}
		this.disable = !state;
	}

}
