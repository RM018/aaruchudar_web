import React, { useState, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, Html } from '@react-three/drei'
import AaruchudarLogo from './assets/A_Logo.png'
import { BrainScene } from './BrainComponents'

export default function Lab6() {
  const [activeSection, setActiveSection] = useState('welcome')
  const [autoRotate, setAutoRotate] = useState(true)

  const sections = {
    welcome: 'Welcome',
    brain: 'Brain Activation',
    about: 'About Us',
    systemic: 'Systemic Thinking',
    principles: 'Core Principles',
    tools: 'Thinking Tools',
    cases: 'Case Examples',
    games: 'Games & Activities',
    culture: 'Team Culture',
    journey: 'Journey Beyond',
    reflection: 'Reflection Corner'
  }

  // Lab 6 specific active regions and their definitions
  const labActiveRegions = {
    Frontal: {
      title: "Executive Processing Centers",
      description: "Regions responsible for complex thinking and pattern analysis.",
      details: [
        {
          name: "Prefrontal Cortex",
          role: "Pattern integration master",
          functions: ["Complex analysis", "Pattern recognition", "Strategic planning", "Abstract thinking"]
        },
        {
          name: "Anterior Prefrontal Cortex",
          role: "Meta-cognitive hub",
          functions: ["System integration", "Multi-level thinking", "Goal coordination", "Complex reasoning"]
        }
      ]
    },
    Parietal: {
      title: "Pattern Recognition Network",
      description: "Areas that help identify and process complex patterns.",
      details: [
        {
          name: "Posterior Parietal Cortex",
          role: "Pattern analyzer",
          functions: ["Spatial relations", "Pattern matching", "Information integration", "Visual-spatial processing"]
        },
        {
          name: "Precuneus",
          role: "Mental modeling center",
          functions: ["Mental imagery", "Pattern visualization", "Self-reflection", "Cognitive mapping"]
        }
      ]
    },
    Cerebellum: {
      title: "Learning Optimization System",
      description: "Region that refines thinking patterns and cognitive sequences.",
      details: [
        {
          name: "Cognitive Cerebellum",
          role: "Thought sequence optimizer",
          functions: ["Pattern refinement", "Cognitive timing", "Learning automation", "Sequence optimization"]
        }
      ]
    }
  }

  return (
    <div className="app-container">
      <div className="brain-pattern-overlay"></div>
      
      <header className="header">
        <div className="header-content">
          <div className="brand-section">
            <div className="logo-container">
              <img src={AaruchudarLogo} alt="Aaruchudar Logo" className="company-logo" />
            </div>
            <div className="brand-text">
              <h1 className="company-name">AARUCHUDAR</h1>
              <p className="slogan">HI LAB 6 – Systemic Thinking</p>
            </div>
          </div>
          <div className="neural-stats">
            <Link to="/" className="button" style={{
              backgroundColor: '#00d4ff',
              color: '#000',
              textDecoration: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: '600'
            }}>
              ← Back to Brain Model
            </Link>
          </div>
        </div>
      </header>

      {/* Brain Model Section */}
      <div style={{ 
        width: '100%', 
        height: '75vh',
        position: 'relative',
        marginBottom: '1rem',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '15px',
        overflow: 'hidden'
      }}>
        <Canvas 
          camera={{ 
            position: [0, 0, 3],
            fov: 50,
            near: 0.1,
            far: 1000
          }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-5, -5, -5]} intensity={0.4} />
          <Suspense fallback={<Html center>Loading Brain Model...</Html>}>
            <Stage 
              intensity={0.8}
              environment={'city'} 
              contactShadow={{ opacity: 0.3, blur: 4 }}
              adjustCamera={false}
            >
              <BrainScene 
                activeRegions={Object.keys(labActiveRegions)}
                labHighlight={true}
                autoRotate={autoRotate}
              />
            </Stage>
          </Suspense>
          <OrbitControls 
            enablePan={false} 
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            minDistance={2}
            maxDistance={6}
          />
        </Canvas>

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            padding: '8px 16px',
            backgroundColor: autoRotate ? '#06ffa5' : 'rgba(6, 255, 165, 0.15)',
            color: autoRotate ? '#000' : '#fff',
            border: '1px solid #06ffa5',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 1000
          }}
        >
          <span>{autoRotate ? '⏸' : '▶️'}</span>
          {autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
        </button>

        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          right: 20,
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '12px',
          padding: '20px',
          color: 'white',
          backdropFilter: 'blur(10px)',
          zIndex: 1000
        }}>
          <h2 style={{ color: '#06ffa5', marginBottom: '15px' }}>Active Brain Regions</h2>
          {Object.entries(labActiveRegions).map(([region, info]) => (
            <div key={region} style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#00d4ff', marginBottom: '10px' }}>{info.title}</h3>
              <p style={{ color: '#ffffff', marginBottom: '15px' }}>{info.description}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                {info.details.map((detail, index) => (
                  <div key={index} style={{ 
                    background: 'rgba(6, 255, 165, 0.1)',
                    border: '1px solid rgba(6, 255, 165, 0.3)',
                    borderRadius: '8px',
                    padding: '15px'
                  }}>
                    <h4 style={{ color: '#06ffa5', marginBottom: '5px' }}>{detail.name}</h4>
                    <p style={{ color: '#00d4ff', fontSize: '0.9em', marginBottom: '10px', fontStyle: 'italic' }}>
                      {detail.role}
                    </p>
                    <ul style={{ 
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '5px'
                    }}>
                      {detail.functions.map((func, i) => (
                        <li key={i} style={{
                          background: 'rgba(0, 212, 255, 0.15)',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8em'
                        }}>
                          {func}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-frame">
          <div className="container">
            <div className="left">
              <div className="card">
                <h2 className="neural-title" style={{ color: '#06ffa5', marginBottom: '20px' }}>
                  Lab Navigation
                </h2>
                <div className="lab-navigation">
                  {Object.entries(sections).map(([key, title]) => (
                    <button key={key} className={`nav-button ${activeSection === key ? 'active' : ''}`}
                      onClick={() => setActiveSection(key)}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '12px 16px',
                        marginBottom: '8px',
                        backgroundColor: activeSection === key ? '#06ffa5' : 'rgba(0, 212, 255, 0.15)',
                        color: activeSection === key ? '#000' : '#ffffff',
                        border: `1px solid ${activeSection === key ? '#06ffa5' : '#00d4ff'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        textAlign: 'left',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="right">
              <div className="card">
                <div className="lab-content" style={{ maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}>
                  
                  {activeSection === 'welcome' && (
                    <div className="content-section">
                      <h1 style={{ color: '#06ffa5', fontSize: '32px', marginBottom: '20px' }}>
                        HI LAB 6: SYSTEMIC THINKING
                      </h1>
                      
                      <div style={{ color: '#ffffff', lineHeight: '1.8', fontSize: '16px' }}>
                        <h2 style={{ color: '#00d4ff', fontSize: '24px', marginTop: '0' }}>Welcome Statement</h2>
                        <p>
                          Welcome to a space where the way you see, think, and understand the world changes. In this lab, 
                          we see beyond individual events and decisions to uncover the patterns, relationships, and ripple 
                          effects that govern the whole systems.
                        </p>
                        
                        <p>
                          Here, you will learn to realize the ties that are often overlooked and to trace the link between 
                          a small action and the significant effect it is causing. Moreover, understanding so, you will be 
                          able to determine the future results before they happen.
                        </p>

                        <p>
                          You will learn to take a problem to several angles, doubt the assumptions, and see the world as 
                          a network of interconnected components rather than isolated ones through hands-on activities, 
                          imagination exercises, and group discussions.
                        </p>

                        <p>
                          This lab is more than just problem-solving. It is about thinking more intensively, acting more 
                          consciously and developing the awareness needed to make choices that matter and last. As a result 
                          of this journey, you will witness a clearer picture of patterns and a deeper understanding of your 
                          part in them, thus, you will be able to engage thoughtfully and make meaningful contributions to 
                          the systems around you.
                        </p>

                        <div style={{ 
                          marginTop: '30px', 
                          padding: '20px', 
                          background: 'rgba(6, 255, 165, 0.1)', 
                          border: '1px solid rgba(6, 255, 165, 0.3)', 
                          borderRadius: '12px' 
                        }}>
                          <h3 style={{ color: '#06ffa5', fontSize: '18px', marginBottom: '15px' }}>
                            Lab Outcomes
                          </h3>
                          <ul style={{ paddingLeft: '20px' }}>
                            <li>Grasp the idea of systems ripple through which actions influence people, processes, and outcomes</li>
                            <li>Practice skills of predicting results, assessing options, and making thoughtful, grounded choices</li>
                            <li>Recognize recurring patterns, feedback loops, and root causes instead of isolating issues</li>
                            <li>Communicate better and collaborate more effectively through understanding interconnections</li>
                            <li>Develop mindset for stopping, reflecting, and responding intentionally rather than reacting impulsively</li>
                            <li>Embody automatic thinking about connections, dependencies, and long-term impact</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Additional sections can be added here */}

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            HI LAB 6 – Systemic Thinking powered by
          </span>
          <span style={{ 
            color: 'var(--accent-cyan)', 
            fontWeight: 700,
            textShadow: '0 0 10px rgba(6, 255, 165, 0.3)'
          }}>
            AARUCHUDAR
          </span>
        </div>
        <div style={{ 
          marginTop: 10, 
          fontSize: 12, 
          color: 'var(--text-secondary)',
          opacity: 0.7
        }}>
          Understanding patterns • Seeing connections • Making better decisions
        </div>
      </footer>
    </div>
  )
}