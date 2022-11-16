import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { DialogComponent } from '@elektra-nx/web/shell/ui/dialog';
import { Subscription } from 'rxjs';
import { DialogDataToken } from '../../tokens';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private overlay: Overlay) {}

  overlayRef: OverlayRef = this.createOverlay();
  backdropSub: Subscription = this.overlayRef.backdropClick().subscribe(() => {
    this.overlayRef.detach();
  });

  private createOverlay(): OverlayRef {
    return this.overlay.create({
      disposeOnNavigation: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });
  }

  private createDialogInjector(data: DialogDataToken): Injector {
    return Injector.create({ providers: [{ provide: DialogDataToken, useValue: data }] });
  }

  alert(title: string, body: string) {
    const injector = this.createDialogInjector({ type: 'alert', data: { title, body } });
    const portal = new ComponentPortal(DialogComponent, null, injector);

    this.overlayRef?.attach(portal);
  }
}
