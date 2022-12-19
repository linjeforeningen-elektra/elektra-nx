import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { NavbarLayer, NavbarLayerInstance } from '@elektra-nx/web/shared/utils';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class WebNavbarService {
  private idx = 1;

  private layers: BehaviorSubject<NavbarLayer[]> = new BehaviorSubject(<NavbarLayer[]>[]);
  public readonly layers$ = this.layers.asObservable();

  private buttonStream: Subject<Pick<NavbarLayer, 'id'>> = new Subject();
  public readonly buttonStream$ = this.buttonStream.asObservable();

  private actionStream: Subject<Pick<NavbarLayer, 'id'> & { action: string }> = new Subject();
  private readonly actionStream$ = this.actionStream.asObservable();

  public latestProp$<T extends keyof NavbarLayer>(
    prop: T,
  ): Observable<{ id: string; value: NavbarLayer[T] } | undefined> {
    return this.layers$.pipe(
      map((layers) => {
        const found = layers
          .reverse()
          .filter((l) => !l.hidden)
          .find((layer) => layer[prop] !== undefined);

        if (!found) return undefined;

        const id = found.id;
        const value: NavbarLayer[T] = found[prop];
        return { id, value };
      }),
    );
  }

  public registerNavbarLayer<T extends NavbarLayer>(
    props: Omit<T, 'id' | 'idx'>,
    idx?: number,
  ): NavbarLayerInstance<T> {
    const id = uuid.v4();
    const layers = this.layers.getValue();
    const layer = { ...props, id } as T;

    if (idx !== undefined) {
      layers.splice(idx, 0, layer);
    } else {
      layers.push(layer);
    }

    this.layers.next(layers);

    const instance = new NavbarLayerInstance(layer, this.buttonStream$, this.actionStream$);
    instance.onRelease$.subscribe(() => {
      this._removeLayer(id);
    });
    instance.onChanges$.subscribe((changes) => {
      this.updateNavbarLayer(id, changes);
    });

    return instance;
  }

  private updateNavbarLayer(id: string, changes: Partial<Omit<NavbarLayer, 'id'>>): void {
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
  private _removeLayer(id: string): void {
    const layers = this.layers.getValue();
    this.layers.next(layers.filter((e) => e.id !== id));
  }

  /**@private */
  public _buttonClicked(id: string): void {
    this.buttonStream.next({ id });
  }

  /**@private */
  public _actionClicked(id: string, action: string): void {
    this.actionStream.next({ id, action });
  }
}
