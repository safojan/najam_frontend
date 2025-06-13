// src/components/Team.jsx
import React from 'react'
import { useInView } from 'react-intersection-observer'
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from 'react-icons/fa'
import profile1 from '../assets/profile/nibtahil.png'
import profile2 from '../assets/profile/faizan.png'
import profile3 from '../assets/profile/najam.png'
import './Team.css'

const teamData = [
  {
    name: 'NIBTAHIL NAFEES',
    role: 'AI ENGINEER',
    image: profile1,
    social: {
      github: 'https://github.com/nibtahil',
      linkedin: 'https://linkedin.com/in/nibtahil',
      email: 'mailto:nibtahil@example.com',
    },
  },
  {
    name: 'FAIZAN KARMAT',
    role: 'AI ENGINEER',
    image: profile2,
    social: {
      github: 'https://github.com/faizankarmat',
      linkedin: 'https://linkedin.com/in/faizankarmat',
      email: 'mailto:faizan@example.com',
    },
  },
  {
    name: 'NAJAM ALI ABBAS',
    role: 'WEB DEVELOPER & DESIGNER',
    image: profile3,
    social: {
      github: 'https://github.com/najamaliabbas',
      linkedin: 'https://linkedin.com/in/najamaliabbas',
      email: 'mailto:najam@example.com',
    },
  },
]

const Team = () => {
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="team" className="team">
      <div className="container">
        <h2
          ref={titleRef}
          className={`section-title fade-in ${titleInView ? 'visible' : ''}`}
        >
          Meet Our Team
        </h2>
        
        <div
          ref={gridRef}
          className={`team-grid stagger-children ${gridInView ? 'visible' : ''}`}
        >
          {teamData.map((member, idx) => (
            <div key={idx} className="team-card">
              {/* Decorative background star */}
              <div className="star-decoration">
                <svg
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="star-icon"
                  height="200"
                  width="200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              
              {/* Background circle */}
              <div className="background-circle"></div>
              
              {/* Card content */}
              <div className="card-header">
                <p className="badge-text">TEAM</p>
                <p className="member-text">Member</p>
              </div>
              
              <div className="team-img-container">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-image"
                />
              </div>
              
              <div className="card-footer">
                <div className="member-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                </div>
                
                <div className="team-social">
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaGithub />
                  </a>
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaLinkedin />
                  </a>
                  <a href={member.social.email} className="social-link">
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team