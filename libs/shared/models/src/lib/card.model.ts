export interface CardModel {
  id: string;
  student_number: string;
  userId: string;
}

export interface CreateCardModel {
  student_number: string;
}

export interface UpdateCardModel {
  student_number: string;
}
