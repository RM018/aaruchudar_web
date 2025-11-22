import Link from 'next/link';

export default function HICoursesPage() {
  const courses = [
    {
      category: 'Intellectual Courses',
      description: ' Enhance critical thinking, logical reasoning, and analytical skills',
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
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50" role="main" aria-label="HI Courses page">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 text-sm sm:text-base" aria-label="Back to home">
          ← Back to Home
        </Link>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-block p-3 sm:p-4 bg-orange-100 rounded-2xl mb-4 sm:mb-6">
              <span className="text-4xl sm:text-6xl" aria-hidden="true">📚</span>
            </div>
            <h1 className="font-bold text-gray-900 mb-4 text-[clamp(2rem,6vw,3.25rem)] leading-tight">HI Courses</h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive learning programs designed to enhance your cognitive abilities and personal growth
            </p>
          </div>
          {/* Categories */}
          <div className="space-y-6 sm:space-y-8" aria-label="Course categories">
            {courses.map((category, index) => (
              <section key={index} className="bg-white rounded-xl p-6 sm:p-8 shadow-lg" aria-labelledby={`cat-${index}`}> 
                <h2 id={`cat-${index}`} className="text-2xl sm:text-3xl font-bold text-orange-600 mb-3">{category.category}</h2>
                <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">{category.description}</p>
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2" aria-label={`Courses under ${category.category}`}> 
                  {category.courses.map((course, idx) => (
                    <div key={idx} className="bg-orange-50 rounded-lg p-3 sm:p-4 hover:bg-orange-100 transition-colors cursor-pointer group" tabIndex={0} aria-label={`Course ${course}`}> 
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base flex items-center gap-2">{course}<span className="opacity-0 group-hover:opacity-100 transition text-orange-500" aria-hidden="true">→</span></h3>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
          {/* CTA */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl text-center mt-10 sm:mt-12" aria-label="Enrollment call to action">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Start Your Learning Journey</h2>
            <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">
              Enroll in our comprehensive courses and unlock your full potential
            </p>
            <button className="bg-orange-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors w-full sm:w-auto" aria-label="Enroll now">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
