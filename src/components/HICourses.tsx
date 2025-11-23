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
    <center>
      <div className="courses-page-container min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 Header">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Human Intelligence Courses
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform your mind, amplify your potential. Explore our comprehensive courses designed to enhance your cognitive abilities and emotional intelligence.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 search-bar">
          <div className="max-w-3xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-700 bg-slate-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-16 category-border max-w-4xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-button flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105"
                    : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-gray-700 backdrop-blur-sm"
                }`}
              >
                <Icon size={20} />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 Course-grid max-w-7xl mx-auto">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border border-gray-700 hover:border-blue-500/50 group"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-900 shadow-lg">
                  {course.price}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full uppercase border border-blue-500/30">
                    {course.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-cyan-400 transition-all">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 mb-5 text-sm text-gray-400">
                  <div className="course-duration flex items-center gap-1.5">
                    <Clock size={16} className="text-blue-400" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="course-level flex items-center gap-1.5">
                    <TrendingUp size={16} className="text-blue-400" />
                    <span>{course.level}</span>
                  </div>
                </div>

                {/* Modules Section */}
                {course.modules && course.modules.length > 0 && (
                  <div className="module-section mb-5">
                    <button
                      onClick={() => toggleModules(course.id)}
                      className="module-border flex items-center justify-between w-full text-left text-sm font-semibold text-gray-300 hover:text-blue-400 transition-colors py-2 px-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50"
                    >
                      <span>View Modules ({course.modules.length})</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          expandedCourse === course.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedCourse === course.id && (
                      <div className="mt-3 space-y-2 animate-fadeIn">
                        {course.modules.map((module, index) => (
                          <div key={index} className="bg-slate-700/30 p-3 rounded-lg border border-gray-700">
                            <p className="font-semibold text-sm text-white mb-1">{module.name}</p>
                            <p className="text-xs text-gray-400 leading-relaxed">{module.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="End-section-course flex items-center justify-between pt-4 border-t border-gray-700">
                  <button className="enroll-btn hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/50">
                    Enroll Now
                  </button>
                  <button className="text-sm text-gray-400 hover:text-blue-400 transition-colors font-medium">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">No courses found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
        </div>
      </div>
    </center>
  );
};

export default HICourses;
