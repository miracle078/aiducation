import { Request, Response } from 'express';
import { Essay } from '../models/Essay';
import { AuthRequest } from '../types';

export const saveEssay = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { title, content, subject, topic } = req.body;
    const essay = new Essay({
      userId,
      title,
      content,
      subject,
      topic,
      analysis: {
        overall: 0,
        grammar: 0,
        structure: 0,
        content: 0,
        suggestions: []
      }
    });

    await essay.save();
    res.status(201).json(essay);
  } catch (error) {
    console.error('Error saving essay:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEssays = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const essays = await Essay.find({ userId }).sort({ createdAt: -1 });
    res.json(essays);
  } catch (error) {
    console.error('Error fetching essays:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEssayById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const essay = await Essay.findOne({ _id: id, userId });
    if (!essay) {
      return res.status(404).json({ message: 'Essay not found' });
    }

    res.json(essay);
  } catch (error) {
    console.error('Error fetching essay:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteEssay = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { essayId } = req.params;
    const essay = await Essay.findOneAndDelete({ _id: essayId, userId });
    
    if (!essay) {
      return res.status(404).json({ message: 'Essay not found' });
    }

    res.json({ message: 'Essay deleted successfully' });
  } catch (error) {
    console.error('Error deleting essay:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEssayAnalysis = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { essayId } = req.params;
    const essay = await Essay.findOne({ _id: essayId, userId });
    
    if (!essay) {
      return res.status(404).json({ message: 'Essay not found' });
    }

    res.json(essay.analysis);
  } catch (error) {
    console.error('Error fetching essay analysis:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEssayHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const essays = await Essay.find({ userId }).select('-__v');
    res.json(essays);
  } catch (error) {
    console.error('Error fetching essay history:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 