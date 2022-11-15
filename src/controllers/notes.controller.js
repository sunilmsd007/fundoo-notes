import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/notes.service';

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
    } catch (error) {
      next(error);
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
      const data = await NoteService.getAllNotes();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All notes fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };