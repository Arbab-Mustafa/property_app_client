
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Book, 
  Trophy, 
  Target, 
  Clock, 
  Star, 
  Award,
  Play,
  CheckCircle,
  Users,
  TrendingUp,
  Brain,
  Zap
} from 'lucide-react';
import { learningModules, badges, leaderboardData } from '@/lib/learningData';
import LearningModule from '@/components/Learning/LearningModule';
import Quiz from '@/components/Learning/Quiz';
import Leaderboard from '@/components/Learning/Leaderboard';
import AchievementsBadges from '@/components/Learning/AchievementsBadges';

const FinancialLearning = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [userProgress, setUserProgress] = useState<any>({});
  const [userAchievements, setUserAchievements] = useState<string[]>([]);
  const [userScore, setUserScore] = useState(0);
  const [userId] = useState(() => `user_${Date.now()}`); // Simple session-based user ID

  // Calculate overall progress
  const totalLessons = learningModules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = Object.keys(userProgress).filter(key => userProgress[key]?.completed === 'true').length;
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  // Load user progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(`learning_progress_${userId}`);
    const savedAchievements = localStorage.getItem(`achievements_${userId}`);
    const savedScore = localStorage.getItem(`score_${userId}`);
    
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
    if (savedAchievements) {
      setUserAchievements(JSON.parse(savedAchievements));
    }
    if (savedScore) {
      setUserScore(parseInt(savedScore));
    }
  }, [userId]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`learning_progress_${userId}`, JSON.stringify(userProgress));
  }, [userProgress, userId]);

  useEffect(() => {
    localStorage.setItem(`achievements_${userId}`, JSON.stringify(userAchievements));
  }, [userAchievements, userId]);

  useEffect(() => {
    localStorage.setItem(`score_${userId}`, userScore.toString());
  }, [userScore, userId]);

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModule(moduleId);
    setSelectedLesson(null);
    setShowQuiz(false);
  };

  const handleLessonComplete = (moduleId: string, lessonId: string, score?: number) => {
    const progressKey = `${moduleId}_${lessonId}`;
    setUserProgress(prev => ({
      ...prev,
      [progressKey]: {
        completed: 'true',
        score: score?.toString() || '100',
        timeSpent: '10' // Mock time spent
      }
    }));

    // Add score to user total
    if (score) {
      setUserScore(prev => prev + score);
    }

    // Check for achievements
    checkAchievements(moduleId, lessonId, score);
  };

  const checkAchievements = (moduleId: string, lessonId: string, score?: number) => {
    const newAchievements = [];

    // First lesson achievement
    if (completedLessons === 0 && !userAchievements.includes('first-lesson')) {
      newAchievements.push('first-lesson');
    }

    // Perfect quiz score
    if (score === 100 && !userAchievements.includes('quiz-master')) {
      newAchievements.push('quiz-master');
    }

    // Module-specific achievements
    if (moduleId === 'inflation-basics' && !userAchievements.includes('inflation-expert')) {
      const inflationModule = learningModules.find(m => m.id === 'inflation-basics');
      const inflationProgress = inflationModule?.lessons.every(lesson => 
        userProgress[`${moduleId}_${lesson.id}`]?.completed === 'true'
      );
      if (inflationProgress) {
        newAchievements.push('inflation-expert');
      }
    }

    if (newAchievements.length > 0) {
      setUserAchievements(prev => [...prev, ...newAchievements]);
      setUserScore(prev => prev + (newAchievements.length * 100)); // Bonus points for achievements
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getModuleProgress = (moduleId: string) => {
    const module = learningModules.find(m => m.id === moduleId);
    if (!module) return 0;
    
    const completedLessonsInModule = module.lessons.filter(lesson =>
      userProgress[`${moduleId}_${lesson.id}`]?.completed === 'true'
    ).length;
    
    return (completedLessonsInModule / module.lessons.length) * 100;
  };

  if (selectedModule && selectedLesson) {
    const module = learningModules.find(m => m.id === selectedModule);
    const lesson = module?.lessons.find(l => l.id === selectedLesson);
    
    if (showQuiz && lesson?.quiz) {
      return (
        <Quiz
          quiz={lesson.quiz}
          onComplete={(score) => {
            handleLessonComplete(selectedModule, selectedLesson, score);
            setShowQuiz(false);
            setSelectedLesson(null);
            setSelectedModule(null);
          }}
          onBack={() => setShowQuiz(false)}
        />
      );
    }

    if (lesson) {
      return (
        <LearningModule
          lesson={lesson}
          onComplete={() => {
            if (lesson.quiz) {
              setShowQuiz(true);
            } else {
              handleLessonComplete(selectedModule, selectedLesson);
              setSelectedLesson(null);
              setSelectedModule(null);
            }
          }}
          onBack={() => {
            setSelectedLesson(null);
            setSelectedModule(null);
          }}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Financial Learning Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Master the fundamentals of property investment through interactive lessons, 
            quizzes, and real-world examples.
          </p>
          
          {/* Progress Overview */}
          <Card className="max-w-2xl mx-auto mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-primary" />
                  <span className="text-lg font-semibold">Your Progress</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold">{userScore}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4 text-purple-500" />
                    <span className="font-bold">{userAchievements.length}</span>
                  </div>
                </div>
              </div>
              <Progress value={overallProgress} className="mb-2" />
              <p className="text-sm text-gray-600">
                {completedLessons} of {totalLessons} lessons completed ({Math.round(overallProgress)}%)
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
            <TabsTrigger value="modules" className="flex items-center space-x-2">
              <Book className="h-4 w-4" />
              <span>Modules</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>Badges</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Leaderboard</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningModules.map((module) => {
                const progress = getModuleProgress(module.id);
                const isCompleted = progress === 100;
                
                return (
                  <Card 
                    key={module.id} 
                    className={`hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                      isCompleted ? 'ring-2 ring-green-500' : ''
                    }`}
                    onClick={() => handleModuleSelect(module.id)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="text-4xl mb-2">{module.icon}</div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge 
                            className={`${getDifficultyColor(module.difficulty)} text-white text-xs`}
                          >
                            {module.difficulty}
                          </Badge>
                          {isCompleted && (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
                      <p className="text-gray-600 text-sm">{module.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{module.estimatedTime} min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Book className="h-4 w-4" />
                            <span>{module.lessons.length} lessons</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} />
                        </div>

                        <Button 
                          className="w-full" 
                          variant={isCompleted ? "secondary" : "default"}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {isCompleted ? 'Review' : progress > 0 ? 'Continue' : 'Start Learning'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementsBadges 
              userAchievements={userAchievements}
              allBadges={badges}
            />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard 
              leaderboardData={leaderboardData}
              currentUser={{ name: "You", score: userScore, badges: userAchievements.length }}
            />
          </TabsContent>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Learning Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span>Learning Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lessons Completed</span>
                      <span className="font-bold">{completedLessons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Score</span>
                      <span className="font-bold">{userScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Badges Earned</span>
                      <span className="font-bold">{userAchievements.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="font-bold">{Math.round(overallProgress)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span>Recent Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userAchievements.slice(-3).map((achievementId) => {
                      const badge = badges.find(b => b.id === achievementId);
                      return badge ? (
                        <div key={badge.id} className="flex items-center space-x-3">
                          <div className="text-2xl">{badge.icon}</div>
                          <div>
                            <p className="font-semibold text-sm">{badge.title}</p>
                            <p className="text-xs text-gray-600">{badge.description}</p>
                          </div>
                        </div>
                      ) : null;
                    })}
                    {userAchievements.length === 0 && (
                      <p className="text-gray-500 text-sm">Complete lessons to earn achievements!</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span>Your Ranking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-primary">#--</div>
                    <p className="text-sm text-gray-600">
                      Complete more lessons to see your ranking!
                    </p>
                    <div className="pt-4">
                      <Button 
                        onClick={() => document.querySelector('[data-value="leaderboard"]')?.click()}
                        variant="outline" 
                        size="sm"
                      >
                        View Leaderboard
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinancialLearning;
