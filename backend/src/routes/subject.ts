import express from 'express';
import {
  getSubjects,
  getSubjectById,
  getTopicsBySubject,
  getTopicById
} from '../controllers/subject';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getSubjects);
router.get('/:id', getSubjectById);
router.get('/:id/topics', getTopicsBySubject);
router.get('/:id/topics/:topicId', getTopicById);

export const subjectRoutes = router; 