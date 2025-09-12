import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Target,
  Clock,
  Lightbulb,
} from "lucide-react";
import { type QuizQuestion, type LearningProgress } from "@/lib/youtubeAPI";
import { useToast } from "@/hooks/use-toast";

interface AdaptiveQuizProps {
  questions: QuizQuestion[];
  moduleId: string;
  onComplete: (progress: LearningProgress) => void;
  userProgress?: LearningProgress;
}

interface QuizState {
  currentQuestion: number;
  answers: { [questionId: string]: number };
  correctAnswers: number;
  timeSpent: number;
  startTime: number;
  showExplanation: boolean;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export const AdaptiveQuiz: React.FC<AdaptiveQuizProps> = ({
  questions,
  moduleId,
  onComplete,
  userProgress,
}) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    correctAnswers: 0,
    timeSpent: 0,
    startTime: Date.now(),
    showExplanation: false,
    difficulty: userProgress?.difficulty || "beginner",
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [adaptedQuestions, setAdaptedQuestions] = useState(questions);
  const { toast } = useToast();

  useEffect(() => {
    // Adapt questions based on user performance
    if (userProgress) {
      const adaptedQs = adaptQuestionDifficulty(questions, userProgress);
      setAdaptedQuestions(adaptedQs);
    }
  }, [questions, userProgress]);

  useEffect(() => {
    // Update time spent every second
    const timer = setInterval(() => {
      setQuizState((prev) => ({
        ...prev,
        timeSpent: Math.floor((Date.now() - prev.startTime) / 1000),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const adaptQuestionDifficulty = (
    originalQuestions: QuizQuestion[],
    progress: LearningProgress,
  ): QuizQuestion[] => {
    const { overallScore, difficulty } = progress;

    if (overallScore > 0.8 && difficulty !== "advanced") {
      // High scorer - increase difficulty
      return originalQuestions.map((q) => ({
        ...q,
        difficulty: "hard" as const,
        points: q.points + 5,
      }));
    } else if (overallScore < 0.5 && difficulty !== "beginner") {
      // Low scorer - decrease difficulty
      return originalQuestions.map((q) => ({
        ...q,
        difficulty: "easy" as const,
        points: Math.max(q.points - 5, 5),
      }));
    }

    return originalQuestions;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;

    const currentQ = adaptedQuestions[quizState.currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    setQuizState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [currentQ.id]: selectedAnswer },
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      showExplanation: true,
    }));

    setIsAnswered(true);

    // Show immediate feedback
    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: isCorrect
        ? "Great job! You got it right."
        : "Don't worry, learning from mistakes is part of the process.",
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestion < adaptedQuestions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        showExplanation: false,
      }));
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      completeQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
        showExplanation: false,
      }));
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const completeQuiz = () => {
    const score = quizState.correctAnswers / adaptedQuestions.length;
    const newDifficulty = determineDifficulty(score, quizState.difficulty);

    const quizScores: { [questionId: string]: boolean } = {};
    Object.entries(quizState.answers).forEach(([questionId, answer]) => {
      const question = adaptedQuestions.find((q) => q.id === questionId);
      quizScores[questionId] = question
        ? answer === question.correctAnswer
        : false;
    });

    const progress: LearningProgress = {
      moduleId,
      videosWatched: userProgress?.videosWatched || [],
      quizScores,
      overallScore: score,
      timeSpent: quizState.timeSpent,
      lastAccessed: new Date().toISOString(),
      difficulty: newDifficulty,
      strengths: analyzeStrengths(quizScores, adaptedQuestions),
      weaknesses: analyzeWeaknesses(quizScores, adaptedQuestions),
    };

    onComplete(progress);
  };

  const determineDifficulty = (
    score: number,
    currentDifficulty: string,
  ): "beginner" | "intermediate" | "advanced" => {
    if (score >= 0.8) {
      return currentDifficulty === "beginner"
        ? "intermediate"
        : currentDifficulty === "intermediate"
          ? "advanced"
          : "advanced";
    } else if (score < 0.6) {
      return currentDifficulty === "advanced"
        ? "intermediate"
        : currentDifficulty === "intermediate"
          ? "beginner"
          : "beginner";
    }
    return currentDifficulty as any;
  };

  const analyzeStrengths = (
    scores: { [questionId: string]: boolean },
    questions: QuizQuestion[],
  ): string[] => {
    const correctTopics = Object.entries(scores)
      .filter(([_, correct]) => correct)
      .map(([questionId]) => {
        const question = questions.find((q) => q.id === questionId);
        return question?.question.includes("fundamental")
          ? "Fundamentals"
          : question?.question.includes("technical")
            ? "Technical Analysis"
            : question?.question.includes("risk")
              ? "Risk Management"
              : "General Trading";
      });

    return [...new Set(correctTopics)];
  };

  const analyzeWeaknesses = (
    scores: { [questionId: string]: boolean },
    questions: QuizQuestion[],
  ): string[] => {
    const incorrectTopics = Object.entries(scores)
      .filter(([_, correct]) => !correct)
      .map(([questionId]) => {
        const question = questions.find((q) => q.id === questionId);
        return question?.question.includes("fundamental")
          ? "Fundamentals"
          : question?.question.includes("technical")
            ? "Technical Analysis"
            : question?.question.includes("risk")
              ? "Risk Management"
              : "General Trading";
      });

    return [...new Set(incorrectTopics)];
  };

  const currentQuestion = adaptedQuestions[quizState.currentQuestion];
  const progress =
    ((quizState.currentQuestion + 1) / adaptedQuestions.length) * 100;

  if (!currentQuestion) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Trophy className="w-16 h-16 text-empire-gold-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
          <p className="text-muted-foreground">
            Processing your results and adapting your learning path...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-6 h-6 text-empire-emerald-500" />
              <div>
                <CardTitle className="text-xl">Adaptive Quiz</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Question {quizState.currentQuestion + 1} of{" "}
                  {adaptedQuestions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>
                  {Math.floor(quizState.timeSpent / 60)}:
                  {String(quizState.timeSpent % 60).padStart(2, "0")}
                </span>
              </Badge>
              <Badge variant="outline">
                <Target className="w-3 h-3 mr-1" />
                {currentQuestion.difficulty}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
      </Card>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={quizState.currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {currentQuestion.question}
                </h3>
                <Badge variant="secondary">
                  {currentQuestion.points} points
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuestion.correctAnswer;
                  const showResult = isAnswered;

                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={isAnswered}
                      className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                        isSelected && !showResult
                          ? "border-empire-emerald-500 bg-empire-emerald-50"
                          : showResult && isCorrect
                            ? "border-green-500 bg-green-50"
                            : showResult && isSelected && !isCorrect
                              ? "border-red-500 bg-red-50"
                              : "border-border hover:border-empire-emerald-300"
                      }`}
                      whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                      whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        {showResult && isCorrect && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        {!showResult && (
                          <div
                            className={`w-5 h-5 rounded-full border-2 ${
                              isSelected
                                ? "border-empire-emerald-500 bg-empire-emerald-500"
                                : "border-gray-300"
                            }`}
                          />
                        )}
                        <span>{option}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {quizState.showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-empire-emerald-50 p-4 rounded-lg border border-empire-emerald-200"
                  >
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="w-5 h-5 text-empire-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-empire-emerald-800">
                          Explanation
                        </p>
                        <p className="text-sm text-empire-emerald-700">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={quizState.currentQuestion === 0}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>

                <div className="flex space-x-2">
                  {!isAnswered && (
                    <Button
                      onClick={handleAnswerSubmit}
                      disabled={selectedAnswer === null}
                      className="bg-empire-emerald-500 hover:bg-empire-emerald-600"
                    >
                      Submit Answer
                    </Button>
                  )}

                  {isAnswered && (
                    <Button
                      onClick={handleNextQuestion}
                      className="flex items-center space-x-2 bg-empire-emerald-500 hover:bg-empire-emerald-600"
                    >
                      <span>
                        {quizState.currentQuestion < adaptedQuestions.length - 1
                          ? "Next Question"
                          : "Complete Quiz"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Score Indicator */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-empire-emerald-500">
                  {quizState.correctAnswers}
                </p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-500">
                  {quizState.currentQuestion - quizState.correctAnswers}
                </p>
                <p className="text-xs text-muted-foreground">Incorrect</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">
                {Math.round(
                  (quizState.correctAnswers /
                    Math.max(quizState.currentQuestion, 1)) *
                    100,
                )}
                %
              </p>
              <p className="text-xs text-muted-foreground">Score</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaptiveQuiz;
