import { Router } from 'express';
const router = Router();
import usersRoutes from '../api/usersRoutes.js';
import thoughtsRoutes from '../api/thoughtsRoutes.js';
router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);
export default router;
