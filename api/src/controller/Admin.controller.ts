import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { validate } from "class-validator";
import { Board } from "../entity/Board";
import { Note } from "../entity/Note";

export class AdminController {
  // users

  static getUsers = async (req: Request, res: Response): Promise<Response> => {
    const query = getRepository(User);
    // get results
    try {
      const users = await query.find({ relations: ["boards", "notes"] });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  static getUser = async (req: Request, res: Response): Promise<Response> => {
    const query = getRepository(User);
    const { id } = req.params;

    // find user
    try {
      const user = await query.findOneOrFail(id, {
        relations: ["boards", "notes"],
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ message: "User not found" });
    }
  };

  static deleteUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const query = getRepository(User);
    const { id } = req.params;

    // find user
    try {
      await query.findOneOrFail(id);
      // delete
      await query.delete(id);
      return res.status(200).json({
        message:
          "User deleted and content related to this user also has been deleted",
      });
    } catch (error) {
      return res.status(404).json({ message: "User not found" });
    }
  };

  static editUser = async (req: Request, res: Response): Promise<Response> => {
    const query = getRepository(User);
    const { username, email, role, password } = req.body;
    const { id } = req.params;
    let user: User;

    // find user
    try {
      user = await query.findOneOrFail(id);
      user.username = username;
      user.email = email;
      user.password = password;
      user.role = role;

      // validate
      const errors = await validate(user, {
        validationError: { target: false, value: false },
      });
      if (errors.length > 0) return res.status(400).json(errors);
    } catch (error) {
      return res.status(404).json({ message: "User not found" });
    }

    // update user
    try {
      user.encryptPassword();
      await query.save(user);
      return res.status(200).json({ message: "User updated", user });
    } catch (error) {
      return res.status(409).json({ message: "Username is already in taken" });
    }
  };

  // boards

  static deleteBoard = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const query = getRepository(Board);
    const { id } = req.params;

    // find board
    try {
      await query.findOneOrFail(id);

      // delete
      await query.delete(id);
      return res
        .status(200)
        .json({ message: "Board has been deleted by admin" });
    } catch (error) {
      return res.status(404).json({ message: "Board not found" });
    }
  };

  // notes

  static deleteNote = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const query = getRepository(Note);
    const { id } = req.params;

    // find note
    try {
      await query.findOneOrFail(id);

      // delete
      await query.delete(id);
      return res.status(200).json({ message: "Note deleted by admin" });
    } catch (error) {
      return res.status(404).json({ message: "Note not found" });
    }
  };
}
