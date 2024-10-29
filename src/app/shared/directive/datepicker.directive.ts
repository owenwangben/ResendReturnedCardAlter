import { NavigationEnd } from '@angular/router';
import { Directive, ElementRef, Input, forwardRef, OnInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, NG_VALIDATORS } from "@angular/forms";
import { environment } from 'environments/environment';

@Directive({
	selector: '[datepicker]',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatePickerDirective), multi: true },
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => DatePickerDirective), multi: true }
	]
})
export class DatePickerDirective implements ControlValueAccessor, OnInit, OnChanges, Validator {
	@Input() slashfmt = false;
	@Input() dob = true;
	@Input() minDate?: Date;
	@Input() maxDate?: Date;
	@Input() defDate?: string;
	public onChange: any = (_: any) => { /*Empty*/ };
	public onTouched: any = () => { /*Empty*/ };
	public onValidatorChange: any = () => { /*Empty*/ };

	constructor(public _elementRef: ElementRef) {
	}

	get input() {
		return $(this._elementRef.nativeElement);
	}

	@HostListener('blur', ['$event'])
	blur($event) {
		this.onTouched($event);
	}

	ngOnInit() {
		const today = new Date();
		let showOn = 'both';
		if (environment.IsMobile) {	showOn = ''; }
		const option = {
			showOn: showOn,
			buttonImage: '/MMA8/card/images/calendar.gif',
			buttonImageOnly: true,
			dateFormat: this.slashfmt ? 'yy/mm/dd' : 'yymmdd',
			regional: 'zh-TW',
			minDate: this.minDate,
			maxDate: this.maxDate
		};

		this.input.keydown((e: any) => { if (e.keyCode === 13) { e.keyCode = 27; return false; }});
		this.input.datepicker(option).on('change', (e: any) => { this.onChange(e.target.value); });
		if (this.dob) {
			this.input.datepicker('option', 'changeYear', true);
			this.input.datepicker('option', 'yearRange', String(today.getFullYear() - 100) + ':' + String(today.getFullYear() - 20));
		}
		if (this.defDate) {
			this.input.datepicker('option', 'defaultDate', this.defDate);
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.minDate) {
			if (changes.minDate.currentValue > this.value) {
				this.value = changes.minDate.currentValue;
			}
			this.input.datepicker('option', 'minDate', changes.minDate.currentValue);
		}
		if (changes.maxDate) {
			if (changes.maxDate.currentValue < this.value) {
				this.value = changes.maxDate.currentValue;
			}
			this.input.datepicker('option', 'maxDate', changes.maxDate.currentValue);
		}
	}

	get value(): Date {
		return this.input.datepicker('getDate');
	}

	// set accessor including call the onchange callback
	set value(val: Date) {
		if (val !== this.value) {
			this.writeValue(val);
			this.onChange(val);
		}
	}

	writeValue(obj: Date): void {
		this.input.datepicker("setDate", obj);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	private IsValidDate(val: string): boolean {
		// console.log(val, typeof val);
		if (val) {
			if (typeof val !== 'string') { return true; }
			if (this.slashfmt === val.includes('/')) {
				let y, m, d;
				if (val.includes('/')) {
					const ddd = val.split('/');
					y = +ddd[0];
					m = +ddd[1];
					d = +ddd[2];
				}
				else {
					y = +val.substr(0, 4);
					m = +val.substr(4, 2);
					d = +val.substr(6);
				}
				// y:2018 m:06 d:31 will be converted to y:2018 m:7 d:1, it's javascript feature.
				const nd = new Date(y, m - 1, d);
				// console.log(y, m, d, 'vs', nd.getFullYear(), nd.getMonth() + 1, nd.getDate());
				return y === nd.getFullYear() && m === nd.getMonth() + 1 && d === nd.getDate();
			}
		}
		return false;
	}

	validate(c: AbstractControl): { [key: string]: any; } {
		// console.log(this.IsValidDate(c.value));
		if (this.IsValidDate(c.value)) {
			const n = this.value && Date.parse(this.value.toString());
			if (!isNaN(n)) {
				const min_n = this.minDate && Date.parse(this.minDate.toString());
				const max_n = this.maxDate && Date.parse(this.maxDate.toString());
				// console.log(n, '>=', min_n, '&', n, '<=', max_n);
				if ((!min_n || n >= min_n) && (!max_n || n <= max_n)) {
					if (c.errors) {
						delete c.errors['ValidDate'];
						if (!Object.keys(c.errors).length) { c.setErrors(null); }
					}
					return {};
				}
			}
		}
		return { ValidDate: false };
	}

	registerOnValidatorChange?(fn: () => void): void {
		this.onValidatorChange = fn;
	}
}
