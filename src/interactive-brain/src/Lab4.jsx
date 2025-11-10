import React, { useState, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, Html } from '@react-three/drei'
import AaruchudarLogo from './assets/A_Logo.png'
import { BrainScene } from './BrainComponents'

export default function Lab4() {
  const [activeSection, setActiveSection] = useState('welcome')
  const [autoRotate, setAutoRotate] = useState(false)

  const sections = {
    welcome: 'Welcome',
    brain: 'Brain Activation',
    tools: 'Listening Tools',
    cases: 'Case Examples',
    games: 'Games & Activities',
    journey: 'Journey Beyond',
    reflection: 'Reflection Corner'
  }

  const labActiveRegions = {
    temporalLobes: true,
    mirrorNeuronSystem: true,
    medialPrefrontalCortex: true,
    superiorTemporalSulcus: true
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
              <p className="slogan">HI LAB 4 – The Power of Listening</p>
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
                {/* Brain Model Section First */}
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
                </div>

                {/* Content Sections Below */}
                <div className="lab-content" style={{ maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}>
                  
                  {activeSection === 'welcome' && (
                    <div className="content-section">
                      <h1 style={{ color: '#06ffa5', fontSize: '32px', marginBottom: '20px' }}>
                        HI LAB 4: THE POWER OF LISTENING
                      </h1>
                      
                      <div style={{ color: '#ffffff', lineHeight: '1.8', fontSize: '16px' }}>
                        <h2 style={{ color: '#00d4ff', fontSize: '24px', marginTop: '0' }}>Focus</h2>
                        <p style={{ fontSize: '18px', fontWeight: '600', color: '#06ffa5' }}>
                          Listening deeply and Understanding others
                        </p>
                        
                        <p>
                          Welcome to Lab 4, where you'll develop the profound skill of deep listening - 
                          the foundation of meaningful connection, empathy, and understanding. This lab 
                          activates your brain's social cognition networks to enhance your ability to 
                          truly hear and understand others at multiple levels.
                        </p>
                        
                        <p>
                          Through targeted exercises, you'll strengthen your capacity to decode language, 
                          read emotional signals, understand perspectives, and respond with empathy and wisdom. 
                          Transform your relationships through the power of authentic listening.
                        </p>

                        <div style={{ 
                          marginTop: '30px', padding: '20px', background: 'rgba(6, 255, 165, 0.1)', 
                          border: '1px solid rgba(6, 255, 165, 0.3)', borderRadius: '12px' 
                        }}>
                          <h3 style={{ color: '#06ffa5', fontSize: '18px', marginBottom: '15px' }}>
                            Lab Outcomes
                          </h3>
                          <ul style={{ paddingLeft: '20px' }}>
                            <li>Decode both words and emotions in communication</li>
                            <li>Develop empathy through mirror neuron activation</li>
                            <li>Read subtle cues in tone, expression, and body language</li>
                            <li>Understand others' thoughts, feelings, and perspectives</li>
                            <li>Build deeper, more meaningful connections through listening</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'brain' && (
                    <div className="content-section">
                      <h1 style={{ color: '#06ffa5', fontSize: '32px', marginBottom: '20px' }}>
                        Brain Parts Activated in Lab 4
                      </h1>
                      
                      <div style={{ color: '#ffffff', lineHeight: '1.8', fontSize: '16px' }}>
                        <p style={{ marginBottom: '30px' }}>
                          Lab 4 activates four specialized brain regions that work together to create 
                          deep listening and empathetic understanding capabilities.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                          <div style={{ 
                            background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', 
                            borderRadius: '15px', padding: '25px'
                          }}>
                            <h2 style={{ color: '#3B82F6', fontSize: '22px', marginBottom: '15px' }}>
                              🗣️ Temporal Lobes (Wernicke's Area)
                            </h2>
                            <p style={{ fontStyle: 'italic', color: '#00d4ff', marginBottom: '15px' }}>
                              "Your language decoder"
                            </p>
                            <p><strong>What it does:</strong> Helps you understand spoken words, sentences, and meaning during communication. When active, you can easily grasp what others are saying and respond appropriately.</p>
                            <p><strong>Example:</strong> When someone explains an idea and you instantly understand their words, your Wernicke's area in the temporal lobe is doing the work.</p>
                          </div>

                          <div style={{ 
                            background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', 
                            borderRadius: '15px', padding: '25px'
                          }}>
                            <h2 style={{ color: '#10B981', fontSize: '22px', marginBottom: '15px' }}>
                              🪞 Mirror Neuron System
                            </h2>
                            <p style={{ fontStyle: 'italic', color: '#00d4ff', marginBottom: '15px' }}>
                              "Your brain's empathy engine"
                            </p>
                            <p><strong>What it does:</strong> Activates when you watch someone perform an action or express emotion, allowing you to "mirror" their feelings and understand their experience.</p>
                            <p><strong>Example:</strong> When you see someone stub their toe and instantly wince as if it happened to you, that's your mirror neuron system helping you feel what they feel.</p>
                          </div>

                          <div style={{ 
                            background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', 
                            borderRadius: '15px', padding: '25px'
                          }}>
                            <h2 style={{ color: '#F59E0B', fontSize: '22px', marginBottom: '15px' }}>
                              🧠 Medial Prefrontal Cortex (mPFC)
                            </h2>
                            <p style={{ fontStyle: 'italic', color: '#00d4ff', marginBottom: '15px' }}>
                              "Your social thinker"
                            </p>
                            <p><strong>What it does:</strong> Helps you understand other people's thoughts, emotions, and intentions - known as "theory of mind." Key to empathy, self-awareness, and building connections.</p>
                            <p><strong>Example:</strong> When you sense your friend is upset even before they say anything, your mPFC is helping you read their emotions.</p>
                          </div>

                          <div style={{ 
                            background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', 
                            borderRadius: '15px', padding: '25px'
                          }}>
                            <h2 style={{ color: '#8B5CF6', fontSize: '22px', marginBottom: '15px' }}>
                              🎵 Superior Temporal Sulcus (STS)
                            </h2>
                            <p style={{ fontStyle: 'italic', color: '#00d4ff', marginBottom: '15px' }}>
                              "Your tone and emotion detector"
                            </p>
                            <p><strong>What it does:</strong> Helps you pick up subtle cues in people's voices, facial expressions, and body language, letting you understand their emotional state beyond just words.</p>
                            <p><strong>Example:</strong> When you can tell someone is angry or happy just by their tone of voice, your STS is recognizing those emotional signals.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-secondary)' }}>HI LAB 4 – The Power of Listening powered by</span>
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 700, textShadow: '0 0 10px rgba(6, 255, 165, 0.3)' }}>AARUCHUDAR</span>
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-secondary)', opacity: 0.7 }}>
          Deep Listening • Empathy Building • Social Understanding
        </div>
      </footer>
    </div>
  )
}