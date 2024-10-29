import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-period-query',
	templateUrl: './period-query.component.html',
	styleUrls: ['./period-query.component.css']
})
export class PeriodQueryComponent implements OnInit, OnChanges {
	readonly isMobile = environment.IsMobile;
	@Input() start: Date;
	@Input() end: Date;
	@Input() showPeriod: Boolean = !this.isMobile;
	@Input() fastQueryOptions: FastQueryOption[];
	@Output() startChange = new EventEmitter<Date>();
	@Output() endChange = new EventEmitter<Date>();
	@Output() search = new EventEmitter();
	maxDate?: Date;
	minDate?: Date;
	selectedIndex: number;
	showOptions = false;

	constructor() { }

	ngOnInit() {
		this.selectedIndex = 0;
	}

	get MaxDate(): Date {
		return this.maxDate || this.end;
	}

	get MinDate(): Date {
		return this.minDate || this.start;
	}

	ngOnChanges(changes: SimpleChanges): void {
		setTimeout(() => {
			this.maxDate = null;
			this.minDate = null;
		}, 100);
	}

	onClickMonthLink(option: FastQueryOption) {
		this.showOptions = false;
		this.maxDate = new Date(9999, 12, 31);
		this.minDate = new Date(1900, 1, 1);
		this.startChange.emit(option.StartDate);
		this.endChange.emit(option.EndDate);
		this.search.emit();
	}

	onSelectChange($event) {
		this.onClickMonthLink(this.fastQueryOptions[this.selectedIndex]);
	}

	dateChange(emitter: EventEmitter<Date>, $event: Date) {
		if (typeof $event === 'string') {
			$event = this.parseToDate($event);
		}
		emitter.emit($event);
	}

	onSearch() {
		this.search.emit();
	}

	private parseToDate(str: string): Date {
		const reg = /^(\d{4})\/?(\d{2})\/?(\d{2})/;
		const matches = str.match(reg);
		if (matches) {
			return new Date(+matches[1], +matches[2] - 1, +matches[3]);
		}
		return null;
	}
}

export interface FastQueryOption {
	DisplayName: string;
	StartDate: Date;
	EndDate: Date;
}

export interface FastQueryOptionYYYYMM {
	DisplayName: string;
	Value: string;
}

export interface DropdownOption {
	DisplayName: string;
	Value: string;
}
