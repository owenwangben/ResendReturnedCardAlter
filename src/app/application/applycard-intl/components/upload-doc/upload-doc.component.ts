import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormValidator, MyFormControl, WizardService } from 'app/shared/shared.module';
import { SendApplyInfoRequestModel, ArcInfoModel } from 'app/application/applycard/services/applycard.models';
import { CustomerInfoModel, ErrorPageService, LoaderService, MemoryStorage } from 'app/shared/shared.module';
import { FileItem, FileLikeObject, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { GetLanguage, LocaleMessages } from '../../shared/LocaleMessages';
import { ApplyCardPageName, ApplyCardPushGTM, SensorsTrackSubmit } from 'app/shared/utilities';
import { ApplyCardService } from 'app/application/applycard/services/applycard.services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateValidator } from 'app/shared/validators/date.validator';

@Component({
	selector: 'app-applycard-intl-uploaddoc',
	templateUrl: './upload-doc.component.html'
})
export class UploadDocComponent implements OnInit, OnDestroy {
	private fileIds: Array<string> = new Array(26).fill(undefined);
	step: number;
	language: string = GetLanguage();
	message = LocaleMessages[this.language].Upload;
	btnMessage = LocaleMessages[this.language].Button;
	ARCNumber;
	PeriodOfStay;
	img_src: Array<string>;
	img_fname: Array<string>;
	passport_img_fname: Array<string> = new Array;
	empl_cert_img_fname: Array<string> = new Array;
	fin_state_img_fname: Array<string> = new Array;
	uploaders = new Array<FileUploader>(26);
	passportUploads: FileUploader;
	public applyinfo: SendApplyInfoRequestModel;
	public cminfo: CustomerInfoModel;
	public showARCinfoArea: number = 0;
	public form: FormGroup;
	private formValidator = new FormValidator();
	private errorPageBtnText: string = this.btnMessage.Confirm ? this.btnMessage.Confirm + "<br>" + "確定" : "確定";
	BackBtnText: string = this.btnMessage.Back ? this.btnMessage.Back + "<br>" + "返回" : "返回";
	ConfirmBtnText: string = this.btnMessage.Confirm ? this.btnMessage.Confirm + "<br>" + "確認送出" : "確認送出";

	constructor(
		private route: ActivatedRoute,
		private storage: MemoryStorage,
		private loader: LoaderService,
		private errorPageService: ErrorPageService,
		private wizardService: WizardService,
		private applyCardService: ApplyCardService,
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'NewID',
				ErrMsg: this.message.ErrMsg.ARCIdError + '<br>統一證號為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(10),
						Validators.required, Validators.pattern('^[a-zA-Z][a-dA-D0-9][0-9]{8}$')
					])
				)
			},
			{
				Name: 'ArcIssueDate',
				ErrMsg: this.message.ErrMsg.IssueDateError + '<br>核發日期為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						dateValidator(),
						Validators.required, Validators.minLength(8)
					])
				)
			},
			{
				Name: 'ArcExpireDate',
				ErrMsg: this.message.ErrMsg.ExpireDateError + '<br>居留期限為空或格式錯誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
					])
				),
			},
			{
				Name: 'ArcBarcodeNumber',
				ErrMsg: this.message.ErrMsg.BarcodeError + '<br>條碼號碼為空',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	ngOnInit() {
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.上傳資料, this.storage.ApplyCardSource);
		this.route.paramMap
		this.route.queryParams.subscribe(data => {
			if (!isNaN(data.type)) {
				this.showARCinfoArea = data.type;
			}
		});
		this.route.data.subscribe(data => {
			this.applyinfo = data.applyinfo;
			this.cminfo = data.cminfo;
			if (data.applyinfo) {
				this.fileIds[0] = data.applyinfo.UploadFileIds[0];
				this.fileIds[1] = data.applyinfo.UploadFileIds[1];
			}
			this.ARCNumber = data.IDNumber;
			this.step = data.step;
			this.img_src = new Array(2).fill(undefined);
			this.img_fname = new Array(4).fill(undefined);
			if (this.step >= 0) {
				this.ARCNumber = data.applyinfo.IDNumber;
				this.PeriodOfStay = data.applyinfo.PerOfStay;
			}
			for (let i = 0; i < this.uploaders.length; i++) {
				let fileType = 0;
				if (i === 1) {
					fileType = 1;	//身分證反面
				} else if (i === 2) {
					fileType = 5;	//現居地址
				} else if (i === 3) {
					fileType = 6;	//公司地址
				} else if (4 <= i && i <= 5) {
					fileType = 3	//護照內頁
				} else if (6 <= i && i <= 15) {
					fileType = 4	//勞動契約(在職證明)
				} else if (16 <= i && i <= 26) {
					fileType = 2	//財力證明
				}
				this.uploaders[i] = new FileUploader({
					url: "api/ApplyCard/UploadFile",
					method: "POST",
					autoUpload: true,
					maxFileSize: 5 * 1024 * 1024,
					allowedMimeType: ['image/jpeg', 'image/tiff', 'image/tif', 'image/png'],
					itemAlias: "File",
					additionalParameter: {
						ID: this.ARCNumber,
						Type: fileType + 1, // (檔案類型 1:身分證正面;2:身分證反面;3:財力證明;4:護照內頁;5:勞動契約(在職證明);6:現居地址;7:公司地址)
						UploadType: 2, // TODO 待確認 UploadType (上傳類型。1:線上辦卡補件上傳;2:一般補件上傳)
						FileIndex: i,
						ApplicationName: this.storage.ApplicationName
					}
				});
				this.uploaders[i].onBeforeUploadItem = this.onBeforeUploadItem.bind(this);
				this.uploaders[i].onWhenAddingFileFailed = this.onWhenAddingFileFailed.bind(this);
				this.uploaders[i].onSuccessItem = this.onSuccessItem.bind(this);
			}
		});
	}

	onBeforeUploadItem(fileItem: FileItem): any {
		this.loader.display(true);
	}

	onWhenAddingFileFailed(item: FileLikeObject, filter: any, options: any) {
		this.errorPageService.display(this.message.ErrMsg.FileTypeOrMore5MB + "<br>提醒您，檔案格式限JPG、PNG、TIF檔，單一檔案大小不得超過5MB[112]", false, null, null, this.errorPageBtnText);
	}

	onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
		this.loader.display(false);
		const json = JSON.parse(response);
		if (this.errorPageService.validateResponse(json, { redirect: false })) {
			this.fileIds[json.Result.FileIndex] = json.Result.FileId;
		}
	}

	readUrl($event, index: number, uploader: FileUploader, category: string) {
		this.remove_fname_src(index);
		this.fileIds[index] = undefined;
		if (uploader.isUploading && $event.target.files && $event.target.files[0]) {
			const fname: string = $event.target.files[0].name;
			this.addFileName(index, fname, category);
			if (index < 2) {
				const reader = new FileReader();
				reader.onload = (evt: any) => this.img_src[index] = evt.target.result;
				reader.readAsDataURL($event.target.files[0]);
			}
		}
		$event.target.value = '';
	}

	removeFileName(index: number, category?: string) {
		this.remove_fname_src(index);
		this.fileIds.splice(index, 1, undefined);
		switch (category) {
			case 'passport':
				this.passport_img_fname.splice(index - 4, 1);
				if (index - 4 < 1 && this.fileIds[index + 1]) {
					this.fileIds.splice(index, 1, this.fileIds[index + 1]);
					this.fileIds.splice(index + 1, 1, undefined);
				}
				break;
			case 'employee':
				this.empl_cert_img_fname.splice(index - 6, 1);
				for (let idx = index; idx < 16; idx++) {
					if (this.fileIds[idx + 1] && idx < 15) {
						this.fileIds.splice(idx, 1, this.fileIds[idx + 1]);
						this.fileIds.splice(idx + 1, 1, undefined);
					}
				}
				break;
			case 'financial':
				this.fin_state_img_fname.splice(index - 16, 1);
				for (let idx = index; idx < 26; idx++) {
					if (this.fileIds[idx + 1] && idx < 25) {
						this.fileIds.splice(idx, 1, this.fileIds[idx + 1]);
						this.fileIds.splice(idx + 1, 1, undefined);
					}
				}
				break;
			default:
				break;
		}
	}

	remove_fname_src(index: number) {
		if (index < 4) {
			this.img_fname[index] = undefined;
			if (index < 2) {
				this.img_src[index] = undefined;
			}
		}
	}

	click(targetId: string) {
		document.getElementById(targetId).click()
	}

	addFileName(index: number, fname: string, category?: string) {
		switch (category) {
			case 'passport':
				index = index - 4;
				if (index > 1) {
					this.passport_img_fname.splice(this.passport_img_fname.length - 1, 1, fname);
				} else {
					this.passport_img_fname.splice(index, 1, fname);
				}
				break;
			case 'employee':
				index = index - 6
				if (index > 9) {
					this.empl_cert_img_fname.splice(this.empl_cert_img_fname.length - 1, 1, fname);
				} else {
					this.empl_cert_img_fname.splice(index, 1, fname);
				}
				break;
			case 'financial':
				index = index - 16
				if (index > 9) {
					this.fin_state_img_fname.splice(this.fin_state_img_fname.length - 1, 1, fname);
				} else {
					this.fin_state_img_fname.splice(index, 1, fname);
				}
				break;
			default:
				this.img_fname[index] = fname;
				break;
		}
	}

	getUploaderIndex(cate: string) {
		let uploadindex = 0;
		switch (cate) {
			case 'passport':
				uploadindex = 4;
				if (0 <= this.passport_img_fname.length && this.passport_img_fname.length < 2) {
					uploadindex = this.passport_img_fname.length + uploadindex;
				} else {
					uploadindex = 5;
				}
				return uploadindex;
			case 'employee':
				uploadindex = 6;
				if (0 <= this.empl_cert_img_fname.length && this.empl_cert_img_fname.length < 10) {
					uploadindex = this.empl_cert_img_fname.length + uploadindex;
				} else {
					uploadindex = 15;
				}
				return uploadindex;
			case 'financial':
				uploadindex = 16;
				if (0 <= this.fin_state_img_fname.length && this.fin_state_img_fname.length < 10) {
					uploadindex = this.fin_state_img_fname.length + uploadindex;
				} else {
					uploadindex = 25;
				}
				return uploadindex;
			default:
				return uploadindex
		}
	}

	ngOnDestroy() {
		$('.lboxed').remove();
	}

	closelbox() {
		$('.lboxed').trigger('close');
	}

	openlbox(lboxid) {
		if (this.showARCinfoArea == 1) {
			if (!this.formValidator.Validate(null, this.errorPageBtnText)) { return; }
		}
		openlbox(lboxid);
	}

	imgExists(index: number, type?: string) {
		switch (index) {
			case 0:
				if (this.showARCinfoArea == 1 && type == 'btn')
					return !!(this.img_src[0] || this.img_fname[0]) && !!(this.img_src[1] || this.img_fname[1]);
				else
					return !!(this.img_src[index] || this.img_fname[index]);
			case 1:
				if (this.showARCinfoArea == 1 && type == 'btn')
					return !!(this.img_src[0] || this.img_fname[0]) && !!(this.img_src[1] || this.img_fname[1]);
				else
					return !!(this.img_src[index] || this.img_fname[index]);
			case 4:
				return !!(this.passport_img_fname[index - 4]);
			case 5:
				return !!(this.empl_cert_img_fname[index - 5]);
			case 6:
				return !!(this.fin_state_img_fname[index - 6]);
			default:
				return !!(this.img_src[index] || this.img_fname[index]);
		}
	}

	async submit(completed: boolean) {
		let result = true;
		this.closelbox();

		let ArcInfo = new ArcInfoModel();
		if (this.showARCinfoArea == 1) {
			const value = this.form.value;
			ArcInfo.NewId = value.NewID;
			ArcInfo.ArcIssueDate = value.ArcIssueDate;
			ArcInfo.ArcExpireDate = value.ArcExpireDate;
			ArcInfo.ArcBarcodeNumber = value.ArcBarcodeNumber;
		}

		const response = await this.applyCardService.completeARCUpload(this.ARCNumber, this.fileIds.filter(item => !!item), 0, this.showARCinfoArea, ArcInfo);
		if (this.applyinfo) {
			SensorsTrackSubmit('CardApplicationUploadDocuments', this.storage.CardTitle, this.storage.CardType,
				response.ResultCode === "00", response.ResultCode === "00" ? '' : response.ResultMessage,
				!!this.storage.UserId, !!this.cminfo,
				this.applyinfo.IsCardMember, this.applyinfo.IsOtherCardAuth, this.applyinfo.Source);
		}
		result = this.errorPageService.validateResponse(response, { redirect: false });
		if (result) {
			this.route.data.subscribe(async (data) => {
				data.completed = completed;
				this.wizardService.GoToNextStep();
			});
		}
	}

	isShowCompAddr() {
		if (this.showARCinfoArea != 1 && this.applyinfo == undefined) {
			return true;
		}
		else if (this.showARCinfoArea == 1) {
			return false;
		}
		else if (this.applyinfo.IsUploadCompanyAddress) {
			return true;
		} else {
			if (this.applyinfo.IsCompanyAddressSameAsHomeAddress) {
				if (this.applyinfo.IsUploadAddress) {
					return true;
				}
				else {
					return false;
				}
			} else {
				return false;
			}
		}
	}
}

function openlbox($lboxid) {
	const src_top: any = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
	$('.lbox-block').find($lboxid).show().siblings().hide();
	$('.lboxed').lightbox_me({
		closeClick: false,
		centered: true,
		onLoad: function () {
			scrollTo($('.lboxed').offset().top);
		},
		onClose: function () {
			scrollTo(src_top);
		},
		overlayCSS: {
			background: 'black', opacity: .8
		}
	});
}

function scrollTo(pos) {
	$('html, body').animate({
		scrollTop: pos
	}, 250);
}
