"use client";

import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// lightweight click sound
const ding = typeof window !== "undefined" ? new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQgAAAA=") : null;

/* --------------------------- Types & Interfaces --------------------------- */

interface QuizQuestion {
  id: number;
  question: string;
  type: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizData {
  quiz: {
    title: string;
    description: string;
    timeLimit?: number;
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

/* ----------------------------- Helpers & Config --------------------------- */

const shuffleArray = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const spring = { type: "spring" as const, stiffness: 500, damping: 28 };

/* ------------------------------- Main Page -------------------------------- */

function QuizPage(): JSX.Element {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [stage, setStage] = useState<"welcome" | "quiz" | "results" | "review">("welcome");
  const [loading, setLoading] = useState(true);
  // theme toggle
  const [theme, setTheme] = useState<"emerald" | "orange">(() => (typeof window !== "undefined" && localStorage.getItem("quiz_theme") === "orange" ? "orange" : "emerald"));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  // timer & pause
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  // lifelines
  const [lifelines, setLifelines] = useState({ fifty: 1, skip: 1 });
  const [hiddenOptions, setHiddenOptions] = useState<Record<number, number[]>>({});

  // streak
  const [streak, setStreak] = useState(0);

  // restore session
  useEffect(() => {
    try {
      const saved = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("quiz_state") || "null") : null;
      if (saved?.quizData) {
        setQuizData(saved.quizData);
        setSelectedAnswers(saved.selectedAnswers);
        setCurrentQuestion(saved.currentQuestion);
        setScore(saved.score || 0);
        setStage(saved.stage || "quiz");
        setTimeLeft(saved.timeLeft ?? null);
        setPaused(false);
        setHiddenOptions(saved.hiddenOptions || {});
        setLifelines(saved.lifelines || { fifty: 1, skip: 1 });
        return;
      }
    } catch {}
    // load fresh
    loadQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist session
  useEffect(() => {
    const payload = { quizData, selectedAnswers, currentQuestion, score, stage, timeLeft, hiddenOptions, lifelines };
    try { if (typeof window !== "undefined") localStorage.setItem("quiz_state", JSON.stringify(payload)); } catch {}
  }, [quizData, selectedAnswers, currentQuestion, score, stage, timeLeft, hiddenOptions, lifelines]);

  const loadQuiz = async () => {
    setLoading(true);
    try {
      const res = await fetch("/quiz-questions.json");
      const data: any = await res.json();

      if (data?.quiz?.questions && Array.isArray(data.quiz.questions)) {
        let qs = data.quiz.questions.map((q: any) => ({
          ...q,
          correctAnswer: q.correctAnswer ?? q.correct ?? -1,
        }));

        qs = shuffleArray(qs);
        const TAKE = Math.min(15, qs.length);
        data.quiz.questions = qs.slice(0, TAKE);
      }

      setQuizData(data);
      setSelectedAnswers(new Array(data?.quiz?.questions?.length ?? 0).fill(-1));
      setCurrentQuestion(0);
      // setup timeLimit
      const tl = data?.quiz?.timeLimit ?? 300; // default 5 min
      setTimeLeft(tl);
      setStage("quiz");
      setHiddenOptions({});
      setLifelines({ fifty: 1, skip: 1 });
    } catch (err) {
      console.error("Error loading quiz data:", err);
      setQuizData(null);
    } finally {
      setLoading(false);
    }
  };

  // timer tick
  useEffect(() => {
    if (timeLeft == null || paused || stage !== "quiz") return;
    timerRef.current = window.setInterval(() => setTimeLeft((t) => (t != null ? Math.max(0, t - 1) : t)), 1000);
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [timeLeft, paused, stage]);

  useEffect(() => {
    if (timeLeft === 0 && stage === "quiz") handleSubmit();
  }, [timeLeft, stage]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers((prev) => {
      const nxt = [...prev];
      nxt[currentQuestion] = answerIndex;
      return nxt;
    });
    if (ding) { try { ding.currentTime = 0; ding.play(); } catch {} }
  };

  const handleNext = () => {
    if (!quizData) return;
    if (currentQuestion < quizData.quiz.questions.length - 1) {
      setCurrentQuestion((c) => c + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion((c) => c - 1);
  };

  const handleSubmit = () => {
    if (!quizData) return;
    let correct = 0;
    selectedAnswers.forEach((ans, idx) => {
      if (ans === quizData.quiz.questions[idx].correctAnswer) correct++;
    });
    setScore(correct);
    setStage("results");
    // compute streak
    if (!quizData) return;
    let s = 0;
    selectedAnswers.forEach((ans, idx) => {
      if (ans === quizData.quiz.questions[idx].correctAnswer) s++; else s = 0;
    });
    setStreak(s);
  };

  const restart = async () => {
    setLoading(true);
    try {
      const res = await fetch("/quiz-questions.json");
      const data: any = await res.json();

      if (data?.quiz?.questions && Array.isArray(data.quiz.questions)) {
        let qs = data.quiz.questions.map((q: any) => ({
          ...q,
          correctAnswer: q.correctAnswer ?? q.correct ?? -1,
        }));

        qs = shuffleArray(qs);
        const TAKE = Math.min(15, qs.length);
        data.quiz.questions = qs.slice(0, TAKE);
      }

      setQuizData(data);
      setSelectedAnswers(new Array(data?.quiz?.questions?.length ?? 0).fill(-1));
      setCurrentQuestion(0);
      setScore(0);
      setStage("quiz");
      setTimeLeft(data?.quiz?.timeLimit ?? 300);
      setPaused(false);
      setHiddenOptions({});
      setLifelines({ fifty: 1, skip: 1 });
    } catch (err) {
      console.error("Error restarting quiz:", err);
    } finally {
      setLoading(false);
    }
  };

  const getResultMessage = () => {
    if (!quizData) return { title: "", message: "" };
    const { scoring } = quizData.quiz;
    for (const [k, range] of Object.entries(scoring)) {
      if (score >= range.min && score <= range.max) {
        const title =
          k === "excellent"
            ? "Brilliant!"
            : k === "good"
            ? "Nice Work!"
            : k === "fair"
            ? "Not Bad!"
            : "Keep Practicing!";
        return { title: `${title} 🎉`, message: range.message };
      }
    }
    return { title: "Done!", message: "Thanks for taking the quiz." };
  };

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (stage !== "quiz") return;
      if (e.key === "ArrowRight") { handleNext(); }
      if (e.key === "ArrowLeft") { handlePrevious(); }
      const idxMap: Record<string, number> = { "1": 0, "2": 1, "3": 2, "4": 3 };
      if (idxMap[e.key] != null && selectedAnswers[currentQuestion] === -1) handleAnswerSelect(idxMap[e.key]);
      if (e.key.toLowerCase() === "p") setPaused((p) => !p);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, currentQuestion, selectedAnswers]);

  // confetti on results (dynamic import)
  useEffect(() => {
    if (stage !== "results") return;
    (async () => {
      try {
        const confetti = (await import("canvas-confetti")).default;
        confetti({ particleCount: 140, spread: 70, origin: { y: 0.6 } });
      } catch {
        // ignore if not installed
      }
    })();
  }, [stage]);

  /* ----------------------------- derived values ---------------------------- */
  const totalQuestions = quizData?.quiz?.questions?.length ?? 0;
  const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;
  const answeredCount = selectedAnswers.filter((a) => a !== -1).length;
  const current = quizData && totalQuestions > 0 ? quizData.quiz.questions[currentQuestion] : null;
  const themeClasses = useMemo(() => {
    const t = theme === "orange" ? {
      primary: "orange-600",
      primarySoft: "orange-500",
      ring: "orange-100",
      bgFrom: "from-orange-50",
    } : {
      primary: "emerald-600",
      primarySoft: "emerald-500",
      ring: "emerald-100",
      bgFrom: "from-emerald-50",
    };
    return t;
  }, [theme]);

  const hiddenForCurrent = (current ? hiddenOptions[currentQuestion] : []) || [];

  /* ------------------------------- render --------------------------------- */

  return (
    <div className={`min-h-screen bg-gradient-to-b ${themeClasses.bgFrom} to-white pt-16 md:pt-24 pb-20`}>
      {/* top-left Home */}
      <a
        href="/"
        aria-label="Home"
        className="fixed left-6 top-6 z-50 inline-flex items-center gap-2 bg-white shadow rounded-full px-4 py-2 border border-slate-200 hover:scale-105 transition"
      >
        <span className="text-lg">🏠</span>
        <span className="hidden sm:inline text-sm font-medium">Home</span>
      </a>

      {/* main content switch: loading / error / quiz */}
      {loading ? (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-emerald-400/20 flex items-center justify-center animate-bounce shadow-lg">
              <svg className="w-12 h-12 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 2l2 5 5 .4-4 3 1.2 5L12 14l-4.2 1.4L9 10 5 7.6 10 7 12 2z" />
              </svg>
            </div>
            <div className="text-emerald-700 font-semibold text-lg">Preparing your quiz...</div>
          </div>
        </div>
      ) : !quizData ? (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-lg text-center">
            <div className="w-20 h-20 rounded-full bg-red-100 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Quiz failed to load</h2>
            <p className="text-slate-600 mb-6">Try refreshing or check connection.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={loadQuiz} className="px-4 py-2 rounded-full bg-emerald-500 text-white font-semibold shadow">Retry</button>
              <a href="/" className="px-4 py-2 rounded-full bg-white border border-slate-200">Home</a>
            </div>
          </div>
        </div>
      ) : (
        // quiz UI when data is loaded
        <>
          {/* decorative mascot top-right + theme toggle */}
          <div className="fixed right-6 top-6 z-40 flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: [1, 1.04, 1], rotate: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className={`w-16 h-16 rounded-full bg-${themeClasses.primarySoft} flex items-center justify-center shadow-2xl`}
              title="Mascot"
              aria-hidden
            >
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" fill="transparent" />
                <path d="M8 11c.8 1.2 2.4 1.2 3 0" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9.2" cy="9.2" r="0.9" fill="white" />
                <circle cx="14.8" cy="9.2" r="0.9" fill="white" />
              </svg>
            </motion.div>
            <button
              onClick={() => { const next = theme === "emerald" ? "orange" : "emerald"; setTheme(next); try { localStorage.setItem("quiz_theme", next); } catch {} }}
              className="px-3 py-2 rounded-full bg-white border border-slate-200 shadow text-sm"
            >
              Toggle Theme
            </button>
          </div>

          {/* full-page centered card */}
          <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-6">
            <div className="w-full max-w-5xl">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* header area with timer */}
                <div className={`px-8 py-6 flex items-center justify-between gap-4 border-b border-${themeClasses.ring} bg-${themeClasses.bgFrom.replace("from-", "")}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-${themeClasses.primarySoft} flex items-center justify-center text-white font-extrabold text-lg shadow-lg`}>Q</div>
                    <div>
                      <h1 className="text-2xl font-extrabold text-slate-800">{quizData.quiz.title}</h1>
                      <p className="text-sm text-slate-600">{quizData.quiz.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-sm text-slate-600 text-right">
                      <div className="text-xs">Answered</div>
                      <div className="font-semibold">{answeredCount}/{totalQuestions}</div>
                    </div>

                    <div className="text-sm text-slate-700 flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-slate-100">⏱ {timeLeft ?? "--"}s</span>
                      <button onClick={() => setPaused((p) => !p)} className="px-2 py-1 rounded bg-white border border-slate-200">{paused ? "Resume" : "Pause"}</button>
                    </div>

                    <div className="w-44 bg-white rounded-full h-3 border border-slate-100 overflow-hidden">
                      <motion.div
                        className={`h-full bg-${themeClasses.primarySoft} shadow-[0_6px_20px_rgba(16,185,129,0.18)]`}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>

                {/* main content - immersive */}
                <div className={`px-10 py-10 bg-gradient-to-b from-white ${theme === "emerald" ? "to-emerald-50" : "to-orange-50"} min-h-[460px]`}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* left column: question index + lifelines + map */}
                    <div className="space-y-6">
                      <div className="flex items-start justify-center lg:justify-start">
                        <div className={`w-20 h-20 rounded-full bg-white border border-slate-100 flex items-center justify-center text-2xl font-extrabold text-${themeClasses.primarySoft} shadow`}>
                          {currentQuestion + 1}
                        </div>
                      </div>
                      {/* lifelines */}
                      <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                        <div className="text-sm font-semibold text-slate-700 mb-2">Lifelines</div>
                        <div className="flex gap-3">
                          <button
                            disabled={lifelines.fifty <= 0 || selectedAnswers[currentQuestion] !== -1}
                            onClick={() => {
                              if (!quizData) return;
                              const correct = quizData.quiz.questions[currentQuestion].correctAnswer;
                              const indices = quizData.quiz.questions[currentQuestion].options.map((_, i) => i).filter(i => i !== correct);
                              const toHide = indices.sort(() => 0.5 - Math.random()).slice(0, 2);
                              setHiddenOptions((prev) => ({ ...prev, [currentQuestion]: toHide }));
                              setLifelines((l) => ({ ...l, fifty: Math.max(0, l.fifty - 1) }));
                            }}
                            className="px-3 py-2 rounded-full bg-white border border-slate-200 text-sm disabled:opacity-40"
                          >50/50 ({lifelines.fifty})</button>
                          <button
                            disabled={lifelines.skip <= 0}
                            onClick={() => { setLifelines((l) => ({ ...l, skip: Math.max(0, l.skip - 1) })); handleNext(); }}
                            className="px-3 py-2 rounded-full bg-white border border-slate-200 text-sm disabled:opacity-40"
                          >Skip ({lifelines.skip})</button>
                        </div>
                      </div>

                      {/* progress map */}
                      <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                        <div className="text-sm font-semibold text-slate-700 mb-2">Progress Map</div>
                        <div className="grid grid-cols-5 gap-2">
                          {quizData.quiz.questions.map((_, i) => {
                            const answered = selectedAnswers[i] !== -1;
                            const active = i === currentQuestion;
                            return (
                              <button key={i} onClick={() => setCurrentQuestion(i)}
                                className={`h-8 rounded-md border text-xs ${active ? `border-${themeClasses.primarySoft} bg-${themeClasses.ring}` : answered ? "border-slate-200 bg-slate-50" : "border-slate-100 bg-white"}`}
                              >{i + 1}</button>
                            );
                          })}
                        </div>
                      </div>

                      {/* streak */}
                      <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex items-center justify-between">
                        <div className="text-sm text-slate-700">Streak</div>
                        <div className={`flex-1 ml-3 h-2 bg-slate-100 rounded-full overflow-hidden`}>
                          <motion.div className={`h-full bg-${themeClasses.primarySoft}`} initial={{ width: 0 }} animate={{ width: `${Math.min(100, streak * 10)}%` }} />
                        </div>
                      </div>
                    </div>

                    {/* center column: question + options (big) */}
                    <div className="lg:col-span-2">
                      {/* ensure current exists */}
                      {current && (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={spring}
                            className="bg-white rounded-2xl p-6 shadow-md border border-slate-100"
                          >
                            <div className="mb-6">
                              <div className="text-xs text-slate-500 mb-2">Question</div>
                              <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 leading-snug">{current.question}</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {current.options.map((opt, idx) => {
                                if (hiddenForCurrent.includes(idx)) return <div key={idx} className="opacity-30 border border-dashed rounded-2xl p-5"></div>;
                                const isSelected = selectedAnswers[currentQuestion] === idx;
                                const letter = String.fromCharCode(65 + idx);
                                return (
                                  <motion.button
                                    key={idx}
                                    onClick={() => handleAnswerSelect(idx)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={spring}
                                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left shadow-sm transition ${
                                      isSelected
                                        ? `bg-${themeClasses.primarySoft}/90 text-white border-${themeClasses.primarySoft} shadow-lg`
                                        : "bg-white text-slate-800 border-slate-100 hover:shadow-md"
                                    }`}
                                    aria-pressed={isSelected}
                                  >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                                      isSelected ? "bg-white text-slate-900" : `bg-${themeClasses.ring} text-slate-900`
                                    }`}>
                                      {letter}
                                    </div>

                                    <div className="flex-1">
                                      <div className={`text-md font-semibold ${isSelected ? "text-white" : "text-slate-800"}`}>{opt}</div>
                                    </div>

                                    {isSelected && (
                                      <div className="text-white">
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                      </div>
                                    )}
                                  </motion.button>
                                );
                              })}
                            </div>

                            {/* navigation & progress */}
                            <div className="mt-6 flex items-center justify-between gap-4">
                              <button
                                onClick={handlePrevious}
                                disabled={currentQuestion === 0}
                                className={`px-4 py-2 rounded-full font-semibold ${currentQuestion === 0 ? "opacity-40 cursor-not-allowed bg-white border border-slate-100" : "bg-white border border-slate-100 hover:shadow-md"}`}
                              >
                                ← Back
                              </button>

                              <div className="flex items-center gap-4">
                                <div className="text-sm text-slate-600 hidden sm:block">{answeredCount}/{totalQuestions} answered</div>
                                <button
                                  onClick={handleNext}
                                  disabled={selectedAnswers[currentQuestion] === -1}
                                  className={`px-6 py-3 rounded-full font-bold text-white ${selectedAnswers[currentQuestion] === -1 ? `bg-${themeClasses.ring} opacity-60 cursor-not-allowed` : `bg-${themeClasses.primarySoft} shadow-md hover:scale-105`}`}
                                >
                                  {currentQuestion === totalQuestions - 1 ? "Finish" : "Next"}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </div>
                  </div>
                </div>

                {/* footer */}
                <div className="px-8 py-4 flex items-center justify-between bg-white/60 border-t border-slate-100">
                  <div className="text-sm text-slate-600">Aaruchudar Quiz</div>

                  <div className="flex items-center gap-3">
                    <button onClick={restart} className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-800 shadow-sm">Restart</button>
                    <a href="/" className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-800">Home</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* results modal / screen overlay */}
          <AnimatePresence>
            {stage === "results" && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-full max-w-2xl bg-white rounded-3xl p-8 text-center shadow-2xl"
                  initial={{ scale: 0.98, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.98, y: 20 }}
                  transition={spring}
                >
                  <div className="mx-auto w-24 h-24 rounded-full bg-green-600 flex items-center justify-center text-white text-4xl shadow-xl mb-4">🎉</div>
                  <h2 className="text-2xl font-extrabold">{getResultMessage().title}</h2>
                  <p className="text-slate-600 mt-2 mb-6">{getResultMessage().message}</p>

                  <div className="bg-green-50 rounded-2xl p-4 mb-6">
                    <div className="text-4xl font-extrabold text-green-700">{score}<span className="text-base text-slate-500">/{totalQuestions}</span></div>
                    <div className="text-sm text-slate-500">{Math.round((score / totalQuestions) * 100)}% correct</div>

                    <div className="relative mt-3 h-3 bg-white rounded-full overflow-hidden border border-white/30">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-green-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${(score / totalQuestions) * 100}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button onClick={() => { restart(); }} className="px-5 py-3 rounded-full bg-green-600 text-white font-bold shadow">Try Again</button>
                    <button onClick={() => { setStage("review"); }} className="px-5 py-3 rounded-full bg-white border border-slate-200">Review Answers</button>
                    <a href="/" className="px-5 py-3 rounded-full bg-white border border-slate-200">Home</a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* review modal */}
          <AnimatePresence>
            {stage === "review" && (
              <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div className="w-full max-w-3xl bg-white rounded-3xl p-6 shadow-2xl" initial={{ scale: 0.98, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.98, y: 20 }} transition={spring}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Review</h3>
                    <button onClick={() => setStage("welcome")} className="px-3 py-2 rounded bg-white border border-slate-200">Close</button>
                  </div>
                  <div className="space-y-4 max-h-[60vh] overflow-auto pr-2">
                    {quizData.quiz.questions.map((q, i) => {
                      const chosen = selectedAnswers[i];
                      const correct = q.correctAnswer;
                      const isCorrect = chosen === correct;
                      return (
                        <div key={q.id ?? i} className="rounded-xl border border-slate-200 p-4">
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 rounded text-xs ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{isCorrect ? "Correct" : "Incorrect"}</span>
                            <div className="text-sm text-slate-500">Q{i + 1}</div>
                          </div>
                          <div className="mt-2 font-semibold text-slate-800">{q.question}</div>
                          <ul className="mt-2 space-y-2">
                            {q.options.map((o, oi) => (
                              <li key={oi} className={`px-3 py-2 rounded border text-sm ${oi === correct ? "bg-green-50 border-green-200" : oi === chosen ? "bg-red-50 border-red-200" : "bg-white border-slate-200"}`}>{String.fromCharCode(65 + oi)}. {o}</li>
                            ))}
                          </ul>
                          {q.explanation && <div className="mt-2 text-sm text-slate-600">{q.explanation}</div>}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

/* ------------------------------- Default Export --------------------------- */

export default function Page(): JSX.Element {
  return <QuizPage />;
}
