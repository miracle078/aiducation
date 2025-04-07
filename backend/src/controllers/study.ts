import { Request, Response } from 'express';
import { User } from '../models/User';
import { StudyMaterial } from '../models/StudyMaterial';
import { StudyProgress } from '../models/StudyProgress';
import { AuthRequest } from '../types';

export const getStudyProgress = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const progress = await StudyProgress.find({ userId }).sort({ lastAttempt: -1 });
    res.json(progress);
  } catch (error) {
    console.error('Error fetching study progress:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateStudyProgress = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { subject, topic, score, timeSpent } = req.body;
    const progress = await StudyProgress.findOneAndUpdate(
      { userId, subject, topic },
      {
        $inc: { attempts: 1 },
        $set: {
          score,
          timeSpent,
          lastAttempt: new Date()
        }
      },
      { upsert: true, new: true }
    );

    res.json(progress);
  } catch (error) {
    console.error('Error updating study progress:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getStudyMaterials = async (req: AuthRequest, res: Response) => {
  try {
    const { subjectId, topicId } = req.params;
    const query: any = {};
    
    // Only add to query if parameter is not 'all'
    if (subjectId && subjectId.trim() !== 'all') {
      query.subject = subjectId.trim();
    }
    if (topicId && topicId.trim() !== 'all') {
      query.topic = topicId.trim();
    }

    const materials = await StudyMaterial.find(query).sort({ difficulty: 1 });
    res.json(materials);
  } catch (error) {
    console.error('Error fetching study materials:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const saveStudySession = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { subject, topic, duration, notes } = req.body;
    const session = new StudyProgress({
      userId,
      subject,
      topic,
      timeSpent: duration,
      score: 0,
      attempts: 1,
      lastAttempt: new Date()
    });

    await session.save();
    res.json(session);
  } catch (error) {
    console.error('Error saving study session:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 