"use client";

import { useState } from "react";
import { Search, Brain, Lightbulb, BookOpen, ChevronDown } from "lucide-react";

interface Module {
  name: string;
  description: string;
}

interface Course {
  id: number;
  category: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  image: string;
  modules?: Module[];
}

const courses: Course[] = [
  {
    id: 1,
    category: "psychological",
    title: "Clarity as Culture",
    description:
      "Transform your mindset and create a culture of clear thinking and purposeful action in your personal and professional life.",
    duration: "8 weeks",
    level: "Intermediate",
    price: "$299",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    modules: [
      { name: "Introduction to Clarity", description: "Learn the foundation of clarity and self-awareness." },
      { name: "Mindset Shifts", description: "Understand how to reframe your thoughts and beliefs." },
      { name: "Practical Applications", description: "Apply clarity techniques in your daily routines." },
    ],
  },
  {
    id: 2,
    category: "psychological",
    title: "Decision Making Without Drama",
    description:
      "Learn to make confident decisions without emotional overwhelm, stress, or analysis paralysis.",
    duration: "6 weeks",
    level: "Beginner",
    price: "$199",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    modules: [
      { name: "Decision Fatigue", description: "Identify how overthinking impacts choices." },
      { name: "Emotional Detachment", description: "Techniques to reduce emotional interference." },
      { name: "Frameworks for Clarity", description: "Use logical tools to evaluate options." },
    ],
  },
  {
    id: 3,
    category: "psychological",
    title: "Inner Focus in Noisy Worlds",
    description:
      "Develop unshakeable focus and concentration skills to thrive in our distraction-filled modern world.",
    duration: "10 weeks",
    level: "Advanced",
    price: "$399",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    modules: [
      { name: "Focus Fundamentals", description: "Learn attention training techniques." },
      { name: "Digital Discipline", description: "Balance focus in tech-heavy environments." },
      { name: "Deep Work", description: "Create systems for distraction-free productivity." },
    ],
  },
  {
    id: 4,
    category: "intellectual",
    title: "The Power of Listening",
    description:
      "Transform your communication and relationships through the art of deep, active listening.",
    duration: "6 weeks",
    level: "Beginner",
    price: "$249",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    modules: [
      { name: "Understanding Listening", description: "Differentiate hearing from active listening." },
      { name: "Empathetic Communication", description: "Connect emotionally through listening." },
      { name: "Applied Practice", description: "Daily habits to enhance attention and response." },
    ],
  },
  {
    id: 5,
    category: "intellectual",
    title: "Intelligent Conflict & Recovery",
    description:
      "Navigate conflicts intelligently and build stronger relationships through effective resolution strategies.",
    duration: "8 weeks",
    level: "Intermediate",
    price: "$349",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    modules: [
      { name: "Conflict Psychology", description: "Understand emotional triggers in conflict." },
      { name: "Resolution Strategies", description: "Tools for calm and effective dialogue." },
      { name: "Healing Relationships", description: "Build resilience and trust after conflict." },
    ],
  },
  {
    id: 6,
    category: "intellectual",
    title: "Systemic Thinking",
    description:
      "Develop the ability to see the big picture and understand complex interconnected systems.",
    duration: "10 weeks",
    level: "Advanced",
    price: "$399",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    modules: [
      { name: "Systems Theory", description: "Explore system behavior and interrelations." },
      { name: "Pattern Recognition", description: "Identify recurring dynamics in systems." },
      { name: "Strategic Design", description: "Apply systemic thinking in problem-solving." },
    ],
  },
  {
    id: 7,
    category: "innovative",
    title: "Voice, Value & Vulnerability",
    description:
      "Find your authentic voice, communicate your value, and embrace vulnerability as a strength.",
    duration: "8 weeks",
    level: "Intermediate",
    price: "$329",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    modules: [
      { name: "Authentic Expression", description: "Unlock your voice through self-trust." },
      { name: "Value Communication", description: "Learn to articulate personal worth." },
      { name: "Embracing Vulnerability", description: "Build power through openness." },
    ],
  },
  {
    id: 8,
    category: "innovative",
    title: "Leadership Without Imitation",
    description:
      "Develop your unique leadership style without copying others. Lead authentically and effectively.",
    duration: "12 weeks",
    level: "Advanced",
    price: "$499",
    image:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
    modules: [
      { name: "Leadership Identity", description: "Discover your core leadership values." },
      { name: "Authentic Guidance", description: "Lead with emotional intelligence and integrity." },
      { name: "Empowerment Systems", description: "Create environments where others thrive." },
    ],
  },
  {
    id: 9,
    category: "innovative",
    title: "Creative Problem Solving",
    description:
      "Unlock your creative potential and develop innovative approaches to complex challenges.",
    duration: "6 weeks",
    level: "Beginner",
    price: "$279",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    modules: [
      { name: "Creative Thinking", description: "Understand how creativity fuels innovation." },
      { name: "Brainstorm Techniques", description: "Use structured methods for idea generation." },
      { name: "Innovation Application", description: "Apply creative insights to real-world problems." },
    ],
  },
];

const categories = [
  { key: "all", label: "All Courses", icon: null },
  {
    key: "psychological",
    label: "Psychological Intelligence",
    icon: <Brain size={16} />,
  },
  {
    key: "intellectual",
    label: "Intellectual Intelligence",
    icon: <BookOpen size={16} />,
  },
  {
    key: "innovative",
    label: "Innovative Intelligence",
    icon: <Lightbulb size={16} />,
  },
];

export default function HICourses() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openModule, setOpenModule] = useState<Record<number, number | null>>(
    {}
  );

  const toggleModule = (courseId: number, moduleIndex: number) => {
    setOpenModule((prev) => ({
      ...prev,
      [courseId]: prev[courseId] === moduleIndex ? null : moduleIndex,
    }));
  };

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === "all" || course.category === selectedCategory) &&
      course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col justify-center items-center px-8 py-24">
      {/* Centered Header */}
      <div className=" Header text-center flex flex-col items-center justify-center gap-8 max-w-3xl mx-auto">
        <div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent tracking-tight leading-tight">
            Explore Human Intelligence
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Choose your path — master your mind, intellect, and creativity
            through guided learning.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-xl mt-4">
          <Search className="absolute left-5 top-2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/10 rounded-full py-4 pl-12 pr-6 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:shadow-pink-400/40 focus:shadow-md transition-all text-center text-3xl"
          />
        </div>

        {/* Category Buttons */}
        <div className="  flex flex-wrap justify-center gap-4 mt-4">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={` category-border flex items-center gap-2 px-6 py-3 rounded-full text-sm md:text-base font-semibold transition-all ${
                selectedCategory === cat.key
                  ? "bg-pink-500 text-white shadow-lg shadow-pink-500/40 scale-105"
                  : "bg-white/10 hover:bg-white/20 text-gray-200"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🎓 Course Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-24">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className=" Course-grid group bg-white/10 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-white/10 backdrop-blur-lg"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full rounded-lg object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-pink-400 group-hover:text-pink-300 transition-colors">
                {course.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {course.description}
              </p>

              {/* 🔽 Modules */}
              {course.modules && (
                <div className="mt-4 space-y-3 ">
                  {course.modules.map((module, index) => (
                    <div
                      key={index}
                      className=" px-8 py-8 border border-white/20 bg-white/5 rounded-lg p-10  transition-all duration-300 hover:bg-white/10 hover:border-pink-400/40"
                    >
                      <div
                        className=" module-border flex justify-between items-center cursor-pointer "
                        onClick={() => toggleModule(course.id, index)}
                      >
                        <span className="text-sm font-semibold text-gray-200 ">
                          {module.name}
                        </span>
                        <ChevronDown
                          className={`text-gray-400 transition-transform duration-300 ${
                            openModule[course.id] === index
                              ? "rotate-180 text-pink-400"
                              : ""
                          }`}
                          size={18}
                        />
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          openModule[course.id] === index
                            ? "max-h-40 opacity-100 mt-3"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-gray-400 text-sm leading-relaxed px-3 py-3 bg-white/5 rounded-md border border-white/10">
                          {module.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="End-section-course flex justify-between text-sm text-gray-400 pt-2">
                <span>📅 {course.duration}</span>
                <span>● {course.level}</span>
                <span className="text-green-400 font-semibold">
                  {course.price}
                </span>
                <button className="enroll-btn">Enroll</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🚫 No Results */}
      {filteredCourses.length === 0 && (
        <div className="text-center text-gray-400 mt-12">
          <p className="text-lg">No courses found for your search.</p>
        </div>
      )}
    </section>
  );
}
