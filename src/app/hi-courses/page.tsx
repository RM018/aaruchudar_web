import Link from 'next/link';

export default function HICoursesPage() {
  const courses = [
    {
      category: 'Intellectual Courses',
      description: 'Enhance critical thinking, logical reasoning, and analytical skills',
      courses: ['Advanced Logic', 'Critical Analysis', 'Strategic Thinking', 'Problem Solving']
    },
    {
      category: 'Innovative Courses',
      description: 'Foster creativity, design thinking, and innovative problem-solving',
      courses: ['Creative Innovation', 'Design Thinking', 'Entrepreneurial Mindset', 'Future Visioning']
    },
    {
      category: 'Psychological Courses',
      description: 'Develop emotional intelligence, resilience, and mental well-being',
      courses: ['Emotional Intelligence', 'Cognitive Psychology', 'Mental Resilience', 'Behavioral Science']
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-6 py-20">
        <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8">
          ← Back to Home
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-orange-100 rounded-2xl mb-6">
              <span className="text-6xl">📚</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">HI Courses</h1>
            <p className="text-xl text-gray-600">
              Comprehensive learning programs designed to enhance your cognitive abilities and personal growth
            </p>
          </div>

          <div className="space-y-8">
            {courses.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-orange-600 mb-3">{category.category}</h2>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.courses.map((course, idx) => (
                    <div key={idx} className="bg-orange-50 rounded-lg p-4 hover:bg-orange-100 transition-colors cursor-pointer">
                      <h3 className="font-semibold text-gray-900">{course}</h3>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl text-center mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Learning Journey</h2>
            <p className="text-gray-600 mb-6">
              Enroll in our comprehensive courses and unlock your full potential
            </p>
            <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
