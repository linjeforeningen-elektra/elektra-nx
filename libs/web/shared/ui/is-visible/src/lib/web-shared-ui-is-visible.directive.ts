import { Directive, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[elektraNxIsVisible]',
  exportAs: 'isVisible',
})
export class WebSharedUiIsVisibleDirective implements OnInit, OnDestroy {
  constructor(private el: ElementRef<HTMLElement>, private ngZone: NgZone) {}

  observer?: IntersectionObserver;

  @Output()
  visible = new EventEmitter<void>();

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) this.visible.emit();
        });
      });

      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
