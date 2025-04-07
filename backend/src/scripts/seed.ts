import mongoose from 'mongoose';
import { Subject } from '../models/Subject';
import dotenv from 'dotenv';

dotenv.config();

const subjects = [
  {
    name: 'Mathematics',
    code: 'MAT',
    examBoard: 'AQA',
    description: 'Advanced mathematics including calculus, algebra, and statistics',
    syllabusUrl: 'https://www.aqa.org.uk/subjects/mathematics/as-and-a-level/mathematics-7357',
    topics: [
      {
        name: 'Pure Mathematics',
        description: 'Core mathematical concepts and techniques',
        learningObjectives: [
          'Understand and apply algebraic techniques',
          'Solve problems using calculus',
          'Work with complex numbers'
        ],
        examWeight: 0.6,
        difficulty: 'high',
        resources: [
          {
            type: 'textbook',
            title: 'Pure Mathematics 1',
            url: 'https://example.com/pure-math-1'
          },
          {
            type: 'video',
            title: 'Introduction to Calculus',
            url: 'https://example.com/calculus-intro'
          }
        ]
      },
      {
        name: 'Statistics',
        description: 'Statistical methods and probability',
        learningObjectives: [
          'Analyze and interpret data',
          'Understand probability distributions',
          'Apply statistical tests'
        ],
        examWeight: 0.4,
        difficulty: 'medium',
        resources: [
          {
            type: 'textbook',
            title: 'Statistics for A-Level',
            url: 'https://example.com/statistics'
          }
        ]
      }
    ]
  },
  {
    name: 'Physics',
    code: 'PHY',
    examBoard: 'AQA',
    description: 'Advanced physics including mechanics, electricity, and quantum physics',
    syllabusUrl: 'https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7408',
    topics: [
      {
        name: 'Mechanics',
        description: 'Classical mechanics and motion',
        learningObjectives: [
          'Understand Newton\'s laws of motion',
          'Analyze forces and motion',
          'Apply conservation laws'
        ],
        examWeight: 0.4,
        difficulty: 'high',
        resources: [
          {
            type: 'textbook',
            title: 'Mechanics for A-Level',
            url: 'https://example.com/mechanics'
          }
        ]
      },
      {
        name: 'Electricity',
        description: 'Electrical circuits and fields',
        learningObjectives: [
          'Understand circuit analysis',
          'Apply Ohm\'s law',
          'Analyze electromagnetic fields'
        ],
        examWeight: 0.3,
        difficulty: 'medium',
        resources: [
          {
            type: 'textbook',
            title: 'Electricity and Magnetism',
            url: 'https://example.com/electricity'
          }
        ]
      }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aieducation');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Subject.deleteMany({});
    console.log('Cleared existing subjects');

    // Insert new subjects
    await Subject.insertMany(subjects);
    console.log('Successfully seeded subjects');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 