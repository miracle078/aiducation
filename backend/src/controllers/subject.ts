import { Request, Response } from 'express';
import { Subject } from '../models/Subject';

export const getSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await Subject.find().select('-__v');
    res.json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const subject = await Subject.findById(req.params.id).select('-__v');
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json(subject);
  } catch (error) {
    console.error('Error fetching subject:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTopicsBySubject = async (req: Request, res: Response) => {
  try {
    const subject = await Subject.findById(req.params.id).select('topics -_id');
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json(subject.topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTopicById = async (req: Request, res: Response) => {
  try {
    const subject = await Subject.findOne(
      { 'topics._id': req.params.topicId },
      { 'topics.$': 1 }
    );
    
    if (!subject || !subject.topics.length) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    
    res.json(subject.topics[0]);
  } catch (error) {
    console.error('Error fetching topic:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 