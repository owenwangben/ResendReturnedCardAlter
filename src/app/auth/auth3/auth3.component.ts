import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms/';
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { AuthService } from '../services/auth.service';
import { AuthByLast8CardNoRequestModel } from '../services/auth.models';
import * as moment from 'moment';

@Component({
	selector: 'app-auth3',
	templateUrl: './auth3.component.html'
})
export class Auth3Component implements OnInit {
	private returnUrl: string;
	private formValidator = new FormValidator();
	public form: FormGroup;
	public IsMobile = environment.IsMobile;
	public defDate: string;

	public constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private router: Router,
		private progressService: AuthService,
		private errorPageService: ErrorPageService,
	) {
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.return;
		});

		const controls: Array<MyFormControl> = [
			{
				Name: 'idNumber',
				ErrMsg: '身分證字號為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(8)
					])
				)
			},
			{
				Name: 'birthday',
				ErrMsg: '持卡人生日為空或格式錯誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'last8CardNo',
				ErrMsg: '卡號為空或格式錯誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(8)
					])
				)
			},
			{
				Name: 'expireDate',
				ErrMsg: '請選擇有效期限',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required
					])
				)
			},
			{
				Name: 'cVV2',
				ErrMsg: '卡片驗證碼為空或格式錯誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(3)
					])
				)
			},
			{
				Name: 'agree',
				ErrMsg: '請勾選已審閱',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.requiredTrue
					])
				)
			},
			{
				Name: 'captcha',
				ErrMsg: '驗證碼為空或格式有誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(6)
					])
				)
			},
		];

		this.form = this.formValidator.MakeFormGroup(controls);
		this.defDate = moment().add(-30, 'years').format('YYYYMMDD');
	}

	public ngOnInit() {
	}

	async submit() {
		if (!this.formValidator.Validate()) { return; }
		const model: AuthByLast8CardNoRequestModel = {
			ID: this.form.value.idNumber,
			Birthday: this.form.value.birthday,
			Last8CardNo: this.form.value.last8CardNo,
			ValidDate: this.form.value.expireDate,
			CVV2: this.form.value.cVV2,
			Captcha: this.form.value.captcha
		};
		const response = await this.progressService.authByLast8CardNo(model);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.router.navigateByUrl(this.returnUrl);
		}
	}
}
