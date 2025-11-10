'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.css';

const HIEventsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Animation refs
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  // Event data
  const upcomingEvents = [
    {
      id: 1,
      title: "The Science of Flow: How to Enter Peak Performance States",
      type: "webinar",
      date: "September 28, 2025",
      time: "7:00 PM IST",
      platform: "Zoom",
      description: "Discover the neurological and psychological mechanisms behind flow states and learn practical techniques to achieve peak performance in any domain.",
      speaker: "Aashika Nethaji",
      attendees: 245,
      isFeatured: true
    },
    {
      id: 2,
      title: "Unlocking Cognitive Potential: A Neuroscience Perspective",
      type: "webinar",
      date: "October 5, 2025",
      time: "6:30 PM IST",
      platform: "Zoom",
      description: "Explore cutting-edge neuroscience research on cognitive enhancement and brain plasticity.",
      speaker: "Aashika Nethaji",
      attendees: 189
    },
    {
      id: 3,
      title: "HI Talks: Redesigning Careers & Identities",
      type: "campus",
      date: "October 12, 2025",
      time: "3:00 PM IST",
      location: "IIT Mumbai",
      description: "Interactive session on navigating career transitions and identity evolution in the modern world.",
      speaker: "Shiyam Sundar",
      attendees: 150
    }
  ];

  const pastEvents = [
    {
      id: 1,
      title: "HI 101: Theories of Human Growth",
      type: "webinar",
      duration: "1h 45m",
      views: 1250,
      date: "August 15, 2025"
    },
    {
      id: 2,
      title: "Emotional Intelligence for Modern Leaders",
      type: "webinar",
      duration: "2h 10m",
      views: 980,
      date: "July 20, 2025"
    },
    {
      id: 3,
      title: "AI & Human Intelligence: A Balanced Future",
      type: "webinar",
      duration: "1h 30m",
      views: 2150,
      date: "June 28, 2025"
    }
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="flex flex-col items-center">
          <div className={styles['loading-spinner'] + " w-20 h-20 border-4 border-white/30 border-t-white rounded-full"} />
          <h2 className="text-3xl font-bold text-white mt-6 animate-fade-in">
            HI Events
          </h2>
          <p className="text-white/70 mt-2 animate-fade-in">
            Loading amazing experiences...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={styles.eventContainer}>
      <Link 
        href="/" 
        className={styles.backButton}
      >
        <svg className={styles.backButtonIcon} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" />
        </svg>
        <span>Back</span>
      </Link>

      {/* Hero Section */}
      <div ref={heroRef} className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            HI Events
          </h1>
          <p className={styles.heroSubtitle}>
            Join our community of learners exploring the fascinating intersections of{' '}
            <span className="text-purple-600 font-medium">Psychology</span>,{' '}
            <span className="text-blue-600 font-medium">Innovation</span>, and{' '}
            <span className="text-indigo-600 font-medium">Human Growth</span>
          </p>
        </div>
      </div>

      {/* Event Categories */}
      <div className={styles.categoryGrid}>
        {[
          {
            icon: "M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 2v-7l-4 2z",
            title: "Live Webinars",
            description: "Interactive online sessions with industry experts and thought leaders",
            stats: ["2K+ Attendees", "150+ Sessions"]
          },
          {
            icon: "M12 14l9-5-9-5-9 5 9 5z",
            title: "Campus Events",
            description: "Immersive in-person experiences at leading institutions",
            stats: ["50+ Campuses", "10K+ Students"]
          }
        ].map((category, idx) => (
          <motion.div
            key={idx}
            className={styles.categoryCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <div className={styles.categoryIcon}>
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d={category.icon} />
              </svg>
            </div>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <p className={styles.categoryDescription}>{category.description}</p>
            <div className="flex space-x-4 mt-4">
              {category.stats.map((stat, i) => (
                <div key={i} className="text-sm text-gray-600">
                  <span className="font-semibold">{stat}</span>
                  <span className="text-gray-400 ml-1">and growing</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabNav}>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
          <div className="flex space-x-2">
            {['upcoming', 'past'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab === 'upcoming' ? '📅 Upcoming Events' : '📚 Past Events'}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {(activeTab === 'upcoming' ? upcomingEvents : pastEvents).map((event, idx) => (
            <motion.div
              key={event.id}
              className={styles.eventCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={styles.eventHeader}>
                <span className={`${styles.eventType} ${styles[event.type]}`}>
                  {event.type === 'webinar' ? '🎥 Webinar' : '🏛️ Campus Event'}
                </span>
                {event.isFeatured && (
                  <span className={styles.featuredBadge}>
                    ⭐ Featured
                  </span>
                )}
              </div>

              <div className={styles.eventContent}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDescription}>{event.description}</p>

                <div className={styles.eventDetails}>
                  <div className={styles.eventDetail}>
                    <svg className={styles.eventDetailIcon} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {event.date}
                  </div>
                  <div className={styles.eventDetail}>
                    <svg className={styles.eventDetailIcon} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {event.time}
                  </div>
                  <div className={styles.eventDetail}>
                    {event.platform ? (
                      <>
                        <svg className={styles.eventDetailIcon} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                        </svg>
                        {event.platform}
                      </>
                    ) : (
                      <>
                        <svg className={styles.eventDetailIcon} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {event.location}
                      </>
                    )}
                  </div>
                </div>

                <button className={styles.registerButton}>
                  Register Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Newsletter Section */}
      <div className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <h2 className={styles.newsletterTitle}>Never Miss a Moment of Growth</h2>
          <p className={styles.newsletterDescription}>
            Subscribe to get updates about upcoming events and exclusive content
          </p>
          
          <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={styles.newsletterInput}
              required
            />
            <motion.button
              type="submit"
              className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubscribed ? 'Subscribed! ✓' : 'Subscribe Now'}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HIEventsPage;
