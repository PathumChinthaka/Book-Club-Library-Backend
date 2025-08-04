import { Router } from 'express';
import readerRoute from './reader.route';
import bookRoute from './book.route'
import fileUploadRoute from './file.upload.route'
import lendingRoute from './lending.route';
import userRoute from "./user.router"

const router = Router();

router.use('/readers', readerRoute);
router.use("/books", bookRoute);
router.use("/files", fileUploadRoute);
router.use('/lendings', lendingRoute);
router.use('/users', userRoute);

export default router;
