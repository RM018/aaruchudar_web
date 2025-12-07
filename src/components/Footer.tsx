'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from "./Footer.module.css";

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribed with:', email);
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.containerMax + " " + styles.sectionPadding}>
        {/* Stats Section */}
        <div className={"grid grid-cols-2 md:grid-cols-4 text-center mb-20 pb-20 border-b border-border " + styles.statsGrid}>
          <div>
            <h3 className={styles.statTitle}>500+</h3>
            <p className={styles.statDesc}>Minds Transformed</p>
          </div>
          <div>
            <h3 className={styles.statTitle}>50+</h3>
            <p className={styles.statDesc}>Programs Delivered</p>
          </div>
          <div>
            <h3 className={styles.statTitle}>10+</h3>
            <p className={styles.statDesc}>Countries Reached</p>
          </div>
          <div>
            <h3 className={styles.statTitle}>98%</h3>
            <p className={styles.statDesc}>Success Rate</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand and Contact */}
          <div className="md:col-span-1">
            <h3 className={styles.brand}>Aaruchudar</h3>
            <p className="text-muted-foreground mb-4">
              Unlock your cognitive potential.
            </p>
            <a href="mailto:hi@aaruchudar.com" className="text-purple-400 hover:underline">
              hi@aaruchudar.com
            </a>
          </div>
          {/* Column 2: Programs */}
          <div>
            <h4 className="font-semibold text-white mb-4">Our Programs</h4>
            <ul className="space-y-2">
              <li><Link href="/hi-labs" className={styles.link}>HI Labs</Link></li>
              <li><Link href="/hi-courses" className={styles.link}>HI Courses</Link></li>
              <li><Link href="/hi-workshops" className={styles.link}>HI Workshops</Link></li>
              <li><Link href="/hi-events" className={styles.link}>HI Events</Link></li>
            </ul>
          </div>
          {/* Column 3: Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className={styles.link}>About Us</Link></li>
              <li><Link href="/blog" className={styles.link}>Blog</Link></li>
              <li><Link href="/careers" className={styles.link}>Careers</Link></li>
              <li><Link href="/contact" className={styles.link}>Contact</Link></li>
            </ul>
          </div>
          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-4">Stay Connected</h4>
            <p className="text-muted-foreground mb-4">Get the latest updates and insights.</p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className={styles.newsletterInput}
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} Aaruchudar. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
            <Link href="/terms" className={styles.link}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;