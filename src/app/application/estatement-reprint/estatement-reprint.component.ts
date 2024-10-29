import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EStatementReprintRequestModel, EStatementReprintInfoResultModel } from "./estatement-reprint.models";
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService, ErrorPageButton } from 'app/shared/shared.module';
import { EStatementReprintService } from "./estatement-reprint.services";
import { environment } from 'environments/environment';
import * as moment from 'moment';
import swal from 'sweetalert2';

@Component({
	selector: 'app-estatement-reprint',
	templateUrl: './estatement-reprint.component.html'
})

export class EStatementReprintComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public eStatementRemailInfoResultModel: EStatementReprintInfoResultModel;
	public selectMonth: string;
	public selectMonthClass: string[] = [];
	BillMonth1 = [];
	BillMonth2 = [];
	IsMobile = environment.IsMobile;
	servicePhoneUri = "#";
	BillType: number;

	constructor(
		public pageinfo: PageInfoService,
		private router: Router,
		private route: ActivatedRoute,
		private eStatementRemailService: EStatementReprintService,
		private errorPageService: ErrorPageService
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'BillDate',
				ErrMsg: '請選擇補寄期別',
				Control: new FormControl(undefined, Validators.required)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls);
	}

	async ngOnInit() {
		this.route.data.subscribe(data => {
			this.eStatementRemailInfoResultModel = data.data;
			// this.form.patchValue({BillDate: this.eStatementRemailInfoResultModel.BillMonth[0]});
			this.eStatementRemailInfoResultModel.BillMonth.forEach(x => this.selectMonthClass.push(""));
			this.selectMonthClass[0] = environment.IsMobile ? " present" : " checked";
			this.selectMonth = moment(this.eStatementRemailInfoResultModel.BillMonth[0]).format('YYYYMM');

			if (environment.IsMobile) {
				this.form.patchValue({BillDate: this.eStatementRemailInfoResultModel.BillMonth[0]});
			}
			if (this.eStatementRemailInfoResultModel.BillType === 0 || this.eStatementRemailInfoResultModel.BillType === 2) {
				this.BillType = 2;
				this.pageinfo.name = "補寄行動帳單";
			}
			else if (this.eStatementRemailInfoResultModel.BillType === 1) {
				this.BillType = 1;
				this.pageinfo.name = "補寄電子帳單";
			}
		});
	}

	onSelectMonth(idx) {
		this.eStatementRemailInfoResultModel.BillMonth.forEach((x, i) => this.selectMonthClass[i] = "");
		this.selectMonthClass[idx] = environment.IsMobile ? " present" : " checked";
		this.selectMonth = moment(this.eStatementRemailInfoResultModel.BillMonth[idx]).format('YYYYMM');
	}

	async onSubmit() {
		if (environment.IsMobile) {
			if (!this.formValidator.Validate()) { return; }

			this.selectMonth = moment(this.form.value.BillDate).format('YYYYMM');
		}
		const response = await this.eStatementRemailService.Reprint(this.BillType, this.selectMonth);
		response.ResultMessage = response.ResultCode === "04" ? "當期無帳單[04]" : response.ResultMessage;
		if (response.ResultCode === "04" && this.BillType === 2 &&
					this.selectMonth < "201811") {
			this.errorPageService.display("當期無行動帳單", false);
		}
		else if (this.errorPageService.validateResponse(response, { redirect: false })) {
			if (this.eStatementRemailInfoResultModel.BillType === 0) {
				this.confirm('補寄成功！<br /><br />減碳救地球，您要立即設定行動/電子帳單嗎？',
					'立即設定', '/Application/EStatementChange');
			}
			else {
				this.errorPageService.display("補寄成功！", false);
			}
		}
		else if (this.eStatementRemailInfoResultModel.BillType === 1 && response.ResultCode === "02") {
			this.confirm('親愛的客戶您好：因當期無電子帳單，您可點選下方按鈕，選擇補寄實體帳單，造成不便，敬請見諒，謝謝。',
					'補寄實體帳單', '/Application/StatementReprint');
		}
	}

	dialPhone() {
		this.servicePhoneUri = "tel:0225287776";
	}

	confirm(message, confirmButtonText, confirmUrl) {
		swal({
			html: message,
			confirmButtonText: confirmButtonText,
			cancelButtonText: '取消',
			showCancelButton: true,
			reverseButtons: true
		})
			.catch(swal.noop)
			.then((ok) => {
				if (ok) {
					this.router.navigate([confirmUrl]);
				}
			});
	}
}
