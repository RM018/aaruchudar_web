'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Preethi Natarajan',
      role: 'Student',
      image: '/reviews/1000210446.jpeg',
      rating: 5,
      text: 'The online assessment was very useful to me. It helped me revise the topics and know where I need to improve. Thank you aaruchudar team 👍🏻 for conducting this assessment',
      date: 'March 2024'
    },
    {
      id: 2,
      name: 'Sriram. K. P',
      role: 'Professional',
      image: '/reviews/1000210449.jpeg',
      rating: 5,
      text: "These online assessments help me how to take clear decisions in group discussion, project, how clearly give explanation to team members and for which things give first priority (like two assignments) (today's question). ---Thank you team AARUCHUDAR ---",
      date: 'February 2024'
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      role: 'Entrepreneur',
      image: '/logo2.png',
      rating: 5,
      text: 'The HI Labs program transformed my approach to leadership. The clarity thinking workshop was particularly insightful and helped me make better strategic decisions for my business.',
      date: 'January 2024'
    },
    {
      id: 4,
      name: 'Ananya Sharma',
      role: 'Student',
      image: '/logo2.png',
      rating: 5,
      text: 'Career Intelligence course was a game-changer! It helped me identify my strengths and align them with my career goals. Highly recommend to all students.',
      date: 'December 2023'
    }
  ];

  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c === total - 1 ? 0 : c + 1));
    }, 4000); // Change every 4 seconds
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent((c) => (c === total - 1 ? 0 : c + 1));

  return (
    <section className="testimonials-carousel-section">
      <div className="testimonials-carousel-container">
        <h2 className="testimonials-main-title" style={{ color: '#1a202c', textAlign: 'center', marginBottom: 40 }}>Testimonials</h2>
        <div className="carousel-wrapper">
          <button className="carousel-arrow left" onClick={prev} aria-label="Previous testimonial">&#8592;</button>
          <div className="carousel-card">
            {/* Only show the current testimonial */}
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="testimonial-avatar"
                />
                <div className="testimonial-info">
                  <h3 className="testimonial-name" style={{ color: '#1a202c' }}>{testimonials[current].name}</h3>
                  <p className="testimonial-role" style={{ color: '#718096' }}>{testimonials[current].role}</p>
                </div>
              </div>
              <div className="testimonial-rating">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <span key={i} className="star" style={{ color: '#f59e0b' }}>★</span>
                ))}
              </div>
              <p className="testimonial-text" style={{ color: '#4a5568' }}>{testimonials[current].text}</p>
              <div className="testimonial-date" style={{ color: '#a0aec0' }}>{testimonials[current].date}</div>
            </div>
          </div>
          <button className="carousel-arrow right" onClick={next} aria-label="Next testimonial">&#8594;</button>
        </div>
        <div className="carousel-dots">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={"dot" + (idx === current ? " active" : "")}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .testimonials-carousel-section {
          padding: 80px 24px;
          background: linear-gradient(135deg, #f8fafc 0%, #e9e6f7 100%);
        }
        .testimonials-carousel-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .carousel-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
        }
        .carousel-arrow {
          background: #fff;
          border: none;
          font-size: 2rem;
          color: #a78bfa;
          cursor: pointer;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.10);
          transition: background 0.2s;
        }
        .carousel-arrow:hover {
          background: #e9e6f7;
        }
        .carousel-card {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 0;
        }
        .testimonial-card {
          background: #fff;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.10), 0 1.5px 8px rgba(0,0,0,0.04);
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 320px;
          max-width: 400px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .testimonial-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #667eea;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
        }
        .testimonial-info {
          flex: 1;
          min-width: 0;
        }
        .testimonial-name {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 4px 0;
        }
        .testimonial-role {
          font-size: 14px;
          color: #718096;
          margin: 0;
        }
        .testimonial-rating {
          display: flex;
          gap: 4px;
        }
        .star {
          color: #f59e0b;
          font-size: 20px;
          filter: drop-shadow(0 1px 2px #f6e05e);
        }
        .testimonial-text {
          font-size: 16px;
          color: #4a5568;
          line-height: 1.7;
          margin: 0;
          flex: 1;
        }
        .testimonial-date {
          font-size: 13px;
          color: #a0aec0;
          font-weight: 500;
          padding-top: 12px;
          border-top: 1px solid #e2e8f0;
        }
        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 24px;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #d1d5db;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        .dot.active {
          background: #a78bfa;
        }
        @media (max-width: 768px) {
          .testimonials-carousel-section {
            padding: 60px 10px;
          }
          .testimonials-carousel-container {
            padding: 0 4px;
          }
          .testimonial-card {
            padding: 20px;
            min-width: 220px;
            max-width: 95vw;
          }
        }
      `}</style>
    </section>
  );
}