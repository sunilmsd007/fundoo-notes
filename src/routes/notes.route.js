import express from "express";
import { userAuth } from "../middlewares/auth.middleware";
import { notesValidator } from "../validators/notes.validator";
import * as notesController from '../controllers/notes.controller';

const router = express.Router();

//to create new note
router.post('',notesValidator,userAuth,notesController.createNotes);

//to get all notes
router.get('',userAuth,notesController.getAllNotes);

export default router;