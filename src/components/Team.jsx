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
    role: 'PRODUCT MANAGER',
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
    role: 'WEB DEVELOPER',
    image: profile3,
    social: {
      github: 'https://github.com/najamaliabbas',
      linkedin: 'https://linkedin.com/in/najamaliabbas',
      email: 'mailto:najam@example.com',
    },
  },
]

const Team = () => {
  const [titleRef,    titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [gridRef,     gridInView]  = useInView({ triggerOnce: true, threshold: 0.1 })

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
              <div className="team-img-wrap">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-image"
                />
              </div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <div className="team-social">
                <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href={member.social.email}>
                  <FaEnvelope />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
