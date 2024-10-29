import { ResponseHeader } from './../../../../shared/webapi.invoker';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageInfoService, WizardService, ErrorPageService, CustomerInfoModel, MemoryStorage, SessionStorage } from 'app/shared/shared.module';
import { CardInfo, SendApplyInfoRequestModel, EducationGrades, ApplyInfoLogRequestModel } from '../../services/applycard.models';
import { ApplyCardService } from '../../services/applycard.services';
import { ApplyCardPushGTM, ApplyCardPageName, SensorsTrackSubmit } from 'app/shared/utilities';
import * as moment from 'moment';

@Component({
	selector: 'app-applycard-confirm',
	templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit {
	public cardinfo: CardInfo;
	public applyinfo: SendApplyInfoRequestModel;
	public cminfo: CustomerInfoModel;
	public IsEasternCard: boolean;
	public quickaccount: boolean;
	public IsShowTWAutoWithholding: boolean;
	uploadFileIds: string[] = new Array(2).fill(undefined);
	imageIds: string[] = new Array(2).fill(undefined);
	isDawhoApplyCard = false;
	step: number;
	private custId: string;
	private session = new SessionStorage<ApplyInfoLogRequestModel>(ApplyInfoLogRequestModel);
  /** 行動電話號碼辦理身分驗證服務之使用者約定條款及隱私權告知條款是否顯示 */
  public MobileVerificationServices

	constructor(
		private route: ActivatedRoute,
    private router: Router,
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService,
		private wizardService: WizardService,
		private storage: MemoryStorage
	) {
	}

	public get educationGrade() {
		if (this.applyinfo && this.applyinfo.Education) {
			return EducationGrades.find(item => item.key === this.applyinfo.Education).value;
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
			this.IsEasternCard = this.CheckEastern(this.cardinfo.CardFace);
			// 以下for OCR 上傳所需資訊
			this.uploadFileIds[0] = data.applyinfo.UploadFileIds[0];
			this.uploadFileIds[1] = data.applyinfo.UploadFileIds[1];
			this.imageIds[0] = data.applyinfo.ImageIds[0];
			this.imageIds[1] = data.applyinfo.ImageIds[1];
			this.isDawhoApplyCard = data.applyinfo.Source === 1 &&
				(data.cardinfo && data.cardinfo.ShowDawhoAuthDebitUI) &&
				(this.cminfo && !this.cminfo.DepositAccountHasDawhoFlag);
			this.step = data.step;
			if (this.step >= 0) {
				this.custId = data.applyinfo.IDNumber;
			}
			else {
				this.custId = data.IDNumber;
			}
		});

		if (+this.storage.CifType == 5){
			this.quickaccount = true
		}
		else {
			this.quickaccount = false
		};

		if (
			// 下行，一般辦幣倍卡同意台幣自動扣繳
			(this.cardinfo.IsDualCurrencyCard && this.applyinfo.AgreeTwdAuthDebit) ||
			// 下行，雲端開戶幣倍卡及數位帳戶幣倍卡同意台幣自動扣繳
			(this.cardinfo.IsDualCurrencyCard && +this.applyinfo.AgreeTWAutoWithholding === 1)) {
				this.IsShowTWAutoWithholding = true;
		}
		else if (
			// 下行，辦幣倍卡不同意台幣自動扣繳(不分辦卡帳戶類別)
			this.cardinfo.IsDualCurrencyCard && !this.applyinfo.AgreeTwdAuthDebit && (!this.applyinfo.AgreeTWAutoWithholding || +this.applyinfo.AgreeTWAutoWithholding === 2)
    ) {
      this.IsShowTWAutoWithholding = false;
    }
    //判斷行動電話號碼辦理身分驗證服務之使用者約定條款及隱私權告知條款是否顯示
    this.MobileVerificationServices = this.applyinfo.MobileVerificationServices === undefined? false: this.applyinfo.MobileVerificationServices

	}

	private CheckEastern(CardFace: number) {
		// 判斷是不是東森卡
		if ( CardFace === 207178 || CardFace === 206178 ) {
			return true;
		}
		return false;
	}

	private CheckDawayCard(CardFace: number) {
		// 判斷是不是DAWAY卡
		if ( CardFace === 428001 || CardFace === 428178 ) {
			return true;
		}
		return false;
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}

	submit() {
		this.route.data.subscribe(async(data) => {
			var responseforimages: any
			data.applyinfo.IsOcrUploadSuccess = false
      data.applyinfo.MobileVerificationServices === undefined? false: data.applyinfo.MobileVerificationServices
			if(!!this.uploadFileIds[0]&& !!this.uploadFileIds[1]){
				responseforimages = await this.applyCardService.completeUpload(this.custId, this.uploadFileIds.filter(item => !!item),this.isDawhoApplyCard ? 1 : 0);
				SensorsTrackSubmit('CardApplicationUploadDocuments', this.storage.CardTitle, this.storage.CardType,
					responseforimages.ResultCode === "00", responseforimages.ResultCode === "00" ? '' : responseforimages.ResultMessage,
					!!this.storage.UserId, !!this.cminfo,
					this.applyinfo.IsCardMember, this.applyinfo.IsOtherCardAuth, this.applyinfo.Source);
				data.applyinfo.IsOcrUploadSuccess = (responseforimages.ResultCode === "00") ? true:false;
			};
			if(!!this.imageIds[0] && !!this.imageIds[1] && this.CheckDawayCard(this.cardinfo.CardFace)){
				data.applyinfo.OCRImageID = this.imageIds.join(';');
			}
      data.applyinfo.AgreeAllCompany = this.cardinfo.IsShopCard && !this.cardinfo.IsIpassCard ? false : data.applyinfo.AgreeAllCompany;
			data.applyinfo.AgreeThirdParty = this.cardinfo.IsShopCard && !this.cardinfo.IsIpassCard ? false : data.applyinfo.AgreeThirdParty;
			data.applyinfo.CifType = this.storage.CifType;
      //他行驗證辦卡須回傳近期電話是否異動,否則留空白
      data.applyinfo.CellPhoneChg = this.storage.CellPhoneChg;
      // 確保只能走虛實卡流程的卡片Flag有傳入"01"
      if (this.cardinfo.IsVirealApplyCardOnly) {
        data.applyinfo.Flag = "01";
      }
      // DAWAY卡自扣欄位判斷
      if (this.CheckDawayCard(this.cardinfo.CardFace) && data.applyinfo.AgreeTwdAuthDebitReserved) {
        data.applyinfo.AgreeTwdAuthDebit = data.applyinfo.AgreeTwdAuthDebitReserved === "Y";
      } else {
        data.applyinfo.AgreeTwdAuthDebitReserved = "";
      }
			const response = await this.applyCardService.sendApplyInfo(data.applyinfo);

			SensorsTrackSubmit('CardApplicationApplicationResult', this.storage.CardTitle, this.storage.CardType,
				response.ResultCode === "00", response.ResultCode === "00" ? '' : response.ResultMessage,
				!!this.storage.UserId, !!this.cminfo,
				data.applyinfo.IsCardMember, data.applyinfo.IsOtherCardAuth, data.applyinfo.Source);
      if(response.ResultCode === "01"){
        this.errorPageService.confirm('您在本行已持有相同卡別或卡片仍在審核中，恕無法重覆申辦。如有申請文件需補上傳，請按下方連結。',
          "上傳缺補文件", null, (ok) => {
            if (ok) {
                this.router.navigateByUrl("/Application/ApplyCard/Upload");
            }
        });
        return;
      }
			else if (this.errorPageService.validateResponse(response, { redirect: false })) {
        data.IsShowDawhoAd = response.Result.IsShowDawhoAd
				let vTime = moment().format("YYYYMMDDHHmmss");
				/**紀錄log */
				let model = {
					WorkTXN :data.applyinfo.WorkTXN,
					ApplyDT2:vTime,
					ETIME:vTime,
					ApplyFlag:"Y"
				} as ApplyInfoLogRequestModel;
				this.applyCardService.applyInfoLog(model);
        this.storage.WorkTXN = '';
				this.session.RemoveSession();
				this.wizardService.GoToNextStep();
			}
		});
	}
}
