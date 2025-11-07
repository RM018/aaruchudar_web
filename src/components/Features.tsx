'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      gsap.from('.feature-card-link', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.features-grid-four',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section ref={sectionRef} className="features-section-modern">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="section-badge">✨ OUR PROGRAMS</span>
          <h2 className="section-title">
            Comprehensive Learning<br />Experiences for Growth
          </h2>
          <p className="section-subtitle">
            Explore our innovative programs designed to enhance mental clarity,<br />
            decision-making skills, and unlock your full human potential.
          </p>
        </div>

        <div className="features-grid-four">
          <Link href="/hi-labs" className="feature-card-link">
            <div className="feature-card-content">
              <div className="feature-header">
                <div className="feature-icon green">🔬</div>
                <h3>HI Labs</h3>
              </div>
              <p>Cutting-edge research and innovation spaces where ideas transform into breakthrough solutions for cognitive enhancement.</p>
              <div className="feature-link-arrow green">Explore Labs →</div>
            </div>
          </Link>

          <Link href="/hi-courses" className="feature-card-link">
            <div className="feature-card-content">
              <div className="feature-header">
                <div className="feature-icon orange">📚</div>
                <h3>HI Courses</h3>
              </div>
              <p>Comprehensive learning programs covering intellectual, innovative, and psychological development.</p>
              <div className="feature-link-arrow orange">View Courses →</div>
            </div>
          </Link>

          <Link href="/hi-workshops" className="feature-card-link">
            <div className="feature-card-content">
              <div className="feature-header">
                <div className="feature-icon blue">🎯</div>
                <h3>HI Workshops</h3>
              </div>
              <p>Interactive skill-building sessions focused on self-mastery, leadership, mindfulness, and creative intelligence.</p>
              <div className="feature-link-arrow blue">View Workshops →</div>
            </div>
          </Link>

          <Link href="/hi-events" className="feature-card-link">
            <div className="feature-card-content">
              <div className="feature-header">
                <div className="feature-icon purple">🎪</div>
                <h3>HI Events</h3>
              </div>
              <p>Community gatherings, webinars, and conferences designed to connect and inspire learners worldwide.</p>
              <div className="feature-link-arrow purple">View Events →</div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
