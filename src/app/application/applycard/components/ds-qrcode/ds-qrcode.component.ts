import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms/';
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService, VcaptchaService } from 'app/shared/shared.module';
import { ApplyCardService } from '../../services/applycard.services';
import * as FileSaver from 'file-saver';

@Component({
	selector: 'app-ds-qrcode',
	templateUrl: './ds-qrcode.component.html',
	styles: []
})
export class DsQrcodeComponent implements OnInit {
	public form: FormGroup;
	private formValidator = new FormValidator();
	public qrcode: string;
	public type: number;
	public url: string;
	constructor(
		public pageinfo: PageInfoService,
		private applyCardService: ApplyCardService,
		private errorPageService: ErrorPageService,
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'DSNO',
				ErrMsg: '業務人員編號為空或格式有誤',
				Control: new FormControl(
					"DS",
					Validators.compose([
						Validators.required, Validators.minLength(6)
					])
				)
			},
			{
				Name: 'Referrer',
				ErrMsg: '推薦人員員工編號為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')
					])
				)
			},
			{
				Name: 'Branch',
				Control: new FormControl(undefined)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	ngOnInit() {
		this.type = 1;
	}

	onChangType(type) {
		this.type = +type;
		this.qrcode = null;
	}

	public async submit() {
		if (!this.formValidator.Validate()) { return; }
		const value = this.form.value;

		let dsno = null;
		let referrer = null;
		let branchCode = null;
		if (this.type === 1) {
			dsno = value.DSNO;
		}
		else {
			referrer = value.Referrer;
			branchCode = value.Branch;
		}

		const response = await this.applyCardService.DsQrCodeGenerator(dsno, referrer, branchCode);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.qrcode = response.Result.QRCode;
			this.url = response.Result.QRCodeUrl;
		}
	}

	onCopyUrl() {
		/* Get the text field */
		const copyText:any = document.getElementById("url");

		/* Select the text field */
		copyText.select();
		copyText.setSelectionRange(0, 99999); /*For mobile devices*/

		/* Copy the text inside the text field */
		document.execCommand("copy");
		this.errorPageService.display("專屬線上辦卡網址已複製", false);
	}
}
