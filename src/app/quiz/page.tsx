"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface QuizQuestion {
  id: number;
  question: string;
  type: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizData {
  quiz: {
    title: string;
    description: string;
    timeLimit: number;
    questions: QuizQuestion[];
    scoring: {
      [key: string]: {
        min: number;
        max: number;
        message: string;
      };
    };
  };
}

// Decorative components matching the website style
const FloatingElement = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{ 
      y: [0, -15, 0],
      rotate: [0, 8, 0]
    }}
    transition={{ 
      duration: 5 + delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

const QuizIcon = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
    className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
  >
    ?
  </motion.div>
);

const BrainIcon = () => (
  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl">
    🧠
  </div>
);

const StarIcon = () => (
  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white">
    ⭐
  </div>
);

function QuizPage() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [stage, setStage] = useState<'welcome' | 'quiz' | 'results'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Load quiz data from JSON file
    fetch("/quiz-questions.json")
      .then((response) => response.json())
      .then((data: any) => {
        // Normalize question objects to ensure they have `correctAnswer` property
        if (data && data.quiz && Array.isArray(data.quiz.questions)) {
          // map legacy keys
          let qs = data.quiz.questions.map((q: any) => ({
            ...q,
            // support legacy key `correct` as well as `correctAnswer`
            correctAnswer: q.correctAnswer ?? q.correct ?? -1,
          }));

          // Fisher-Yates shuffle
          const shuffle = (arr: any[]) => {
            for (let i = arr.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
          };

          qs = shuffle(qs);

          // Take up to 15 questions (or fewer if not available)
          const TAKE = Math.min(15, qs.length);
          data.quiz.questions = qs.slice(0, TAKE);
        }

        setQuizData(data);
        setSelectedAnswers(new Array(data.quiz.questions.length).fill(-1));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading quiz data:", error);
        setLoading(false);
      });
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (quizData && currentQuestion < quizData.quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (!quizData) return;
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizData.quiz.questions[index].correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setStage('results');
  };

  const restart = () => {
    if (!quizData) return;
    setSelectedAnswers(new Array(quizData.quiz.questions.length).fill(-1));
    setCurrentQuestion(0);
    setScore(0);
    setStage('quiz');
  };

  const getResultMessage = () => {
    if (!quizData) return { title: "", message: "" };
    const { scoring } = quizData.quiz;
    
    for (const [key, range] of Object.entries(scoring)) {
      if (score >= range.min && score <= range.max) {
        return {
          title: key === 'excellent' ? 'Outstanding! 🎯' :
                 key === 'good' ? 'Great Work! 🌟' :
                 key === 'fair' ? 'Good Progress! 💭' : 'Growing! 🌱',
          message: range.message
        };
      }
    }
    return { title: "Complete!", message: "Thank you for taking the quiz!" };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </div>
        
        <div className="text-center relative z-10">
          <motion.div 
            className="w-20 h-20 border-4 border-black border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-2xl font-bold text-black">Loading Quiz...</p>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </div>
        
        <div className="text-center relative z-10">
          <h1 className="text-4xl font-bold text-red-600 mb-6">Error Loading Quiz</h1>
          <p className="text-xl text-gray-600 mb-8">Unable to load quiz questions. Please try again later.</p>
          <Link href="/" className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const totalQuestions = quizData.quiz.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <FloatingElement className="top-20 left-20" delay={0}>
        <QuizIcon />
      </FloatingElement>
      <FloatingElement className="top-32 right-32" delay={1}>
        <BrainIcon />
      </FloatingElement>
      <FloatingElement className="bottom-40 left-32" delay={2}>
        <StarIcon />
      </FloatingElement>
      <FloatingElement className="bottom-32 right-40" delay={0.5}>
        <BrainIcon />
      </FloatingElement>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 md:p-8">
        <motion.div
  className="max-w-7xl w-full bg-white rounded-3xl shadow-2xl border-4 border-black p-6 md:p-8 lg:p-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {stage === 'welcome' && (
            <div className="text-center py-12">
              <motion.div 
                initial={{ y: -30, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent">
                  {quizData.quiz.title}
                </h1>
                <p className="text-2xl text-gray-600 mb-8 italic">
                  {quizData.quiz.description}
                </p>
                <p className="text-lg text-black mb-12">
                  {totalQuestions} questions to discover your thinking patterns
                </p>
              </motion.div>

              <motion.button
                onClick={() => setStage('quiz')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full max-w-md mx-auto px-12 py-6 bg-black text-white text-2xl font-bold rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg"
              >
                Start Assessment
              </motion.button>
            </div>
          )}

          {stage === 'quiz' && (
            <div>
              {/* Progress Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-bold text-black">
                    Question {currentQuestion + 1}
                  </div>
                  <div className="text-lg text-gray-600">
                    {currentQuestion + 1} / {totalQuestions}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <motion.div 
                    className="h-full bg-black rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8 min-h-[220px] md:min-h-[260px]"
              >
                <h2 className="text-3xl md:text-4xl font-medium mb-4 text-center text-black leading-snug">
                  {quizData.quiz.questions[currentQuestion].question}
                </h2>

                <div className="space-y-3 mt-3">
                  {quizData.quiz.questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-6 text-left rounded-2xl border-2 border-black text-lg md:text-xl font-medium transition-all duration-200 relative ${
                        selectedAnswers[currentQuestion] === index
                          ? "bg-black text-white shadow-lg"
                          : "bg-gray-50 text-black hover:bg-gray-100 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers[currentQuestion] === index
                            ? "border-white bg-white"
                            : "border-gray-400"
                        }`}>
                          {selectedAnswers[currentQuestion] === index && (
                            <div className="w-3 h-3 md:w-3 md:h-3 rounded-full bg-black"></div>
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8">
                <motion.button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  whileHover={{ scale: currentQuestion === 0 ? 1 : 1.05 }}
                  whileTap={{ scale: currentQuestion === 0 ? 1 : 0.95 }}
                  className={`px-8 py-4 rounded-full font-bold border-3 border-black transition-all ${
                    currentQuestion === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-black hover:bg-gray-100 hover:shadow-md"
                  }`}
                >
                  ← Previous
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === -1}
                  whileHover={{ scale: selectedAnswers[currentQuestion] === -1 ? 1 : 1.05 }}
                  whileTap={{ scale: selectedAnswers[currentQuestion] === -1 ? 1 : 0.95 }}
                  className={`px-8 py-4 rounded-full font-bold border-3 border-black transition-all ${
                    selectedAnswers[currentQuestion] === -1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800 shadow-lg"
                  }`}
                >
                  {currentQuestion === totalQuestions - 1 ? 'Get Results →' : 'Next →'}
                </motion.button>
              </div>
            </div>
          )}

          {stage === 'results' && (
            <div className="text-center py-12">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                transition={{ type: "spring", duration: 0.6 }}
              >
                <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent">
                  {getResultMessage().title}
                </h1>
                <div className="text-5xl font-bold text-black mb-8">
                  {score} / {totalQuestions}
                </div>
                <div className="text-2xl text-gray-600 mb-2">
                  {Math.round((score / totalQuestions) * 100)}% Score
                </div>
              </motion.div>

              <div className="bg-gray-50 rounded-2xl p-8 mb-8 border-2 border-gray-200">
                <p className="text-xl text-gray-800 leading-relaxed">
                  {getResultMessage().message}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={restart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors font-bold text-lg border-3 border-black"
                >
                  Retake Quiz
                </motion.button>
                <motion.button
                  onClick={() => setStage('welcome')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black border-3 border-black px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-bold text-lg"
                >
                  Start Over
                </motion.button>
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-100 text-black border-3 border-black px-8 py-4 rounded-full hover:bg-gray-200 transition-colors font-bold text-lg"
                  >
                    Back to Home
                  </motion.button>
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default QuizPage;