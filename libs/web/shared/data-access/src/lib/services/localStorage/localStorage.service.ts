import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WebLocalStorageService {
  constructor(@Inject(PLATFORM_ID) private id: string) {}

  private readonly isBrowser = isPlatformBrowser(this.id);

  public getItem(path: string) {
    return this.isBrowser ? localStorage.getItem(path) : null;
  }

  public setItem(path: string, value: string) {
    return this.isBrowser ? localStorage.setItem(path, value) : null;
  }

  public removeItem(path: string) {
    return this.isBrowser ? localStorage.removeItem(path) : null;
  }
}
