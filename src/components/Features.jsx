import { useInView } from 'react-intersection-observer'
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
    title: "Exam Gen",
    description: "Quickly process and analyze large datasets with ease."
  },
  {
    icon: <FaShieldAlt />,
    title: "Faculty Info",
    description: "Ensure data integrity and security across all operations."
  },
  {
    icon: <FaChartBar />,
    title: "Real-Time Monitoring",
    description: "Stay updated with real-time insights and alerts."
  },
  {
    icon: <FaSearch />,
    title: "Instant Analysis",
    description: "Quickly process and analyze large datasets with ease."
  },
  {
    icon: <FaLock />,
    title: "Secure Transactions",
    description: "Quickly process and analyze large datasets with ease."
  },
  {
    icon: <FaServer />,
    title: "Real-Time Monitoring",
    description: "Quickly process and analyze large datasets with ease."
  }
]

const Features = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features