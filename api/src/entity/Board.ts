import { IsNotEmpty } from "class-validator";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  Unique,
} from "typeorm";
import slugify from "slugify";
import { User } from "./User";
import { Note } from "./Note";

@Entity()
@Unique(["boardSlug"])
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column({ type: "varchar", default: "bg-light" })
  colour: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created: Timestamp;

  @Column()
  boardSlug: string;

  // set slug
  generateSlug(): void {
    this.boardSlug = slugify(this.title, { lower: true, strict: true });
  }

  // user's boards
  @ManyToOne(() => User, (user) => user.boards)
  user: User;

  // notes
  @OneToMany(() => Note, (note) => note.board, { onDelete: "CASCADE" })
  notes: Note[];
}
