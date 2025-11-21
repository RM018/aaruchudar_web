'use client';
import { useEffect, useRef, useState } from 'react';

function CardsPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{left: string; delay: string; duration: string}>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      title: "HI Labs",
      description: "Cutting-edge research and experiential learning spaces designed to foster innovation, critical thinking, and leadership development",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80"
    },
    {
      title: "HI Courses",
      description: "Transformative educational programs that blend practical skills with deep personal insights for holistic career growth",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop&q=80"
    },
    {
      title: "HI Workshops",
      description: "Hands-on collaborative sessions that empower teams with practical tools for creative problem-solving and strategic execution",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&fit=crop&q=80"
    },
    {
      title: "HI Events",
      description: "Immersive gatherings that bring together thought leaders, innovators, and change-makers for meaningful connections and growth",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=800&fit=crop&q=80"
    }
  ];

  useEffect(() => {
    setMounted(true);
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

    if (titleRef.current) {
      titleRef.current.style.animation = 'fadeInUp 1.2s ease-out forwards';
    }

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

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, cards.length]);

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

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(cards.length - 1, prev + 1));
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-[100vw]">
        <div ref={containerRef} className="relative min-h-screen overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 w-full" style={{
          background: '#ffffff',
          backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}>
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
      
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.04) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.04) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.03) 0%, transparent 50%)
        `
      }}></div>

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
            transform: translateY(80px);
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
 <center>
      <div className="relative max-w-7xl mx-auto">

        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-4">
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 pb-2"
            style={{ 
              color: '#0a0a0a',
              textShadow: '3px 3px 6px rgba(0,0,0,0.15)',
              lineHeight: '1.1',
              overflow: 'visible',
              letterSpacing: '-0.02em'
            }}
          >
            Our Programs
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-light max-w-4xl mx-auto leading-relaxed tracking-wide">
            &nbsp;
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons - Fixed Positioning */}
          <div className="relative w-full">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 sm:w-16 sm:h-16 bg-white/95 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed hover:scale-110"
              style={{ left: '1rem' }}
            >
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === cards.length - 1}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 sm:w-16 sm:h-16 bg-white/95 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed hover:scale-110"
              style={{ right: '1rem' }}
            >
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div 
            ref={carouselRef}
            className="overflow-hidden rounded-3xl"
          >
            <div 
              className="flex transition-transform duration-500"
              style={{ display: 'flex', scrollSnapType: 'x mandatory' }}
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className="card-container group relative flex-shrink-0 w-full px-2 sm:px-4 md:px-8"
                  style={{
                    height: '550px',
                    minHeight: '450px',
                    scrollSnapAlign: 'center'
                  }}
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                >
                  <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      loading="lazy"
                    />

                    <div className="overlay absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70" />

                    <div className="content absolute inset-0 flex flex-col text-white">
                      <div className="flex-1 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-end">
                        <div className="mb-4 sm:mb-6">
                          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 tracking-tight leading-tight" 
                              style={{ 
                                color: '#ffffff', 
                                textShadow: '0 4px 30px rgba(0,0,0,0.8)',
                                letterSpacing: '-0.02em'
                              }}>
                            {card.title}
                          </h2>
                          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 font-light leading-relaxed max-w-2xl"
                             style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                            {card.description}
                          </p>
                        </div>

                        {/* tags removed per request */}
                      </div>

                      <div className="flex items-center justify-center pb-32 sm:pb-36 md:pb-40">
                        <button 
                          suppressHydrationWarning 
                          className="flex items-center justify-center gap-2 sm:gap-3 bg-white text-black rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white border-2 border-white transition-all duration-300 shadow-2xl font-bold text-xs sm:text-sm tracking-wide px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 hover:scale-105 hover:shadow-3xl"
                        >
                          <span className="font-bold uppercase tracking-wider">Explore Now</span>
                          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-black group-hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0">
                            <svg 
                              className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:text-black transition-colors duration-300 transform rotate-45" 
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
                    </div>

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:animate-[shine_1.2s_ease-out]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-8 sm:mt-12">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index 
                    ? 'w-12 h-3 bg-gradient-to-r from-purple-600 to-pink-600' 
                    : 'w-3 h-3 bg-gray-400 hover:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      </center>
        </div>
      </div>
    </div>
  );
}

export default CardsPage;