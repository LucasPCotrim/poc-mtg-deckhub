import express from 'express';
import signUpSchema from '../schemas/signUpSchema.js';
import validateSchema from './../middlewares/validateSchema.js';
import { signUp } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/sign-up', validateSchema(signUpSchema), signUp);

export default authRouter;
