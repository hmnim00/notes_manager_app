import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";

export class UserController {
  static signup = async (req: Request, res: Response): Promise<Response> => {
    const query = getRepository(User);
    const { username, email, password } = req.body;

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    // validate
    const errors = await validate(user, {
      validationError: { target: false, value: false },
    });
    if (errors.length > 0) return res.status(400).json(errors);

    // save to db
    try {
      // encrypt password
      user.encryptPassword();
      await query.save(user);

      // set token
      const token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role },
        `${process.env.SECRET_KEY}`,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "ok",
        token,
        userId: user.id,
        username: user.username,
        role: user.role,
      });
    } catch (error) {
      return res.status(409).json({ message: "Username is already taken" });
    }
  };

  static signin = async (req: Request, res: Response): Promise<Response> => {
    const query = getRepository(User);
    const { username, password } = req.body;
    let user: User;

    // verify null spaces

    try {
      // verify if user exists
      user = await query.findOneOrFail({ where: { username } });

      if (!user.matchPassword(password))
        return res
          .status(404)
          .json({ message: "User or password are invalid" });

      // add token
      const token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role },
        `${process.env.SECRET_KEY}`,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Ok",
        token,
        userId: user.id,
        username: user.username,
        role: user.role,
      });
    } catch (error) {
      return res.status(404).json({ message: "User not found" });
    }
  };

  static editUser = async (req: Request, res: Response): Promise<Response> => {
    const query = getRepository(User);
    const { username, email, password } = req.body;
    const { id } = req.params;
    const { userId } = res.locals.jwtPayload;
    let user: User;

    // find user
    try {
      user = await query.findOneOrFail(id);

      // compare current user
      if (user.id != userId)
        return res
          .status(401)
          .json({ message: "Only the owner can edit this account" });
      else {
        user.username = username;
        user.email = email;
        user.password = password;

        // validate
        const errors = await validate(user, {
          validationError: { target: false, value: false },
        });
        if (errors.length > 0) return res.status(400).json(errors);
      }
    } catch (error) {
      return res.status(404).json({ message: "User not found" });
    }

    // update user
    try {
      user.encryptPassword();
      await query.save(user);
      return res.status(200).json({ message: "User updated", user });
    } catch (error) {
      return res.status(409).json({ message: "Username is already taken" });
    }
  };

  static deleteAccount = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const query = getRepository(User);
    const { id } = req.params;
    const { userId } = res.locals.jwtPayload;

    // find user
    try {
      const user = await query.findOneOrFail(id);

      // compare
      if (user.id == userId) {
        await query.delete(id);
        return res
          .status(200)
          .json({ message: "User has been deleted from database" });
      } else
        return res
          .status(401)
          .json({ message: "Only the owner can delete this account" });
    } catch (error) {
      return res.status(404).json({ message: "User not found" });
    }
  };
}
