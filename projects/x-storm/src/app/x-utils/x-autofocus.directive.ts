import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[xAutofocus]'
})
export class XAutofocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    if (this.el) {
      setTimeout(() => {
        this.el.nativeElement.focus();
        // this.el.nativeElement.select()
      });
    }
  }
}
