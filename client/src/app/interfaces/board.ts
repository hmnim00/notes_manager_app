import { Note } from './note';
import { User } from './user';

export interface Board {
  id?: number;
  title: string;
  description: string;
  boardSlug?: string;
  colour: string;
  notes?: Note;
  user?: User;
}
