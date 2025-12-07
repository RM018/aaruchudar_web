'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import './hero.css';
import type { RegionKey } from './interactive-brain/InteractiveBrain';
import { REGION_INFO } from './interactive-brain/InteractiveBrain';

const BrainShowpiece = dynamic(() => import('./interactive-brain/BrainShowpiece'), { ssr: false });

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const brainRef = useRef<HTMLDivElement | null>(null);
  const [particles, setParticles] = useState<Array<any>>([]);
  const [activeRegions, setActiveRegions] = useState<RegionKey[]>([]);
  const [currentRegionIndex, setCurrentRegionIndex] = useState(0);
  const regionOrder: RegionKey[] = Object.keys(REGION_INFO) as RegionKey[];

  // Auto-cycle brain parts on hero
  useEffect(() => {
    if (regionOrder.length === 0) return;
    // initialize first region
    setActiveRegions([regionOrder[0]]);
    const interval = setInterval(() => {
      setCurrentRegionIndex((prev) => {
        const next = (prev + 1) % regionOrder.length;
        setActiveRegions([regionOrder[next]]);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function handleRegionSelect(region: RegionKey | null) {
    // Ignore manual selection on hero, keep auto cycle
    return;
  }

  const regionColorsOverride: Partial<Record<RegionKey, number>> = {
    Frontal: 0xFF5A5F,     // Airbnb Coral
    Parietal: 0x2DBE7F,    // Mint Green
    Temporal: 0xF9A825,    // Amber
    Occipital: 0x1E88E5,   // Blue
    Cerebellum: 0x8E24AA,  // Purple
    Brainstem: 0x26C6DA,   // Teal
  };

  // build richer particles with variants
  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particleCount = prefersReducedMotion ? 16 : 42;
    const colors = ['c1', 'c2', 'c3', 'c4', 'c5'];
    const sizes = ['s1', 's2', 's3', 's4'];
    setParticles(
      [...Array(particleCount)].map(() => {
        const left = `${Math.random() * 100}%`;
        const delay = `${Math.random() * 8}s`;
        const duration = `${14 + Math.random() * 12}s`;
        const scale = 0.8 + Math.random() * 0.6;
        const drift = `${Math.random() * 18 + 6}px`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        return { left, delay, duration, scale, drift, color, size } as any;
      })
    );
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        const tl = gsap.timeline();
        tl.from(titleRef.current?.children || [], {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
        });
        tl.from(
          subtitleRef.current,
          { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.45'
        );
        tl.from(
          ctaRef.current?.children || [],
          { y: 16, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
          '-=0.35'
        );
      }

      if (!prefersReducedMotion) {
        const floats = floatingRef.current?.children;
        if (floats) {
          Array.from(floats).forEach((el, i) => {
            gsap.to(el, {
              y: `${10 + (i % 3) * 6}px`,
              x: i % 2 === 0 ? '8px' : '-8px',
              rotation: i % 2 === 0 ? 2 : -2,
              duration: 6 + (i % 4),
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          });
        }

        if (brainRef.current) {
          gsap.to(brainRef.current, {
            scale: 1.06,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }
      }

      const moveHandler = (e: PointerEvent) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const clientX = 'clientX' in e ? e.clientX : 0;
        const clientY = 'clientY' in e ? e.clientY : 0;
        const pxLocal = (clientX - rect.left) / rect.width - 0.5;
        const pyLocal = (clientY - rect.top) / rect.height - 0.5;

        if (!prefersReducedMotion) {
          const floatEls = document.querySelectorAll('.float-circle');
          floatEls.forEach((el, idx) => {
            const x = (idx % 2 === 0 ? pxLocal * 40 : pxLocal * -40);
            const y = pyLocal * 30;
            gsap.to(el, { x, y, duration: 1, ease: 'power3.out' });
          });
          gsap.to('.aurora-layer', { x: pxLocal * 40, y: pyLocal * 30, duration: 0.9, ease: 'expo.out' });
          gsap.to('.neural-mesh', { x: pxLocal * 20, y: pyLocal * 16, duration: 1.1, ease: 'expo.out' });
          if (brainRef.current) {
            gsap.to(brainRef.current, { x: pxLocal * 28, y: pyLocal * 20, rotationY: pxLocal * 6, rotationX: pyLocal * -6, duration: 0.9, ease: 'expo.out' });
          }
        }
      };

      heroRef.current?.addEventListener('pointermove', moveHandler);

      return () => {
        heroRef.current?.removeEventListener('pointermove', moveHandler);
      };
    }, heroRef);

    return () => ctx.revert();
  }, [particles]);

  return (
    <section ref={heroRef} className="hero-wrapper" aria-label="Hero">
      <div className="hero-inner">
        <div className="hero-content" role="region" aria-labelledby="hero-heading">
          <div className="hero-badge-modern" aria-label="Platform badge">Trusted Cognitive Training Platform</div>

          <h1 id="hero-heading" ref={titleRef} className="hero-title-modern">
            <span>Elevate Your</span>
            <br />
            <span className="gradient-text-modern">Cognitive Intelligence</span>
          </h1>

          <p ref={subtitleRef} className="hero-description-modern">
            Build measurable mental clarity and performance through research-based exercises,
            quick assessments, and AI-guided feedback. Train focus, reasoning, and decision-making.
          </p>

          <div ref={ctaRef} className="hero-buttons-modern" role="navigation" aria-label="Hero actions">
            <Link href="/hi-courses" className="btn-primary-modern" aria-label="Browse courses">Start Training</Link>
            <Link href="/productpage" className="btn-secondary-modern" aria-label="View product details">Explore Platform</Link>
          </div>

          <div className="features-grid-modern" aria-hidden>
            <div className="feature-item">
              <div className="feature-icon" aria-hidden>🧠</div>
              <div className="feature-title">Mental Clarity</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon" aria-hidden>⚡</div>
              <div className="feature-title">Rapid Progress</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon" aria-hidden>🎯</div>
              <div className="feature-title">Personalized Plans</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon" aria-hidden>🧪</div>
              <div className="feature-title">Science-Backed</div>
            </div>
          </div>

          <div className="trust-indicators" aria-hidden>
            <div>● Daily Quizzes</div>
            <div>● Expert-Led Programs</div>
            <div>● Free Baseline Assessment</div>
          </div>
        </div>

        {/* Right side showpiece */}
        <div className="hero-brain">
          <div className="neon-brain-wrap" aria-hidden style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div ref={brainRef} style={{ width: '100%', maxWidth: 520, aspectRatio: '1 / 1', margin: '0 auto' }}>
              <BrainShowpiece 
                onRegionSelect={handleRegionSelect}
                activeRegions={activeRegions}
                labHighlight={true}
                isolationOpacity={0.18}
                regionColorsOverride={regionColorsOverride}
                colorCycle={true}
                disassemble={false}
                showLabelsSmall={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="aurora-layer" aria-hidden />
      <div className="neural-mesh" aria-hidden />
      <div className="noise-layer" aria-hidden />

      <div ref={floatingRef} className="floating-area" aria-hidden>
        <div className="float-circle circle-1" />
        <div className="float-circle circle-2" />
        <div className="float-circle circle-3" />
      </div>

      <div className="particles-container" aria-hidden>
        {particles.map((p: any, i) => (
          <div
            key={i}
            className={`particle ${p.color} ${p.size}`}
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              // motion variables
              ['--scale' as any]: p.scale,
              ['--drift' as any]: p.drift,
              ['--dur' as any]: p.duration,
            }}
          />
        ))}
      </div>
    </section>
  );
}
