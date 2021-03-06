import { validate } from "class-validator";
import { query, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Board } from "../entity/Board";
import { Note } from "../entity/Note";

export class NoteController {
  static createNote = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const query = getRepository(Note);
    const queryBoard = getRepository(Board);
    const { title, content, colour } = req.body;
    const { userId } = res.locals.jwtPayload;
    const { id } = req.params;
    let board: Board;

    // search board
    try {
      board = await queryBoard.findOneOrFail(id);

      const note = new Note();
      note.title = title;
      note.content = content;
      note.colour = colour;
      note.board = board;
      note.user = userId;

      // validate
      const errors = await validate(note, {
        validationError: { target: false, value: false },
      });
      if (errors.length > 0) return res.status(400).json(errors);

      // save to db
      try {
        await query.save(note);
        return res.status(200).json({ message: "Note added to db", note });
      } catch (error) {
        return res.status(400).json(error);
      }
    } catch (error) {
      return res.status(404).json({ message: "Board not found" });
    }
  };

  static editNote = async (req: Request, res: Response): Promise<Response> => {
    const query = getRepository(Note);
    const { title, content, colour, boardId } = req.body;
    const { id } = req.params;
    const { userId } = res.locals.jwtPayload;
    let note: Note;

    // find note
    try {
      note = await query.findOneOrFail(id, { relations: ["user"] });

      // validate owner
      if (note.user.id != userId) {
        return res
          .status(401)
          .json({ message: "Only the owner can edit this note" });
      } else {
        note.title = title;
        note.content = content;
        note.colour = colour;
        note.board = boardId;

        // validate
        const errors = await validate(note, {
          validationError: { target: false, value: false },
        });
        if (errors.length > 0) return res.status(400).json(errors);
      }
    } catch (error) {
      return res.status(404).json({ message: "Note not found" });
    }

    // update note
    try {
      await query.save(note);
      return res.status(200).json({ message: "Note updated", note });
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  static getNotes = async (req: Request, res: Response): Promise<Response> => {
    const query = getRepository(Note);
    // get results
    try {
      const notes = await query.find({ relations: ["board", "user"] });
      return res.status(200).json(notes);
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  static getNote = async (req: Request, res: Response): Promise<Response> => {
    const query = getRepository(Note);
    const { id } = req.params;

    // get result
    try {
      const note = await query.findOneOrFail(id, { relations: ["board"] });
      return res.status(200).json(note);
    } catch (error) {
      return res.status(404).json({ message: "Note not found" });
    }
  };

  static deleteNote = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const query = getRepository(Note);
    const { id } = req.params;
    const { userId } = res.locals.jwtPayload;

    // find note
    try {
      const note = await query.findOneOrFail(id, { relations: ["user"] });
      // validate user
      if (note.user.id == userId) {
        await query.delete(id);
        return res.status(200).json({ message: "Note deleted from database" });
      } else {
        return res
          .status(401)
          .json({ message: "Only the owner can delete this note" });
      }
    } catch (error) {
      return res.status(404).json({ message: "Note not found" });
    }
  };

  static getMyNotes = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const query = getRepository(Note);
    const { userId } = res.locals.jwtPayload;

    // get results
    try {
      const notes = await query.find({ where: { user: userId } });
      return res.status(200).json(notes);
    } catch (error) {
      return res.status(404).json({ message: "User has no notes" });
    }
  };

  static getNotesByBoard = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const queryBoard = await getRepository(Board);
    const queryNote = await getRepository(Note);
    const { id } = req.params;
    let board: Board;

    // find board
    try {
      board = await queryBoard.findOneOrFail(id);
    } catch (error) {
      return res.status(404).json({ message: "Board not found" });
    }

    // get results
    try {
      const notes = await queryNote.find({
        where: { board },
        relations: ["user"],
      });
      console.log("Response");
      return res.status(200).json(notes);
    } catch (error) {
      return res.status(400).json(error);
    }
  };
}
