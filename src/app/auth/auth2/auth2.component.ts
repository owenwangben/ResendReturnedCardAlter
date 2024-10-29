import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms/';
import { ErrorPageService, FormValidator, MyFormControl, PageInfoService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { AuthService } from '../services/auth.service';
import { AuthByCardNoRequestModel } from '../services/auth.models';
import * as moment from 'moment';

@Component({
	selector: 'app-auth2',
	templateUrl: './auth2.component.html'
})
export class Auth2Component implements OnInit {
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
				Name: 'cardNo',
				ErrMsg: '卡號為空或格式錯誤',
				Control: new FormControl(
					undefined,
					Validators.compose([
						Validators.required, Validators.minLength(15)
					])
				)
			},
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
		const model: AuthByCardNoRequestModel = {
			CardNo: this.form.value.cardNo,
			ID: this.form.value.idNumber,
			Birthday: this.form.value.birthday,
			Captcha: this.form.value.captcha
		};
		const response = await this.progressService.authByCardNo(model);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.router.navigateByUrl(this.returnUrl);
		}
	}
}
