import express from 'express';
import * as userController from '../controllers/user.controller';
import { registrationValidator } from '../validators/user.validator';
import { userAuthforResetpwd } from '../middlewares/auth.middleware';


const router = express.Router();

//route to create a new user
router.post('/register', registrationValidator, userController.register);

//route to login a single user
router.post('/login', userController.login);

//route to forgot password
router.post('/forgotpwd', userController.forgotPassword);

//route to reset password
router.post('/resetpwd',userAuthforResetpwd, userController.resetPassword);

export default router;
