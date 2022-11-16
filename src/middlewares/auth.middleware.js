import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    console.log("bearer token before split--------",bearerToken);
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
      
    bearerToken = bearerToken.split(' ')[1];
    console.log("bearer token after split--------",bearerToken);
    const { user } = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
        message: `${error}`
    })
    next(error);
  }
};
