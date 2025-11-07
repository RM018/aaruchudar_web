import Link from 'next/link';

export default function HIEventsPage() {
  const events = [
    {
      type: 'Webinar',
      title: 'The Future of Human Intelligence',
      date: 'December 15, 2025',
      time: '7:00 PM - 9:00 PM',
      format: 'Online'
    },
    {
      type: 'Community Meetup',
      title: 'Mind Lab Connect',
      date: 'January 20, 2026',
      time: '4:00 PM - 7:00 PM',
      format: 'Hybrid'
    },
    {
      type: 'Webinar',
      title: 'Cognitive Enhancement Strategies',
      date: 'February 10, 2026',
      time: '6:00 PM - 8:00 PM',
      format: 'Online'
    },
    {
      type: 'Annual Summit',
      title: 'Aaruchudar Intelligence Summit 2026',
      date: 'March 15-17, 2026',
      time: 'Full Day Event',
      format: 'In-Person'
    },
    {
      type: 'Community Meetup',
      title: 'Learning Lab Showcase',
      date: 'April 5, 2026',
      time: '3:00 PM - 6:00 PM',
      format: 'In-Person'
    },
    {
      type: 'Webinar',
      title: 'Mindfulness in Modern Life',
      date: 'May 12, 2026',
      time: '7:30 PM - 9:30 PM',
      format: 'Online'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-6 py-20">
        <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8">
          ← Back to Home
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-purple-100 rounded-2xl mb-6">
              <span className="text-6xl">🎪</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">HI Events</h1>
            <p className="text-xl text-gray-600">
              Join our vibrant community through engaging events, webinars, and gatherings
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {events.map((event, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex-1 mb-4 md:mb-0">
                  <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                    {event.type}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <span>📅 {event.date}</span>
                    <span>🕐 {event.time}</span>
                    <span>📍 {event.format}</span>
                  </div>
                </div>
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors whitespace-nowrap">
                  Register
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Connected</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter to get updates about upcoming events and workshops
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
