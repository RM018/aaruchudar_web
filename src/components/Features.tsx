'use client';
import Link from 'next/link';

// ========================= PROGRAM CARD =========================
const ProgramCard = ({ data }: { data: any }) => (
  <div
    className="
      group flex flex-col h-full
      rounded-2xl overflow-hidden
      border border-white/40 backdrop-blur-xl
      bg-white/60 
      shadow-lg shadow-purple-100
      transition-all duration-300
      hover:shadow-2xl hover:shadow-purple-300
      hover:-translate-y-1
      hover:border-purple-400/60
    "
  >
    {/* Image */}
    <div className="w-full h-40 overflow-hidden">
      <img
        src={data.image}
        alt={data.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-3 mb-4">
        <img src={data.icon} className="w-8 h-8 opacity-90" />
        <h3 className="text-xl font-bold text-slate-900">{data.title}</h3>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
        {data.description}
      </p>

      <ul className="space-y-2 mb-6">
        {data.points.map((p: string, i: number) => (
          <li
            key={i}
            className="flex items-center gap-3 text-sm text-slate-600"
          >
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full shadow-sm"></span>
            {p}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex gap-4 pt-4 border-t border-white/40">
        <Link
          href="#"
          className="text-purple-600 font-semibold hover:underline text-sm"
        >
          Explore
        </Link>
        <Link
          href="#"
          className="text-purple-600 font-semibold hover:underline text-sm"
        >
          Learn More
        </Link>
      </div>
    </div>
  </div>
);

// ========================= DATA =========================
const programCards = [
  {
    id: 1,
    title: "HI Labs",
    image: "/images/hi-labs-banner.jpg",
    icon: "/globe.svg",
    description:
      "Cutting-edge research and experiential learning spaces designed to foster innovation, critical thinking, and leadership development.",
    points: [
      "Innovation-driven projects",
      "Mentorship from experts",
      "Collaborative research",
      "Leadership workshops",
    ],
  },
  {
    id: 2,
    title: "HI Courses",
    image: "/images/hi-courses-banner.jpg",
    icon: "/file.svg",
    description:
      "Transformative educational programs blending practical skills with deep insights for holistic career growth.",
    points: [
      "Industry-relevant curriculum",
      "Personalized learning paths",
      "Career guidance",
      "Skill certification",
    ],
  },
  {
    id: 3,
    title: "HI Workshops",
    image: "/images/hi-workshops-banner.jpg",
    icon: "/window.svg",
    description:
      "Hands-on collaborative sessions with practical tools for teamwork, creativity, and strategic execution.",
    points: [
      "Interactive sessions",
      "Team-based challenges",
      "Real-world scenarios",
      "Expert facilitators",
    ],
  },
  {
    id: 4,
    title: "HI Events",
    image: "/images/hi-events-banner.jpg",
    icon: "/gem.png",
    description:
      "Immersive gatherings of innovators, leaders, and creators for meaningful networking and growth.",
    points: [
      "Networking opportunities",
      "Keynote speakers",
      "Panel discussions",
      "Interactive activities",
    ],
  },
];

// ========================= MAIN SECTION =========================
export default function Features() {
  return (
    <section
      className="
        py-28 
        bg-gradient-to-b 
        from-purple-50 
        via-white 
        to-indigo-50
      "
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Explore Our Programs
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto leading-relaxed">
            Structured cognitive development pathways designed for clarity,
            creativity, and long-term performance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {programCards.map((card) => (
            <ProgramCard key={card.id} data={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
