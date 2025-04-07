import { Request, Response } from 'express';
import { TutorSession, IMessage } from '../models/TutorSession';
import { AuthRequest } from '../types';
import mongoose from 'mongoose';

export const getAllSessions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const sessions = await TutorSession.find({ userId }).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching all sessions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const startSession = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { subject, topic } = req.body;
    const session = new TutorSession({
      userId,
      subject,
      topic,
      messages: []
    });

    await session.save();
    res.json(session);
  } catch (error) {
    console.error('Error starting tutor session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { sessionId } = req.params;
    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID is required' });
    }

    const { content } = req.body;
    if (!content?.trim()) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    const session = await TutorSession.findOneAndUpdate(
      { _id: sessionId, userId },
      {
        $push: {
          messages: {
            role: 'user',
            content: content.trim(),
            timestamp: new Date()
          }
        }
      },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // TODO: Add AI response here
    const aiResponse: IMessage = {
      role: 'assistant',
      content: 'This is a placeholder response. AI integration will be added later.',
      timestamp: new Date()
    };

    session.messages.push(aiResponse);
    await session.save();

    res.json(session);
  } catch (error) {
    console.error('Error sending message:', error);
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid session ID format' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSessionHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { sessionId } = req.params;
    if (!sessionId) {
      return getAllSessions(req, res);
    }

    const session = await TutorSession.findOne({ _id: sessionId, userId });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json(session);
  } catch (error) {
    console.error('Error fetching session history:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const endSession = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { sessionId } = req.params;
    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID is required' });
    }

    const session = await TutorSession.findOneAndDelete({ _id: sessionId, userId });
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json({ message: 'Session ended successfully' });
  } catch (error) {
    console.error('Error ending session:', error);
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid session ID format' });
    }
    res.status(500).json({ message: 'Server error' });
  }
}; 