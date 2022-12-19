import { Subject } from 'rxjs';
import { NavbarLayer } from '../../interfaces';
import { NavbarLayerInstance } from './navbar-layer-instance.class';

describe('NavbarLayerInstance', () => {
  it('should release', () => {
    const buttonSubject = new Subject<{ id: number }>();
    const actionSubject = new Subject<{ id: number; action: string }>();

    const trigger = jest.fn();
    const layer: Partial<NavbarLayer> = { id: 1, title: 'test' };
    const instance = new NavbarLayerInstance(<NavbarLayer>layer, buttonSubject, actionSubject);

    instance.actionClicked$.subscribe({
      next: () => trigger(),
    });

    instance.buttonClicked$.subscribe({
      next: () => trigger(),
    });

    instance.release();
    expect(trigger).not.toHaveBeenCalled();
  });

  it('should emit on buttonclick', (done) => {
    const buttonSubject = new Subject<{ id: number }>();
    const actionSubject = new Subject<{ id: number; action: string }>();

    const trigger = jest.fn();
    const layer: Partial<NavbarLayer> = { id: 1, title: 'test' };
    const instance = new NavbarLayerInstance(<NavbarLayer>layer, buttonSubject, actionSubject);

    instance.buttonClicked$.subscribe({
      next: () => trigger(),
      complete: () => done(),
    });

    buttonSubject.next({ id: 2 });
    buttonSubject.next({ id: 1 });

    instance.release();

    expect(trigger).toHaveBeenCalledTimes(1);
  });

  it('should emit actionclick', (done) => {
    const buttonSubject = new Subject<{ id: number }>();
    const actionSubject = new Subject<{ id: number; action: string }>();

    const trigger = jest.fn();
    const layer: Partial<NavbarLayer> = { id: 1, title: 'test' };
    const instance = new NavbarLayerInstance(<NavbarLayer>layer, buttonSubject, actionSubject);

    instance.actionClicked$.subscribe({
      next: (v) => trigger(v),
      complete: () => done(),
    });

    actionSubject.next({ id: 1, action: 'action1' });
    actionSubject.next({ id: 2, action: 'action2' });
    actionSubject.next({ id: 1, action: 'action3' });

    instance.release();

    expect(trigger).toHaveBeenNthCalledWith(1, 'action1');
    expect(trigger).toHaveBeenNthCalledWith(2, 'action3');
  });
});
