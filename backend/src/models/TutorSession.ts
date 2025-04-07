import mongoose from 'mongoose';

export interface IMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ITutorSession {
  userId: string;
  subject: string;
  topic: string;
  messages: IMessage[];
}

const messageSchema = new mongoose.Schema<IMessage>({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const tutorSessionSchema = new mongoose.Schema<ITutorSession>({
  userId: { type: String, required: true },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  messages: [messageSchema]
}, {
  timestamps: true
});

export const TutorSession = mongoose.model<ITutorSession>('TutorSession', tutorSessionSchema);