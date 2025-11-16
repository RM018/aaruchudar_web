'use client';

import Link from 'next/link';

export default function TestimonialsPage() {
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

  return (
    <div className="testimonials-page-wrapper">
      {/* Hero Section */}
      <section className="testimonials-hero">
        <div className="testimonials-container">
          <Link href="/" className="back-link">
            ← Back to Home
          </Link>
          <h1 className="testimonials-main-title" style={{ color: '#ffffff' }}>What Our Community Says</h1>
          <p className="testimonials-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Real stories from real people who have experienced transformation through our programs
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="testimonials-grid-section">
        <div className="testimonials-container">
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-info">
                    <h3 className="testimonial-name" style={{ color: '#1a202c' }}>{testimonial.name}</h3>
                    <p className="testimonial-role" style={{ color: '#718096' }}>{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star" style={{ color: '#f59e0b' }}>★</span>
                  ))}
                </div>
                
                <p className="testimonial-text" style={{ color: '#4a5568' }}>{testimonial.text}</p>
                
                <div className="testimonial-date" style={{ color: '#a0aec0' }}>{testimonial.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="testimonials-cta">
        <div className="testimonials-container">
          <h2 className="cta-title" style={{ color: '#ffffff' }}>Ready to Start Your Journey?</h2>
          <p className="cta-text" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Join hundreds of others who have transformed their thinking</p>
          <Link href="/" className="cta-button">
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
          padding: 120px 24px 80px !important;
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
          font-size: clamp(36px, 5vw, 56px) !important;
          font-weight: 800 !important;
          color: #ffffff !important;
          margin: 0 0 16px 0 !important;
          line-height: 1.2 !important;
          letter-spacing: -0.02em !important;
        }

        .testimonials-subtitle {
          font-size: clamp(16px, 2vw, 20px) !important;
          color: rgba(255, 255, 255, 0.9) !important;
          margin: 0 auto !important;
          max-width: 600px !important;
          line-height: 1.6 !important;
        }

        .testimonials-grid-section {
          padding: 80px 24px !important;
          background: #ffffff !important;
        }

        .testimonials-grid {
          display: grid !important;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
          gap: 32px !important;
          margin: 0 !important;
        }

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

        .testimonial-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 12px 40px rgba(102, 126, 234, 0.15) !important;
          border-color: rgba(102, 126, 234, 0.2) !important;
        }

        .testimonial-header {
          display: flex !important;
          align-items: center !important;
          gap: 16px !important;
        }

        .testimonial-avatar {
          width: 64px !important;
          height: 64px !important;
          border-radius: 50% !important;
          object-fit: cover !important;
          border: 3px solid #667eea !important;
          flex-shrink: 0 !important;
        }

        .testimonial-info {
          flex: 1 !important;
          min-width: 0 !important;
        }

        .testimonial-name {
          font-size: 18px !important;
          font-weight: 700 !important;
          color: #1a202c !important;
          margin: 0 0 4px 0 !important;
          line-height: 1.3 !important;
        }

        .testimonial-role {
          font-size: 14px !important;
          color: #718096 !important;
          margin: 0 !important;
          line-height: 1.4 !important;
        }

        .testimonial-rating {
          display: flex !important;
          gap: 4px !important;
        }

        .star {
          color: #f59e0b !important;
          font-size: 20px !important;
          line-height: 1 !important;
        }

        .testimonial-text {
          font-size: 15px !important;
          color: #4a5568 !important;
          line-height: 1.7 !important;
          margin: 0 !important;
          flex: 1 !important;
        }

        .testimonial-date {
          font-size: 13px !important;
          color: #a0aec0 !important;
          font-weight: 500 !important;
          padding-top: 12px !important;
          border-top: 1px solid #e2e8f0 !important;
        }

        .testimonials-cta {
          background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%) !important;
          padding: 80px 24px !important;
          text-align: center !important;
        }

        .cta-title {
          font-size: clamp(28px, 4vw, 40px) !important;
          font-weight: 800 !important;
          color: #ffffff !important;
          margin: 0 0 16px 0 !important;
          line-height: 1.3 !important;
        }

        .cta-text {
          font-size: 18px !important;
          color: rgba(255, 255, 255, 0.8) !important;
          margin: 0 0 32px 0 !important;
          line-height: 1.6 !important;
        }

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

        .cta-button:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4) !important;
        }

        @media (max-width: 768px) {
          .testimonials-hero {
            padding: 100px 20px 60px !important;
          }

          .testimonials-grid-section {
            padding: 60px 20px !important;
          }

          .testimonials-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }

          .testimonial-card {
            padding: 24px !important;
          }

          .testimonials-cta {
            padding: 60px 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
