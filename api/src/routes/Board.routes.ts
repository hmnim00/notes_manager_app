import { Router } from "express";
import { BoardController } from "../controller/Board.controller";
import { checkJwt } from "../libs/Auth";
import { checkRole } from "../libs/Role";

const router: Router = Router();

router.post(
  "/create",
  [checkJwt, checkRole(["admin", "moderator"])],
  BoardController.createBoard
);
router.put(
  "/edit/:id",
  [checkJwt, checkRole(["admin", "moderator"])],
  BoardController.editBoard
);
router.get("/", [checkJwt], BoardController.getBoards);
router.get("/:slug", [checkJwt], BoardController.getBoard);
router.delete(
  "/delete/:id",
  [checkJwt, checkRole(["admin", "moderator"])],
  BoardController.deleteBoard
);

export default router;
