import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Trophy, Star, BookOpen, TrendingUp, Home, Calculator, PiggyBank } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the main advantage of property investment over keeping money in a savings account?",
    options: [
      "Property always increases in value",
      "Property provides rental income and potential capital growth",
      "Property is completely risk-free",
      "Property can be sold instantly"
    ],
    correctAnswer: 1,
    explanation: "Property investment offers both rental income and potential capital appreciation, providing multiple income streams compared to the fixed interest from savings accounts.",
    category: "Property Basics"
  },
  {
    id: 2,
    question: "What does 'leveraging' mean in property investment?",
    options: [
      "Buying property with cash only",
      "Using borrowed money (mortgage) to purchase property",
      "Selling property quickly",
      "Renovating property to increase value"
    ],
    correctAnswer: 1,
    explanation: "Leveraging means using borrowed money (typically a mortgage) to purchase property, allowing you to control a larger asset with less of your own capital.",
    category: "Investment Strategies"
  },
  {
    id: 3,
    question: "What is a typical annual rental yield for UK property investment?",
    options: [
      "1-2%",
      "3-6%",
      "10-15%",
      "20-25%"
    ],
    correctAnswer: 1,
    explanation: "UK rental yields typically range from 3-6% annually, though this varies by location and property type. Higher yields often come with higher risks.",
    category: "Returns & Yields"
  },
  {
    id: 4,
    question: "What is the current UK base interest rate approximately?",
    options: [
      "0.5%",
      "2.5%",
      "5.0%",
      "8.0%"
    ],
    correctAnswer: 2,
    explanation: "The UK base rate is currently around 5.0% (as of 2024), which affects mortgage rates and investment decisions.",
    category: "Market Knowledge"
  },
  {
    id: 5,
    question: "What does 'capital growth' mean in property investment?",
    options: [
      "The monthly rental income received",
      "The increase in property value over time",
      "The mortgage payments made",
      "The maintenance costs of the property"
    ],
    correctAnswer: 1,
    explanation: "Capital growth refers to the increase in property value over time, which creates wealth through asset appreciation.",
    category: "Property Basics"
  },
  {
    id: 6,
    question: "What is a 'Buy-to-Let' mortgage?",
    options: [
      "A mortgage for your primary residence",
      "A mortgage specifically for investment properties",
      "A mortgage with no interest",
      "A government-backed loan"
    ],
    correctAnswer: 1,
    explanation: "A Buy-to-Let mortgage is specifically designed for purchasing investment properties that you plan to rent out to tenants.",
    category: "Investment Strategies"
  },
  {
    id: 7,
    question: "Why is diversification important in property investment?",
    options: [
      "It guarantees higher returns",
      "It spreads risk across different properties or locations",
      "It's legally required",
      "It reduces property taxes"
    ],
    correctAnswer: 1,
    explanation: "Diversification helps spread risk by investing in different properties, locations, or property types, reducing the impact if one investment underperforms.",
    category: "Risk Management"
  },
  {
    id: 8,
    question: "What is 'compound growth' in investment terms?",
    options: [
      "Growth that stops after one year",
      "Growth that decreases over time",
      "Earning returns on both your initial investment and previous returns",
      "Growth only from rental income"
    ],
    correctAnswer: 2,
    explanation: "Compound growth means earning returns on both your original investment and on the returns you've already earned, creating exponential growth over time.",
    category: "Returns & Yields"
  }
];

const achievementTemplates: Omit<Achievement, 'unlocked' | 'progress'>[] = [
  {
    id: "first_quiz",
    title: "Knowledge Seeker",
    description: "Complete your first quiz",
    icon: "📚",
    maxProgress: 1
  },
  {
    id: "perfect_score",
    title: "Perfect Scholar",
    description: "Get 100% on a quiz",
    icon: "🎯",
    maxProgress: 1
  },
  {
    id: "quiz_master",
    title: "Quiz Master",
    description: "Complete 3 different quizzes",
    icon: "🏆",
    maxProgress: 3
  },
  {
    id: "property_expert",
    title: "Property Expert",
    description: "Master all property basics questions",
    icon: "🏠",
    maxProgress: 3
  },
  {
    id: "investment_guru",
    title: "Investment Guru",
    description: "Answer 10 questions correctly",
    icon: "💰",
    maxProgress: 10
  }
];

export default function FinancialLiteracy() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [quizzesCompleted, setQuizzesCompleted] = useState(0);

  // Initialize achievements
  useEffect(() => {
    const storedAchievements = localStorage.getItem('financialLiteracyAchievements');
    const storedStats = localStorage.getItem('financialLiteracyStats');
    
    if (storedAchievements) {
      setAchievements(JSON.parse(storedAchievements));
    } else {
      const initialAchievements = achievementTemplates.map(template => ({
        ...template,
        unlocked: false,
        progress: 0
      }));
      setAchievements(initialAchievements);
    }

    if (storedStats) {
      const stats = JSON.parse(storedStats);
      setTotalCorrect(stats.totalCorrect || 0);
      setQuizzesCompleted(stats.quizzesCompleted || 0);
    }
  }, []);

  const checkAchievements = (newScore: number) => {
    const updatedAchievements = [...achievements];
    let newUnlocked: Achievement | null = null;

    // First quiz completion
    if (quizzesCompleted === 0) {
      const firstQuiz = updatedAchievements.find(a => a.id === "first_quiz");
      if (firstQuiz && !firstQuiz.unlocked) {
        firstQuiz.unlocked = true;
        firstQuiz.progress = 1;
        newUnlocked = firstQuiz;
      }
    }

    // Perfect score
    if (newScore === questions.length) {
      const perfectScore = updatedAchievements.find(a => a.id === "perfect_score");
      if (perfectScore && !perfectScore.unlocked) {
        perfectScore.unlocked = true;
        perfectScore.progress = 1;
        newUnlocked = perfectScore;
      }
    }

    // Quiz master (3 quizzes)
    const newQuizzesCompleted = quizzesCompleted + 1;
    const quizMaster = updatedAchievements.find(a => a.id === "quiz_master");
    if (quizMaster) {
      quizMaster.progress = Math.min(newQuizzesCompleted, quizMaster.maxProgress);
      if (newQuizzesCompleted >= 3 && !quizMaster.unlocked) {
        quizMaster.unlocked = true;
        newUnlocked = quizMaster;
      }
    }

    // Investment guru (10 correct answers total)
    const newTotalCorrect = totalCorrect + newScore;
    const investmentGuru = updatedAchievements.find(a => a.id === "investment_guru");
    if (investmentGuru) {
      investmentGuru.progress = Math.min(newTotalCorrect, investmentGuru.maxProgress);
      if (newTotalCorrect >= 10 && !investmentGuru.unlocked) {
        investmentGuru.unlocked = true;
        newUnlocked = investmentGuru;
      }
    }

    setAchievements(updatedAchievements);
    localStorage.setItem('financialLiteracyAchievements', JSON.stringify(updatedAchievements));
    
    // Update stats
    const newStats = {
      totalCorrect: newTotalCorrect,
      quizzesCompleted: newQuizzesCompleted
    };
    localStorage.setItem('financialLiteracyStats', JSON.stringify(newStats));
    setTotalCorrect(newTotalCorrect);
    setQuizzesCompleted(newQuizzesCompleted);

    if (newUnlocked) {
      setShowAchievement(newUnlocked);
      setTimeout(() => setShowAchievement(null), 3000);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setUserAnswers([...userAnswers, selectedAnswer]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      checkAchievements(score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0));
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "#22C55E"; // Green
    if (percentage >= 60) return "#F97316"; // Orange
    return "#EF4444"; // Red
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return "Excellent! You're ready to start investing!";
    if (percentage >= 60) return "Good job! Consider learning more before investing.";
    return "Keep studying! Knowledge is the key to successful investing.";
  };

  if (quizCompleted) {
    const finalScore = score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0);
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <>
        <Helmet>
          <title>Quiz Complete - Financial Literacy | KR Property Investments</title>
        </Helmet>

        <div className="min-h-screen pt-20 pb-12 px-4" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white rounded-lg shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Trophy className="w-16 h-16 mx-auto mb-4" style={{ color: '#F97316' }} />
                  <h2 className="text-3xl font-bold mb-4" style={{ color: '#1A355E' }}>
                    Quiz Complete!
                  </h2>
                </div>

                <div className="mb-8">
                  <div 
                    className="text-6xl font-bold mb-2"
                    style={{ color: getScoreColor(percentage) }}
                  >
                    {percentage}%
                  </div>
                  <p className="text-lg mb-4" style={{ color: '#6B7280' }}>
                    You got {finalScore} out of {questions.length} questions correct
                  </p>
                  <p className="text-lg font-semibold" style={{ color: '#1A355E' }}>
                    {getScoreMessage(percentage)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2" style={{ color: '#1A355E' }}>Your Progress</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Quizzes Completed:</span>
                        <span className="font-semibold">{quizzesCompleted + 1}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Correct Answers:</span>
                        <span className="font-semibold">{totalCorrect + finalScore}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2" style={{ color: '#1A355E' }}>Achievements</h3>
                    <div className="flex flex-wrap gap-2">
                      {achievements.filter(a => a.unlocked).map(achievement => (
                        <Badge key={achievement.id} variant="secondary" className="text-xs">
                          {achievement.icon} {achievement.title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={restartQuiz}
                    className="w-full md:w-auto px-8 py-3 text-white font-semibold rounded-lg"
                    style={{ backgroundColor: '#F97316' }}
                  >
                    Take Quiz Again
                  </Button>
                  
                  <div className="text-center">
                    <p className="mb-4" style={{ color: '#6B7280' }}>
                      Ready to put your knowledge into action?
                    </p>
                    <Button
                      onClick={() => window.open('/contact', '_blank')}
                      className="w-full md:w-auto px-8 py-3 text-white font-semibold rounded-lg"
                      style={{ backgroundColor: '#C58B25' }}
                    >
                      Book Your Investment Consultation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {showAchievement && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <Card className="bg-white p-6 m-4 max-w-sm">
              <div className="text-center">
                <div className="text-4xl mb-2">{showAchievement.icon}</div>
                <h3 className="font-bold text-lg" style={{ color: '#1A355E' }}>
                  Achievement Unlocked!
                </h3>
                <p className="font-semibold" style={{ color: '#F97316' }}>
                  {showAchievement.title}
                </p>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  {showAchievement.description}
                </p>
              </div>
            </Card>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Financial Literacy Quiz | KR Property Investments</title>
        <meta 
          name="description" 
          content="Test and improve your property investment knowledge with our interactive financial literacy quiz. Learn key concepts about UK property investment, yields, and market insights."
        />
      </Helmet>

      <div className="min-h-screen pt-20 pb-12 px-4" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#C58B25' }}>
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#1A355E' }}>
              Financial Literacy Quiz
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Test your knowledge of property investment fundamentals and learn key concepts for successful investing.
            </p>
          </div>

          {/* Progress and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <Progress value={(currentQuestion / questions.length) * 100} className="mb-2" />
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: '#F97316' }}>{score}</div>
                <p className="text-sm" style={{ color: '#6B7280' }}>Correct Answers</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: '#C58B25' }}>
                  {achievements.filter(a => a.unlocked).length}
                </div>
                <p className="text-sm" style={{ color: '#6B7280' }}>Achievements</p>
              </CardContent>
            </Card>
          </div>

          {/* Question Card */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" style={{ color: '#F97316', borderColor: '#F97316' }}>
                  {questions[currentQuestion].category}
                </Badge>
                <span className="text-sm" style={{ color: '#6B7280' }}>
                  Question {currentQuestion + 1}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#1A355E' }}>
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-3 mb-6">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedAnswer === index
                        ? showExplanation
                          ? index === questions[currentQuestion].correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-orange-500 bg-orange-50'
                        : showExplanation && index === questions[currentQuestion].correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3 text-sm font-semibold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                      {showExplanation && index === questions[currentQuestion].correctAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showExplanation && (
                <div className="p-4 bg-blue-50 rounded-lg mb-6">
                  <h3 className="font-semibold mb-2" style={{ color: '#1A355E' }}>Explanation:</h3>
                  <p style={{ color: '#6B7280' }}>{questions[currentQuestion].explanation}</p>
                </div>
              )}

              <div className="flex justify-between">
                {!showExplanation ? (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="ml-auto px-6 py-2 text-white font-semibold rounded-lg"
                    style={{ backgroundColor: '#F97316' }}
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    className="ml-auto px-6 py-2 text-white font-semibold rounded-lg"
                    style={{ backgroundColor: '#F97316' }}
                  >
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Achievements Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center" style={{ color: '#1A355E' }}>
                <Trophy className="w-5 h-5 mr-2" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg border-2 ${
                      achievement.unlocked 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-2xl mb-1 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </div>
                      <h4 className={`font-semibold text-sm ${achievement.unlocked ? 'text-green-700' : 'text-gray-500'}`}>
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                      {!achievement.unlocked && (
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showAchievement && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Card className="bg-white p-6 m-4 max-w-sm">
            <div className="text-center">
              <div className="text-4xl mb-2">{showAchievement.icon}</div>
              <h3 className="font-bold text-lg" style={{ color: '#1A355E' }}>
                Achievement Unlocked!
              </h3>
              <p className="font-semibold" style={{ color: '#F97316' }}>
                {showAchievement.title}
              </p>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                {showAchievement.description}
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}