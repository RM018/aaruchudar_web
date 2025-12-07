'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function TestimonialsPage() {
  // Testimonials data (can be moved to CMS later)
  const testimonials = [
    {
      name: 'Preethi Natarajan',
      role: 'Student',
      rating: 5,
      date: 'March 2024',
      text:
        'The online assessment was highly useful. It helped me revise key topics and identify areas to improve. Thank you to the Aaruchudar team for conducting this assessment.',
      avatar: '/reviews/1000210446.jpeg',
    },
    {
      name: 'Arun Kumar',
      role: 'Educator',
      rating: 5,
      date: 'May 2024',
      text:
        'HI Labs provided structured exercises that improved focus and confidence across my class. The progress tracking made outcomes clear and actionable.',
      avatar: '/reviews/1000210449.jpeg',
    },
    {
      name: 'Divya S',
      role: 'Cohort Participant',
      rating: 5,
      date: 'July 2024',
      text:
        'The cohort format kept me consistent. I noticed measurable gains in clarity and attention within weeks, supported by insightful reports.',
      avatar: '/images/hi-courses-banner.jpg',
    },
  ];

  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <center>
      <div className="testimonials-page-wrapper" role="main" aria-label="Testimonials page">
        {/* Hero Section */}
        <section className="testimonials-hero" aria-labelledby="testimonials-heading">
          <div className="testimonials-container">
            <Link href="/" className="back-link">
              ← Back to Home
            </Link>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="testimonials-grid-section" aria-label="Testimonials">
          <div className="testimonials-container">
            <h2 className="testimonials-main-title" id="testimonials-heading">Testimonials</h2>
            <div className="carousel">
              <button className="nav nav-left" aria-label="Previous testimonial" onClick={prev}>←</button>
              <article className="testimonial-card" aria-roledescription="slide" aria-label={`Slide ${index + 1} of ${testimonials.length}`}>
                <header className="testimonial-header">
                  <Image
                    src={testimonials[index].avatar}
                    alt={`${testimonials[index].name} avatar`}
                    width={64}
                    height={64}
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-info">
                    <h3 className="testimonial-name">{testimonials[index].name}</h3>
                    <p className="testimonial-role">{testimonials[index].role}</p>
                    <div className="testimonial-rating" aria-label={`${testimonials[index].rating} out of 5 stars`}>
                      {Array.from({ length: testimonials[index].rating }).map((_, i) => (
                        <span key={i} className="star" aria-hidden>★</span>
                      ))}
                    </div>
                  </div>
                </header>
                <p className="testimonial-text">{testimonials[index].text}</p>
                <div className="testimonial-date">{testimonials[index].date}</div>
              </article>
              <button className="nav nav-right" aria-label="Next testimonial" onClick={next}>→</button>
            </div>
            <div className="dots" role="tablist" aria-label="Select testimonial">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === index ? 'active' : ''}`}
                  role="tab"
                  aria-selected={i === index}
                  aria-controls={`slide-${i}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="testimonials-cta">
          <div className="testimonials-container">
            <h2 className="cta-title" style={{ color: '#ffffff' }}>Ready to Start Your Journey?</h2>
            <p className="cta-text" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Join hundreds of others who have transformed their thinking</p>
            <Link href="/" className="cta-button" aria-label="Explore programs">
              Explore Our Programs
            </Link>
          </div>
        </section>

        <style jsx>{`
          .testimonials-page-wrapper {
            min-height: 100vh !important;
            background: linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%) !important;
          }

          .testimonials-hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            padding: 140px 24px 80px !important;
            text-align: center !important;
            position: relative !important;
            overflow: hidden !important;
          }

          .testimonials-hero::before {
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%) !important;
            pointer-events: none !important;
          }

          .testimonials-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 0 24px !important;
            position: relative !important;
            z-index: 1 !important;
          }

          .back-link {
            display: inline-flex !important;
            align-items: center !important;
            color: rgba(255, 255, 255, 0.9) !important;
            text-decoration: none !important;
            font-size: 16px !important;
            margin-bottom: 24px !important;
            transition: all 0.3s ease !important;
            font-weight: 500 !important;
          }

          .back-link:hover {
            color: #ffffff !important;
            transform: translateX(-4px) !important;
          }

          .testimonials-main-title {
            font-size: clamp(32px, 4vw, 44px) !important;
            font-weight: 800 !important;
            color: #1a202c !important;
            margin: 0 0 24px 0 !important;
            line-height: 1.2 !important;
            letter-spacing: -0.02em !important;
            text-align: center !important;
          }

          .testimonials-grid-section {
            padding: 60px 24px !important;
            background: #ffffff !important;
          }

          .carousel {
            display: grid !important;
            grid-template-columns: 48px 1fr 48px !important;
            align-items: center !important;
            gap: 16px !important;
          }

          .nav {
            width: 40px !important;
            height: 40px !important;
            border-radius: 999px !important;
            border: 1px solid #e2e8f0 !important;
            background: #f7fafc !important;
            color: #4a5568 !important;
            display: grid !important;
            place-items: center !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
          }
          .nav:hover { background: #edf2f7 !important; }
          .nav:active { transform: scale(0.98) !important; }

          .testimonial-card {
            background: #ffffff !important;
            border-radius: 20px !important;
            padding: 32px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
            transition: all 0.3s ease !important;
            border: 1px solid rgba(0, 0, 0, 0.05) !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
          }

          .testimonial-header { display: flex !important; align-items: center !important; gap: 16px !important; }

          .testimonial-avatar {
            width: 64px !important;
            height: 64px !important;
            border-radius: 50% !important;
            object-fit: cover !important;
            border: 3px solid #667eea !important;
            flex-shrink: 0 !important;
          }

          .testimonial-info { flex: 1 !important; min-width: 0 !important; }
          .testimonial-name { font-size: 18px !important; font-weight: 700 !important; color: #1a202c !important; margin: 0 0 4px 0 !important; }
          .testimonial-role { font-size: 14px !important; color: #718096 !important; margin: 0 !important; }

          .testimonial-rating { display: flex !important; gap: 4px !important; }
          .star { color: #f59e0b !important; font-size: 20px !important; line-height: 1 !important; }

          .testimonial-text { font-size: 15px !important; color: #4a5568 !important; line-height: 1.7 !important; margin: 0 !important; }
          .testimonial-date { font-size: 13px !important; color: #a0aec0 !important; font-weight: 500 !important; padding-top: 12px !important; border-top: 1px solid #e2e8f0 !important; }

          .dots { display: flex !important; gap: 8px !important; justify-content: center !important; margin-top: 16px !important; }
          .dot { width: 8px !important; height: 8px !important; border-radius: 999px !important; background: #e2e8f0 !important; border: none !important; cursor: pointer !important; }
          .dot.active { background: #667eea !important; }

          .testimonials-cta {
            background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%) !important;
            padding: 80px 24px !important;
            text-align: center !important;
          }

          .cta-title { font-size: clamp(28px, 4vw, 40px) !important; font-weight: 800 !important; color: #ffffff !important; margin: 0 0 16px 0 !important; }
          .cta-text { font-size: 18px !important; color: rgba(255, 255, 255, 0.8) !important; margin: 0 0 32px 0 !important; }

          .cta-button {
            display: inline-block !important;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            color: #ffffff !important;
            padding: 16px 40px !important;
            border-radius: 50px !important;
            font-size: 16px !important;
            font-weight: 700 !important;
            text-decoration: none !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3) !important;
          }
          .cta-button:hover { transform: translateY(-2px) !important; box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4) !important; }

          @media (max-width: 768px) {
            .testimonials-hero { padding: 100px 20px 60px !important; }
            .testimonials-grid-section { padding: 60px 20px !important; }
            .carousel { grid-template-columns: 36px 1fr 36px !important; }
            .nav { width: 36px !important; height: 36px !important; }
            .testimonials-cta { padding: 60px 20px !important; }
          }

          @media (max-width: 640px) { .testimonials-hero { padding-top: 120px !important; } }
        `}</style>
      </div>
    </center>
  );
}
