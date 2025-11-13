'use client';

import { useEffect, useState } from 'react';

export default function Chatbot() {
  const [showNotification, setShowNotification] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    // Load Botpress scripts
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v3.3/inject.js';
    script1.async = true;
    
    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2025/09/16/04/20250916041001-E90C098E.js';
    script2.defer = true;

    script1.onload = () => {
      document.head.appendChild(script2);
      script2.onload = () => {
        setScriptsLoaded(true);
      };
    };

    document.head.appendChild(script1);

    // Show notification after 3 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);

    // Auto-hide notification after 10 seconds
    const hideTimer = setTimeout(() => {
      setShowNotification(false);
    }, 13000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleNotificationClick = () => {
    setShowNotification(false);
    // Try to open the Botpress chat widget
    if (typeof window !== 'undefined' && (window as any).botpressWebChat) {
      (window as any).botpressWebChat.sendEvent({ type: 'show' });
    }
  };

  return (
    <>

      {/* Custom Notification Bubble */}
      {scriptsLoaded && showNotification && (
        <div 
          className="chatbot-notification"
          onClick={handleNotificationClick}
        >
          <div className="notification-content">
            <div className="notification-icon">💬</div>
            <div className="notification-text">
              <strong>Ask Assistant</strong>
              <p>Hi! How can I help you today?</p>
            </div>
            <button 
              className="notification-close"
              onClick={(e) => {
                e.stopPropagation();
                setShowNotification(false);
              }}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .chatbot-notification {
          position: fixed;
          bottom: 100px;
          right: 24px;
          z-index: 9999;
          cursor: pointer;
          animation: slideInUp 0.5s ease-out, bounce 2s ease-in-out 0.5s infinite;
        }

        .notification-content {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 16px 20px;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(102, 126, 234, 0.3);
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: 320px;
          position: relative;
          transition: all 0.3s ease;
        }

        .notification-content:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(102, 126, 234, 0.4);
        }

        .notification-icon {
          font-size: 32px;
          flex-shrink: 0;
          animation: wave 1s ease-in-out infinite;
        }

        .notification-text {
          flex: 1;
        }

        .notification-text strong {
          display: block;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 4px;
          letter-spacing: 0.3px;
        }

        .notification-text p {
          margin: 0;
          font-size: 14px;
          opacity: 0.95;
          line-height: 1.4;
        }

        .notification-close {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          font-weight: bold;
        }

        .notification-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(15deg);
          }
          75% {
            transform: rotate(-15deg);
          }
        }

        @media (max-width: 768px) {
          .chatbot-notification {
            bottom: 80px;
            right: 16px;
            left: 16px;
          }

          .notification-content {
            max-width: 100%;
          }

          .notification-text strong {
            font-size: 15px;
          }

          .notification-text p {
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}
