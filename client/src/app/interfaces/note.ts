import { Board } from './board';
import { User } from './user';

export interface Note {
  id?: number;
  title: string;
  content: string;
  colour: string;
  board?: Board;
  user?: User;
}
