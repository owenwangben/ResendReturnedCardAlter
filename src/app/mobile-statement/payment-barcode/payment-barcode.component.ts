import { Component, OnInit } from '@angular/core';
import { MemoryStorage, ErrorPageService, MyFormControl, FormValidator } from 'app/shared/shared.module';
import { MobileStatementService } from '../mobile-statement.service';
import * as moment from 'moment';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetLanguage, LocaleMessages } from '../shared/LocaleMessages';

@Component({
	selector: 'app-payment-barcode',
	templateUrl: './payment-barcode.component.html',
	styles: [`
	.note_711 {
		position: absolute;
		color: #b9160f;
		font-size: 0.95em;
		z-index: 8;
		width: auto;
	}
	.info {
		margin-left: 3%;
	}
	`]
})
export class PaymentBarcodeComponent implements OnInit {
	form: FormGroup;
	private formValidator = new FormValidator();
	token: string;
	barcodeType: number;
	barcode: string;
	barcodeTime: string;
	resultModel;
	isFamilyBarcode: boolean;
	success = false;
	errorMessage: string;
	language;
	messages;

	constructor(
		private route: ActivatedRoute,
		private storage: MemoryStorage,
		private errorPageService: ErrorPageService,
		private dataService: MobileStatementService
	) {
		this.token = this.storage.Token;
		this.route.params.subscribe(params => {
			this.barcodeType = +params.type;
			this.isFamilyBarcode = params.type === "2";
		});

		const controls: Array<MyFormControl> = [
			{
				Name: 'IsCurrBalBarcode',
				Control: new FormControl(true)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	async ngOnInit() {
		this.language = GetLanguage();
		this.messages = LocaleMessages[this.language].PaymentBarcode;

		const response = await this.dataService.getBarcode(this.barcodeType);
		this.errorMessage = this.messages.ResultMessage[response.ResultCode] ?
			this.messages.ResultMessage[response.ResultCode] : response.ResultMessage;
		if (this.errorPageService.validateResponse(response, { redirect: false, errMessage: this.errorMessage },
			LocaleMessages[this.language].Button.OK)) {
			this.success = true;
			this.resultModel = response.Result;
			if (!this.isFamilyBarcode) {
				this.showBarcode(1);
				this.barcodeTime = moment().add(3, 'hours').format('YYYY/MM/DD HH:mm');
			}
		}
	}

	get remarkOf7_11() {
		return this.messages.RemarkOf7_11.replace('{0}', this.barcodeTime);
	}
	showBarcode(type) {
		if (type === 1) {
			this.barcode = this.resultModel.CURRBAL_BARCODE;
		}
		else if (type === 2) {
			this.barcode = this.resultModel.DUEAMT_BARCODE;
		}
	}
}
