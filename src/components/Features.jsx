// src/components/Features.jsx
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { 
  FaBolt, 
  FaShieldAlt, 
  FaChartBar, 
  FaSearch,
  FaLock,
  FaServer
} from 'react-icons/fa'
import './Features.css'

const featuresData = [
  {
    icon: <FaBolt />,
    title: 'Exam Gen',
    description: 'Automatically generate and customize exams with AI-powered question banks.'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Faculty Info',
    description: 'Instant access to faculty profiles, publications, and office hours.'
  },
  {
    icon: <FaChartBar />,
    title: 'Real-Time Monitoring',
    description: 'Get live alerts and analytics on campus activities and resource usage.'
  },
  {
    icon: <FaSearch />,
    title: 'Instant Analysis',
    description: 'Search and analyze data trends across courses, attendance, and exams.'
  },
  {
    icon: <FaLock />,
    title: 'Secure Transactions',
    description: 'Encrypted data handling for all student records and financial transactions.'
  },
  {
    icon: <FaServer />,
    title: 'Cloud Integration',
    description: 'Seamless cloud backup and restore for all university databases.'
  }
]

const Features = () => {
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const navigate = useNavigate()

  const handleDemo = () => {
    // limited demo access flag
    navigate('/chat?demo=true')
  }

  return (
    <section id="features" className="features">
      <div className="container">
        <h2
          ref={titleRef}
          className={`section-title fade-in ${titleInView ? 'visible' : ''}`}
        >
          Our Features
        </h2>

        <div
          ref={featuresRef}
          className={`features-grid stagger-children ${featuresInView ? 'visible' : ''}`}
        >
          {featuresData.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="features-cta">
          <RouterLink to="/signup">
            <button className="btn btn-secondary">Sign Up</button>
          </RouterLink>
          <button className="btn btn-primary" onClick={handleDemo}>
            Demo
          </button>
        </div>
      </div>
    </section>
  )
}

export default Features

