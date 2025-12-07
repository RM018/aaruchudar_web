"use client";
import { useState } from "react";
import { Search, Brain, Lightbulb, BookOpen, ChevronDown, Clock, TrendingUp } from "lucide-react";

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
    description: "Transform your mindset and create a culture of clear thinking and purposeful action in your personal and professional life.",
    duration: "8 weeks",
    level: "Intermediate",
    price: "$299",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    modules: [
      {
        name: "Introduction to Clarity",
        description: "Learn the foundation of clarity and self-awareness.",
      },
      {
        name: "Mindset Shifts",
        description: "Understand how to reframe your thoughts and beliefs.",
      },
      {
        name: "Practical Applications",
        description: "Apply clarity techniques in your daily routines.",
      },
    ],
  },
  {
    id: 2,
    category: "psychological",
    title: "Decision Making Without Drama",
    description: "Learn to make confident decisions without emotional overwhelm, stress, or analysis paralysis.",
    duration: "6 weeks",
    level: "Beginner",
    price: "$199",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    modules: [
      {
        name: "Decision Fatigue",
        description: "Identify how overthinking impacts choices.",
      },
      {
        name: "Emotional Detachment",
        description: "Techniques to reduce emotional interference.",
      },
      {
        name: "Frameworks for Clarity",
        description: "Use logical tools to evaluate options.",
      },
    ],
  },
  {
    id: 3,
    category: "psychological",
    title: "Inner Focus in Noisy Worlds",
    description: "Develop unshakeable focus and concentration skills to thrive in our distraction-filled modern world.",
    duration: "10 weeks",
    level: "Advanced",
    price: "$399",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    modules: [
      {
        name: "Focus Fundamentals",
        description: "Learn attention training techniques.",
      },
      {
        name: "Digital Discipline",
        description: "Balance focus in tech-heavy environments.",
      },
      {
        name: "Deep Work",
        description: "Create systems for distraction-free productivity.",
      },
    ],
  },
  {
    id: 4,
    category: "intellectual",
    title: "The Power of Listening",
    description: "Transform your communication and relationships through the art of deep, active listening.",
    duration: "6 weeks",
    level: "Beginner",
    price: "$249",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    modules: [
      {
        name: "Understanding Listening",
        description: "Differentiate hearing from active listening.",
      },
      {
        name: "Empathetic Communication",
        description: "Connect emotionally through listening.",
      },
      {
        name: "Applied Practice",
        description: "Daily habits to enhance attention and response.",
      },
    ],
  },
  {
    id: 5,
    category: "intellectual",
    title: "Intelligent Conflict & Recovery",
    description: "Navigate conflicts intelligently and build stronger relationships through effective resolution strategies.",
    duration: "8 weeks",
    level: "Intermediate",
    price: "$349",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    modules: [
      {
        name: "Conflict Anatomy",
        description: "Understand the structure and patterns of conflicts.",
      },
      {
        name: "Emotional Regulation",
        description: "Manage your emotions during difficult situations.",
      },
      {
        name: "Resolution Strategies",
        description: "Implement effective conflict resolution techniques.",
      },
    ],
  },
  {
    id: 6,
    category: "intellectual",
    title: "Systematic Thinking",
    description: "Master the art of systematic thinking to solve complex problems with clarity and precision.",
    duration: "10 weeks",
    level: "Advanced",
    price: "$399",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    modules: [
      {
        name: "Systems Analysis",
        description: "Break down complex problems into manageable parts.",
      },
      {
        name: "Pattern Recognition",
        description: "Identify recurring patterns and connections.",
      },
      {
        name: "Strategic Planning",
        description: "Develop long-term systematic approaches.",
      },
    ],
  },
  {
    id: 7,
    category: "emotional",
    title: "Voice, Value, and Vulnerability",
    description: "Find your authentic voice and communicate your values with courage and vulnerability.",
    duration: "8 weeks",
    level: "Intermediate",
    price: "$349",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
    modules: [
      {
        name: "Finding Your Voice",
        description: "Discover your unique communication style.",
      },
      {
        name: "Value Alignment",
        description: "Connect your actions with your core values.",
      },
      {
        name: "Embracing Vulnerability",
        description: "Build strength through authentic expression.",
      },
    ],
  },
  {
    id: 8,
    category: "emotional",
    title: "Leadership Without Imitation",
    description: "Develop your unique leadership style based on your strengths and authentic self.",
    duration: "12 weeks",
    level: "Advanced",
    price: "$499",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    modules: [
      {
        name: "Authentic Leadership",
        description: "Lead from your true self, not imitation.",
      },
      {
        name: "Team Dynamics",
        description: "Understand and optimize team interactions.",
      },
      {
        name: "Impact & Influence",
        description: "Create lasting positive change.",
      },
    ],
  },
];

const HICourses = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Courses", icon: BookOpen },
    { id: "psychological", label: "Psychological", icon: Brain },
    { id: "intellectual", label: "Intellectual", icon: Lightbulb },
    { id: "emotional", label: "Emotional", icon: TrendingUp },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleModules = (courseId: number) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center overflow-hidden">
        <img 
          src="/public/images/hi-courses-banner.jpg" 
          alt="Human Intelligence Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-blue-900/80 to-slate-950/95" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
          <div className="flex items-center gap-4 mb-6">
            <img 
              src="/public/logo2.png" 
              alt="Aaruchudar Logo" 
              className="h-16 w-16 rounded-full shadow-xl border-2 border-blue-400" 
            />
            <span className="text-4xl font-extrabold text-white tracking-wide drop-shadow-lg">
              Aaruchudar
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl text-center px-4 leading-tight">
            Human Intelligence Courses
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-blue-100 max-w-4xl text-center mb-4 font-medium px-6 leading-relaxed">
            Transform your mind, amplify your potential. Explore our comprehensive courses designed to enhance your cognitive abilities and emotional intelligence.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-12 flex justify-center w-full">
          <div className="relative w-full max-w-3xl">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border-2 border-blue-700 bg-slate-900 text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-2xl text-lg font-medium"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-16">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 md:px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 shadow-lg border-2 min-w-[140px] justify-center ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-blue-400 scale-105 shadow-blue-500/30"
                    : "bg-slate-900 text-blue-200 hover:bg-blue-900 border-blue-700 hover:scale-102"
                }`}
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden border-2 border-blue-900 hover:border-blue-400 transition-all duration-300 group flex flex-col h-full hover:shadow-blue-500/20"
            >
              <div className="relative h-60 md:h-64 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-80"></div>
                <div className="absolute top-4 right-4 bg-blue-600/90 px-4 py-2 rounded-full text-base font-bold text-white shadow-lg border border-blue-400">
                  {course.price}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full uppercase border border-blue-500/30">
                    {course.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors line-clamp-2 leading-tight">
                  {course.title}
                </h3>
                
                <p className="text-blue-200 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm text-blue-300">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-cyan-400" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={18} className="text-cyan-400" />
                    <span>{course.level}</span>
                  </div>
                </div>

                {/* Modules Section */}
                {course.modules && course.modules.length > 0 && (
                  <div className="mb-4">
                    <button
                      onClick={() => toggleModules(course.id)}
                      className="flex items-center justify-between w-full text-left text-sm font-semibold text-blue-200 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-blue-700"
                    >
                      <span>View Modules ({course.modules.length})</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          expandedCourse === course.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedCourse === course.id && (
                      <div className="mt-3 space-y-2 animate-fadeIn">
                        {course.modules.map((module, index) => (
                          <div 
                            key={index} 
                            className="bg-slate-800 p-3 rounded-lg border border-blue-700"
                          >
                            <p className="font-semibold text-white text-sm mb-1">
                              {module.name}
                            </p>
                            <p className="text-xs text-blue-200 leading-relaxed">
                              {module.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-4 mt-auto border-t border-blue-900">
                  <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-4 py-2 rounded-lg shadow-lg hover:scale-105 hover:shadow-blue-500/30 transition-all duration-300 text-sm text-center flex-1">
                    Enroll Now
                  </button>
                  <button className="text-sm text-blue-300 hover:text-cyan-400 transition-colors font-semibold text-center py-2 px-3">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen size={64} className="mx-auto text-blue-700 mb-6" />
            <p className="text-blue-300 text-xl mb-2 font-semibold">
              No courses found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-all text-base"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      <footer className="w-full py-8 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-center text-blue-200 font-medium text-lg shadow-inner mt-12">
        © 2025 Aaruchudar. All rights reserved.
      </footer>
    </div>
  );
};

export default HICourses;