import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardAccessStatus } from '@elektra-nx/shared/models';

@Injectable()
export class CardAccessApiService {
  constructor(private http: HttpClient) {}

  readCardAccessStatus(id: string) {
    // liten hack
    return this.http.get<CardAccessStatus>(`/user/${id}/card/access/status`, { responseType: 'text' as 'json' });
  }

  renewCardAccess(id: string) {
    return this.http.post<CardAccessStatus>(`/user/${id}/card/access/renew`, {}, { responseType: 'text' as 'json' });
  }
}
