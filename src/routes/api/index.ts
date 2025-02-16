import { Router } from 'express';
const router = Router();
import usersRoutes from './routes/usersRoutes.js';
import thoughtsRoutes from './routes/thoughtsRoutes.js';

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);

export default router;
