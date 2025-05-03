import { useInView } from 'react-intersection-observer'
import { Link as RouterLink } from 'react-router-dom'
import heroImage from '../assets/ch.gif'  // ← swap with your own
import './Hero.css'

const Hero = () => {
  const [titleRef,       titleInView]       = useInView({ triggerOnce: true, threshold: 0.1 })
  const [subtitleRef,    subtitleInView]    = useInView({ triggerOnce: true, threshold: 0.1, delay: 200 })
  const [imageRef,       imageInView]       = useInView({ triggerOnce: true, threshold: 0.1, delay: 400 })
  const [buttonRef,      buttonInView]      = useInView({ triggerOnce: true, threshold: 0.1, delay: 600 })

  return (
    <section className="hero">
      <div className="hero-container">
        {/* Text Column */}
        <div className="hero-text">
          <h1
            ref={titleRef}
            className={`hero-title ${titleInView ? 'visible' : ''}`}
          >
            CampusHive
          </h1>
          <p
            ref={subtitleRef}
            className={`hero-tagline ${subtitleInView ? 'visible' : ''}`}
          >
            Empowering FAST University’s Students and Faculty with Intelligent Campus Agents
          </p>
          <p
            ref={subtitleRef}
            className={`hero-subtitle ${subtitleInView ? 'visible' : ''}`}
          >
            Automate announcements, quizzes, timetables, compliance checks and more—right from one smart interface.
          </p>
          <div
            ref={buttonRef}
            className={`hero-cta ${buttonInView ? 'visible' : ''}`}
          >
            <RouterLink to="/signup">
              <button className="btn btn-primary">
                Get Started
              </button>
            </RouterLink>
          </div>
        </div>

        {/* Image Column */}
        <div
          ref={imageRef}
          className={`hero-image ${imageInView ? 'visible' : ''}`}
        >
          <img src={heroImage} alt="CampusHive Agents Illustration" />
        </div>
      </div>
    </section>
  )
}

export default Hero
