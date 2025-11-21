'use client';
import Link from 'next/link';

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

  return (
    <section className="testimonials-grid-section">
      <div className="testimonials-container">
        <h2 className="testimonials-main-title" style={{ color: '#1a202c', textAlign: 'center', marginBottom: 40 }}>Testimonials</h2>
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
      <style jsx>{`
        .testimonials-grid-section {
          padding: 80px 24px;
          background: #fff;
        }
        .testimonials-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .testimonials-main-title {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 800;
          margin-bottom: 40px;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 32px;
        }
        .testimonial-card {
          background: #fff;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          gap: 20px;
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
        }
        .testimonial-text {
          font-size: 15px;
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
        @media (max-width: 768px) {
          .testimonials-grid-section {
            padding: 60px 20px;
          }
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .testimonial-card {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}