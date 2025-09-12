import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Clock,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Trophy,
  Target,
  Brain,
  Play,
  FileText,
  Lightbulb,
} from "lucide-react";
import { mockLessonModules } from "@/lib/data";

const LessonDetail = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [readingSections, setReadingSections] = useState<number[]>([]);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const lesson = mockLessonModules.find((l) => l.id === lessonId);

  useEffect(() => {
    if (!lesson) {
      navigate("/academy");
      return;
    }
    setLessonCompleted(lesson.completed);
  }, [lesson, navigate]);

  if (!lesson) {
    return null;
  }

  const totalSections = lesson.content.sections.length;
  const completedSections = readingSections.length;
  const progressPercentage = (completedSections / totalSections) * 100;

  const markSectionAsRead = (sectionIndex: number) => {
    if (!readingSections.includes(sectionIndex)) {
      setReadingSections([...readingSections, sectionIndex]);
    }
  };

  const handleCompleteLesson = () => {
    // Mark all sections as read
    const allSections = Array.from({ length: totalSections }, (_, i) => i);
    setReadingSections(allSections);
    setLessonCompleted(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-empire-emerald-500/20 text-empire-emerald-400";
      case "intermediate":
        return "bg-empire-gold-500/20 text-empire-gold-400";
      case "advanced":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const nextLesson = mockLessonModules.find(
    (l, index) =>
      mockLessonModules.findIndex((lesson) => lesson.id === lessonId) ===
      index - 1,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-empire-navy-950/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/academy">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Academy
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                {lesson.title}
              </h1>
              <p className="text-muted-foreground">{lesson.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getDifficultyColor(lesson.difficulty)}>
              {lesson.difficulty}
            </Badge>
            <Badge variant="secondary">
              <Clock className="w-3 h-3 mr-1" />
              {lesson.duration} min
            </Badge>
            {lessonCompleted && (
              <Badge className="bg-empire-emerald-500/20 text-empire-emerald-400">
                <CheckCircle className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Learning Progress</h3>
                <span className="text-sm text-muted-foreground">
                  {completedSections}/{totalSections} sections completed
                </span>
              </div>
              <Progress value={progressPercentage} className="mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">
                    {Math.round(progressPercentage)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-empire-emerald-400">
                    {lesson.duration}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Minutes Total
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-empire-gold-400">
                    {lesson.quiz?.questions.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Quiz Questions
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Content Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Content</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lesson.content.sections.map((section, index) => (
                    <Button
                      key={index}
                      variant={activeSection === index ? "default" : "ghost"}
                      className="w-full justify-start h-auto p-3 text-left"
                      onClick={() => {
                        setActiveSection(index);
                        markSectionAsRead(index);
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        {readingSections.includes(index) ? (
                          <CheckCircle className="w-4 h-4 text-empire-emerald-400 flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 border border-muted-foreground rounded-full flex-shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm truncate">
                            {section.title}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="text-xs text-muted-foreground">
                              Section {index + 1}
                            </div>
                            {section.videoUrl && (
                              <div className="flex items-center space-x-1">
                                <Play className="w-3 h-3 text-empire-emerald-400" />
                                <span className="text-xs text-empire-emerald-400">
                                  Video
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>

                {lesson.quiz && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <Button
                      className="w-full"
                      variant="outline"
                      asChild
                      disabled={completedSections < totalSections}
                    >
                      <Link to={`/academy/quiz?lesson=${lesson.id}`}>
                        <Brain className="w-4 h-4 mr-2" />
                        Take Quiz ({lesson.quiz.questions.length} questions)
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Lesson Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{lesson.content.sections[activeSection]?.title}</span>
                  </CardTitle>
                  <Badge variant="secondary">
                    Section {activeSection + 1} of {totalSections}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <div className="space-y-6">
                  {/* Video Player */}
                  {lesson.content.sections[activeSection]?.videoUrl && (
                    <div className="not-prose">
                      <div className="aspect-video w-full rounded-lg overflow-hidden border border-border/50 bg-muted">
                        <iframe
                          src={lesson.content.sections[activeSection].videoUrl}
                          title={lesson.content.sections[activeSection].title}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="flex items-center space-x-2 mt-3 text-sm text-muted-foreground">
                        <Play className="w-4 h-4" />
                        <span>
                          Watch the video lesson above for visual explanations
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="text-base leading-relaxed">
                    {lesson.content.sections[activeSection]?.content
                      .split("\n")
                      .map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                  </div>

                  {lesson.content.sections[activeSection]?.keyPoints && (
                    <div className="bg-empire-emerald-500/10 border border-empire-emerald-400/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Lightbulb className="w-5 h-5 text-empire-emerald-400" />
                        <h4 className="font-semibold text-empire-emerald-400">
                          Key Takeaways
                        </h4>
                      </div>
                      <ul className="space-y-2">
                        {lesson.content.sections[activeSection].keyPoints!.map(
                          (point, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <div className="w-2 h-2 bg-empire-emerald-400 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm">{point}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setActiveSection(Math.max(0, activeSection - 1))
                    }
                    disabled={activeSection === 0}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex items-center space-x-2">
                    {!readingSections.includes(activeSection) && (
                      <Button
                        variant="outline"
                        onClick={() => markSectionAsRead(activeSection)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Read
                      </Button>
                    )}

                    {activeSection === totalSections - 1 &&
                    completedSections >= totalSections - 1 &&
                    !lessonCompleted ? (
                      <Button
                        onClick={handleCompleteLesson}
                        className="bg-empire-emerald-500 hover:bg-empire-emerald-600"
                      >
                        <Trophy className="w-4 h-4 mr-2" />
                        Complete Lesson
                      </Button>
                    ) : null}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() =>
                      setActiveSection(
                        Math.min(totalSections - 1, activeSection + 1),
                      )
                    }
                    disabled={activeSection === totalSections - 1}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Lesson Completion Actions */}
                {lessonCompleted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-empire-emerald-500/10 border border-empire-emerald-400/30 rounded-lg"
                  >
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-empire-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                        <Trophy className="w-8 h-8 text-empire-emerald-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-empire-emerald-400">
                        Lesson Completed!
                      </h3>
                      <p className="text-muted-foreground">
                        Great job! You've completed all sections of this lesson.
                      </p>
                      <div className="flex justify-center space-x-4">
                        {lesson.quiz && (
                          <Button asChild>
                            <Link to={`/academy/quiz?lesson=${lesson.id}`}>
                              <Brain className="w-4 h-4 mr-2" />
                              Take Quiz
                            </Link>
                          </Button>
                        )}
                        {nextLesson && (
                          <Button variant="outline" asChild>
                            <Link to={`/academy/lesson/${nextLesson.id}`}>
                              Next Lesson
                              <ArrowRight className="w-4 h-4 ml-2" />
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
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
