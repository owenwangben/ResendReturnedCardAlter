import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, ElementRef, HostListener, ViewChild, HostBinding } from '@angular/core';
import { environment } from 'environments/environment';
import { CreditcardPipe } from 'app/shared/pipes/creditcard.pipe';

@Component({
	selector: 'app-card-number-input',
	templateUrl: './card-number-input.component.html',
	styleUrls: ['./card-number-input.component.css'],
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: CardNumberInputComponent, multi: true }
	]
})
export class CardNumberInputComponent implements ControlValueAccessor {
	@HostBinding('tabindex') tabindex = 0;
	@ViewChild('txtCardNo') txtCardNo: ElementRef;
	private _disabled: boolean;
	private _cardnoPipe = new CreditcardPipe();
	public cardNo = '';
	public onChangeCallback: any = (evt: any) => { };
	public onTouchedCallback: any = (evt: any) => { };

	constructor(public _elementRef: ElementRef) { }

	@HostListener('focus')
	focus() {
		this.txtCardNo.nativeElement.focus();
	}

	writeValue(obj: any): void {
		if (obj !== this.value) { this.value = obj; }
	}
	registerOnChange(fn: any): void {
		this.onChangeCallback = fn;
	}
	registerOnTouched(fn: any): void {
		this.onTouchedCallback = fn;
	}
	setDisabledState?(isDisabled: boolean): void {
		if (isDisabled !== this._disabled) { this._disabled = isDisabled; }
	}

	onBlur($event: FocusEvent) {
		const input = $event.target as HTMLInputElement;
		if (environment.IsMobile) { input.type = "text"; }
		// input.value = this.cardNo.substr(0, 4) +
		// 	'****'.substr(0, this.cardNo.substr(4, 4).length) +
		// 	'****'.substr(0, this.cardNo.substr(8, 4).length) +
		// 	this.cardNo.substr(12);
		input.value = this._cardnoPipe.transform(this.cardNo);
	}

	onFocus($event: FocusEvent) {
		const input = $event.target as HTMLInputElement;
		if (environment.IsMobile) { input.type = "number"; }
		input.value = this.cardNo || '';
	}

	ngModelChange($event) {
		this.onChangeCallback($event);
	}

	get value() {
		return this.cardNo || '';
	}

	set value(val: string) {
		if (val !== this.value) {
			this.cardNo = val;
			this.onChangeCallback(val);
		}
	}
}
