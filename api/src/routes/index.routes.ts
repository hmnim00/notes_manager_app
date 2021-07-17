import { Router } from "express";
import AdminRoutes from "./Admin.routes";
import BoardRoutes from "./Board.routes";
import NoteRoutes from "./Note.routes";
import UserRoutes from "./User.routes";

const router: Router = Router();

router.use("/admin", AdminRoutes);
router.use("/boards", BoardRoutes);
router.use("/notes", NoteRoutes);
router.use("/users", UserRoutes);

export default router;
