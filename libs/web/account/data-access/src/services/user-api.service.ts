import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UpdateUserModel, UserModel } from '@elektra-nx/shared/models';

@Injectable()
export class UserApiService {
  constructor(private http: HttpClient) {}

  getUser(id: string) {
    return this.http.get<UserModel>(`/user/${id}`);
  }

  updateUser(id: string, body: UpdateUserModel) {
    return this.http.patch<UserModel>(`/user/${id}`, body);
  }
}
