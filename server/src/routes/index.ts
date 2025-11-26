import { Router } from 'express';
import authRoutes from './auth';
import projectsRoutes from './projects';
import healthRoutes from './health';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectsRoutes);
router.use('/health', healthRoutes);

export default router;
