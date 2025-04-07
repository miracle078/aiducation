import mongoose from 'mongoose';

export interface IStudyProgress {
  userId: string;
  subject: string;
  topic: string;
  score: number;
  timeSpent: number;
  attempts: number;
  lastAttempt: Date;
  isActive: boolean;
  notes?: string;
}

const studyProgressSchema = new mongoose.Schema<IStudyProgress>({
  userId: { type: String, required: true },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  score: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 },
  attempts: { type: Number, default: 0 },
  lastAttempt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  notes: { type: String }
}, {
  timestamps: true
});

export const StudyProgress = mongoose.model<IStudyProgress>('StudyProgress', studyProgressSchema);