import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageInfoService, WizardService, ErrorPageService, CustomerInfoModel, MemoryStorage } from 'app/shared/shared.module';
import { CardInfo, SendApplyInfoRequestModel, EducationGradesIntl } from '../../../applycard/services/applycard.models';
import { ApplyCardService } from '../../../applycard/services/applycard.services';
import { ApplyCardPushGTM, ApplyCardPageName, SensorsTrackSubmit } from 'app/shared/utilities';
import { GetLanguage, LocaleMessages } from '../../shared/LocaleMessages';

@Component({
	selector: 'app-applycard-intl-confirm',
	templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit {
	public cardinfo: CardInfo;
	public applyinfo: SendApplyInfoRequestModel;
	public cminfo: CustomerInfoModel;
	public IsEasternCard: boolean;
	language: string = GetLanguage();
	message = LocaleMessages[this.language].confirm;
	btnMessage = LocaleMessages[this.language].Button;
	public TelOfManpowerBrokerCom: string;
	public ManagerTelOfManpowerBrokerCom: string;

	constructor(
		private route: ActivatedRoute,
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService,
		private wizardService: WizardService,
		private storage: MemoryStorage
	) {
	}

	public get educationGrade() {
		if (this.applyinfo && this.applyinfo.Education) {
			return EducationGradesIntl.find(item => item.key === this.applyinfo.Education).value;
		}
		return "";
	}

	ngOnInit() {
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.確認資料, this.storage.ApplyCardSource);
		this.route.data.subscribe(data => {
			this.cardinfo = data.cardinfo;
			this.applyinfo = data.applyinfo;
			this.cminfo = data.cminfo;
			this.cardinfo.CardFullName = this.cardinfo.CardFullName.replace("<br>", "");
			this.TelOfManpowerBrokerCom = this.applyinfo.TelOfManpowerBrokerComAreaCode ? this.applyinfo.TelOfManpowerBrokerComAreaCode + "-" :"";
			console.log(this.TelOfManpowerBrokerCom);
			this.TelOfManpowerBrokerCom += this.applyinfo.TelOfManpowerBrokerComPhone ? this.applyinfo.TelOfManpowerBrokerComPhone : "";
			console.log(this.TelOfManpowerBrokerCom);
			this.ManagerTelOfManpowerBrokerCom = this.applyinfo.ManagerTelOfManpowerBrokerCommAreaCode ? this.applyinfo.ManagerTelOfManpowerBrokerCommAreaCode + "-" : "";
			console.log(this.ManagerTelOfManpowerBrokerCom);

			this.ManagerTelOfManpowerBrokerCom += this.applyinfo.ManagerTelOfManpowerBrokerComPhone ? this.applyinfo.ManagerTelOfManpowerBrokerComPhone : "";
			console.log(this.ManagerTelOfManpowerBrokerCom);

		});
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}

	submit() {
		this.route.data.subscribe(async(data) => {
			const response = await this.applyCardService.sendApplyInfo(data.applyinfo);
			SensorsTrackSubmit('CardApplicationApplicationResult', this.storage.CardTitle, this.storage.CardType,
				response.ResultCode === "00", response.ResultCode === "00" ? '' : response.ResultMessage,
				!!this.storage.UserId, !!this.cminfo,
				data.applyinfo.IsCardMember, data.applyinfo.IsOtherCardAuth, data.applyinfo.Source);

			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				this.wizardService.GoToNextStep();
			}
		});
	}
}
