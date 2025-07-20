import { Router } from 'express';
import readerRoute from './reader.route';
import bookRoute from './book.route'
import fileUploadRoute from './file.upload.route'
import lendingRoute from './lending.route';

const router = Router();

router.use('/readers', readerRoute);
router.use("/books", bookRoute);
router.use("/files", fileUploadRoute);
router.use('/lendings', lendingRoute);

export default router;
