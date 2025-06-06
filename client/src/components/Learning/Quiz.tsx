
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { Quiz as QuizType } from '@/lib/learningData';

interface QuizProps {
  quiz: QuizType;
  onComplete: (score: number) => void;
  onBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ quiz, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const hasAnswered = answers[currentQuestion.id] !== undefined;

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionIndex
    });
  };

  const handleNext = () => {
    if (!hasAnswered) return;

    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const handleShowExplanation = () => {
    setShowExplanation(true);
  };

  const calculateResults = () => {
    const correctAnswers = quiz.questions.filter(
      question => answers[question.id] === question.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    setShowResults(true);
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setShowExplanation(false);
  };

  const handleComplete = () => {
    const correctAnswers = quiz.questions.filter(
      question => answers[question.id] === question.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    onComplete(score);
  };

  if (showResults) {
    const correctAnswers = quiz.questions.filter(
      question => answers[question.id] === question.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                passed ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {passed ? (
                  <Trophy className="h-8 w-8 text-green-600" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-600" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {passed ? 'Congratulations!' : 'Keep Learning!'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className={`text-6xl font-bold mb-2 ${
                  passed ? 'text-green-600' : 'text-red-600'
                }`}>
                  {score}%
                </div>
                <p className="text-gray-600">
                  You got {correctAnswers} out of {quiz.questions.length} questions correct
                </p>
              </div>

              {passed ? (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800">
                    Excellent work! You've mastered this topic and earned points towards your learning journey.
                  </p>
                </div>
              ) : (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-red-800">
                    Don't worry! Review the lesson content and try again. Learning takes practice.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!passed && (
                  <Button
                    variant="outline"
                    onClick={handleRetake}
                    className="flex items-center space-x-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Retake Quiz</span>
                  </Button>
                )}
                <Button
                  onClick={handleComplete}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Continue Learning</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Lesson</span>
          </Button>
          
          <div className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl font-bold text-gray-900">{quiz.title}</h1>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} />
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestion.id] === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrectness = showExplanation;
              
              return (
                <Button
                  key={index}
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left justify-start h-auto ${
                    showCorrectness && isCorrect ? 'bg-green-100 border-green-500 text-green-800' :
                    showCorrectness && isSelected && !isCorrect ? 'bg-red-100 border-red-500 text-red-800' :
                    ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'bg-primary border-primary' : 'border-gray-300'
                    }`}>
                      {isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
                    </div>
                    <span className="text-base">{option}</span>
                    {showCorrectness && isCorrect && (
                      <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                    )}
                    {showCorrectness && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-red-600 ml-auto" />
                    )}
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Explanation */}
        {showExplanation && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Explanation</h3>
                  <p className="text-gray-700">{currentQuestion.explanation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>

          <div className="flex space-x-4">
            {hasAnswered && !showExplanation && (
              <Button
                variant="outline"
                onClick={handleShowExplanation}
              >
                Show Explanation
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              disabled={!hasAnswered}
            >
              {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
