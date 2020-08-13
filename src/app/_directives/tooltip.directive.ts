import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[customTooltip]'
})
export class TooltipDirective {

  @Input() toolTip: string;
  // do object with top and amount and left and amountjkey value pairs
  @Input() addStyle: string;
  @Input() position: string;

  elToolTip: any;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.elToolTip) { this.showHint(); }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.elToolTip) { this.removeHint(); }
  }

  removeHint() {
    this.renderer.removeClass(this.elToolTip, 'tooltip');
    this.renderer.removeChild(document.body, this.elToolTip);
    this.elToolTip = null;
  }

  showHint() {
    this.elToolTip = this.renderer.createElement('span');
    const text = this.renderer.createText(this.toolTip);
    this.renderer.appendChild(this.elToolTip, text);

    this.renderer.appendChild(document.body, this.elToolTip);
    this.renderer.addClass(this.elToolTip, 'tooltip');
    if (this.addStyle) {
      this.renderer.addClass(this.elToolTip, this.addStyle);
    }
    const hostPosition = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltipPosition = this.elToolTip.getBoundingClientRect();
    if (this.position === 'leftBottom') {
      this.renderer.setStyle(this.elToolTip, 'top', `${hostPosition.bottom + 10}px`);
      this.renderer.setStyle(this.elToolTip, 'left', `${hostPosition.left - Math.round(tooltipPosition.width)}px`);
      return;
    } else if (this.position === 'leftTop') {
      this.renderer.setStyle(this.elToolTip, 'top', `${hostPosition.top - (Math.round(tooltipPosition.height) + 10)}px`);
      this.renderer.setStyle(this.elToolTip, 'left', `${hostPosition.left - Math.round(tooltipPosition.width)}px`);
      return;
    } else if (this.position === 'centerBottom') {
      this.renderer.setStyle(this.elToolTip, 'top', `${hostPosition.bottom + 10}px`);
      this.renderer.setStyle(this.elToolTip, 'left', `${hostPosition.left - (Math.round(tooltipPosition.width - hostPosition.width) / 2)}px`);
      return;
    } else {
      // default is top center
      this.renderer.setStyle(this.elToolTip, 'top', `${hostPosition.top - (Math.round(tooltipPosition.height) + 10)}px`);
      this.renderer.setStyle(this.elToolTip, 'left', `${hostPosition.left - (Math.round(tooltipPosition.width - hostPosition.width) / 2)}px`);
    }
  }

}
