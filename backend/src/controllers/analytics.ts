import { Request, Response } from 'express';
import { User } from '../models/User';
import { LearningAnalytics } from '../models/LearningAnalytics';
import { StudyProgress } from '../models/StudyProgress';
import { Essay } from '../models/Essay';
import { TutorSession } from '../models/TutorSession';
import { AuthRequest } from '../types';
import { StudySession } from '../models/StudySession';

export const getStudyAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const sessions = await StudySession.find({ user: userId });
    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEssayAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const essays = await Essay.find({ user: userId });
    res.json(essays);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTutorAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const sessions = await TutorSession.find({ user: userId });
    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOverallAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const analytics = await LearningAnalytics.findOne({ user: userId });
    res.json(analytics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProgressAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const progress = await LearningAnalytics.findOne({ user: userId })
      .select('progress');
    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLearningStyleAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const learningStyle = await LearningAnalytics.findOne({ user: userId })
      .select('learningStyle');
    res.json(learningStyle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}; 