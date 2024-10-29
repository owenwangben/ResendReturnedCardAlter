import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService } from 'app/shared/shared.module';
import { DisplayCardPwdService } from "./displaycard-pwd.services";
import { EditPwdRequestModel } from "./displaycard-pwd.models";

@Component({
	selector: 'app-displaycard-pwd',
	templateUrl: './displaycard-pwd.component.html',
	providers: [DisplayCardPwdService],
})

export class DisplayCardPwdComponent implements OnInit {
	private formValidator = new FormValidator();
	public form: FormGroup;
	public cardNos: string[];

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private displayCardPwdService: DisplayCardPwdService,
		private errorPageService: ErrorPageService
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'CardNo',
				ErrMsg: '請選擇卡號',
				Control: new FormControl(undefined, Validators.required)
			},
			{
				Name: 'Birthday',
				ErrMsg: '持卡人生日為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required,
						Validators.pattern('(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])')
					])
				)
			},
			{
				Name: 'NewPwd',
				ErrMsg: '新驗證碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(4)
					])
				)
			},
			{
				Name: 'NewPwdConfirm',
				ErrMsg: '新驗證碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(4)
					])
				)
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls, () => {
			if (this.form.value.NewPwd !== this.form.value.NewPwdConfirm) {
				this.formValidator.SetFocus("NewPwd");
				this.errorPageService.display("兩次輸入的驗證碼不一致！", false);
				return false;
			}
			return true;
		}
		);
	}

	ngOnInit() {
		this.cardNos = [];
		this.route.data.subscribe(data => {
			const items = data.data.Items;
			for (let i = 0; i < items.length; i++) {
				this.cardNos.push(items[i].CardNo);
			}
			// 卡號預設選第一個
			// this.form.patchValue({CardNo: this.cardNos[0]});
		});
	}

	async onSubmit() {
		if (!this.formValidator.Validate()) { return; }
		try {
			const response = await this.displayCardPwdService.DisplayCardPwd(this.form.value);
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
