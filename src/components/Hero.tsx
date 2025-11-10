'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(titleRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
      }, '-=0.3');

      // Floating animation (lighter)
      const floatingElements = floatingRef.current?.children;
      if (floatingElements) {
        Array.from(floatingElements).forEach((el, i) => {
          gsap.to(el, {
            y: '+=20',
            x: '+=15',
            rotation: 5,
            duration: 4 + i,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section ref={heroRef} className="hero-section-centered">
      <div ref={floatingRef} className="floating-bg">
        <div className="float-circle"></div>
        <div className="float-circle"></div>
        <div className="float-circle"></div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="hero-content-centered">
          <div className="hero-badge-center">🧠 AWAKEN HUMAN INTELLIGENCE</div>
          
          <h1 ref={titleRef} className="hero-title-center">
            <span>Welcome to</span>
            <span className="gradient-text">Mind Lab</span>
          </h1>
          
          <p ref={subtitleRef} className="hero-description-center">
            Discover your mental clarity and decision-making skills. 
            Explore powerful programs designed to enhance your cognitive abilities, 
            critical thinking, and personal growth through innovative learning experiences.
          </p>

          <div ref={ctaRef} className="hero-buttons-center">
            <Link href="/quiz" className="btn-primary-lg">
              🎯 Take the Quiz
            </Link>
            <button className="btn-outline-lg">
              🌐 Explore Website
            </button>
          </div>

          <div className="quiz-info">
            <h3>What's in the Quiz?</h3>
            <div className="quiz-features">
              <div className="quiz-item">• 15 thought-provoking questions</div>
              <div className="quiz-item">• Assessment of clarity and focus</div>
              <div className="quiz-item">• Personalized insights</div>
              <div className="quiz-item">• Takes about 15-20 minutes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
