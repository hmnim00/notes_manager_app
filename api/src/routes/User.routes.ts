import { Router } from "express";
import { UserController } from "../controller/User.controller";
import { checkJwt } from "../libs/Auth";

const router: Router = Router();

router.post("/signup", UserController.signup);
router.post("/signin", UserController.signin);
router.put("/edit/:id", checkJwt, UserController.editUser);
router.delete("/delete/:id", checkJwt, UserController.deleteAccount);

export default router;
