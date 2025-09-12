import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Brain,
  Clock,
  CheckCircle,
  X,
  ArrowLeft,
  ArrowRight,
  Trophy,
  Target,
  RefreshCw,
  BookOpen,
} from "lucide-react";
import { mockLessonModules } from "@/lib/data";

const QuizPage = () => {
  const [currentQuiz] = useState(mockLessonModules[0].quiz!);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string | number;
  }>({});
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(
    (currentQuiz.timeLimit || 15) * 60,
  ); // in seconds
  const [score, setScore] = useState(0);

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const totalQuestions = currentQuiz.questions.length;
  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Timer countdown
  useEffect(() => {
    if (quizCompleted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setQuizCompleted(true);
          calculateFinalScore();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizCompleted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answer: string | number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      calculateFinalScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setShowResult(false);
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const calculateFinalScore = () => {
    let correctAnswers = 0;
    currentQuiz.questions.forEach((question) => {
      const userAnswer = selectedAnswers[question.id];
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore((correctAnswers / totalQuestions) * 100);
  };

  const isAnswerCorrect = (questionId: string) => {
    const question = currentQuiz.questions.find((q) => q.id === questionId);
    const userAnswer = selectedAnswers[questionId];
    return question && userAnswer === question.correctAnswer;
  };

  const getScoreColor = (score: number) => {
    if (score >= currentQuiz.passingScore) return "text-empire-emerald-400";
    if (score >= 50) return "text-empire-gold-400";
    return "text-red-400";
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResult(false);
    setQuizCompleted(false);
    setTimeRemaining((currentQuiz.timeLimit || 15) * 60);
    setScore(0);
  };

  if (quizCompleted) {
    const passed = score >= currentQuiz.passingScore;
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-empire-navy-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6">
                  {passed ? (
                    <div className="w-20 h-20 bg-empire-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-10 h-10 text-empire-emerald-400" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <X className="w-10 h-10 text-red-400" />
                    </div>
                  )}
                  <h1 className="text-3xl font-bold mb-2">
                    {passed ? "Congratulations!" : "Keep Learning!"}
                  </h1>
                  <p className="text-muted-foreground">
                    {passed
                      ? "You've successfully completed the quiz!"
                      : "Don't worry, practice makes perfect!"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div
                      className={`text-3xl font-bold ${getScoreColor(score)}`}
                    >
                      {Math.round(score)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Your Score
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">
                      {Object.keys(selectedAnswers).length}/{totalQuestions}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Questions Answered
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-empire-gold-400">
                      {currentQuiz.passingScore}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Passing Score
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {passed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="p-4 rounded-lg bg-empire-emerald-500/10 border border-empire-emerald-400/30"
                    >
                      <h3 className="font-semibold text-empire-emerald-400 mb-2">
                        🎉 Certificate Earned!
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        You've earned a certificate for completing this quiz.
                        View and download it from your profile.
                      </p>
                    </motion.div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={restartQuiz} variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Retake Quiz
                    </Button>
                    {passed && (
                      <Button asChild>
                        <Link to="/academy/certificate">
                          <Trophy className="w-4 h-4 mr-2" />
                          View Certificate
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" asChild>
                      <Link to="/academy">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Back to Academy
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-empire-navy-950/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                {currentQuiz.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-purple-500/20 text-purple-400">
              <Clock className="w-3 h-3 mr-1" />
              {formatTime(timeRemaining)}
            </Badge>
            <Badge variant="secondary">
              Passing: {currentQuiz.passingScore}%
            </Badge>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span className="text-lg sm:text-xl">
                    {currentQuestion.question}
                  </span>
                  <Badge variant="outline" className="ml-4 flex-shrink-0">
                    {currentQuestion.type}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Multiple Choice Options */}
                {currentQuestion.type === "multiple-choice" &&
                  currentQuestion.options && (
                    <RadioGroup
                      value={selectedAnswers[currentQuestion.id]?.toString()}
                      onValueChange={(value) =>
                        handleAnswerSelect(parseInt(value))
                      }
                      className="space-y-3"
                    >
                      {currentQuestion.options.map((option, index) => {
                        const isSelected =
                          selectedAnswers[currentQuestion.id] === index;
                        const isCorrect =
                          showResult && index === currentQuestion.correctAnswer;
                        const isWrong =
                          showResult &&
                          isSelected &&
                          index !== currentQuestion.correctAnswer;

                        return (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${
                              showResult
                                ? isCorrect
                                  ? "border-empire-emerald-400 bg-empire-emerald-500/10"
                                  : isWrong
                                    ? "border-red-400 bg-red-500/10"
                                    : "border-border/50"
                                : isSelected
                                  ? "border-purple-400 bg-purple-500/10"
                                  : "border-border/50 hover:border-border"
                            }`}
                          >
                            <RadioGroupItem
                              value={index.toString()}
                              id={`option-${index}`}
                              disabled={showResult}
                            />
                            <Label
                              htmlFor={`option-${index}`}
                              className="flex-1 cursor-pointer"
                            >
                              {option}
                            </Label>
                            {showResult && isCorrect && (
                              <CheckCircle className="w-5 h-5 text-empire-emerald-400" />
                            )}
                            {showResult && isWrong && (
                              <X className="w-5 h-5 text-red-400" />
                            )}
                          </motion.div>
                        );
                      })}
                    </RadioGroup>
                  )}

                {/* True/False Options */}
                {currentQuestion.type === "true-false" && (
                  <RadioGroup
                    value={selectedAnswers[currentQuestion.id]?.toString()}
                    onValueChange={(value) => handleAnswerSelect(value)}
                    className="space-y-3"
                  >
                    {["True", "False"].map((option, index) => {
                      const isSelected =
                        selectedAnswers[currentQuestion.id] === option;
                      const isCorrect =
                        showResult && option === currentQuestion.correctAnswer;
                      const isWrong =
                        showResult &&
                        isSelected &&
                        option !== currentQuestion.correctAnswer;

                      return (
                        <motion.div
                          key={option}
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${
                            showResult
                              ? isCorrect
                                ? "border-empire-emerald-400 bg-empire-emerald-500/10"
                                : isWrong
                                  ? "border-red-400 bg-red-500/10"
                                  : "border-border/50"
                              : isSelected
                                ? "border-purple-400 bg-purple-500/10"
                                : "border-border/50 hover:border-border"
                          }`}
                        >
                          <RadioGroupItem
                            value={option}
                            id={`tf-${index}`}
                            disabled={showResult}
                          />
                          <Label
                            htmlFor={`tf-${index}`}
                            className="flex-1 cursor-pointer"
                          >
                            {option}
                          </Label>
                          {showResult && isCorrect && (
                            <CheckCircle className="w-5 h-5 text-empire-emerald-400" />
                          )}
                          {showResult && isWrong && (
                            <X className="w-5 h-5 text-red-400" />
                          )}
                        </motion.div>
                      );
                    })}
                  </RadioGroup>
                )}

                {/* Explanation */}
                {showResult && currentQuestion.explanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 rounded-lg bg-muted/30 border border-border/50"
                  >
                    <h4 className="font-medium mb-2 flex items-center space-x-2">
                      <Target className="w-4 h-4" />
                      <span>Explanation</span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {currentQuestion.explanation}
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8"
        >
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="order-2 sm:order-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-2 order-1 sm:order-2">
            {!showResult &&
              selectedAnswers[currentQuestion.id] !== undefined && (
                <Button variant="outline" onClick={handleShowResult}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Check Answer
                </Button>
              )}
            {(showResult ||
              selectedAnswers[currentQuestion.id] !== undefined) && (
              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion.id] === undefined}
              >
                {currentQuestionIndex === totalQuestions - 1
                  ? "Finish Quiz"
                  : "Next Question"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </motion.div>

        {/* Question Navigator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm">Question Navigator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {currentQuiz.questions.map((_, index) => {
                  const isAnswered =
                    selectedAnswers[currentQuiz.questions[index].id] !==
                    undefined;
                  const isCurrent = index === currentQuestionIndex;

                  return (
                    <Button
                      key={index}
                      variant={isCurrent ? "default" : "outline"}
                      size="sm"
                      className={`aspect-square ${
                        isAnswered && !isCurrent
                          ? "bg-empire-emerald-500/20 border-empire-emerald-400"
                          : ""
                      }`}
                      onClick={() => {
                        setCurrentQuestionIndex(index);
                        setShowResult(false);
                      }}
                    >
                      {index + 1}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage;
