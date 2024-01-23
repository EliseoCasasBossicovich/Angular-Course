import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[titleStyle]'
})
export class titleStyleDirective {

  constructor(
    private elementRef: ElementRef, private renderer: Renderer2){
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', '32px')
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-family', 'Impact')
   }
}