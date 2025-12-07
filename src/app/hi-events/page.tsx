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
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'webinar' | 'campus'>('all');
  const [rsvpEvent, setRsvpEvent] = useState<any | null>(null);

  // Animation refs
  const containerRef = useRef(null);

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

  const rawEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;
  const filteredEvents = rawEvents.filter((event: any) => {
    const matchesType = typeFilter === 'all' ? true : event.type === typeFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery = !q
      ? true
      : [event.title, event.description, event.speaker, event.location, event.platform]
          .filter(Boolean)
          .some((v: string) => v.toLowerCase().includes(q));
    return matchesType && matchesQuery;
  });

  const downloadICS = (event: any) => {
    const start = new Date();
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const toICSDate = (d: Date) =>
      `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}T${String(d.getUTCHours()).padStart(2, '0')}${String(d.getUTCMinutes()).padStart(2, '0')}${String(d.getUTCSeconds()).padStart(2, '0')}Z`;
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//HI Events//EN\nBEGIN:VEVENT\nUID:${event.id}@hi-events\nDTSTAMP:${toICSDate(new Date())}\nDTSTART:${toICSDate(start)}\nDTEND:${toICSDate(end)}\nSUMMARY:${event.title}\nDESCRIPTION:${(event.description || '').replace(/\n/g, ' ')}\nLOCATION:${event.location || event.platform || ''}\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-hi.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
    <div ref={containerRef} className={`${styles.eventContainer} min-h-screen pt-16 md:pt-24 pb-20`}>
      {/* Back Button (match courses style) */}
      <div className="max-w-7xl mx-auto px-6">
        <Link
          href="/"
          className="absolute top-6 left-6 z-20 border border-purple-500/40 text-purple-300 flex items-center gap-2 px-4 py-2 rounded-md bg-transparent hover:bg-purple-600 hover:text-white transition"
          aria-label="Go back to home"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Home</span>
        </Link>
      </div>

      {/* HERO SECTION (match courses header) */}
      <header className="relative flex items-center justify-center overflow-hidden py-24 md:py-28 px-6 min-h-[54vh]">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/hi-events-banner.jpg')" }} aria-hidden />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            HI <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">Events</span>
          </motion.h1>
          <motion.p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            Live webinars and campus sessions on psychology, innovation, and human growth. Join the community and never stop learning.
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap justify-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <span className="px-3 py-1 rounded-full text-xs md:text-sm border border-white/10 bg-white/5 text-gray-200">Expert speakers</span>
            <span className="px-3 py-1 rounded-full text-xs md:text-sm border border-white/10 bg-white/5 text-gray-200">Interactive Q&A</span>
            <span className="px-3 py-1 rounded-full text-xs md:text-sm border border-white/10 bg-white/5 text-gray-200">Recordings available</span>
          </motion.div>
        </div>
      </header>

      {/* FILTERS BAR (match courses style) */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <span className="text-sm">Filter by type</span>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Event tabs">
            {['upcoming', 'past'].map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded-md text-sm border transition ${
                  activeTab === tab
                    ? 'border-purple-500 text-white bg-purple-600'
                    : 'border-white/10 text-gray-300 bg-white/5 hover:border-purple-400/40 hover:text-white'
                }`}
              >
                {tab === 'upcoming' ? 'Upcoming' : 'Past'}
              </button>
            ))}
          </div>
        </div>
        {/* Search + Type filter inline */}
        <div className="max-w-7xl mx-auto mt-4 flex flex-wrap gap-3 items-center">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, speakers, platforms..."
            className="flex-1 min-w-[240px] px-3 py-2 rounded-md border border-white/10 bg-white/5 text-gray-200 placeholder:text-gray-400"
            aria-label="Search events"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-3 py-2 rounded-md border border-white/10 bg-white/5 text-gray-200"
            aria-label="Filter by event type"
          >
            <option value="all">All</option>
            <option value="webinar">Webinars</option>
            <option value="campus">Campus</option>
          </select>
        </div>
      </section>

      {/* EVENTS GRID (match courses grid) */}
      <main className="py-12 md:py-14 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
          {filteredEvents.map((event: any, index: number) => (
            <motion.article
              key={event.id}
              className="rounded-2xl p-7 flex flex-col backdrop-blur-md shadow-xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                {event.isFeatured && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">Featured</span>
                )}
              </div>

              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{event.description}</p>

              {/* badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-gray-300">
                  📅 {event.date}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-gray-300">
                  ⏰ {event.time}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-gray-300">
                  {event.platform ? `🔗 ${event.platform}` : `📍 ${event.location}`}
                </span>
                {event.attendees && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-gray-300">
                    👥 {event.attendees}
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className="mt-auto flex gap-3">
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-purple-500/40 text-purple-300 hover:bg-purple-600 hover:text-white transition font-medium"
                  aria-label={`Register for ${event.title}`}
                  onClick={() => setRsvpEvent(event)}
                >
                  Register Now
                </button>
                <button
                  className="px-4 py-3 rounded-md border border-white/10 text-gray-200 hover:bg-white/10 transition"
                  aria-label={`Add ${event.title} to calendar`}
                  onClick={() => downloadICS(event)}
                >
                  Add to Calendar
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty state */}
        {filteredEvents.length === 0 && (
          <div className="max-w-7xl mx-auto mt-10 text-center text-gray-300">No events match your filters.</div>
        )}
      </main>

      {/* RSVP Modal */}
      <AnimatePresence>
        {rsvpEvent && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>Register for {rsvpEvent.title}</h3>
                <button
                  className={styles.modalClose}
                  aria-label="Close registration"
                  onClick={() => setRsvpEvent(null)}
                >
                  ✕
                </button>
              </div>
              <form
                className={styles.modalForm}
                onSubmit={(e) => {
                  e.preventDefault();
                  setRsvpEvent(null);
                  alert('Registration submitted!');
                }}
              >
                <div className={styles.formRow}>
                  <label className={styles.formLabel}>Name</label>
                  <input className={styles.formInput} required placeholder="Your name" />
                </div>
                <div className={styles.formRow}>
                  <label className={styles.formLabel}>Email</label>
                  <input type="email" className={styles.formInput} required placeholder="you@example.com" />
                </div>
                <div className={styles.formRow}>
                  <label className={styles.formLabel}>Notes</label>
                  <textarea className={styles.formInput} placeholder="Any questions or preferences?" />
                </div>
                <div className={styles.modalActions}>
                  <button type="button" className={styles.secondaryButton} onClick={() => setRsvpEvent(null)}>Cancel</button>
                  <button type="submit" className={styles.primaryButton}>Submit</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
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
