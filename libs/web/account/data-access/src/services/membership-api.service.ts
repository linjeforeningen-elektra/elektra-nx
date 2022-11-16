import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateMembershipModel, MembershipModel, UpdateMembershipModel } from '@elektra-nx/shared/models';

@Injectable()
export class MembershipApiService {
  constructor(private http: HttpClient) {}

  getMembership(id: string) {
    return this.http.get<MembershipModel>(`/user/${id}/membership`);
  }

  createMembership(id: string, body: CreateMembershipModel) {
    return this.http.post<MembershipModel>(`/user/${id}/membership`, body);
  }

  updateMembership(id: string, body: UpdateMembershipModel) {
    return this.http.patch<MembershipModel>(`/user/${id}/membership`, body);
  }
}
