import React from 'react';
import Link from "next/link";
import Image from "next/image";

// ======================= DATA =======================
const features = [
  {
    icon: "/file.svg",
    title: "Cognitive Depth",
    text: "Frameworks anchored in neuroscience & behavioral research.",
  },
  {
    icon: "/window.svg",
    title: "Rapid Iteration",
    text: "Short feedback loops accelerate measurable progress.",
  },
  {
    icon: "/gem.png",
    title: "Adaptive Pathways",
    text: "Personalized sequencing based on assessment signals.",
  },
  {
    icon: "/globe.svg",
    title: "Community Network",
    text: "Peer insights & expert guidance amplify retention.",
  },
];

const stats = [
  { value: "9", label: "Intelligence Labs" },
  { value: "100+", label: "Active Learners" },
  { value: "50+", label: "Workshops" },
  { value: "98%", label: "Positive Feedback" },
];

// ======================= COMPONENT =======================
export default function Landing() {
  return (
    <>

      {/* ================= HERO SECTION ================= */}
      <header className="relative isolate overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 text-slate-900">
        
        {/* Glowing Orb Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.16),transparent_60%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-28 lg:px-8">
          <div className="max-w-3xl space-y-6">

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl leading-tight">
              Unlock <span className="text-cyan-600">Human Intelligence</span>
            </h1>

            <p className="text-lg text-slate-700 leading-relaxed">
              Structured programs, research-driven methods, and continuous assessments that elevate 
              clarity, decision-making, and innovation.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/quiz"
                className="rounded-xl bg-cyan-600 text-white px-6 py-3 shadow-lg hover:bg-cyan-500 active:scale-[0.98] transition-all flex items-center gap-2"
              >
                🧠 Take Free Assessment
              </Link>

              <Link
                href="/hi-labs"
                className="rounded-xl border border-slate-300 backdrop-blur bg-white/70 px-6 py-3 hover:bg-slate-100 shadow-md flex items-center gap-2"
              >
                🔬 Explore Labs
              </Link>
            </div>

            <div className="mt-10 flex gap-6 text-xs text-slate-500 flex-wrap">
              {["Daily Quizzes", "Expert Designed", "Personalized Feedback"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  {item}
                </div>
              ))}
            </div>

          </div>
        </div>
      </header>

      {/* ================= VALUE FEATURES ================= */}
      {/* Removed "Why It Works" section */}

      {/* ================= STATS ================= */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-slate-100 p-8 text-center shadow-lg border border-slate-200"
            >
              <div className="text-4xl font-black text-indigo-700">{s.value}</div>
              <div className="mt-2 text-sm font-medium text-slate-700">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">

          <div className="rounded-2xl bg-white/10 backdrop-blur-xl p-12 shadow-2xl border border-white/20">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Start Your Cognitive Upgrade
            </h2>

            <p className="mt-4 text-slate-200 leading-relaxed">
              Take a complimentary baseline assessment and receive 
              a personalized roadmap built to accelerate your growth.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/quiz"
                className="bg-white text-slate-900 px-7 py-3 rounded-xl font-semibold shadow-lg 
                           hover:bg-slate-100 transition-all"
              >
                Take Assessment
              </Link>

              <Link
                href="/blog"
                className="bg-white/20 border border-white/30 backdrop-blur px-7 py-3 rounded-xl font-semibold 
                           hover:bg-white/25 transition-all"
              >
                Explore Insights
              </Link>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
