'use client';
import { useEffect, useRef, useState } from 'react';

function CardsPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{left: string; delay: string; duration: string}>>([]);

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
    setMounted(true);
    // Generate particle positions only on client side
    setParticles(
      [...Array(50)].map(() => ({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${15 + Math.random() * 10}s`
      }))
    );
  }, []);

  useEffect(() => {
    if (!mounted) return;

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
  }, [mounted]);

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
    <center>
    <div ref={containerRef} className="relative min-h-screen overflow-hidden py-24 px-6 md:px-12 lg:px-16" style={{
      background: '#ffffff',
      backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      {/* White overlay to soften the background */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
      
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.04) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.04) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.03) 0%, transparent 50%)
        `
      }}></div>

      {/* Animated Particles */}
      <div className="absolute inset-0 particles-container">
        {particles.map((particle, i) => (
          <div 
            key={i} 
            className={`particle ${i % 2 === 0 ? 'particle-black' : 'particle-white'}`}
            style={{
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          ></div>
        ))}
      </div>

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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
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

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        .particles-container {
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          animation: floatParticle linear infinite;
        }

        .particle-black {
          background: rgba(0, 0, 0, 0.5);
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
        }

        .particle-white {
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
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
      `}</style>

      <div className="relative max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-24">
          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 pb-8"
            style={{ 
              color: '#1a1a1a',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              lineHeight: '1.2',
              overflow: 'visible'
            }}
          >
            Our Programs
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed tracking-wide">
            &nbsp;
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 justify-items-center max-w-5xl mx-auto">
     {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="card-container group relative h-[500px] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              {/* Background Image - Centered */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Overlay */}
              <div className="overlay absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 opacity-60" />

              {/* Content */}
              <div className="content absolute inset-0 p-10 flex flex-col justify-end text-white">
                <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight leading-none" style={{ color: '#ffffff', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                  {card.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-100 mb-8 font-light leading-relaxed tracking-wide max-w-md">
                  {card.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {card.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-5 py-2.5 border-2 border-white/50 rounded-full text-sm font-medium backdrop-blur-md bg-white/10 hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <button suppressHydrationWarning className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white border-2 border-white transition-all duration-300 self-start group shadow-2xl font-bold text-base tracking-wide">
                  <span className="font-bold uppercase tracking-wider">Explore Now</span>
                  <div className="w-10 h-10 bg-black group-hover:bg-white rounded-full flex items-center justify-center transition-all duration-300">
                    <svg 
                      className="w-5 h-5 text-white group-hover:text-black transition-colors duration-300 transform rotate-45" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
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
    </center>
  );
}

export default CardsPage;