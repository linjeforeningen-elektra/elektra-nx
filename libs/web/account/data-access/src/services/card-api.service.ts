import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardModel, CreateCardModel } from '@elektra-nx/shared/models';

@Injectable()
export class CardApiService {
  constructor(private http: HttpClient) {}

  getCard(id: string) {
    return this.http.get<CardModel>(`/user/${id}/card`);
  }

  createCard(id: string, data: CreateCardModel) {
    return this.http.post<CardModel>(`/user/${id}/card`, data);
  }

  removeCard(id: string) {
    return this.http.delete<void>(`/user/${id}/card`);
  }
}
