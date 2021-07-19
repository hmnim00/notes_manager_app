import { Board } from './board';
import { Note } from './note';

export type Roles = 'admin' | 'moderator' | 'user';

export interface User {
  username: string;
  password: string;
}

export interface NewUser {
  username: string;
  email: string;
  password: string;
}

export interface UserResponse {
  message: string;
  token: string;
  userId: string;
  username: string;
  role: Roles;
}

export interface UserForAdmin {
  username: string;
  email: string;
  role: Roles;
  boards?: Board[];
  notes?: Note[];
}
