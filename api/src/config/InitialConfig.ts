import { getRepository } from "typeorm";
import { Board } from "../entity/Board";
import { User } from "../entity/User";

export const initialSetup = async () => {
  const query = getRepository(User);
  const queryBoard = getRepository(Board);

  const adminExists = await query.find();
  const boardExists = await queryBoard.find();

  const admin = new User();
  const board = new Board();

  if (adminExists.length > 0) return;
  else {
    admin.username = "admin";
    admin.email = "admin@example.com";
    admin.password = "admin123456";
    admin.role = "admin";

    // save new user
    try {
      admin.encryptPassword();
      await query.save(admin);
    } catch (error) {
      console.log(error);
    }

    console.log("Admin has been created");
  }

  if (boardExists.length > 0) return;
  else {
    board.title = "General board";
    board.description = "Space for loose notes";
    board.user = admin;

    // save new board
    try {
      board.generateSlug();
      await queryBoard.save(board);
    } catch (error) {
      console.log(error);
    }

    console.log("Board has been created");
  }
};
