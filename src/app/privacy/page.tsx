'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-page-wrapper">
      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="privacy-container">
          <Link href="/" className="back-link">
            ← Back to Home
          </Link>
          <h1 className="privacy-main-title">Privacy Policy</h1>
          <p className="privacy-subtitle">
            Last updated: November 14, 2025
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="privacy-content-section">
        <div className="privacy-container">
          <div className="privacy-content">
            
            <div className="privacy-section">
              <h2 className="section-title">Introduction</h2>
              <p className="section-text">
                At Aaruchudar, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="section-title">Information We Collect</h2>
              <h3 className="subsection-title">Personal Information</h3>
              <p className="section-text">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="privacy-list">
                <li>Register for our programs or courses</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us through our website</li>
                <li>Participate in our assessments or workshops</li>
                <li>Create an account on our platform</li>
              </ul>
              <p className="section-text">
                This information may include your name, email address, phone number, and any other information you choose to provide.
              </p>

              <h3 className="subsection-title">Automatically Collected Information</h3>
              <p className="section-text">
                When you visit our website, we automatically collect certain information about your device, including:
              </p>
              <ul className="privacy-list">
                <li>IP address and browser type</li>
                <li>Operating system and device information</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Click and navigation patterns</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2 className="section-title">How We Use Your Information</h2>
              <p className="section-text">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="privacy-list">
                <li>Providing and maintaining our services</li>
                <li>Processing your registrations and assessments</li>
                <li>Sending you program updates and educational content</li>
                <li>Responding to your inquiries and support requests</li>
                <li>Improving our website and services</li>
                <li>Analyzing usage patterns and trends</li>
                <li>Preventing fraud and ensuring security</li>
                <li>Complying with legal obligations</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2 className="section-title">Information Sharing and Disclosure</h2>
              <p className="section-text">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="privacy-list">
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and providing our services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale, or transfer of our business</li>
                <li><strong>With Your Consent:</strong> When you explicitly agree to share your information</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2 className="section-title">Cookies and Tracking Technologies</h2>
              <p className="section-text">
                We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us:
              </p>
              <ul className="privacy-list">
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our website</li>
                <li>Improve website functionality and performance</li>
                <li>Provide personalized content and recommendations</li>
              </ul>
              <p className="section-text">
                You can control cookie preferences through your browser settings, but disabling cookies may affect your ability to use certain features of our website.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="section-title">Data Security</h2>
              <p className="section-text">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="privacy-list">
                <li>Encryption of sensitive data</li>
                <li>Secure server infrastructure</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication protocols</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="section-text">
                However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="section-title">Your Rights and Choices</h2>
              <p className="section-text">
                You have certain rights regarding your personal information:
              </p>
              <ul className="privacy-list">
                <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Objection:</strong> Object to certain types of data processing</li>
              </ul>
              <p className="section-text">
                To exercise any of these rights, please contact us at <a href="mailto:hi@aaruchudar.com" className="privacy-link">hi@aaruchudar.com</a>
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="section-title">Children's Privacy</h2>
              <p className="section-text">
                Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately, and we will take appropriate steps to delete such information.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="section-title">Changes to This Privacy Policy</h2>
              <p className="section-text">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:
              </p>
              <ul className="privacy-list">
                <li>Posting the updated policy on this page</li>
                <li>Updating the "Last updated" date</li>
                <li>Sending you an email notification (for significant changes)</li>
              </ul>
              <p className="section-text">
                We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="section-title">Contact Us</h2>
              <p className="section-text">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="contact-info">
                <p className="contact-item">
                  <strong>Email:</strong> <a href="mailto:hi@aaruchudar.com" className="privacy-link">hi@aaruchudar.com</a>
                </p>
                <p className="contact-item">
                  <strong>Website:</strong> <a href="https://aaruchudar.com" className="privacy-link">www.aaruchudar.com</a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        .privacy-page-wrapper {
          min-height: 100vh;
          background: #ffffff;
        }

        .privacy-hero {
          background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
          padding: 120px 24px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .privacy-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .privacy-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          font-size: 16px;
          margin-bottom: 24px;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .back-link:hover {
          color: #ffffff;
          transform: translateX(-4px);
        }

        .privacy-main-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 16px 0;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .privacy-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-style: italic;
        }

        .privacy-content-section {
          padding: 80px 24px;
          background: #ffffff;
        }

        .privacy-content {
          background: #ffffff;
        }

        .privacy-section {
          margin-bottom: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid #e2e8f0;
        }

        .privacy-section:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .section-title {
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 20px 0;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }

        .subsection-title {
          font-size: clamp(18px, 2.5vw, 22px);
          font-weight: 600;
          color: #2d3748;
          margin: 24px 0 12px 0;
          line-height: 1.4;
        }

        .section-text {
          font-size: 16px;
          color: #4a5568;
          line-height: 1.8;
          margin: 0 0 16px 0;
        }

        .privacy-list {
          margin: 16px 0;
          padding-left: 24px;
          list-style: none;
        }

        .privacy-list li {
          font-size: 16px;
          color: #4a5568;
          line-height: 1.8;
          margin-bottom: 12px;
          position: relative;
          padding-left: 24px;
        }

        .privacy-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #667eea;
          font-weight: bold;
          font-size: 20px;
        }

        .privacy-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .privacy-link:hover {
          color: #764ba2;
          text-decoration: underline;
        }

        .contact-info {
          background: #f7fafc;
          border-left: 4px solid #667eea;
          padding: 24px;
          border-radius: 8px;
          margin-top: 16px;
        }

        .contact-item {
          font-size: 16px;
          color: #2d3748;
          margin: 8px 0;
          line-height: 1.6;
        }

        .contact-item strong {
          color: #1a202c;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .privacy-hero {
            padding: 100px 20px 60px;
          }

          .privacy-content-section {
            padding: 60px 20px;
          }

          .privacy-section {
            margin-bottom: 36px;
            padding-bottom: 36px;
          }

          .privacy-list {
            padding-left: 20px;
          }

          .privacy-list li {
            padding-left: 20px;
          }

          .contact-info {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
