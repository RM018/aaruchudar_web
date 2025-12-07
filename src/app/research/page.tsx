export default function ResearchPage() {
  return (
    // Enhanced light theme background with subtle gradient and pattern-like feel
    <section className="min-h-screen px-4 sm:px-6 lg:px-8 py-14 bg-gradient-to-b from-orange-50/70 via-white to-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">Research</h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600">
            Advancing learning with neuroscience, visualization, and interactive design.
          </p>
        </div>

        {/* Research Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900">Cognitive Neuroscience</h2>
            <p className="mt-2 text-gray-700">Studying brain regions and functional roles using interactive 3D models.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900">Educational Technology</h2>
            <p className="mt-2 text-gray-700">Designing tools that make complex concepts accessible through visualization.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900">Behavioral Studies</h2>
            <p className="mt-2 text-gray-700">Investigating learning outcomes and engagement through interactive activities.</p>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Featured Projects</h2>
            <a href="/blog" className="text-sm font-medium text-orange-700 hover:text-orange-800">See all</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition p-6">
              <div className="text-sm text-orange-700 font-semibold">WebGL</div>
              <h3 className="mt-1 text-lg font-semibold text-gray-900">Interactive Brain Atlas</h3>
              <p className="mt-2 text-gray-700">A 3D brain exploration tool with labeled regions, powered by Three.js.</p>
              <div className="mt-4 flex gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">3D</span>
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">Neuroanatomy</span>
              </div>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition p-6">
              <div className="text-sm text-orange-700 font-semibold">UX Research</div>
              <h3 className="mt-1 text-lg font-semibold text-gray-900">Quiz-Driven Learning</h3>
              <p className="mt-2 text-gray-700">Adaptive quizzes reinforce neuro concepts with spaced repetition.</p>
              <div className="mt-4 flex gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">Assessment</span>
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">Cognition</span>
              </div>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition p-6">
              <div className="text-sm text-orange-700 font-semibold">Workshops</div>
              <h3 className="mt-1 text-lg font-semibold text-gray-900">Hands-on Labs</h3>
              <p className="mt-2 text-gray-700">Community sessions focused on exploratory learning and engagement.</p>
              <div className="mt-4 flex gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">Community</span>
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">Education</span>
              </div>
            </article>
          </div>
        </div>

        {/* Publications / Highlights */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 mb-12 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">Highlights</h2>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-2">
              <span className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-700">Preprint</span>
              <span className="text-gray-800">Interactive brain atlas prototype using WebGL and Three.js.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="px-2 py-0.5 text-xs rounded bg-orange-100 text-orange-800">Study</span>
              <span className="text-gray-800">Quiz-driven learning modules to reinforce neuroanatomy concepts.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-700">Program</span>
              <span className="text-gray-800">Community workshops and lab sessions focused on hands-on learning.</span>
            </li>
          </ul>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Research Lead", role: "Neuroscience & EdTech" },
              { name: "UX Specialist", role: "Learning Design" },
              { name: "Engineer", role: "WebGL & Systems" },
            ].map((m) => (
              <div key={m.name} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold">{m.name.split(' ')[0][0]}</div>
                <div className="mt-3">
                  <div className="font-semibold text-gray-900">{m.name}</div>
                  <div className="text-sm text-gray-600">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div className="rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-white p-8 shadow-sm text-center">
          <h3 className="text-xl font-bold text-gray-900">Interested in collaborating or learning more?</h3>
          <p className="mt-2 text-gray-700">We welcome partnerships for research, tools, and community learning.</p>
          <a href="/contact" className="inline-block mt-4 px-5 py-2.5 rounded-lg bg-orange-600 text-white hover:bg-orange-500 transition font-medium shadow-sm">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}