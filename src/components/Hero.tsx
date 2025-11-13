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
  const [particles, setParticles] = useState<Array<{left: string; delay: string; duration: string}>>([]);

  useEffect(() => {
    setMounted(true);
    // Generate particle positions only on client side
    setParticles(
      [...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${15 + Math.random() * 10}s`
      }))
    );
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
      }, '-=0.3')
      .from(ctaRef.current?.children || [], {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      }, '-=0.2');

      // Floating animation
      const floatingElements = floatingRef.current?.children;
      if (floatingElements) {
        Array.from(floatingElements).forEach((el, i) => {
          gsap.to(el, {
            y: '+=15',
            x: i % 2 === 0 ? '+=10' : '-=10',
            rotation: i % 2 === 0 ? 3 : -3,
            duration: 3 + i,
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
    <section ref={heroRef} className="hero-section-with-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/gem.png')`,
        }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-indigo-900/70 mix-blend-overlay"></div>
      </div>

      {/* Floating Background Elements */}
      <div ref={floatingRef} className="absolute inset-0 overflow-hidden">
        <div className="float-circle circle-1"></div>
        <div className="float-circle circle-2"></div>
        <div className="float-circle circle-3"></div>
        <div className="float-circle circle-4"></div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 particles-container">
        {particles.map((particle, i) => (
          <div key={i} className="particle" style={{
            left: particle.left,
            animationDelay: particle.delay,
            animationDuration: particle.duration
          }}></div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          
          
          {/* Main Title */}
          <h1 ref={titleRef} className="hero-title-modern mb-6">
            <span className="block text-white">Unlock Your</span>
            <span className="gradient-text-modern">Cognitive Potential</span>
          </h1>
          
          {/* Description */}
          <p ref={subtitleRef} className="hero-description-modern mb-8">
            Discover powerful programs designed to enhance your mental clarity, 
            critical thinking, and decision-making skills through innovative 
            learning experiences and personalized assessments.
          </p>


          {/* Features Grid */}
          <div className="features-grid-modern">
            <div className="feature-item">
              <div className="feature-icon">🧠</div>
              <h3>Mental Clarity</h3>
              <p>Clear thinking and focused attention</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <h3>Quick Results</h3>
              <p>See improvements in weeks</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h3>Personalized</h3>
              <p>Tailored to your needs</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🌟</div>
              <h3>Expert Designed</h3>
              <p>Based on scientific research</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators mt-12">
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Daily Quizes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Expert Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Free Assessment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section-with-bg {
          position: relative;
        }

        .float-circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .circle-1 {
          width: 120px;
          height: 120px;
          top: 10%;
          left: 10%;
        }

        .circle-2 {
          width: 80px;
          height: 80px;
          top: 70%;
          left: 85%;
        }

        .circle-3 {
          width: 60px;
          height: 60px;
          top: 20%;
          left: 85%;
        }

        .circle-4 {
          width: 100px;
          height: 100px;
          top: 80%;
          left: 15%;
        }

        .particles-container {
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: floatParticle linear infinite;
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .hero-badge-modern {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          padding: 8px 20px;
        }

        .badge-text {
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
        }

        .hero-title-modern {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          line-height: 1.1;
          color: white;
        }

        .gradient-text-modern {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description-modern {
          font-size: 1.25rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-buttons-modern {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary-modern {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
          color: white;
          padding: 12px 32px;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        }

        .btn-primary-modern:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
        }

        .btn-secondary-modern {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: white;
          padding: 12px 32px;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary-modern:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .features-grid-modern {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .feature-item {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .feature-item h3 {
          color: white;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        .feature-item p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .trust-indicators {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 2rem;
        }

        @media (max-width: 768px) {
          .hero-buttons-modern {
            flex-direction: column;
            align-items: center;
          }
          
          .btn-primary-modern,
          .btn-secondary-modern {
            width: 100%;
            max-width: 280px;
            text-align: center;
          }

          .features-grid-modern {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .trust-indicators .flex {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  );
}