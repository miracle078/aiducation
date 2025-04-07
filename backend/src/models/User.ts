import mongoose, { Document, Schema } from 'mongoose';

interface IMessage {
  role: string;
  content: string;
  timestamp: Date;
}

interface IAITutorSession {
  _id: mongoose.Types.ObjectId;
  subject: string;
  topic: string;
  messages: IMessage[];
  createdAt: Date;
}

interface IStudyProgress {
  subject: string;
  topic: string;
  progress: number;
  lastStudied: Date;
}

interface IEssay {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  analysis: any;
  createdAt: Date;
}

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  studyProgress: IStudyProgress[];
  essays: IEssay[];
  aiTutorSessions: IAITutorSession[];
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  studyProgress: [{
    subject: String,
    topic: String,
    progress: Number,
    lastStudied: Date,
  }],
  essays: [{
    title: String,
    content: String,
    analysis: Object,
    createdAt: Date,
  }],
  aiTutorSessions: [{
    subject: String,
    topic: String,
    messages: [{
      role: String,
      content: String,
      timestamp: Date,
    }],
    createdAt: Date,
  }],
});

export const User = mongoose.model<IUser>('User', userSchema); 