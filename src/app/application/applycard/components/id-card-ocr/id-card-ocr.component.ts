import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader, FileLikeObject, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { ApplyCardPushGTM, ApplyCardPageName, OpenLightbox, SensorsTrack } from 'app/shared/utilities';
import { MemoryStorage, LoaderService, ErrorPageService, WizardService, CustomerInfoModel, SharedService } from 'app/shared/shared.module';
import { ApplyCardService } from '../../services/applycard.services';
import { SendApplyInfoRequestModel, CityAreaZipCode } from '../../services/applycard.models';
import { dateValidator } from 'app/shared/validators/date.validator';
import { ConditionalExpr } from '@angular/compiler';

declare var kcViewCtrl: any;
declare var cgimg: any;
declare var canvasOrig: any;
declare var canvasConvert: any;

@Component({
	selector: 'app-id-card-ocr',
	templateUrl: './id-card-ocr.component.html',
	styles: []
})
export class IdCardOcrComponent implements OnInit, OnDestroy {
	img_src: Array<string>;
	img_fname: Array<string>;
	uploaders = new Array<FileUploader>(2);
	private custId: string;
	public cityAreaZip: CityAreaZipCode[];
	public cminfo: CustomerInfoModel;
	public applyinfo: SendApplyInfoRequestModel;
	private Birthday: string;
	private IdCardIssueDateYYY: string;
	private IdCardIssueDateMM: string;
	private IdCardIssueDateDD: string;
	private IdCardIssueLocation: string;
	private IdCardIssueType: string;
	private Address: string;
	private AddressCity: string;
	private AddressArea: string;
	private AddressRoad: string;
	private ocrFrontSuccess: boolean = false;
	private ocrBackSuccess: boolean = false;
	private filesizelimite: number = 1024 * 1024 * 5;
	public uploadindex: number = 0;
	public fname: string;

	constructor(
		private route: ActivatedRoute,
		private storage: MemoryStorage,
		private loader: LoaderService,
		private sharedService: SharedService,
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService,
		private wizardService: WizardService
	) { }

	async ngOnInit() {
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.身份證OCR, this.storage.ApplyCardSource);
		this.route.data.subscribe(data => {
			this.applyinfo = data.applyinfo;
			this.cminfo = data.cminfo;
			this.custId = data.applyinfo.IDNumber;
			this.img_src = new Array(2).fill(undefined);
			this.img_fname = new Array(2).fill(undefined);
			for (let i = 0; i < this.uploaders.length; i++) {
				this.uploaders[i] = new FileUploader({
					url: "api/ApplyCard/UploadFile",
					method: "POST",
					autoUpload: false,
					itemAlias: "File",
					additionalParameter: {
						ID: this.custId,
						Type: i + 1,
						UploadType: 3,
						FileIndex: i,
						ApplicationName: this.storage.ApplicationName
					}
				});
				this.uploaders[i].onBeforeUploadItem = this.onBeforeUploadItem.bind(this);
				this.uploaders[i].onWhenAddingFileFailed = this.onWhenAddingFileFailed.bind(this);
			}
			this.uploaders[0].onSuccessItem = this.onSuccessItem0.bind(this);
			this.uploaders[1].onSuccessItem = this.onSuccessItem1.bind(this);
		});
		this.openlbox('#upload-legend');
		await this.getZipCodeData();
	}

	async getZipCodeData() {
		const response = await this.sharedService.getZip3Code();
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.cityAreaZip = response.Result.Items.map((x, i) => {
				return {
					Id: i,
					City: x.City,
					Area: x.Area,
					ZipCode: x.ZipCode
				} as CityAreaZipCode;
			});
		}
	}

	onBeforeUploadItem(fileItem: FileItem): any {
		this.loader.display(true);
	}

	onWhenAddingFileFailed(item: FileLikeObject, filter: any, options: any) {
		this.errorPageService.display("上傳錯誤，請重新上傳。", false);
	}

	onSuccessItem0(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
		this.loader.display(false);
		const json = JSON.parse(response);
		if (this.errorPageService.validateResponse(json, { redirect: false })) {
			this.applyinfo.UploadFileIds[0] = json.Result.FileId;
			const ocrResult = json.Result.OcrResult;
			if (ocrResult) {
				this.ocrFrontSuccess = true;
				this.applyinfo.ImageIds[0] = ocrResult.ImageID;
				this.Birthday = ocrResult.Birthday;
				this.IdCardIssueDateYYY = ocrResult.IdCardIssueDateYYY;
				this.IdCardIssueDateMM = ocrResult.IdCardIssueDateMM;
				this.IdCardIssueDateDD = ocrResult.IdCardIssueDateDD;
				this.IdCardIssueLocation = ocrResult.IdCardIssueLocation;
				this.IdCardIssueType = ocrResult.IdCardIssueType;
			}
			this.uploaders[1].uploadAll();
		} else {
			this.uploaders[0].queue[0].isUploaded = false;
		}
		this.dmpTrack('身分證正面', this.ocrFrontSuccess);
	}

	onSuccessItem1(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
		this.loader.display(false);
		const json = JSON.parse(response);
		if (this.errorPageService.validateResponse(json, { redirect: false })) {
			this.applyinfo.UploadFileIds[1] = json.Result.FileId;
			const ocrResult = json.Result.OcrResult;
			if (ocrResult) {
				this.ocrBackSuccess = true;
				this.applyinfo.ImageIds[1] = ocrResult.ImageID;
				this.Address = ocrResult.Address;
				this.AddressCity = ocrResult.AddressCity;
				this.AddressArea = ocrResult.AddressArea;
				this.AddressRoad = ocrResult.AddressRoad;
			}
			this.route.data.subscribe(async (data) => {
				const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
				applyinfo.Birthday = applyinfo.Birthday ? applyinfo.Birthday : this.Birthday;
				applyinfo.IdCardIssueDateYYY = applyinfo.IdCardIssueDateYYY ? applyinfo.IdCardIssueDateYYY : this.IdCardIssueDateYYY;
				applyinfo.IdCardIssueDateMM = applyinfo.IdCardIssueDateMM ? applyinfo.IdCardIssueDateMM : this.IdCardIssueDateMM;
				applyinfo.IdCardIssueDateDD = applyinfo.IdCardIssueDateDD ? applyinfo.IdCardIssueDateDD : this.IdCardIssueDateDD;
				applyinfo.IdCardIssueLocation = applyinfo.IdCardIssueLocation ? applyinfo.IdCardIssueLocation : this.IdCardIssueLocation;
				applyinfo.IdCardIssueType = applyinfo.IdCardIssueType ? applyinfo.IdCardIssueType : this.IdCardIssueType;
				if (this.cminfo && !applyinfo.IsCardMember) {
					applyinfo.ResidenceAddress1 = this.AddressCity;
					applyinfo.ResidenceAddress2 = this.AddressArea;
					applyinfo.ResidenceAddress3 = this.AddressRoad;
					applyinfo.ResidenceZipCodeId = this.getZipCodeId(this.AddressCity, this.AddressArea);
					applyinfo.ResidenceZipCode = this.getZipCode(applyinfo.ResidenceZipCodeId);
					applyinfo.ResidenceAddress = this.Address;
				}

				applyinfo.UploadFileIds = this.applyinfo.UploadFileIds;
				applyinfo.ImageIds = this.applyinfo.ImageIds;
				applyinfo.IsModifyOcrInfo = (this.ocrBackSuccess && this.ocrFrontSuccess) ? false : null;;
			});

			this.wizardService.GoToNextStep();
		} else {
			this.uploaders[0].queue[0].isUploaded = false;
			this.uploaders[1].queue[0].isUploaded = false;
		}
		this.dmpTrack('身分證反面', this.ocrBackSuccess);
	}

	getZipCodeId(city: string, area: string): number {
		const data = this.cityAreaZip && this.cityAreaZip
			.filter(item => item.City === city && item.Area === area)
			.map(item => item.Id);
		return data[0];
	}

	getZipCode(zipCodeId: number) {
		const data = this.cityAreaZip && this.cityAreaZip
			.filter(item => item.Id === zipCodeId)
			.map(item => item.ZipCode);
		return data[0];
	}

	ngOnDestroy() {
		$('.lboxed').remove();
	}

	openlbox(lboxid) {
		OpenLightbox(lboxid);
	}

	closelbox() {
		$('.lboxed').trigger('close');
	}

	readUrl($event, index: number, uploader: FileUploader) {
		this.img_src[index] = "";
		this.img_fname[index] = "";
		if ($event.target.files && $event.target.files[0]) {
			const fname: string = $event.target.files[0].name;
			const fext: string = fname.split('.').pop();
			if (fext.toLowerCase().startsWith('tif')) {
				this.img_fname[index] = fname;
			}
			else {
				const reader = new FileReader();
				reader.onload = (evt: any) => this.img_src[index] = evt.target.result;
				reader.readAsDataURL($event.target.files[0]);
			}
		}
	}

	imgExists(index: number) {
		return !!(this.img_src[index] || this.img_fname[index]);
	}

	public goPrev() {
		this.wizardService.GoToPrevStep();
	}

	async submit(skip: boolean, canUpload: boolean) {
		const id_type = skip ? '暫不上傳' : '確認上傳';
		this.dmpTrack(id_type, true);
		this.closelbox();
		if (skip) {
			this.applyinfo.IsModifyOcrInfo = null;
			this.wizardService.GoToNextStep();
		}
		else if (canUpload) {
			this.uploaders[0].uploadAll();
		}
	}

	public dmpTrack(id_type: string, is_success: boolean) {
		let authentication_method = '';
		if (this.applyinfo.IsOtherCardAuth) {
			authentication_method = '他行信用卡驗證申請';
		}
		else if (this.applyinfo.IsOtherBankAuth) {
			authentication_method = '他行臺幣帳戶驗證申請';
		}
		else {
			authentication_method = '永豐卡友/存戶';
		}

		SensorsTrack('CardApplicationUploadDocumentsOCR', this.storage.CardTitle, this.storage.CardType, '',
			authentication_method, is_success, '', null, id_type);
	}

	// 開啟檔案處理程序
	// ---------------------------------------------------------------
	readFile($event, index: number, uploader: FileUploader, reupload: boolean) {
		this.uploadindex = index;

		this.fname = $event.target.files[0].name;
		const fext: string = this.fname.split('.').pop();
		var size = $event.target.files[0].size;

		// 檔案限制檢核
		if (size > this.filesizelimite) {
			this.errorPageService.display("檔案超過5MB", false);
			return false;
		}
		var filetypereg = new RegExp('(png|jpg|jpeg|tif|tiff)');
		if (!filetypereg.test(fext)) {
			this.openlbox('#upload-legend2');
			return false;
		}
		if ($event.target.files && $event.target.files[0]) {
			if (!reupload) {
				this.openlbox('#cutbox1');
			}

			if (fext.toLowerCase().startsWith('tif')) {
				this.img_fname[index] = this.fname;
			}
			else {
				const input = $event.target;

				const fReader = new FileReader();
				fReader.onload = function (event) {
					const dataURL = fReader.result;
					// 取得選取影像
					const img = new Image();
					img.src = dataURL as string;
					img.onload = function () {
						// 建立來源畫布
						canvasOrig = <HTMLCanvasElement>document.createElement('canvas');
						canvasOrig.width = img.naturalWidth;
						canvasOrig.height = img.naturalHeight;
						canvasOrig.getContext("2d").drawImage(img, 0, 0);

						// 避免在手機上面閃退，需限制size
						if (canvasOrig.width > 2000) {
							canvasOrig = cgimg.ResizeImage(canvasOrig, 1500 / canvasOrig.width);
						}
						// 初始拉框畫布
						kcViewCtrl = new cgimg.KeystoneCorrectionViewCtrl('canvas');
						kcViewCtrl.InitialCanvas(canvasOrig);
					};
				};

				const file = input.files[0];
				fReader.readAsDataURL(file);
			}
		}
	}

	// 影像T型校正
	imgPerspectiveTransform() {
		// 校正
		const cardTypeValue = "IDCard";
		const p = kcViewCtrl.GetScalePoints(canvasOrig);
		canvasConvert = cgimg.PerspectiveTransform(canvasOrig, p, cardTypeValue);

		// 預覽
		const c = <HTMLCanvasElement>document.getElementById('card-photo-preview');
		const ctx = c.getContext("2d");
		ctx.drawImage(canvasConvert, 0, 0, c.width, c.height);

		this.openlbox('#upload-legend1');
	}

	//旋轉影像處理程序
	RotateImage(direction: boolean) {
		var angle = 90;
		//True順時鐘旋轉，False逆時鐘旋轉
		if (!direction) {
			angle = -90
		}
		canvasOrig = cgimg.RotateImage(canvasOrig, angle);
		kcViewCtrl = new cgimg.KeystoneCorrectionViewCtrl('canvas')
		kcViewCtrl.InitialCanvas(canvasOrig);
	}

	confirmimg() {
		this.img_src[this.uploadindex] = "";
		this.img_fname[this.uploadindex] = "";

		// 刪除上傳列隊中原有檔案
		if (this.uploaders[this.uploadindex].queue) {
			this.uploaders[this.uploadindex].clearQueue();
		}
		// 增加裁切後圖片至上傳列隊
		let file = new File([this.dataURItoBlob(canvasConvert.toDataURL())], this.fname);
		let fileItem = new FileItem(this.uploaders[this.uploadindex], file, {});
		this.uploaders[this.uploadindex].queue.push(fileItem);

		// 儲存T型校正後的圖片
		this.img_src[this.uploadindex] = canvasConvert.toDataURL();
		this.closelbox();
	}

	reupload() {
		$("#id_upload" + this.uploadindex).click();
	}

	dataURItoBlob(dataURI) {
		// convert base64/URLEncoded data component to raw binary data held in a string
		var byteString = atob(dataURI.split(',')[1]);

		// separate out the mime component
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
		// write the bytes of the string to an ArrayBuffer
		var ab = new ArrayBuffer(byteString.length);
		// write the bytes of the string to a typed array
		var ia = new Uint8Array(ab);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		return new Blob([ia], { type: mimeString });
	}
}
