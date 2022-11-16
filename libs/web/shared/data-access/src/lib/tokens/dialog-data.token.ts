import { InjectionToken } from '@angular/core';

export type DialogDataToken = {
  type: 'alert';
  data: {
    title: string;
    body: string;
  };
};

export const DialogDataToken = new InjectionToken<DialogDataToken>('elektra-nx.DIALOG_DATA_TOKEN');
