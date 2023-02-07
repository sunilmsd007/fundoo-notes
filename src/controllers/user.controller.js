import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import logger from '../config/logger';

/**
 * Controller to register a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const register = async (req, res, next) => {
  try {
    const data = await UserService.register(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
    logger.info("User created successfully ")
  } catch (error) {
    logger.error(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: "user login successfully "
    });
    logger.info("user login successfully ")
  } catch (error) {
    logger.error(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
}

/**
 * Controller for forgotPassword
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgotPassword(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: "link to reset password sent to your email "
    });
    logger.info("ink to reset password sent to your email ")
  } catch (error) {
    logger.error(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
}

/**
 * Controller to resetPassword
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const resetPassword = async (req, res, next) => {
  try {
    const data = await UserService.resetPassword(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: "password updated successfully"
    });
    logger.info("password updated successfully")
  } catch (error) {
    logger.error(error)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
}