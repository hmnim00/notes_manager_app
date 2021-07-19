import { IsNotEmpty, MinLength } from "class-validator";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  Unique,
} from "typeorm";
import { User } from "./User";
import { Board } from "./Board";

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MinLength(4)
  title: string;

  @Column()
  @IsNotEmpty()
  content: string;

  @Column({ type: "varchar", default: "bg-light" })
  colour: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created: Timestamp;

  // user's notes
  @ManyToOne(() => User, (user) => user.notes)
  user: User;

  // notes
  @ManyToOne(() => Board, (board) => board.notes)
  board: Board;
}
