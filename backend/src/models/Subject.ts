import mongoose, { Document, Schema } from 'mongoose';

interface ITopic extends Document {
  name: string;
  description: string;
  learningObjectives: string[];
  examWeight: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: mongoose.Types.ObjectId[];
  resources: {
    type: 'textbook' | 'video' | 'practice' | 'exam';
    title: string;
    url: string;
  }[];
}

interface ISubject extends Document {
  name: string;
  code: string;
  examBoard: string;
  description: string;
  topics: ITopic[];
  syllabusUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const topicSchema = new Schema<ITopic>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  learningObjectives: [{
    type: String,
    required: true,
  }],
  examWeight: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  prerequisites: [{
    type: Schema.Types.ObjectId,
    ref: 'Topic',
  }],
  resources: [{
    type: {
      type: String,
      enum: ['textbook', 'video', 'practice', 'exam'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  }],
});

const subjectSchema = new Schema<ISubject>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  examBoard: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  topics: [topicSchema],
  syllabusUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

subjectSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Subject = mongoose.model<ISubject>('Subject', subjectSchema); 