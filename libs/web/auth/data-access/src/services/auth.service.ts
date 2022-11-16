import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginWithAuthLocalModel, RegisterWithAuthLocalModel } from '@elektra-nx/shared/models';

@Injectable({
  providedIn: 'root',
})
export class WebAuthService {
  constructor(private http: HttpClient) {}

  login(dto: LoginWithAuthLocalModel) {
    return this.http.post<{ access_token: string }>('/auth/local/login', dto);
  }

  register(body: RegisterWithAuthLocalModel) {
    return this.http.post<{ access_token: string }>('/auth/local/register', body);
  }
}
