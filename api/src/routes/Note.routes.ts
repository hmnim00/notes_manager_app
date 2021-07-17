import { Router } from "express";
import { NoteController } from "../controller/Note.controller";
import { checkJwt } from "../libs/Auth";

const router: Router = Router();

router.post("/create", checkJwt, NoteController.createNote);
router.put("/edit/:id", checkJwt, NoteController.editNote);
router.get("/", checkJwt, NoteController.getNotes);
router.get("/:id", checkJwt, NoteController.getNote);
router.delete("/delete/:id", checkJwt, NoteController.deleteNote);

export default router;
