import mongoose from 'mongoose';

interface ILearningStyle {
  visual: number;
  auditory: number;
  reading: number;
  kinesthetic: number;
}

interface ILearningAnalytics {
  userId: string;
  learningStyle: ILearningStyle;
  preferredStudyTime?: string;
  averageSessionDuration?: number;
  createdAt: Date;
  updatedAt: Date;
}

const learningAnalyticsSchema = new mongoose.Schema<ILearningAnalytics>({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  learningStyle: {
    visual: { type: Number, default: 0 },
    auditory: { type: Number, default: 0 },
    reading: { type: Number, default: 0 },
    kinesthetic: { type: Number, default: 0 }
  },
  preferredStudyTime: String,
  averageSessionDuration: Number
}, {
  timestamps: true
});

export const LearningAnalytics = mongoose.model<ILearningAnalytics>('LearningAnalytics', learningAnalyticsSchema); 