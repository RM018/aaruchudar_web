"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

function QuizPage() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [stage, setStage] = useState<'welcome' | 'quiz' | 'results'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("/quiz-questions.json")
      .then((response) => response.json())
      .then((data: any) => {
        if (data && data.quiz && Array.isArray(data.quiz.questions)) {
          let qs = data.quiz.questions.map((q: any) => ({
            ...q,
            correctAnswer: q.correctAnswer ?? q.correct ?? -1,
          }));

          const shuffle = (arr: any[]) => {
            for (let i = arr.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
          };

          qs = shuffle(qs);
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
    
    fetch("/quiz-questions.json")
      .then((response) => response.json())
      .then((data: any) => {
        let qs = data.quiz.questions.map((q: any) => ({
          ...q,
          correctAnswer: q.correctAnswer ?? q.correct ?? -1,
        }));
        
        const shuffle = (arr: any[]) => {
          for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
          return arr;
        };
        
        qs = shuffle(qs);
        const TAKE = Math.min(15, qs.length);
        data.quiz.questions = qs.slice(0, TAKE);
        
        setQuizData(data);
        setSelectedAnswers(new Array(data.quiz.questions.length).fill(-1));
        setCurrentQuestion(0);
        setScore(0);
        setStage('quiz');
      });
  };

  const getResultMessage = () => {
    if (!quizData) return { title: "", message: "" };
    const { scoring } = quizData.quiz;
    
    for (const [key, range] of Object.entries(scoring)) {
      if (score >= range.min && score <= range.max) {
        return {
          title: key === 'excellent' ? 'Outstanding! 🎉' :
                 key === 'good' ? 'Great Job! 👏' :
                 key === 'fair' ? 'Good Effort! 👍' : 'Keep Learning! 📚',
          message: range.message
        };
      }
    }
    return { title: "Quiz Complete", message: "Thank you for taking the quiz!" };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 font-medium">Preparing your quiz...</p>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Quiz Unavailable</h2>
          <p className="text-slate-600 mb-8">We couldn't load the quiz questions. Please check your connection and try again.</p>
          <a href="/" className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all font-bold text-lg shadow-xl">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  const totalQuestions = quizData.quiz.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const answeredCount = selectedAnswers.filter(ans => ans !== -1).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center py-8 px-4">
      {/* Home Button */}
      <a
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-lg border border-white/20 group"
        aria-label="Go to Home"
      >
        <span className="text-xl">🏠</span>
        <span className="text-sm font-semibold hidden sm:inline">Home</span>
      </a>
      
      <div className="max-w-4xl w-full mx-auto">
        
        {/* Welcome Screen */}
        {stage === 'welcome' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {quizData.quiz.title}
            </h1>
            
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              {quizData.quiz.description}
            </p>

           
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
  
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStage('quiz')}
              className="w-full max-w-md mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl"
            >
              Start Challenge
            </motion.button>
          </motion.div>
        )}

        {/* Quiz Screen */}
        {stage === 'quiz' && (
          <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg px-8 py-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{currentQuestion + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-lg">Question {currentQuestion + 1} of {totalQuestions}</h3>
                    <p className="text-slate-600">{answeredCount} answered</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="w-32 bg-slate-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Question & Options */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-10xl text-center bg-white rounded-2xl p-8 shadow-lg"
                >
                  {/* Question */}
                  <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-relaxed tracking-tight font-serif" style={{ marginBottom: '1cm' }}>
                    {quizData.quiz.questions[currentQuestion].question}
                  </h2>

                  {/* Options */}
                  <div className="grid gap-3 w-full px-4">
                    {quizData.quiz.questions[currentQuestion].options.map((option, index) => {
                      const isSelected = selectedAnswers[currentQuestion] === index;
                      const optionLetter = String.fromCharCode(65 + index);
                      
                      return (
                        <motion.button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full max-w-full p-8 text-left rounded-3xl transition-all ${
                            isSelected
                              ? "bg-indigo-50 border-2 border-indigo-600 shadow-lg"
                              : "bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-8">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 font-bold text-2xl transition-all ${
                              isSelected
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}>
                              {optionLetter}
                            </div>
                            <span className="text-2xl font-normal leading-relaxed text-left flex-1 text-slate-800">{option}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl shadow-lg px-8 py-8 flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-3 ${
                  currentQuestion === 0
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-300"
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === -1}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-3 ${
                  selectedAnswers[currentQuestion] === -1
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-xl"
                }`}
              >
                {currentQuestion === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        )}

        {/* Results Screen */}
        {stage === 'results' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
            >
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>

            <h1 className="text-5xl font-bold text-slate-900 mb-4">
              {getResultMessage().title}
            </h1>
            <p className="text-xl text-slate-600 mb-12">You've completed the challenge!</p>

            {/* Score Display */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 mb-8 border border-indigo-100">
              <div className="text-center">
                <div className="text-6xl font-bold text-indigo-600 mb-4">
                  {score}<span className="text-3xl text-slate-600">/{totalQuestions}</span>
                </div>
                <div className="text-2xl font-semibold text-slate-700 mb-6">
                  {Math.round((score / totalQuestions) * 100)}% Correct
                </div>
                
                <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / totalQuestions) * 100}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Result Message */}
            <div className="bg-slate-50 rounded-2xl p-8 mb-12 border border-slate-200">
              <p className="text-xl text-slate-700 leading-relaxed">
                {getResultMessage().message}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restart}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl"
              >
                Try Again
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStage('welcome')}
                className="bg-white text-slate-700 py-5 rounded-2xl font-bold text-lg border-2 border-slate-300 hover:bg-slate-50 transition-all"
              >
                New Quiz
              </motion.button>
              
              <a
                href="/"
                className="bg-slate-100 text-slate-700 py-5 rounded-2xl font-bold text-lg border-2 border-slate-200 hover:bg-slate-200 transition-all text-center inline-flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return <QuizPage />;
}