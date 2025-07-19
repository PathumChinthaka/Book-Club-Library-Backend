import { Router } from 'express';
import authRoute from './auth.route';
import readerRoute from './reader.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/readers', readerRoute);

export default router;
