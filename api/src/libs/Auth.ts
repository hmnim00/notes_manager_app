import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["auth"];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, `${process.env.SECRET_KEY}`);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    return res.status(401).json({ message: "Authorization is required" });
  }

  const { userId, username } = jwtPayload;

  const newToken = jwt.sign({ userId, username }, `${process.env.SECRET_KEY}`, {
    expiresIn: "1h",
  });

  res.setHeader("token", newToken);

  next();
};
