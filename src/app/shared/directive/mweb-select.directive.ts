import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Directive, ElementRef, HostListener, EventEmitter, OnInit, forwardRef,
	Input, Output, Renderer2, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';
import { IsTouchDevice, ShowSelection } from 'app/shared/utilities';

@Directive({
	selector: '[mweb-select]',
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => MWebSelectDirective),
		multi: true
	}]
})
export class MWebSelectDirective implements ControlValueAccessor, OnInit {
	@Input('mweb-select') title = '請選擇';
	private valueSubject: BehaviorSubject<any>;
	private onChange: any = (evt: any) => { };
	private onTouched: any = (evt: any) => { };

	constructor(
		private _renderer: Renderer2,
		private _elementRef: ElementRef
	) {
		if (environment.IsMobile) {
			if (IsTouchDevice()) {
				this.nativeElement.setAttribute('disabled', '');
			}
			// $(() => $(document).click(() =>	$('#overlay').remove()));
		}
		this.valueSubject = new BehaviorSubject<any>(this.value);
		this.valueSubject.subscribe(value => {
			setTimeout(() => {
				// console.log(value, '=>', this.nativeElement, this.nativeElement.options.length);
				for (const option of this.options) {
					// console.log('check: ', value, option.value);
					if (this.equals(value, option.value)) {
						// this.nativeElement.value = option.value;
						this._renderer.setProperty(this.nativeElement, 'value', option.value);
						this.onChange(option.value);
						// console.log('after:', this.value);
						break;
					}
				}
			}, 0);
		});
	}

	ngOnInit() {
	}

	get value() {
		return this.nativeElement.value;
	}
	set value(value) {
		this.valueSubject.next(value);
	}

	private equals(val1, val2): boolean {
		return (val1 == (val2 === 'null' ? null : val2)) ||
			(val1 == null && (val2 === 'null' || val2 === ''));
	}

	get nativeElement() {
		return this._elementRef.nativeElement;
	}

	get options() {
		return this._elementRef.nativeElement.options;
	}

	@HostListener('change', ['$event'])
	change($event) {
		this.onChange($event.target.value);
	}

	@HostListener('mousedown', ['$event'])
	// @HostListener('mouseup', ['$event'])
	// @HostListener('touchstart', ['$event'])
	@HostListener('touchend', ['$event'])
	onMouseDown($event) {
		if (environment.IsMobile) {
			if (document.activeElement) { (<any>document.activeElement).blur(); }
			// $event.stopImmediatePropagation()
			$event.stopPropagation();
			$event.preventDefault();
			// this.nativeElement.focus();
			// if (!this.options || this.options.length === 0) { return; }
			// const dialog = $('body').append(
			// 	`<div id='overlay' onclick="this.remove()">
			// 		<ol class="list formList">
			// 			<div class="options" style="display:block;opacity:1;position:absolute;top:20%;left:50%">
			// 				<ul id='selection'><p>${this.title}</p></ul>
			// 			</div>
			// 		</ol>
			// 	</div>`
			// );
			// const selection = $('#selection', dialog);
			// for (const option of this.options) {
			// 	if (!option.disabled && !option.hidden) {
			// 		$(`<li>${option.text}</li>`).appendTo(selection).click(() => {
			// 			this.value = option.value;
			// 			// $('#overlay').remove();
			// 		});
			// 	}
			// }
			// $('<div class="close">close</div>').appendTo(selection).click(() => {
			// 	// $('#overlay').remove();
			// });

			const options = [];
			for (const option of this.options) {
				if (!option.disabled && !option.hidden) {
					options.push({ key: option.value, value: option.text });
				}
			}
			if (options.length === 0) { return; }
			ShowSelection(this.title, options, key => this.value = key);
		}
	}

	writeValue(obj: any): void {
		if (this.value !== obj) {
			this.value = obj;
		}
	}
	registerOnChange(fn: any): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}
	setDisabledState?(isDisabled: boolean): void {
	}
}
