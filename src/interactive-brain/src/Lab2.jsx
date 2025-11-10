import React, { useState, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, Html } from '@react-three/drei'
import AaruchudarLogo from './assets/A_Logo.png'
import { BrainScene } from './BrainComponents'

export default function Lab2() {
  const [activeSection, setActiveSection] = useState('welcome')
  const [autoRotate, setAutoRotate] = useState(true)

  const sections = {
    welcome: 'Welcome',
    brain: 'Brain Activation',
    tools: 'Decision Tools',
    cases: 'Case Examples',
    games: 'Games & Activities',
    journey: 'Journey Beyond',
    reflection: 'Reflection Corner'
  }

  const labActiveRegions = {
    Frontal: {
      title: "Prefrontal Decision Centers",
      description: "Critical regions for balanced decision-making and emotional processing.",
      details: [
        {
          name: "Ventromedial PFC (vmPFC)",
          role: "Value assessment and emotional regulation",
          functions: ["Decision value calculation", "Emotional processing", "Risk assessment", "Reward evaluation"]
        },
        {
          name: "Dorsolateral PFC (dlPFC)",
          role: "Rational decision-making",
          functions: ["Logical analysis", "Working memory", "Cognitive control", "Strategic planning"]
        }
      ]
    },
    Temporal: {
      title: "Emotional Memory Centers",
      description: "Regions responsible for emotional memory and response.",
      details: [
        {
          name: "Amygdala",
          role: "Emotional significance detector",
          functions: ["Emotional processing", "Fear response", "Memory enhancement", "Social signals"]
        },
        {
          name: "Anterior Insula",
          role: "Emotional awareness hub",
          functions: ["Interoception", "Risk processing", "Emotional awareness", "Social emotions"]
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
              <p className="slogan">HI LAB 2 – Decision Making Without Drama</p>
            </div>
          </div>
          <div className="neural-stats">
            <Link to="/" className="button" style={{
              backgroundColor: '#00d4ff', color: '#000', textDecoration: 'none',
              padding: '10px 20px', borderRadius: '8px', fontWeight: '600'
            }}>
              ← Back to Brain Model
            </Link>
          </div>
        </div>
      </header>

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
                        display: 'block', width: '100%', padding: '12px 16px', marginBottom: '8px',
                        backgroundColor: activeSection === key ? '#06ffa5' : 'rgba(0, 212, 255, 0.15)',
                        color: activeSection === key ? '#000' : '#ffffff',
                        border: `1px solid ${activeSection === key ? '#06ffa5' : '#00d4ff'}`,
                        borderRadius: '8px', cursor: 'pointer', fontWeight: '600', textAlign: 'left',
                        transition: 'all 0.3s ease'
                      }}>
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
                        HI LAB 2: DECISION MAKING WITHOUT DRAMA
                      </h1>
                      
                      <div style={{ color: '#ffffff', lineHeight: '1.8', fontSize: '16px' }}>
                        <h2 style={{ color: '#00d4ff', fontSize: '24px', marginTop: '0' }}>Focus</h2>
                        <p style={{ fontSize: '18px', fontWeight: '600', color: '#06ffa5' }}>
                          Emotional Intelligence, Decision-making
                        </p>
                        
                        <p>
                          Welcome to Lab 2, where you'll master the art of making clear, balanced decisions without 
                          emotional overwhelm. This lab trains your brain to harmonize logic and emotion, creating 
                          a powerful decision-making system that serves you in every aspect of life.
                        </p>
                        
                        <p>
                          Through targeted exercises, you'll strengthen the neural networks responsible for emotional 
                          regulation, strategic thinking, and intuitive wisdom. Learn to navigate complex choices with 
                          confidence and clarity, free from the drama of emotional reactivity.
                        </p>

                        <div style={{ 
                          marginTop: '30px', padding: '20px', background: 'rgba(6, 255, 165, 0.1)', 
                          border: '1px solid rgba(6, 255, 165, 0.3)', borderRadius: '12px' 
                        }}>
                          <h3 style={{ color: '#06ffa5', fontSize: '18px', marginBottom: '15px' }}>
                            Lab Outcomes
                          </h3>
                          <ul style={{ paddingLeft: '20px' }}>
                            <li>Balance emotional input with logical analysis in decision-making</li>
                            <li>Develop resistance to impulsive reactions and emotional hijacking</li>
                            <li>Strengthen your ability to read emotional signals and gut feelings</li>
                            <li>Create a personal decision-making framework that reduces stress</li>
                            <li>Build confidence in your choices through integrated thinking</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'brain' && (
                    <div className="content-section">
                      <h1 style={{ color: '#06ffa5', fontSize: '32px', marginBottom: '20px' }}>
                        Brain Parts Activated in Lab 2
                      </h1>
                      
                      <div style={{ color: '#ffffff', lineHeight: '1.8', fontSize: '16px' }}>
                        <p style={{ marginBottom: '30px' }}>
                          Lab 2 activates four key brain regions that work together to create balanced, 
                          drama-free decision-making capabilities.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                          <div style={{ 
                            background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', 
                            borderRadius: '15px', padding: '25px'
                          }}>
                            <h2 style={{ color: '#3B82F6', fontSize: '22px', marginBottom: '15px' }}>
                              🧠 Ventromedial Prefrontal Cortex (vmPFC)
                            </h2>
                            <p style={{ fontStyle: 'italic', color: '#00d4ff', marginBottom: '15px' }}>
                              "Your emotional advisor and rational judge working together"
                            </p>
                            <p><strong>What it does:</strong> Helps you balance feelings with logic to make fair and thoughtful decisions. Allows you to stay calm, weigh consequences, and make choices that feel emotionally right and make sense.</p>
                            <p><strong>Example:</strong> When deciding whether to buy something expensive, your vmPFC helps you balance excitement with the thought, "Maybe I should save this money for later."</p>
                          </div>

                          <div style={{ 
                            background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', 
                            borderRadius: '15px', padding: '25px'
                          }}>
                            <h2 style={{ color: '#10B981', fontSize: '22px', marginBottom: '15px' }}>
                              🎯 Dorsolateral Prefrontal Cortex (dlPFC)
                            </h2>
                            <p style={{ fontStyle: 'italic', color: '#00d4ff', marginBottom: '15px' }}>
                              "Your logical strategist"
                            </p>
                            <p><strong>What it does:</strong> Helps you plan, analyze, and compare different options objectively. Allows you to pause, think through problems, and resist impulsive reactions.</p>
                            <p><strong>Example:</strong> When you carefully think through pros and cons before making a big decision like choosing a college or job, your dlPFC is keeping your thinking clear and structured.</p>
                          </div>

                          <div style={{ 
                            background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', 
                            borderRadius: '15px', padding: '25px'
                          }}>
                            <h2 style={{ color: '#F59E0B', fontSize: '22px', marginBottom: '15px' }}>
                              ⚡ Amygdala
                            </h2>
                            <p style={{ fontStyle: 'italic', color: '#00d4ff', marginBottom: '15px' }}>
                              "Your emotional alarm system"
                            </p>
                            <p><strong>What it does:</strong> Instantly reacts to anything that feels exciting, threatening, or emotionally charged. Gives you the rush of fear, joy, or anxiety and prepares your body to respond quickly.</p>
                            <p><strong>Example:</strong> When you suddenly feel nervous before a presentation or jump when you hear a loud noise, that's your amygdala triggering a quick emotional response.</p>
                          </div>

                          <div style={{ 
                            background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', 
                            borderRadius: '15px', padding: '25px'
                          }}>
                            <h2 style={{ color: '#8B5CF6', fontSize: '22px', marginBottom: '15px' }}>
                              💫 Anterior Insula
                            </h2>
                            <p style={{ fontStyle: 'italic', color: '#00d4ff', marginBottom: '15px' }}>
                              "Your emotional compass"
                            </p>
                            <p><strong>What it does:</strong> Acts like your emotional compass, connecting your body's sensations with your inner feelings. Helps you recognize emotions like regret, empathy, and discomfort, guiding decisions through intuition.</p>
                            <p><strong>Example:</strong> When you get a sinking feeling that a choice might not be right or feel empathy for someone in pain, your anterior insula is signaling those emotions.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ...additional sections... */}

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-secondary)' }}>HI LAB 2 – Decision Making Without Drama powered by</span>
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 700, textShadow: '0 0 10px rgba(6, 255, 165, 0.3)' }}>AARUCHUDAR</span>
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-secondary)', opacity: 0.7 }}>
          Emotional Intelligence • Strategic Thinking • Balanced Decision-Making
        </div>
      </footer>
    </div>
  )
}