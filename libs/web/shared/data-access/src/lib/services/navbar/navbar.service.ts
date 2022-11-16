import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { NavbarLayerInstance } from '../../classes';
import { NavbarLayer } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private idx = 1;

  private layers: BehaviorSubject<NavbarLayer[]> = new BehaviorSubject(<NavbarLayer[]>[]);
  public readonly layers$ = this.layers.asObservable();

  private buttonStream: Subject<Pick<NavbarLayer, 'id'>> = new Subject();
  public readonly buttonStream$ = this.buttonStream.asObservable();

  private actionStream: Subject<{ id: number; action: string }> = new Subject();
  private readonly actionStream$ = this.actionStream.asObservable();

  public latestProp$<T extends keyof NavbarLayer>(
    prop: T,
  ): Observable<{ id: number; value: NavbarLayer[T] } | undefined> {
    return this.layers$.pipe(
      map((layers) => {
        const found = layers.sort((a, b) => (a.id < b.id ? 1 : -1)).find((layer) => layer[prop] !== undefined);
        if (!found) return undefined;

        const id = found.id;
        const value: NavbarLayer[T] = found[prop];
        return { id, value };
      }),
    );
  }

  public registerNavbarLayer<T extends NavbarLayer>(props: Omit<T, 'id'>): NavbarLayerInstance<T> {
    const id: number = ++this.idx;
    const layer = { ...props, id } as T;

    const layers = this.layers.getValue();
    this.layers.next([...layers, layer]);

    const instance = new NavbarLayerInstance(layer, this.buttonStream$, this.actionStream$);
    instance.onRelease$.subscribe(() => {
      this._removeLayer(id);
    });
    instance.onChanges$.subscribe((changes) => {
      this.updateNavbarLayer(id, changes);
    });

    return instance;
  }

  private updateNavbarLayer(id: number, changes: Partial<Omit<NavbarLayer, 'id'>>): void {
    const values = this.layers.getValue();
    const idx = values.findIndex((l) => l.id === id);

    if (idx < 0) {
      console.error('Layer not found.');
      return;
    }

    Object.assign(values[idx], changes);
    this.layers.next(values);
  }

  /**@private */
  private _removeLayer(id: number): void {
    const layers = this.layers.getValue();
    this.layers.next(layers.filter((e) => e.id !== id));
  }

  /**@private */
  public _buttonClicked(id: number): void {
    this.buttonStream.next({ id });
  }

  /**@private */
  public _actionClicked(id: number, action: string): void {
    this.actionStream.next({ id, action });
  }
}
