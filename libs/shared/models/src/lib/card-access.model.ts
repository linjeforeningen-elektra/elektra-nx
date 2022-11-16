export interface CardAccessModel {
  expiration: Date;
  sent: boolean;
}

export interface CreateCardAccessModel {
  expiration: Date;
  sent?: boolean;
}

export interface UpdateCardAccessModel {
  expiration?: Date;
  sent?: boolean;
}
