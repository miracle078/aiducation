import { Router } from 'express';
import { auth } from '../middleware/auth';
import {
  getStudyProgress,
  updateStudyProgress,
  getStudyMaterials,
  saveStudySession
} from '../controllers/study';

const router = Router();

// Protected routes
router.use(auth);

// Study routes
router.get('/progress', getStudyProgress);
router.post('/progress', updateStudyProgress);
router.get('/materials/:subjectId?/:topicId?', getStudyMaterials);
router.post('/session', saveStudySession);

export default router; 