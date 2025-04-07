import mongoose from 'mongoose';

interface IAnalysis {
  overall: number;
  grammar: number;
  structure: number;
  content: number;
  suggestions: string[];
}

interface IEssay {
  userId: string;
  title: string;
  content: string;
  subject: string;
  topic: string;
  analysis: IAnalysis;
  createdAt: Date;
  updatedAt: Date;
}

const essaySchema = new mongoose.Schema<IEssay>({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  analysis: {
    overall: { type: Number, default: 0 },
    grammar: { type: Number, default: 0 },
    structure: { type: Number, default: 0 },
    content: { type: Number, default: 0 },
    suggestions: [{ type: String }]
  }
}, {
  timestamps: true
});

export const Essay = mongoose.model<IEssay>('Essay', essaySchema); 