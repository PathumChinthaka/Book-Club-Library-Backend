import { Router } from 'express';
import { lendBook, returnBook, getLendingList } from '../controllers/lending.controller';

const router = Router();

router.post('/', lendBook); 
router.put('/return/:lendingId', returnBook); 
router.get('/', getLendingList); 

export default router;
