import { Router } from 'express';
import readerRoute from './reader.route';
import bookRoute from './book.route'

const router = Router();

router.use('/readers', readerRoute);
router.use("/books", bookRoute);

export default router;
