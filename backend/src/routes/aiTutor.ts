import express from 'express';
import { auth } from '../middleware/auth';
import {
  getAllSessions,
  startSession,
  sendMessage,
  getSessionHistory,
  endSession
} from '../controllers/aiTutor';

const router = express.Router();

// Protected routes
router.use(auth);

// AI Tutor routes
router.get('/session', getAllSessions);
router.post('/session', startSession);
router.post('/session/:sessionId/message', sendMessage);
router.get('/session/:sessionId', getSessionHistory);
router.delete('/session/:sessionId', endSession);

export default router; 