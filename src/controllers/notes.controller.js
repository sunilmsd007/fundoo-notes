import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/notes.service';
import logger from '../config/logger';

/**
 * Controller to create a new note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createNotes = async (req, res, next) => {
  try {
    const data = await NoteService.createNotes(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Notes created successfully'
    });
    logger.info("Notes created successfully")
  } catch (error) {
    logger.error(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
* Controller to get all notes available
* @param  {object} req - request object
* @param {object} res - response object
* @param {Function} next
*/
export const getAllNotes = async (req, res, next) => {
  try {
    const data = await NoteService.getAllNotes(req.body.userID);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'All notes fetched successfully'
    });
    logger.info("All notes fetched successfully")
  } catch (error) {
    logger.error(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
* Controller to get a note by id 
* @param  {object} req - request object
* @param {object} res - response object
* @param {Function} next
*/
export const getNotesById = async (req, res, next) => {
  try {
    const data = await NoteService.getNotesById(req.params._id, req.body.userID);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note fetched successfully'
    });
    logger.info("Note fetched successfully")
  } catch (error) {
    logger.error(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
* Controller to update a note
* @param  {object} req - request object
* @param {object} res - response object
* @param {Function} next
*/
export const updateNotesById = async (req, res, next) => {
  try {
    const data = await NoteService.updateNotesById(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note updated successfully'
    });
    logger.info("Note updated successfully")
  } catch (error) {
    logger.error(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
* Controller to delete a note
* @param  {object} req - request object
* @param {object} res - response object
* @param {Function} next
*/
export const deleteNotesById = async (req, res, next) => {
  try {
    await NoteService.deleteNotesById(req.params._id, req.body.userID);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Note deleted successfully'
    });
    logger.info("Note deleted successfully")
  } catch (error) {
    logger.error(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
* Controller to archive a note
* @param  {object} req - request object
* @param {object} res - response object
* @param {Function} next
*/
export const archiveNote = async (req, res, next) => {
  try {
    const data = await NoteService.archiveNote(req.params._id, req.body.userID);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note Archived successfully'
    });
    logger.info("Note Archived successfully")
  } catch (error) {
    logger.error(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
* Controller to trash a note
* @param  {object} req - request object
* @param {object} res - response object
* @param {Function} next
*/
export const trashNote = async (req, res, next) => {
  try {
    const data = await NoteService.trashNote(req.params._id, req.body.userID);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note trashed successfully'
    });
    logger.info("Note trashed successfully")
  } catch (error) {
    logger.error(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
* Controller to pin a note
* @param  {object} req - request object
* @param {object} res - response object
* @param {Function} next
*/
export const pinNote = async (req, res, next) => {
  try {
    const data = await NoteService.pinNote(req.params._id, req.body.userID);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note pinned successfully'
    });
    logger.info("Note pinned successfully")
  } catch (error) {
    logger.error(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

//collaborator
export const collabNote = async (req, res, next) => {
  try {
    const data = await NoteService.collabNote(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note collaborated successfully'
    });
    logger.info("Note collaborated successfully")
  } catch (error) {
    logger.error(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

//remove collaborator
export const removeCollabNote = async (req, res, next) => {
  try {
    const data = await NoteService.removeCollabNote(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note collaborator removed successfully'
    });
    logger.info("Note collaborator removed successfully")
  } catch (error) {
    logger.error(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};