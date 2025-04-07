import express from 'express';
import { auth } from '../middleware/auth';
import {
  getStudyAnalytics,
  getEssayAnalytics,
  getTutorAnalytics,
  getOverallAnalytics,
  getProgressAnalytics,
  getLearningStyleAnalytics
} from '../controllers/analytics';

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// Study analytics
router.get('/study', getStudyAnalytics);

// Essay analytics
router.get('/essay', getEssayAnalytics);

// Tutor analytics
router.get('/tutor', getTutorAnalytics);

// Overall analytics
router.get('/overall', getOverallAnalytics);

// Progress analytics
router.get('/progress', getProgressAnalytics);

// Learning style analytics
router.get('/learning-style', getLearningStyleAnalytics);

export default router; 