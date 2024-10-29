import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[id-mask]',
})
export class IdMaskDirective {
	@Input() number;
	private value: string;

	constructor(private _elementRef: ElementRef) {
		this.value = this._elementRef.nativeElement.value;
	}

	@HostListener('focus', ['$event'])
	onFocus($event) {
		this._elementRef.nativeElement.value = this.value;
	}

	@HostListener('blur', ['$event'])
	onBlur($event) {
		this.invisibleIdNumber();
	}

	async ngOnInit(){
		if(this.number){
			this._elementRef.nativeElement.value = await this.number;
			await this.invisibleIdNumber()
		}
	}

	// 隱碼 (大於6碼才開始隱碼，只隱碼後3碼)
	invisibleIdNumber(){
		this.value = this._elementRef.nativeElement.value;
		if (this.value.length >= 6) {
			this._elementRef.nativeElement.value = this.value.substr(0, this.value.length - 3) + '●●●';
		}
	}
}
