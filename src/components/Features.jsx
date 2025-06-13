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
    description: 'Automatically generate and customize exams with AI-powered question banks. (12 min)',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Faculty Info',
    description: 'Instant access to faculty profiles, publications, and office hours. (10 min)',
  },
  {
    icon: <FaChartBar />,
    title: 'Real-Time Monitoring',
    description: 'Get live alerts and analytics on campus activities and resource usage. (15 min)',
  },
  {
    icon: <FaSearch />,
    title: 'Instant Analysis',
    description: 'Search and analyze data trends across courses, attendance, and exams. (8 min)',
  },
  {
    icon: <FaLock />,
    title: 'Secure Transactions',
    description: 'Encrypted data handling for all student records and financial transactions. (12 min)',
  },
  {
    icon: <FaServer />,
    title: 'Cloud Integration',
    description: 'Seamless cloud backup and restore for all university databases. (14 min)',
  }
]

const Features = () => {
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const navigate = useNavigate()

  const handleDemo = () => {
    navigate('/chat?demo=true')
  }

  return (
    <section id="features" className="features">
      <div className="container">
        <h2
          ref={titleRef}
          className={`section-title ${titleInView ? 'visible' : ''}`}
        >
          Our Features
        </h2>

        <div
          ref={featuresRef}
          className={`features-grid ${featuresInView ? 'visible' : ''}`}
        >
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
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

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="card-content">
        <div className="card-icon">{icon}</div>
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-hover">
        <p className="card-description">{description}</p>
      </div>
    </div>
  )
}

export default Features