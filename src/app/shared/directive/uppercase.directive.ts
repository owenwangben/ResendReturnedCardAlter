import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[uppercase]'
})
export class UppercaseDirective {

  constructor(private el: ElementRef,@Optional() private control: NgControl) {}

  @HostListener('blur') onBlur() {
    const inputValue: string = this.el.nativeElement.value;
    if (this.control) {
      this.control.control.setValue(inputValue.toUpperCase());
    }else{
      this.el.nativeElement.value = inputValue.toUpperCase();
    }
  }
}
