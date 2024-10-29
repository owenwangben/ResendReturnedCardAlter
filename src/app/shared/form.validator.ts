import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms/';
import { ErrorPageService } from './errorpage/errorpage.service';

export class FormValidator {
	private controls: Array<MyFormControl>;
	private formValidationFn: FormValidationFn;
	private errorPageService = new ErrorPageService();

	public MakeFormGroup(controls: Array<MyFormControl>, fn?: FormValidationFn): FormGroup {
		this.controls = controls;
		const form = new FormBuilder().group({});
		for (const item of this.controls) {
			form.addControl(item.Name, item.Control);
		}
		this.formValidationFn = fn;
		return form;
	}

	public SetFocus(ctrlName: string): void {
		$(`[FormControlName=${ctrlName}]`).focus();
	}

	public Validate(errMsgs?, confirmButtonText?): Boolean {
		for (const item of this.controls) {
			const ctrl = $(`[FormControlName=${item.Name}]`);
			if (ctrl.length && item.Control.invalid) {
				ctrl.focus();
				if (errMsgs) {
					this.errorPageService.display(errMsgs[item.Name], false, null, null, confirmButtonText);
				}
				else if (item.ErrMsg) {
					if (!item.RedirectURL) {
						this.errorPageService.display(item.ErrMsg, false, null, null, confirmButtonText);
					}
					else{
						this.errorPageService.display(item.ErrMsg, false, null, null, confirmButtonText, item.RedirectURL);
					}
				}
				return false;
			}
		}
		return this.formValidationFn ? this.formValidationFn() : true;
	}

	public SetErrMsg(ctrlName: string, errMsg: string): void {
		const ctrl = this.controls.find(item => item.Name === ctrlName);
		if (ctrl) { ctrl.ErrMsg = errMsg; }
	}
}

export class MyFormControl {
	public Name: string;
	public ErrMsg?: string;
	public Control: FormControl;
	public RedirectURL?: string;
}

export type FormValidationFn = () => Boolean;
