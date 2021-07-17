import { Router } from "express";
import { AdminController } from "../controller/Admin.controller";
import { checkJwt } from "../libs/Auth";
import { checkRole } from "../libs/Role";

const router: Router = Router();

router.get(
  "/users",
  [checkJwt, checkRole(["admin"])],
  AdminController.getUsers
);
router.get(
  "/users/:id",
  [checkJwt, checkRole(["admin"])],
  AdminController.getUser
);
router.put(
  "/users/edit/:id",
  [checkJwt, checkRole(["admin"])],
  AdminController.editUser
);
router.delete(
  "/users/delete/:id",
  [checkJwt, checkRole(["admin"])],
  AdminController.deleteUser
);
router.delete(
  "/boards/delete/:id",
  [checkJwt, checkRole(["admin"])],
  AdminController.deleteBoard
);
router.delete(
  "/notes/delete/:id",
  [checkJwt, checkRole(["admin"])],
  AdminController.deleteNote
);

export default router;
