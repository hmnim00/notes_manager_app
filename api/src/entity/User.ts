import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import bcrypt from "bcryptjs";
import { Board } from "./Board";
import { Note } from "./Note";

@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MinLength(5)
  username: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @Column({ type: "varchar", default: "user" })
  role: string;

  encryptPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  matchPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  // board
  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  // notes
  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}
