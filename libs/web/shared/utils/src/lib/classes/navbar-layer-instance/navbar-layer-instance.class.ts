import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { NavbarLayer } from '../../interfaces/navbar-layer.interface';

export class NavbarLayerInstance<T extends NavbarLayer = NavbarLayer> {
  constructor(
    private layer: T,
    private buttonStream$: Observable<Pick<NavbarLayer, 'id'>>,
    private actionStream$: Observable<Pick<NavbarLayer, 'id'> & { action: string }>,
  ) {}

  private onRelease = new Subject<void>();
  public readonly onRelease$ = this.onRelease.asObservable();

  private onChanges = new Subject<Partial<Omit<NavbarLayer, 'id'>>>();
  public readonly onChanges$ = this.onChanges.asObservable();

  public readonly buttonClicked$: Observable<void> = this.buttonStream$.pipe(
    takeUntil(this.onRelease$),
    filter((event) => event.id === this.layer.id),
    map(() => undefined),
  );

  public readonly actionClicked$ = this.actionStream$.pipe(
    takeUntil(this.onRelease$),
    filter((event) => event.id === this.layer.id),
    map((event) => event.action),
  );

  public update(changes: Partial<Omit<NavbarLayer, 'id'>>): void {
    this.onChanges.next(changes);
  }

  public hide() {
    this.onChanges.next({ hidden: true });
  }

  public show() {
    this.onChanges.next({ hidden: false });
  }

  public release(): void {
    this.onRelease.next();
    this.onRelease.complete();
    this.onChanges.complete();
  }
}
