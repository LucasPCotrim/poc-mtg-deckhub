import { Router } from 'express';
import usersRouter from './usersRouter.js';
import cardsRouter from './cardsRouter.js';
import decksRouter from './decksRouter.js';
import authRouter from './authRouter.js';

const router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(cardsRouter);
router.use(decksRouter);

export default router;
