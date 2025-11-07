import Link from 'next/link';

export default function HIWorkshopsPage() {
  const workshops = [
    {
      title: 'Self-Mastery Workshop',
      description: 'Master your thoughts, emotions, and actions to achieve personal excellence',
      duration: '2 Days',
      level: 'Intermediate'
    },
    {
      title: 'Leadership Workshop',
      description: 'Develop authentic leadership skills and inspire others to achieve greatness',
      duration: '3 Days',
      level: 'Advanced'
    },
    {
      title: 'Mindfulness & Focus Workshop',
      description: 'Cultivate present-moment awareness and enhance concentration abilities',
      duration: '1 Day',
      level: 'Beginner'
    },
    {
      title: 'Creative Intelligence Workshop',
      description: 'Unlock your creative potential and develop innovative thinking patterns',
      duration: '2 Days',
      level: 'Intermediate'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-6 py-20">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
          ← Back to Home
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-blue-100 rounded-2xl mb-6">
              <span className="text-6xl">🎯</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">HI Workshops</h1>
            <p className="text-xl text-gray-600">
              Interactive skill-building sessions focused on personal transformation and growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {workshops.map((workshop, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-blue-600 mb-3">{workshop.title}</h3>
                <p className="text-gray-600 mb-4">{workshop.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span className="bg-blue-100 px-3 py-1 rounded-full">{workshop.duration}</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">{workshop.level}</span>
                </div>
                <button className="text-blue-600 font-semibold hover:text-blue-700">
                  Register Now →
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transform Through Experience</h2>
            <p className="text-gray-600 mb-6">
              Join our intensive workshops and experience profound personal transformation
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              View Schedule
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
