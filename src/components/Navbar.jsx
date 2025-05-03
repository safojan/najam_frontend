import { useState, useEffect } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHomePage = location.pathname === '/'

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="logo">
          <RouterLink to="/">
            <span className="campus">Campus</span>
            <span className="hive">Hive</span>
          </RouterLink>
        </div>
        
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <ul>
            {isHomePage ? (
              <>
                <li>
                  <ScrollLink to="product" smooth={true} duration={500} onClick={closeMenu}>
                    Product
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink to="features" smooth={true} duration={500} onClick={closeMenu}>
                    Features
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink to="team" smooth={true} duration={500} onClick={closeMenu}>
                    Team
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink to="contact" smooth={true} duration={500} onClick={closeMenu}>
                    Contact
                  </ScrollLink>
                </li>
              </>
            ) : (
              <li>
                <RouterLink to="/" onClick={closeMenu}>
                  Home
                </RouterLink>
              </li>
            )}
          </ul>
        </div>
        
        <div className="mobile-menu-btn" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  )
}

export default Navbar