'use client';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
       
      </div>

      {/* Main CTA Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h2 className="text-6xl lg:text-8xl font-bold leading-tight mb-8" style={{ color: '#ffffff' }}>
            <span style={{ color: '#ffffff' }}>Ready to</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-yellow-500">
              Transform?
            </span>
          </h2>
         
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
          {/* Left section - Brand & Mission */}
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-6">

            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold mb-4" style={{ color: '#ffffff' }}>&nbsp;&nbsp;&nbsp;Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  
                  <a href="mailto:hi@aaruchudar.com" className="text-zinc-300 hover:text-emerald-400 transition-colors duration-300">
                  &nbsp;&nbsp;  hi@aaruchudar.com
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                 
                </div>
              </div>
            </div>
          </div>

          {/* Center section - Quick Links & Programs */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-12">
              {/* Programs */}
              <div className="space-y-6">
                <h3 className="font-black uppercase tracking-wider text-sm border-b-4 border-emerald-400 inline-block pb-2" style={{ color: '#ffffff' }}>
                  Our Programs
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/hi-labs" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium text-base block group">
                      <span className="relative">
                        HI Labs
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
                      </span>
                     
                    </Link>
                  </li>
                  <li>
                    <Link href="/hi-courses" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium text-base block group">
                      <span className="relative">
                        HI Courses
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
                      </span>
                      
                    </Link>
                  </li>
                  <li>
                    <Link href="/hi-workshops" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium text-base block group">
                      <span className="relative">
                        HI Workshops
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
                      </span>
                      
                    </Link>
                  </li>
                  <li>
                    <Link href="/hi-events" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium text-base block group">
                      <span className="relative">
                        HI Events
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div className="space-y-6">
                <button suppressHydrationWarning className="font-black text-white uppercase tracking-wider text-base border-b-4 border-cyan-400 inline-block pb-2 hover:text-cyan-400 transition-colors duration-300">
                  Know Us!
                </button>
                <br/>
                <button suppressHydrationWarning className="font-black text-white uppercase tracking-wider text-base border-b-4 border-cyan-400 inline-block pb-2 hover:text-cyan-400 transition-colors duration-300">
                  Join Us!
                </button>
                <ul className="space-y-4">
                  <li>
                    
                    <Link href="/blog" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium text-base block group">
                      <span className="relative">
                      
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium text-base block group">
                      <span className="relative">
                     
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right section - Newsletter & Stats */}
          <div className="lg:col-span-1 space-y-12">
            {/* Newsletter Signup */}
            <div className="space-y-6">
              <h3 className="font-black uppercase tracking-wider text-base border-b-4 border-yellow-400 inline-block pb-2" style={{ color: '#14ed68ff' }}>
                Stay Connected
              </h3>
             
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  suppressHydrationWarning
                  className="w-full px-6 py-4 bg-zinc-800 border border-zinc-700 rounded-full text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-400 transition-colors duration-300"
                />
                <button suppressHydrationWarning className="w-full bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-zinc-900 px-6 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105">
                  Subscribe to Newsletter
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 border border-zinc-700 rounded-lg hover:border-emerald-400 transition-colors duration-300">
                  <div className="text-2xl font-bold text-emerald-400">500+</div>
                  <div className="text-sm text-zinc-400">Minds Transformed</div>
                </div>
                <div className="text-center p-4 border border-zinc-700 rounded-lg hover:border-cyan-400 transition-colors duration-300">
                  <div className="text-2xl font-bold text-cyan-400">50+</div>
                  <div className="text-sm text-zinc-400">Programs Delivered</div>
                </div>
                <div className="text-center p-4 border border-zinc-700 rounded-lg hover:border-yellow-400 transition-colors duration-300">
                  <div className="text-2xl font-bold text-yellow-400">10+</div>
                  <div className="text-sm text-zinc-400">Countries Reached</div>
                </div>
                <div className="text-center p-4 border border-zinc-700 rounded-lg hover:border-orange-400 transition-colors duration-300">
                  <div className="text-2xl font-bold text-orange-400">98%</div>
                  <div className="text-sm text-zinc-400">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Additional Links */}
        <div className="border-t border-zinc-700 pt-12 mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
            <div className="space-y-4">
              <h4 className="text-xl font-bold" style={{ color: '#ffffff' }}>Follow Our Journey</h4>
              <div className="flex space-x-6">
                <a href="#" className="w-12 h-12 bg-zinc-800 hover:bg-emerald-400 rounded-full flex items-center justify-center transition-all duration-300 group">
                  <span className="text-emerald-400 group-hover:text-zinc-900 transition-colors duration-300">📘</span>
                </a>
                <a href="#" className="w-12 h-12 bg-zinc-800 hover:bg-cyan-400 rounded-full flex items-center justify-center transition-all duration-300 group">
                  <span className="text-cyan-400 group-hover:text-zinc-900 transition-colors duration-300">🐦</span>
                </a>
                <a href="#" className="w-12 h-12 bg-zinc-800 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300 group">
                  <span className="text-yellow-400 group-hover:text-zinc-900 transition-colors duration-300">📸</span>
                </a>
                <a href="#" className="w-12 h-12 bg-zinc-800 hover:bg-orange-400 rounded-full flex items-center justify-center transition-all duration-300 group">
                  <span className="text-orange-400 group-hover:text-zinc-900 transition-colors duration-300">💼</span>
                </a>
              </div>
            </div>
            
            <div className="text-center lg:text-right">
              <div className="text-2xl font-bold text-zinc-400 mb-4">
                Transforming Ideas into Reality
              </div>
              <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto lg:mx-0 lg:ml-auto rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-700 bg-zinc-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-sm text-zinc-400">
              <p>© {new Date().getFullYear()} Aaruchudar. All rights reserved.</p>
              <div className="flex space-x-6">
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors duration-300 border-b border-transparent hover:border-emerald-400">
                &nbsp;&nbsp;  Privacy Policy   &nbsp;&nbsp;&nbsp;&nbsp;
                </Link>
                <Link href="/cookie-policy" className="hover:text-yellow-400 transition-colors duration-300 border-b border-transparent hover:border-yellow-400"> Testimonials   &nbsp;&nbsp;&nbsp;&nbsp;
                </Link>
                <Link href="/terms" className="hover:text-cyan-400 transition-colors duration-300 border-b border-transparent hover:border-cyan-400">
                  Terms of Service
                </Link>
              </div>
            </div>
            
            <p className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2">
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Crafted with 
              <span className="text-red-400 animate-pulse">❤️</span> 
              by Aaruchudar Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
