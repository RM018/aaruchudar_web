'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Filter, Star, Clock, Layers, ArrowRight } from 'lucide-react';

interface Workshop {
  type: string;
  icon: string;
  title: string;
  items: string[];
  accent: string;
  duration?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  rating?: number;
  price?: string;
}

const WORKSHOPS: Workshop[] = [
  {
    type: 'psychological',
    icon: '🧠',
    title: 'Mind Architecture',
    accent: 'Psychological Pathway',
    items: [
      'Neural Detox Protocol',
      'Emotional Intelligence Engine',
      'Decision Matrix Optimization'
    ],
    duration: '2 days',
    level: 'Intermediate',
    rating: 4.8,
    price: '$199'
  },
  {
    type: 'intellectual',
    icon: '⚡',
    title: 'Cognitive Networks',
    accent: 'Intellectual Pathway',
    items: [
      'Critical Thinking Accelerator',
      'Deep Listening Protocols',
      'Conflict Resolution Engine'
    ],
    duration: '1 day',
    level: 'Beginner',
    rating: 4.7,
    price: '$149'
  },
  {
    type: 'innovative',
    icon: '🚀',
    title: 'Innovation Circuits',
    accent: 'Innovation Pathway',
    items: [
      'Creative Neural Networks',
      'Leadership Algorithm Labs',
      'Innovation Sprint Engine'
    ],
    duration: '2 days',
    level: 'Advanced',
    rating: 4.9,
    price: '$249'
  }
];

const PATHWAYS = ['All', 'Psychological', 'Intellectual', 'Innovation'] as const;

export default function HIWorkshopsPage() {
  const [activePathway, setActivePathway] = useState<(typeof PATHWAYS)[number]>('All');

  const filteredWorkshops = useMemo(() => {
    if (activePathway === 'All') return WORKSHOPS;
    const key = activePathway.toLowerCase();
    return WORKSHOPS.filter((w) => w.type === key);
  }, [activePathway]);

  return (
    <div className="min-h-screen bg-[#0b0e17] pt-16 md:pt-24 pb-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6">
        <Link
          href="/"
          className="absolute top-6 left-6 z-20 border border-purple-500/40 text-purple-300 flex items-center gap-2 px-4 py-2 rounded-md bg-transparent hover:bg-purple-600 hover:text-white transition"
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
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/hi-workshops-banner.jpg')" }}
          aria-hidden
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            HI <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">Workshops</span>
          </motion.h1>

          <motion.p
            className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Practical, immersive sessions to build clarity, cognition, and innovation skills.
          </motion.p>

          {/* Hero stat badges (matching courses page style) */}
          <motion.div className="mt-8 flex flex-wrap justify-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <span className="px-3 py-1 rounded-full text-xs md:text-sm border border-white/10 bg-white/5 text-gray-200">Hands-on & cohort-based</span>
            <span className="px-3 py-1 rounded-full text-xs md:text-sm border border-white/10 bg-white/5 text-gray-200">Certificate of completion</span>
            <span className="px-3 py-1 rounded-full text-xs md:text-sm border border-white/10 bg-white/5 text-gray-200">Action-focused sessions</span>
          </motion.div>
        </div>
      </header>

      {/* FILTERS BAR */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <Filter className="w-4 h-4" aria-hidden />
            <span className="text-sm">Filter by pathway</span>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Workshop pathways">
            {PATHWAYS.map((p) => (
              <button
                key={p}
                role="tab"
                aria-selected={activePathway === p}
                onClick={() => setActivePathway(p)}
                className={`px-3 py-2 rounded-md text-sm border transition ${
                  activePathway === p
                    ? 'border-purple-500 text-white bg-purple-600'
                    : 'border-white/10 text-gray-300 bg-white/5 hover:border-purple-400/40 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* WORKSHOPS GRID */}
      <main className="py-12 md:py-14 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
          {filteredWorkshops.map((w, index) => (
            <motion.article
              key={w.title}
              className="rounded-2xl p-7 flex flex-col backdrop-blur-md shadow-xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <span className="text-2xl">{w.icon}</span>
                  {w.title}
                </h3>
                {typeof w.rating === 'number' && (
                  <div className="flex items-center gap-1 text-yellow-400" aria-label={`${w.rating} out of 5 stars`}>
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <span className="text-sm">{w.rating}</span>
                  </div>
                )}
              </div>

              {/* accent / pathway */}
              <p className="text-gray-300 text-sm mb-4">{w.accent}</p>

              {/* badges */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {w.duration && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-gray-300">
                    <Clock className="w-3.5 h-3.5" /> {w.duration}
                  </span>
                )}
                {w.level && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-gray-300">
                    <Layers className="w-3.5 h-3.5" /> {w.level}
                  </span>
                )}
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-gray-300">
                  {activePathway === 'All' ? w.type.charAt(0).toUpperCase() + w.type.slice(1) : activePathway}
                </span>
              </div>

              {/* modules list */}
              <ul className="space-y-3 mb-8" aria-label={`${w.title} modules`}>
                {w.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-purple-400" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* price & CTA */}
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white text-lg font-bold" aria-label="Price">{w.price}</div>
                  <span className="text-xs text-gray-400">Includes materials & support</span>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={{ pathname: '/productpage', query: { workshop: w.title } }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-purple-500/40 text-purple-300 hover:bg-purple-600 hover:text-white transition font-medium"
                    aria-label={`Learn more about ${w.title}`}
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href={`/hi-workshops/${w.type}`}
                    className="px-4 py-3 rounded-md border border-white/10 text-gray-200 hover:bg-white/10 transition"
                    aria-label={`Explore ${w.title} pathway`}
                  >
                    Explore Path
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty state */}
        {filteredWorkshops.length === 0 && (
          <div className="max-w-7xl mx-auto mt-10 text-center text-gray-300">No workshops match this filter.</div>
        )}
      </main>
    </div>
  );
}
