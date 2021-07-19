import { Router } from "express";
import { BoardController } from "../controller/Board.controller";
import { checkJwt } from "../libs/Auth";

const router: Router = Router();

router.post("/create", [checkJwt], BoardController.createBoard);
router.put("/edit/:id", [checkJwt], BoardController.editBoard);
router.get("/all", [checkJwt], BoardController.getBoards);
router.get("/detail/:slug", [checkJwt], BoardController.getBoard);
router.get("/code/:id", [checkJwt], BoardController.getBoardId);
router.get("/my-boards", [checkJwt], BoardController.getMyBoards);
router.delete("/delete/:id", [checkJwt], BoardController.deleteBoard);

export default router;
