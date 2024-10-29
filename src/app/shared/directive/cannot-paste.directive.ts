import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[cannotPaste]'
})
export class CannotPasteDirective {
	constructor(private _elementRef: ElementRef) {
	}

	@HostListener('paste', ['$event'])
	onPaste(event) {
		event.stopPropagation();
		event.preventDefault();
	}
}
