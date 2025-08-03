import { Router } from 'express';
import { lendBook, returnBook, getLendingList, sendLendingReminder } from '../controllers/lending.controller';

const router = Router();

router.post('/', lendBook); 
router.put('/return/:lendingId', returnBook); 
router.get('/', getLendingList); 
router.post('/:lendingId/remind', sendLendingReminder); 

export default router;
