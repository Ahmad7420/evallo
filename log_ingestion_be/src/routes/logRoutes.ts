import { Router } from 'express';
import { createLog, getLogs } from '../controllers/logController';
import { validateLogInput } from '../middleware/validateLog';

const router = Router();

router.get('/', getLogs);
router.post('/', validateLogInput, createLog);


export default router;