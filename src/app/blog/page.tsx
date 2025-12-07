'use client';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import "./BlogPage.css";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", "Innovation", "Psychology", "Intellectual Growth", "Technology", "Research"];

  const blogPosts = [
    {
      id: 1,
      title: "INITIATIVE WITH PATRONAGE'S INTUITION",
      excerpt: "Exploring the intersection of psychology and technology in enhancing human potential and cognitive abilities.",
      author: "BEAUTY SABAT",
      role: "Content Creator",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Innovation",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      tags: ["Psychology", "Innovation", "Human Intelligence"],
      featured: true,
    },
    {
      id: 2,
      title: "The Evolving Role of Human Intelligence in the Age of AI",
      excerpt: "How cognitive psychology principles are being applied in modern learning systems and educational technologies.",
      author: "SHELSIA SHARON",
      role: "Content Creator",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Psychology",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      tags: ["Cognitive Psychology", "Learning", "Education"],
      featured: false,
    },
    {
      id: 3,
      title: "AARUCHUDAR CONSULTANCY",
      excerpt: "Breaking silos: The power of combining multiple disciplines for breakthrough innovation and creative problem-solving.",
      author: "NIROSHINI",
      role: "Content Creator",
      date: "March 5, 2024",
      readTime: "10 min read",
      category: "Intellectual Growth",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      tags: ["Innovation", "Interdisciplinary", "Creative Thinking"],
      featured: false,
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.p
                className="text-white text-lg font-semibold"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading Blog...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="blog-container pt-16 md:pt-24 pb-20" role="main" aria-label="Blog content">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.location.href = '/'}
          className="absolute top-4 left-4 md:fixed md:top-6 md:left-6 z-40 px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-lg text-white text-sm md:text-base font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20 shadow-xl hover:scale-105"
          aria-label="Go back to home"
        >
          ← Back to Home
        </motion.button>

        {/* Hero Section */}
        <section className="hero-section px-6">
          <div className="hero-bg" />
          <div className="hero-content-wrapper">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full text-indigo-300 font-bold border border-white/20"
              >
                ✨ Insights & Innovation
              </motion.span>

              <h1 className="hero-title">
                <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                  Aaruchudar
                </span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Blog
                </span>
              </h1>

              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Human Intelligence Is Not A Fixed Trait, But A Dynamic Potential
              </p>

              {/* Search */}
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Search articles, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  aria-label="Search blog posts"
                />
                <Search className="search-icon" />
              </div>

              {/* Categories */}
              <div className="category-pills">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="section px-6">
            <div className="container">
              <h2 className="section-title">Featured Article</h2>
              <motion.article
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="featured-card"
              >
                <div className="featured-image">
                  <img src={featuredPost.image} alt={featuredPost.title} loading="lazy" />
                  <span className="featured-badge">⭐ Featured</span>
                </div>
                <div className="featured-content">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="badge">{featuredPost.category}</span>
                    <span className="text-white/60 text-sm">{featuredPost.readTime}</span>
                  </div>
                  <h3 className="featured-title">{featuredPost.title}</h3>
                  <p className="featured-excerpt">{featuredPost.excerpt}</p>
                  <div className="featured-footer">
                    <div className="author">
                      <div className="avatar">{featuredPost.author[0]}</div>
                      <div>
                        <p className="author-name">{featuredPost.author}</p>
                        <p className="author-role">{featuredPost.role}</p>
                      </div>
                    </div>
                    <button className="btn-primary">
                      Read More <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            </div>
          </section>
        )}

        {/* Posts Grid */}
        <section className="section px-6">
          <div className="container">
            <h2 className="section-title">Latest Articles</h2>
            <div className="posts-grid">
              {regularPosts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="post-card"
                >
                  <div className="post-image">
                    <img src={post.image} alt={post.title} loading="lazy" />
                    <span className="post-badge">{post.category}</span>
                  </div>
                  <div className="post-content">
                    <div className="post-meta">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <div className="post-tags">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    <div className="post-footer">
                      <div className="author-small">
                        <div className="avatar-small">{post.author[0]}</div>
                        <span>{post.author}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="newsletter px-6">
          <div className="container text-center">
            <h2 className="newsletter-title">Stay Ahead of the Curve</h2>
            <p className="newsletter-subtitle">
              Join thousands of innovators who rely on our insights to stay informed about the latest trends.
            </p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" className="newsletter-input" aria-label="Email address" />
              <button className="newsletter-btn" aria-label="Subscribe to newsletter">Subscribe Now</button>
            </div>
            <div className="newsletter-features">
              <span>✓ No spam, ever</span>
              <span>✓ Weekly insights</span>
              <span>✓ Unsubscribe anytime</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
