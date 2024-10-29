import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorPageService, FormValidator, MyFormControl, WizardService, SsoService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { EStatementChangeRequestModel, EStatementGetInfoResultModel } from '../../services/estatement-change.model';
import { basename } from 'path';

@Component({
	selector: 'app-estatement-change-editor',
	templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
	private formValidator = new FormValidator();
	public emailPoolStatus: string;
	public form: FormGroup;
	public readonly isMobile = environment.IsMobile;
	public sso = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService,
		private ssoService: SsoService,
	) {
		const controls: Array<MyFormControl> = [
			{
				Name: 'Email',
				Control: new FormControl()
			},
			{
				Name: 'Mobile',
				Control: new FormControl()
			},
			{
				Name: 'IsApplyElectronicBill',
				Control: new FormControl()
			},
			{
				Name: 'IsApplyConsumerCollection',
				Control: new FormControl()
			},
			{
				Name: 'IsApplyEaper',
				Control: new FormControl()
			},
			{
				Name: 'IsApplyPaymentNotify',
				Control: new FormControl()
			},
			{
				Name: 'IsRemindPaymentEmailNotify',
				Control: new FormControl()
			}
		];

		this.form = this.formValidator.MakeFormGroup(controls, () => {
			if (this.form.value.IsApplyElectronicBill === 2 && !this.form.value.Mobile) {
				errorPageService.display("因您尚未留存行動電話於本行，請撥打客服專線02-2528-7776，提供行動電話號碼後，方可申請行動帳單。", false);
				return false;
			}
			else if (!this.form.value.Email) {
				if (this.form.value.IsApplyElectronicBill === 1) {
					errorPageService.display("因您尚未留存電子信箱於本行，請設定電子信箱後，方可申請電子帳單。", false);
					return false;
				}
				else if (this.sso) {
					if (this.form.value.IsApplyConsumerCollection || this.form.value.IsApplyEaper || this.form.value.IsApplyPaymentNotify) {
						errorPageService.display("因您尚未留存電子信箱於本行，請設定電子信箱後，方可接收以下通知。", false);
						return false;
					}
				}
			}
			return true;
		});
	}

	public async ngOnInit() {
		this.sso = !!await this.ssoService.getSsoResult();
		if (this.sso) {
			const elem: HTMLCollectionOf<Element> = document.getElementsByClassName("sso");
			for (let index = 0; index < elem.length; index++) {
				const element = elem[index];
				element.classList.remove('hide');
			}
		}
		this.route.data.subscribe(data => {
			const formValue = data.formValue;
			const info: EStatementGetInfoResultModel = data.data;
			this.emailPoolStatus = info.EmailPoolStatus;
			if (formValue) {
				this.form.patchValue({
					Email: info.Email.trim(),
					Mobile: info.Mobile.trim(),
					IsApplyElectronicBill: formValue.IsApplyElectronicBill,
					IsApplyConsumerCollection: formValue.IsApplyConsumerCollection,
					IsApplyEaper: formValue.IsApplyEaper,
					IsApplyPaymentNotify: formValue.IsApplyPaymentNotify,
					IsRemindPaymentEmailNotify: formValue.IsRemindPaymentEmailNotify
				});
			}
			else {
				this.form.patchValue({
					Email: info.Email.trim(),
					Mobile: info.Mobile.trim(),
					IsApplyElectronicBill: info.IsApplyElectronicBill,
					IsApplyConsumerCollection: info.IsApplyConsumerCollection,
					IsApplyEaper: info.IsApplyEaper,
					IsApplyPaymentNotify: info.IsApplyPaymentNotify,
					IsRemindPaymentEmailNotify: info.IsRemindPaymentEmailNotify
				});
			}
		});
	}

	onChangeEmail() {
		this.router.navigateByUrl('/Application/ChangeEmail?return=/Application/EStatementChange');
	}

	onSubmit() {
		if (!this.formValidator.Validate()) { return; }
		this.route.data.subscribe(data => {
			data.sso = this.sso;
			data.formValue = this.form.value;
			const info: EStatementGetInfoResultModel = data.data;
			data.formValue.IsRemindPaymentNotify = data.formValue.IsRemindPaymentEmailNotify
			// 信用卡繳款提醒通知，檢查SMS是否啟用邏輯
			if(info.IsRemindPaymentSMSNotify && data.formValue.IsRemindPaymentEmailNotify) {
				this.errorPageService.confirm(
					'目前您已設定簡訊繳款提醒通知，請再次確認是否變更為e-mail通知，<a style= color:red>提醒您，一旦設定即無法變更通知方式!</a>',
					'確定',
					'取消',
					(ok) => {if(!ok){return}else{this.ConfirmIsApplyElectronicBill()}}
				)
			}
			else{
				this.ConfirmIsApplyElectronicBill()
			}
		});
	}

	ConfirmIsApplyElectronicBill() {
		this.route.data.subscribe(data => {
			const info: EStatementGetInfoResultModel = data.data;
			if ((info.IsApplyElectronicBill !== this.form.value.IsApplyElectronicBill) &&
							this.form.value.IsApplyElectronicBill) {
						this.wizardService.GoToNextStep();
					}
					else {
						this.wizardService.GoToStep(2);
					}
		})
	}
}
