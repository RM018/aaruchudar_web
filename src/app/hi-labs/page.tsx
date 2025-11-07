import Link from 'next/link';

export default function HILabsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container mx-auto px-6 py-20">
        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-8">
          ← Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-green-100 rounded-2xl mb-6">
              <span className="text-6xl">🔬</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">HI Labs</h1>
            <p className="text-xl text-gray-600">
              Cutting-edge research and innovation spaces where ideas transform into breakthrough solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((lab) => (
              <div key={lab} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-green-600 mb-3">Lab {lab}</h3>
                <p className="text-gray-600 mb-4">
                  Innovative research facility focused on cognitive enhancement and human intelligence development.
                </p>
                <button className="text-green-600 font-semibold hover:text-green-700">
                  Learn More →
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Research Community</h2>
            <p className="text-gray-600 mb-6">
              Be part of groundbreaking research in human intelligence and cognitive development
            </p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
