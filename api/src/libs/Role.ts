import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const query = getRepository(User);
    const { userId } = res.locals.jwtPayload;
    let user: User;

    try {
      user = await query.findOneOrFail(userId);
    } catch (error) {
      return res.status(401).json({ message: "Authorization is required" });
    }

    const { role } = user;

    if (roles.includes(role)) {
      next();
    } else {
      return res.status(401).json({ message: "Authorization is required" });
    }
  };
};
