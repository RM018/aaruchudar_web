'use client';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  
  useEffect(() => {
    const removeInjectedAttrs = () => {
      try {
       
        document.querySelectorAll('[fdprocessedid]').forEach((el) => el.removeAttribute('fdprocessedid'));
      } catch (e) {
        // ignore
      }
    };

  
    removeInjectedAttrs();

    // Observe DOM mutations briefly to catch late-inserted nodes (some extensions inject after load)
    const observer = new MutationObserver(() => {
      removeInjectedAttrs();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Stop observing after a short window to avoid overhead
    const timeout = setTimeout(() => observer.disconnect(), 5000);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <footer className="site-footer bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-cyan-500 to-yellow-500 animate-pulse"></div>
      </div>

      {/* Main CTA Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-18">
            <span className="text-white">Ready to</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-yellow-500 animate-pulse">
              Transform?
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button suppressHydrationWarning className="group relative px-8 py-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-400/50">
          
    
            </button>
    
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <div className="space-y-4">

            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Get in Touch</h4>
              <a href="mailto:hi@aaruchudar.com" className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors duration-300 group">
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">✉️</span>
                hi@aaruchudar.com
              </a>
            </div>
          </div>

          {/* Programs */}
          <div className="space-y-6">
            <h3 className="text-lg font-black uppercase tracking-wider text-white border-b-2 border-emerald-400 inline-block pb-2">
              Our Programs
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'HI Labs', href: '/hi-labs', desc: 'Innovation Labs' },
                { name: 'HI Courses', href: '/hi-courses', desc: 'Expert-led Courses' },
                { name: 'HI Workshops', href: '/hi-workshops', desc: 'Hands-on Learning' },
                { name: 'HI Events', href: '/hi-events', desc: 'Community Events' }
              ].map((program) => (
                <li key={program.name}>
                  <a href={program.href} className="group block">
                    <div className="text-zinc-300 group-hover:text-emerald-400 transition-colors font-semibold">
                      {program.name}
                    </div>
                    <div className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                      {program.desc}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className="text-lg font-black uppercase tracking-wider text-white border-b-2 border-cyan-400 inline-block pb-2">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Our Story', href: '/story' },
                { name: 'Blog', href: '/blog' },
                { name: 'Careers', href: '/careers' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-zinc-400 hover:text-cyan-400 transition-colors font-medium group flex items-center gap-2">
                    <span className="w-0 h-0.5 bg-cyan-400 group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-black uppercase tracking-wider text-white border-b-2 border-yellow-400 inline-block pb-2">
              Stay Connected
            </h3>
            <div className="space-y-3">
              <input 
                suppressHydrationWarning
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300"
              />
              <button 
                suppressHydrationWarning
                onClick={handleSubscribe}
                className="w-full bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-black px-4 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-400/50"
              >
                {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">&nbsp;</h4>
              <div className="flex gap-3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {[
                  { icon: 'ⓕ', color: 'hover:bg-blue-500', label: 'Facebook' },
                  { icon: '𝕏', color: 'hover:bg-sky-400', label: 'Twitter' },
                  { icon: '📸', color: 'hover:bg-pink-500', label: 'Instagram' },
                  { icon: 'ℹ️', color: 'hover:bg-blue-600', label: 'LinkedIn' }
                ].map((social) => (
                  <a 
                    key={social.label}
                    href="#" 
                    aria-label={social.label}
                    className={`w-10 h-10 bg-zinc-800 ${social.color} rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 py-12 border-y border-zinc-800">
          {[
            { value: '500+', label: 'Minds Transformed', color: 'text-emerald-400' },
            { value: '50+', label: 'Programs Delivered', color: 'text-cyan-400' },
            { value: '10+', label: 'Countries Reached', color: 'text-yellow-400' },
            { value: '98%', label: 'Success Rate', color: 'text-orange-400' }
          ].map((stat) => (
            <div key={stat.label} className="text-center group cursor-default">
              <div className={`text-4xl md:text-5xl font-black ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                {stat.value}
              </div>
              <div className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-400">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p>© {new Date().getFullYear()} Aaruchudar. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="/privacy" className="hover:text-emerald-400 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="/testimonials" className="hover:text-yellow-400 transition-colors duration-300">
                  Testimonials
                </a>
                <a href="/terms" className="hover:text-cyan-400 transition-colors duration-300">
                  Terms of Service
                </a>
              </div>
            </div>
            
            <p className="flex items-center gap-2 hover:text-emerald-400 transition-colors duration-300">
              Crafted with 
              <span className="text-red-400 animate-pulse text-base">❤️</span> 
              by Aaruchudar Team
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Scoped footer overrides to ensure visual effects aren't overridden by global CSS */
        .site-footer {
          background: #000 !important;
          color: #fff !important;
        }

        .site-footer h1,
        .site-footer h2,
        .site-footer h3,
        .site-footer h4,
        .site-footer h5,
        .site-footer h6 {
          color: #ffffff !important;
        }

        .site-footer .absolute.inset-0 > div {
          /* ensure animated background shows through */
          background: linear-gradient(to bottom right, rgba(6,182,212,0.12), rgba(14,165,233,0.08), rgba(250,204,21,0.06)) !important;
          opacity: 0.06 !important;
        }

        .site-footer .group .relative.z-10 {
          z-index: 50 !important;
        }

        .site-footer .btn-cta-primary,
        .site-footer .group > button,
        .site-footer button {
          /* make sure CTA buttons keep their gradient and remain visible */
          color: inherit !important;
        }

        .site-footer a {
          color: inherit !important;
        }

        /* Larger gap for newsletter controls in case global spacing collapsed */
        .site-footer .space-y-3 > input,
        .site-footer .space-y-3 > button {
          margin-top: 0.6rem;
        }
      `}</style>
    </footer>
  );
};

export default Footer;