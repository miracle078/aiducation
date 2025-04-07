import { Router } from 'express';
import authRoutes from './auth';
import studyRoutes from './study';
import aiTutorRoutes from './aiTutor';
import essayRoutes from './essay';
import analyticsRoutes from './analytics';

const router = Router();

router.use('/auth', authRoutes);
router.use('/study', studyRoutes);
router.use('/ai-tutor', aiTutorRoutes);
router.use('/essay', essayRoutes);
router.use('/analytics', analyticsRoutes);

export const routes = router; 