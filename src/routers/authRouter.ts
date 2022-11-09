import express from 'express';
import signUpSchema from '../schemas/signUpSchema.js';
import loginSchema from '../schemas/loginSchema.js';
import validateSchema from './../middlewares/validateSchema.js';
import { signUp, logIn } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/sign-up', validateSchema(signUpSchema), signUp);
authRouter.post('/login', validateSchema(loginSchema), logIn);

export default authRouter;
