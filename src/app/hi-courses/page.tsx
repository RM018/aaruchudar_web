'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Filter, Star, Clock, Layers } from 'lucide-react';

const programs = [
  {
    title: 'Clarity as Culture',
    description: 'Transform your mindset and create a culture of clear thinking and purposeful action in your personal and professional life.',
    features: [
      'Foundations of Clarity & Awareness',
      'Mindset Restructuring Techniques',
      'Practical Clarity Tools for Daily Use'
    ],
    duration: '8 weeks',
    level: 'Intermediate',
    price: '$299',
    category: 'Mindset',
    rating: 4.8,
  },
  {
    title: 'Decision Making Without Drama',
    description: 'Learn to make confident decisions without emotional overwhelm, stress, or analysis paralysis.',
    features: [
      'Understanding Decision Fatigue',
      'Emotional Detachment Methods',
      'Logical Decision Frameworks'
    ],
    duration: '6 weeks',
    level: 'Beginner',
    price: '$199',
    category: 'Decisions',
    rating: 4.7,
  },
  {
    title: 'Inner Focus in Noisy Worlds',
    description: 'Develop unshakeable focus and concentration skills to thrive in our distraction-filled modern world.',
    features: [
      'Attention Training Essentials',
      'Digital Discipline Techniques',
      'Deep Work System Implementation'
    ],
    duration: '10 weeks',
    level: 'Advanced',
    price: '$399',
    category: 'Focus',
    rating: 4.9,
  },
  {
    title: 'The Power of Listening',
    description: 'Transform your communication and relationships through the art of deep, active listening.',
    features: [
      'Difference Between Hearing & Listening',
      'Empathic Listening Practices',
      'Applied Listening Drills'
    ],
    duration: '6 weeks',
    level: 'Beginner',
    price: '$249',
    category: 'Communication',
    rating: 4.6,
  },
  {
    title: 'Intelligent Conflict & Recovery',
    description: 'Navigate conflicts intelligently and build stronger relationships through effective resolution strategies.',
    features: [
      'Understanding Conflict Structure',
      'Emotional Regulation Tools',
      'Resolution Strategy Frameworks'
    ],
    duration: '8 weeks',
    level: 'Intermediate',
    price: '$349',
    category: 'Communication',
    rating: 4.7,
  },
  {
    title: 'Systematic Thinking',
    description: 'Master the art of systematic thinking to solve complex problems with clarity and precision.',
    features: [
      'Systems Analysis Fundamentals',
      'Pattern Mapping & Recognition',
      'Strategic Planning Tools'
    ],
    duration: '10 weeks',
    level: 'Advanced',
    price: '$399',
    category: 'Thinking',
    rating: 4.8,
  },
  {
    title: 'Mind Architect',
    description: 'Advanced program on cognitive architecture and metacognition.',
    features: [
      'Cognitive System Design',
      'Advanced Mental Models',
      'Metacognitive Strategies',
      'Personalized Cognitive Enhancement Plan'
    ],
    duration: '12 weeks',
    level: 'Expert',
    price: '$2999',
    category: 'Thinking',
    rating: 5.0,
  }
];

const categories = ['All', 'Mindset', 'Decisions', 'Focus', 'Communication', 'Thinking'];

const HICoursesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredPrograms = useMemo(() => {
    if (activeCategory === 'All') return programs;
    return programs.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b0e17]" aria-live="polite" aria-busy>
        <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0e17] pt-16 md:pt-24 pb-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-purple-500/40 text-purple-300 bg-transparent hover:bg-purple-600 hover:text-white transition"
          aria-label="Go back to home"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Home</span>
        </Link>
      </div>

      {/* HERO SECTION */}
      <header className="relative flex items-center justify-center overflow-hidden py-24 md:py-28 px-6 min-h-[54vh]">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/hi-courses-banner.jpg')" }} aria-hidden />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            HI <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">Courses</span>
          </motion.h1>

          <motion.p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            Structured programs to build clarity, focus, and intelligent decision-making. Learn by doing with expert guidance.
          </motion.p>

          {/* Hero stat badges */}
          <motion.div className="mt-8 flex flex-wrap justify-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <span className="px-3 py-1 rounded-full text-xs md:text-sm border border-white/10 bg-white/5 text-gray-200">Cohort-based & self-paced</span>
            <span className="px-3 py-1 rounded-full text-xs md:text-sm border border-white/10 bg-white/5 text-gray-200">Certificate of completion</span>
            <span className="px-3 py-1 rounded-full text-xs md:text-sm border border-white/10 bg-white/5 text-gray-200">Lifetime access</span>
          </motion.div>
        </div>
      </header>

      {/* FILTERS BAR */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <Filter className="w-4 h-4" aria-hidden />
            <span className="text-sm">Filter by category</span>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Course categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-2 rounded-md text-sm border transition ${
                  activeCategory === cat
                    ? 'border-purple-500 text-white bg-purple-600'
                    : 'border-white/10 text-gray-300 bg-white/5 hover:border-purple-400/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* COURSE GRID */}
      <main className="py-12 md:py-14 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
          {filteredPrograms.map((program, index) => (
            <motion.article
              key={program.title}
              className="rounded-2xl p-7 flex flex-col backdrop-blur-md shadow-xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="text-2xl font-semibold text-white">{program.title}</h3>
                <div className="flex items-center gap-1 text-yellow-400" aria-label={`${program.rating} out of 5 stars`}>
                  <Star className="w-4 h-4 fill-yellow-400" />
                  <span className="text-sm">{program.rating}</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-6 flex-grow leading-relaxed">{program.description}</p>

              {/* badges */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-gray-300">
                  <Clock className="w-3.5 h-3.5" /> {program.duration}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-gray-300">
                  <Layers className="w-3.5 h-3.5" /> {program.level}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-gray-300">
                  {program.category}
                </span>
              </div>

              {/* features */}
              <ul className="space-y-3 mb-8" aria-label="Key features">
                {program.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-purple-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* price & CTA */}
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white text-lg font-bold" aria-label="Price">{program.price}</div>
                  <span className="text-xs text-gray-400">Includes resources & support</span>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={{ pathname: '/productpage', query: { course: program.title } }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-purple-500/40 text-purple-300 hover:bg-purple-600 hover:text-white transition font-medium"
                    aria-label={`Learn more about ${program.title}`}
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href={{ pathname: '/hi-labs' }}
                    className="px-4 py-3 rounded-md border border-white/10 text-gray-200 hover:bg-white/10 transition"
                    aria-label="Explore labs"
                  >
                    Explore Labs
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty state */}
        {filteredPrograms.length === 0 && (
          <div className="max-w-7xl mx-auto mt-10 text-center text-gray-300">No courses match this category.</div>
        )}
      </main>
    </div>
  );
};

export default HICoursesPage;
