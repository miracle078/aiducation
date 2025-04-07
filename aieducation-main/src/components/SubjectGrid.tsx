
import React from 'react';
import SubjectCard, { SubjectCardProps } from './SubjectCard';
import { Calculator, FlaskConical, BookText, LandmarkIcon, Globe, Code } from 'lucide-react';

const SubjectGrid = () => {
  const subjects: SubjectCardProps[] = [
    {
      id: 'mathematics',
      title: 'Mathematics',
      icon: <Calculator className="w-6 h-6 text-white" />,
      color: 'bg-blue-500',
      progress: 45,
      lessons: 42,
      completedLessons: 19,
    },
    {
      id: 'science',
      title: 'Science',
      icon: <FlaskConical className="w-6 h-6 text-white" />,
      color: 'bg-teal-500',
      progress: 65,
      lessons: 38,
      completedLessons: 25,
    },
    {
      id: 'english',
      title: 'English',
      icon: <BookText className="w-6 h-6 text-white" />,
      color: 'bg-purple-500',
      progress: 30,
      lessons: 26,
      completedLessons: 8,
    },
    {
      id: 'history',
      title: 'History',
      icon: <LandmarkIcon className="w-6 h-6 text-white" />,
      color: 'bg-red-500',
      progress: 20,
      lessons: 36,
      completedLessons: 7,
    },
    {
      id: 'geography',
      title: 'Geography',
      icon: <Globe className="w-6 h-6 text-white" />,
      color: 'bg-amber-500',
      progress: 15,
      lessons: 32,
      completedLessons: 5,
    },
    {
      id: 'computer-science',
      title: 'Computer Science',
      icon: <Code className="w-6 h-6 text-white" />,
      color: 'bg-green-500',
      progress: 40,
      lessons: 40,
      completedLessons: 16,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} {...subject} />
      ))}
    </div>
  );
};

export default SubjectGrid;
