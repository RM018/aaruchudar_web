'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      gsap.from('.integration-card', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.integration-grid',
          start: 'top 80%',
        },
      });

      gsap.from('.stat-box', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  const integrations = [
    '📦', '📝', '💬', '💰', '🎨', '📧',
    '🔍', '✓', '📹', '🍎', '💳', '🐙'
  ];

  return (
    <section ref={sectionRef}>
      {/* HI Events Section */}
      <div className="integration-section">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="integration-title">HI Events & Community</h2>
            <p className="integration-subtitle">
              Join our vibrant community through engaging webinars, meetups,<br />
              and our annual summit dedicated to awakening human intelligence.
            </p>
            <button className="btn-link">Explore Events →</button>
          </div>
          
          <div className="integration-grid">
            {integrations.map((icon, i) => (
              <div key={i} className="integration-card">
                <span className="integration-icon">{icon}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="testimonial-section">
        <div className="container mx-auto px-6 py-20">
          <div className="testimonial-box">
            <div className="quote-mark">"</div>
            <blockquote>
              Aaruchudar has transformed my approach to learning and self-development. 
              The Mind Lab assessment gave me incredible insights into my cognitive patterns, 
              and the programs have helped me unlock potential I didn't know I had.
            </blockquote>
            <div className="author">
              <div className="author-avatars">
                <div className="avatar-circle"></div>
                <div className="avatar-circle"></div>
              </div>
              <div>
                <div className="author-name">Sarah Johnson</div>
                <div className="author-role">Program Participant</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-section">
        <div className="container mx-auto px-6 py-16">
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-value">8</div>
              <div className="stat-label">Innovation Labs</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">100+</div>
              <div className="stat-label">Active Learners</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">50+</div>
              <div className="stat-label">Workshops Conducted</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA removed per request */}
    </section>
  );
}
