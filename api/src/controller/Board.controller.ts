import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Board } from "../entity/Board";

export class BoardController {
  static createBoard = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const query = getRepository(Board);
    const { title, description, colour } = req.body;
    const { userId } = res.locals.jwtPayload;

    const board = new Board();
    board.title = title;
    board.description = description;
    board.colour = colour;
    board.user = userId;

    // validate
    const errors = await validate(board, {
      validationError: { target: false, value: false },
    });
    if (errors.length > 0) return res.status(400).json(errors);

    // save to db
    try {
      board.generateSlug();
      await query.save(board);

      return res.status(200).json({ message: "Board created", board });
    } catch (error) {
      return res
        .status(404)
        .json({ message: "A board with the same name already exists" });
    }
  };

  static editBoard = async (req: Request, res: Response): Promise<Response> => {
    const query = getRepository(Board);
    const { title, description, colour } = req.body;
    const { id } = req.params;
    const { userId } = res.locals.jwtPayload;
    let board: Board;

    // find board
    try {
      board = await query.findOneOrFail(id, { relations: ["user"] });
      console.log("board user id: ", board.user.id);
      // compare user
      if (board.user.id == userId) {
        board.title = title;
        board.description = description;
        board.colour = colour;

        // validate
        const errors = await validate(board, {
          validationError: { target: false, value: false },
        });
        if (errors.length > 0) return res.status(400).json(errors);
      } else {
        return res
          .status(401)
          .json({ message: "Only the owner can edit this board" });
      }
    } catch (error) {
      console.log("Error => ", error);
      return res.status(404).json({ message: "Board not found" });
    }

    // update board
    try {
      board.generateSlug();
      await query.save(board);

      return res.status(200).json({ message: "Board updated", board });
    } catch (error) {
      return res
        .status(409)
        .json({ message: "A board with the same title already exists" });
    }
  };

  static getBoards = async (req: Request, res: Response): Promise<Response> => {
    const query = getRepository(Board);
    // get results
    try {
      const boards = await await query.find({ relations: ["user", "notes"] });
      return res.status(200).json(boards);
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  static getBoard = async (req: Request, res: Response): Promise<Response> => {
    const query = getRepository(Board);
    const { slug } = req.params;

    // get result
    try {
      const board = await query.findOneOrFail({
        where: { boardSlug: slug },
        relations: ["notes", "user"],
      });
      return res.status(200).json(board);
    } catch (error) {
      console.log("board error: ", error);
      return res.status(404).json({ message: "Board not found" });
    }
  };

  static getBoardId = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const query = getRepository(Board);
    const { id } = req.params;

    // get result
    try {
      const board = await query.findOneOrFail(id, {
        relations: ["notes", "user"],
      });
      return res.status(200).json(board);
    } catch (error) {
      console.log("board error: ", error);
      return res.status(404).json({ message: "Board not found" });
    }
  };

  static deleteBoard = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const query = getRepository(Board);
    const { id } = req.params;
    const { userId } = res.locals.jwtPayload;

    // find board
    try {
      const board = await query.findOneOrFail(id, { relations: ["user"] });
      // validate owner
      if (board.user.id != userId)
        return res
          .status(401)
          .json({ message: "Only the owner can delete this board" });
      else {
        await query.delete(id);
        return res.status(200).json({
          message: "The board and its notes have been deleted from db",
        });
      }
    } catch (error) {
      return res.status(404).json({ message: "Board not found" });
    }
  };

  static getMyBoards = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const query = getRepository(Board);
    const { userId } = res.locals.jwtPayload;

    // get results
    try {
      const boards = await query.find({ where: { user: userId } });
      return res.status(200).json(boards);
    } catch (error) {
      return res.status(404).json({ message: "User has no boards" });
    }
  };
}
