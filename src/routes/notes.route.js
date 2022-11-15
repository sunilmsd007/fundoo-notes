import express from "express";
import { userAuth } from "../middlewares/auth.middleware";
import { notesValidator } from "../validators/notes.validator";
import * as notesController from '../controllers/notes.controller';

const router = express.Router();

//to create new note
router.post('',notesValidator,userAuth,notesController.createNotes);

export default router;