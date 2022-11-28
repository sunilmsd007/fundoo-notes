import express from "express";
import { userAuth } from "../middlewares/auth.middleware";
import { notesUpdateValidator, notesValidator } from "../validators/notes.validator";
import * as notesController from '../controllers/notes.controller';
import { checkRedis } from "../middlewares/redis.middleware";

const router = express.Router();

//to create new note
router.post('',notesValidator,userAuth,notesController.createNotes);

//to get all notes
router.get('',userAuth,checkRedis,notesController.getAllNotes);

//to get notes by id
router.get('/:_id', userAuth, notesController.getNotesById);

//to update notes by id
router.put('/:_id',notesUpdateValidator, userAuth, notesController.updateNotesById);

//to update notes by id
router.delete('/:_id', userAuth, notesController.deleteNotesById);

//to make notes archived
router.put('/:_id/isArchive', userAuth, notesController.archiveNote);

//to trash notes 
router.put('/:_id/isTrash', userAuth, notesController.trashNote);

export default router;