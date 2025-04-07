import express from 'express';
import { auth } from '../middleware/auth';
import {
  saveEssay,
  getEssays,
  getEssayAnalysis,
  deleteEssay,
} from '../controllers/essay';

const router = express.Router();

// Protected routes
router.use(auth);

router.post('/', saveEssay);
router.get('/', getEssays);
router.get('/:essayId/analysis', getEssayAnalysis);
router.delete('/:essayId', deleteEssay);

// Placeholder routes
router.post('/analyze', (req, res) => {
  res.json({ message: 'Essay analysis endpoint' });
});

router.get('/history', (req, res) => {
  res.json({ message: 'Essay history endpoint' });
});

export default router; 