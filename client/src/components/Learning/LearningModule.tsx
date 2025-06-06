
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Clock, BookOpen } from 'lucide-react';
import { Lesson, LessonContent } from '@/lib/learningData';

interface LearningModuleProps {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
}

const LearningModule: React.FC<LearningModuleProps> = ({ lesson, onComplete, onBack }) => {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [startTime] = useState(Date.now());

  const currentContent = lesson.content[currentContentIndex];
  const progress = ((currentContentIndex + 1) / lesson.content.length) * 100;
  const isLastContent = currentContentIndex === lesson.content.length - 1;

  const handleNext = () => {
    if (isLastContent) {
      onComplete();
    } else {
      setCurrentContentIndex(currentContentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1);
    }
  };

  const renderContent = (content: LessonContent) => {
    switch (content.type) {
      case 'text':
        return (
          <div className="prose max-w-none">
            {content.title && (
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {content.title}
              </h3>
            )}
            <div className="text-gray-700 leading-relaxed text-base">
              {content.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="text-center">
            {content.title && (
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {content.title}
              </h3>
            )}
            <img 
              src={content.content} 
              alt={content.title || 'Learning content'} 
              className="max-w-full h-auto rounded-lg shadow-md mx-auto"
            />
          </div>
        );
      case 'interactive':
        return (
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            {content.title && (
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                {content.title}
              </h3>
            )}
            <div className="text-blue-800">
              {content.content}
            </div>
          </div>
        );
      default:
        return (
          <div className="text-gray-700">
            {content.content}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Modules</span>
          </Button>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{lesson.estimatedTime} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen className="h-4 w-4" />
              <span>{currentContentIndex + 1} of {lesson.content.length}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="mb-2" />
            <p className="text-gray-600 text-sm">{lesson.description}</p>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="min-h-[400px]">
              {renderContent(currentContent)}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentContentIndex === 0}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <div className="flex space-x-2">
            {lesson.content.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= currentContentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            className="flex items-center space-x-2"
          >
            <span>{isLastContent ? 'Complete Lesson' : 'Next'}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearningModule;
