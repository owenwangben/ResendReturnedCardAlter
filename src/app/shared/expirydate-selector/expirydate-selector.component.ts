import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validator, AbstractControl,
			ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { Component, EventEmitter, Output, ElementRef, ChangeDetectionStrategy, OnInit, forwardRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';
import { SharedService } from '../shared.services';

@Component({
	selector: 'app-expirydate-selector',
	templateUrl: './expirydate-selector.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: ExpiryDateSelectorComponent,
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => ExpiryDateSelectorComponent),
			multi: true
		}
	]
})
export class ExpiryDateSelectorComponent implements ControlValueAccessor, OnInit, Validator {
	@Output() ngModelChange = new EventEmitter();
	private valueSubject = new BehaviorSubject(null);
	readonly months: number[] = Array.apply(null, { length: 12 }).map((item, idx) => idx + 1);
	readonly thisYear: number = new Date().getFullYear();
	readonly years: number[] = Array.apply(null, { length: 12 }).map((item, idx) => this.thisYear + idx);
	public mm = new FormControl();
	public yyyy = new FormControl();
	private yyyymm = "";
	private currentYYYYMM = "";
	private onChange: any = (evt: any) => { };
	private onTouched: any = (evt: any) => { };

	public constructor(private sharedService: SharedService) {
		this.valueSubject.subscribe(data => {
			if (data) {
				this.mm.setValue(data.mm);
				this.yyyy.setValue(data.yyyy);
				this.onChange(this.mmyy);
			}
		});
	}

	async ngOnInit() {
		// this.valueSubject.next({ mm: this.months[0], yyyy: this.years[1] });
		const response = await this.sharedService.getServerInfo();
		if (response.ResultCode === "00") {
			this.currentYYYYMM = moment(response.Header.RequestTime).format('YYYYMM');
		}
		else {
			this.currentYYYYMM = moment().format('YYYYMM');
		}
	}

	validate(c: AbstractControl): ValidationErrors {
		if (this.yyyymm < this.currentYYYYMM) {
			return { Error: 'Expiry date must be greater than the current month!' };
		}
		return null;
	}

	private get mmyy(): string {
		return this.FormatExpiryDate(this.mm.value, this.yyyy.value);
	}

	// public ngAfterViewInit() {
	// 	if (!this.valueSubject.value)
	// 		this.valueSubject.next({ mm: this.months[0], yyyy: this.years[1] });
	// 	this.ngModelChange.emit(this.mmyy);
	// }

	public change_mm($event) {
		this.onChange(this.FormatExpiryDate($event, this.yyyy.value));
	}

	public change_yyyy($event) {
		this.onChange(this.FormatExpiryDate(this.mm.value, $event));
	}

	private FormatExpiryDate(month: number, year: number) {
		if (month && year) {
			this.yyyymm = `${year.toString()}${month > 9 ? '' : '0'}${month}`;
			return `${month > 9 ? '' : '0'}${month}${year.toString().substr(2)}`;
		}
		return undefined;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		if (isDisabled) {
			this.mm.disable();
			this.yyyy.disable();
		}
		else {
			this.mm.enable();
			this.yyyy.enable();
		}
	}

	writeValue(obj: any): void {
		if (+obj && obj.length === 4 && obj !== this.mmyy ) {
			this.valueSubject.next({
				mm: +obj.substr(0, 2),
				yyyy: 2000 + +obj.substr(obj.length - 2)
			});
		}
		else {
			this.valueSubject.next({
				mm: null,
				yyyy: null
			});
		}
	}
}
