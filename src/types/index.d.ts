export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
}

export interface Contact {
  id: number;
  name: string;
  number: string;
  userId: User['id'];
}
