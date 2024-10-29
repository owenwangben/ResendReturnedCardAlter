import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService } from 'app/shared/shared.module';
import { ATMPinChangeRequestModel } from "./atmpin-change.models";
import { ATMPinChangeService } from "./atmpin-change.services";

@Component({
	selector: 'app-atmpin-change',
	templateUrl: './atmpin-change.component.html',
	providers: [ATMPinChangeService]
})
export class ATMPinChangeComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public cardNos: string[] = [];

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private atmPinChangeService: ATMPinChangeService,
		private errorPageService: ErrorPageService
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'CardNo',
				ErrMsg: '請選擇卡號',
				Control: new FormControl(undefined, Validators.required)
			},
			{
				Name: 'OldPin',
				ErrMsg: '現有密碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(4)
					])
				)
			},
			{
				Name: 'NewPin',
				ErrMsg: '新密碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(4)
					])
				)
			},
			{
				Name: 'NewPinConfirm',
				ErrMsg: '新密碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(4)
					])
				)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls, () => {
				if (this.form.value.NewPin !== this.form.value.NewPinConfirm) {
					this.formValidator.SetFocus("NewPin");
					this.errorPageService.display("兩次輸入的新密碼不一致！", false);
					return false;
				}
				return true;
			}
		);
	}

	ngOnInit() {
		this.route.data.subscribe(data => {
			const items = data.data.Items;
			if (items && items.length > 0) {
				for (let i = 0; i < items.length; i++) {
					this.cardNos.push(items[i].CardNo);
				}
				// 預設選第一個
				// this.form.patchValue({CardNo: this.cardNos[0]});
			}
		});
	}

	async onSubmit() {
		if (!this.formValidator.Validate()) { return; }
		try {
			const response = await this.atmPinChangeService.changeCashAdvancePwd(this.form.value);
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				if (response.Result.Success) {
					this.errorPageService.display("密碼變更成功！", false);
				}
				else {
					this.errorPageService.display("密碼變更失敗！", false);
				}
			}
		}
		finally {
			// 清除密碼，然後卡號預選第一個
			this.form.reset();
			// this.form.patchValue({CardNo: this.cardNos[0]});
		}
	}
}
