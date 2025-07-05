import { Router } from 'express';
import { createLog, getLogs } from '../controllers/logController';

const router = Router();

router.get('/', getLogs);
router.post('/', createLog);

export default router;