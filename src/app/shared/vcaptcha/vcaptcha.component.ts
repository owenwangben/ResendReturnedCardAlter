import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, HostListener, ViewChild, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VcaptchaService } from './vcaptcha.service';

@Component({
	selector: 'app-vcaptcha',
	templateUrl: './vcaptcha.component.html',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: VcaptchaComponent, multi: true }
	]
})
export class VcaptchaComponent implements ControlValueAccessor, OnInit {
	@HostBinding('tabindex') tabindex = 0;
	@ViewChild('Input') Input: ElementRef;
	public vcaptchaUrl: SafeUrl | string;
	private innerValue = '';

	constructor(
		private _elementRef: ElementRef,
		private vcaptchaService: VcaptchaService,
		private sanitizer: DomSanitizer
	) { }

	@HostListener('focus')
	focus() {
		this.Input.nativeElement.focus();
	}

	ngOnInit() {
		this.OnChangeVaptchaImage(undefined);
	}

	public onChangeCallback: any = (evt: any) => { };
	public onTouchedCallback: any = (evt: any) => { };

	/**
	 * 變更圖形驗證碼
	 */
	async OnChangeVaptchaImage($event: UIEvent) {
		this.vcaptchaUrl = await this.vcaptchaService.getVcaptchaUrl();
	}

	// get accessor
	get value(): any {
		return this.innerValue;
	}

	// set accessor including call the onchange callback
	set value(v: any) {
		if (v !== this.innerValue) {
			this.innerValue = v;
			this.onChangeCallback(v);
		}
	}

	// Set touched on blur
	onBlur($evt) {
		this.onTouchedCallback($evt);
	}

	// From ControlValueAccessor interface
	writeValue(value: any) {
		if (value !== this.innerValue) {
			this.innerValue = value;
		}
	}

	// From ControlValueAccessor interface
	registerOnChange(fn: any) {
		this.onChangeCallback = fn;
	}

	// From ControlValueAccessor interface
	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}
}
