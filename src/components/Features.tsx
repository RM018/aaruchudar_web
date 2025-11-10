'use client';
import { useEffect, useRef } from 'react';

function CardsPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const cards = [
    {
      title: "HI Labs",
      description: "Innovative research and development programs",
      tags: ["Clarity Labs", "Leadership Labs"],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
    },
    {
      title: "HI Courses",
      description: "Comprehensive learning experiences",
      tags: ["Career Intelligence", "Clarity Thinking", "Purpose Engineering"],
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop"
    },
    {
      title: "HI Workshops",
      description: "Interactive and engaging sessions",
      tags: ["Design Thinking", "Team Building", "Strategy Sessions"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
    },
    {
      title: "HI Events",
      description: "Transformative gatherings and experiences",
      tags: ["Conferences", "Retreats", "Seminars"],
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
    }
  ];

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      titleRef.current.style.animation = 'fadeInUp 1.2s ease-out forwards';
    }

    // Stagger cards animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.animation = `fadeInUp 1s ease-out ${0.3 + index * 0.2}s forwards`;
        card.style.opacity = '0';
      }
    });

    // Scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.style.transform = 'scale(1.02)';
          } else {
            target.style.transform = 'scale(1)';
          }
        });
      },
      { threshold: 0.3 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    const card = e.currentTarget as HTMLDivElement;
    const img = card.querySelector('img') as HTMLImageElement | null;
    const overlay = card.querySelector('.overlay') as HTMLElement | null;
    const content = card.querySelector('.content') as HTMLElement | null;

    if (isEntering) {
      if (img) img.style.transform = 'scale(1.1)';
      if (overlay) overlay.style.opacity = '0.8';
      if (content) content.style.transform = 'translateY(-10px)';
    } else {
      if (img) img.style.transform = 'scale(1)';
      if (overlay) overlay.style.opacity = '0.6';
      if (content) content.style.transform = 'translateY(0)';
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-8">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shine {
          from {
            transform: translateX(-100%) skewX(-12deg);
          }
          to {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .card-container {
          transition: transform 0.3s ease-out;
        }

        .card-container img {
          transition: transform 0.6s ease-out;
        }

        .overlay {
          transition: opacity 0.4s ease-out;
        }

        .content {
          transition: transform 0.4s ease-out;
        }

        .shine-effect {
          animation: shine 1s ease-out;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-7xl md:text-8xl font-black text-center mb-20 bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent"
        >
          Our Programs
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="card-container group relative h-[500px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="overlay absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 opacity-60" />

              {/* Content */}
              <div className="content absolute inset-0 p-8 flex flex-col justify-end text-white">
                <h2 className="text-5xl font-bold mb-3">{card.title}</h2>
                <p className="text-lg text-gray-200 mb-6">{card.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {card.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-4 py-2 border border-white/40 rounded-full text-sm backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <button className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full hover:bg-black hover:text-white border border-white transition-all duration-300 self-start group">
                  <span className="text-sm font-semibold">LEARN MORE</span>
                  <div className="w-8 h-8 bg-black group-hover:bg-white rounded-full flex items-center justify-center transition-all duration-300">
                    <svg 
                      className="w-4 h-4 text-white group-hover:text-black transition-colors duration-300 transform rotate-45" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:animate-[shine_1s_ease-out]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardsPage;