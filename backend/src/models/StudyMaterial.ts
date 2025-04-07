import mongoose from 'mongoose';

export interface IResource {
  type: 'video' | 'article' | 'exercise';
  title: string;
  url: string;
}

export interface IStudyMaterial {
  subject: string;
  topic: string;
  title: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  resources: IResource[];
}

const resourceSchema = new mongoose.Schema<IResource>({
  type: { type: String, enum: ['video', 'article', 'exercise'], required: true },
  title: { type: String, required: true },
  url: { type: String, required: true }
});

const studyMaterialSchema = new mongoose.Schema<IStudyMaterial>({
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  difficulty: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true 
  },
  resources: [resourceSchema]
}, {
  timestamps: true
});

export const StudyMaterial = mongoose.model<IStudyMaterial>('StudyMaterial', studyMaterialSchema); 