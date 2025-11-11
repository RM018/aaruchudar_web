'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);
const reviews = [
  {
    id: 1,
    image: '/reviews/1000210446.jpeg',
    name: 'Preethi Natarajan',
    text: 'The online assessment was very useful to me. It helped me revise the topics and know where I need to improve. Thank you aaruchudar team 👍🏻 for conducting this assessment'
  },
  {
    id: 2,
    image: '/reviews/1000210449.jpeg',
    name: 'Sriram. K. P',
    text: 'These online assessments help me how to take clear decisions in group discussion, project, how clearly give explanation to team members and for which things give first priority (like two assignments) (today\'s question). ---Thank you team AARUCHUDAR ---'
  }
];
function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="reviews-section-custom">
      <div className="container mx-auto px-6 py-20">
        <h2 className="reviews-title">What People Say</h2>
        
        <div className="reviews-carousel">
          <div className={`review-card-wrapper ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            <div className="review-card-custom">
              <div className="review-glow"></div>
              <div className="review-content-wrapper">
                <div className="review-image-container">
                  <Image
                    src={reviews[currentIndex].image}
                    alt={reviews[currentIndex].name}
                    width={120}
                    height={120}
                    className="review-avatar"
                  />
                  <div className="avatar-ring"></div>
                </div>
                <p className="review-text">
                  {reviews[currentIndex].text}
                </p>
                <div className="review-author">
                  {reviews[currentIndex].name}
                </div>
                <div className="review-stars">★★★★★</div>
              </div>
            </div>
          </div>

          <div className="carousel-indicators">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsAnimating(false);
                  }, 500);
                }}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .reviews-section-custom {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
          position: relative;
          overflow: hidden;
        }

        .reviews-section-custom::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .reviews-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          text-align: center;
          margin-bottom: 3rem;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 1;
        }

        .reviews-carousel {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .review-card-wrapper {
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .review-card-wrapper.fade-out {
          opacity: 0;
          transform: scale(0.95) translateY(20px);
        }

        .review-card-wrapper.fade-in {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .review-card-custom {
          background: linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(40, 40, 40, 0.6) 100%);
          backdrop-filter: blur(20px);
          border-radius: 30px;
          padding: 3rem;
          position: relative;
          overflow: hidden;
          border: 2px solid rgba(147, 51, 234, 0.3);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .review-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%);
          animation: rotate-glow 8s linear infinite;
        }

        @keyframes rotate-glow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .review-content-wrapper {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .review-image-container {
          position: relative;
        }

        .review-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #f093fb;
          box-shadow: 0 10px 30px rgba(240, 147, 251, 0.4);
          position: relative;
          z-index: 2;
        }

        .avatar-ring {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border-radius: 50%;
          border: 2px solid rgba(240, 147, 251, 0.3);
          animation: pulse-ring 2s ease-in-out infinite;
        }

        @keyframes pulse-ring {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        .review-text {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          text-align: center;
          max-width: 600px;
          min-height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 400;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .review-author {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 0.02em;
        }

        .review-stars {
          font-size: 1.5rem;
          color: #f093fb;
          letter-spacing: 0.3rem;
          animation: sparkle 1.5s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .carousel-indicators {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2.5rem;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(240, 147, 251, 0.3);
          border: 2px solid rgba(240, 147, 251, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .indicator:hover {
          background: rgba(240, 147, 251, 0.6);
          transform: scale(1.2);
        }

        .indicator.active {
          background: #f093fb;
          box-shadow: 0 0 20px rgba(240, 147, 251, 0.6);
          transform: scale(1.3);
        }

        @media (max-width: 768px) {
          .review-card-custom {
            padding: 2rem 1.5rem;
          }

          .reviews-title {
            font-size: 2rem;
            margin-bottom: 2rem;
          }

          .review-avatar {
            width: 90px;
            height: 90px;
          }

          .review-text {
            font-size: 1.1rem;
            line-height: 1.6;
          }

          .review-author {
            font-size: 1.25rem;
          }

          .review-stars {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}

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
            <button suppressHydrationWarning className="btn-link">Explore Events →</button>
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

      {/* Reviews Section */}
      <ReviewsSection />

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
