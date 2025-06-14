import React, { useEffect, useRef, useState } from 'react';
import { 
  FaBolt, 
  FaShieldAlt, 
  FaChartBar, 
  FaSearch,
  FaLock,
  FaServer
} from 'react-icons/fa';

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
];

const Features = () => {
  const [titleInView, setTitleInView] = useState(false);
  const [carouselInView, setCarouselInView] = useState(false);
  const cursorRef = useRef(null);
  const carouselContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);
  const autoScrollRef = useRef(null);

  const handleDemo = () => {
    // Navigate to chat demo
    console.log('Demo clicked');
  };

  const handleSignUp = () => {
    // Navigate to signup
    console.log('Sign up clicked');
  };

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const carouselObserver = new IntersectionObserver(
      ([entry]) => {
        setCarouselInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const titleElement = document.querySelector('.section-title');
    const carouselElement = document.querySelector('.features-carousel');

    if (titleElement) titleObserver.observe(titleElement);
    if (carouselElement) carouselObserver.observe(carouselElement);

    return () => {
      titleObserver.disconnect();
      carouselObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const carousel = carouselContainerRef.current;

    if (!carousel || !cursor) return;

    // Custom Cursor
    const handleMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => {
      cursor.classList.add('active');
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('active');
    };

    const cards = carousel.querySelectorAll('.e-card');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    // Drag to Scroll
    const handleMouseDown = (e) => {
      isDragging.current = true;
      startX.current = e.pageX - carousel.offsetLeft;
      scrollLeftRef.current = carousel.scrollLeft;
      carousel.style.cursor = 'grabbing';
      clearInterval(autoScrollRef.current);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      carousel.style.cursor = 'grab';
    };

    const handleMouseLeaveCarousel = () => {
      isDragging.current = false;
      carousel.style.cursor = 'grab';
    };

    const handleMouseMoveDrag = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      carousel.scrollLeft = scrollLeftRef.current - walk;
    };

    // Reverse Vertical Scroll
    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY;
      carousel.scrollLeft -= delta * 1.2;
      clearInterval(autoScrollRef.current);
    };

    // Auto-Scroll
    const startAutoScroll = () => {
      if (!carouselInView) return;
      autoScrollRef.current = setInterval(() => {
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 1) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += 2;
        }
      }, 30);
    };

    // Pause auto-scroll on hover
    const handleCarouselHover = () => {
      clearInterval(autoScrollRef.current);
    };

    const handleCarouselHoverLeave = () => {
      if (carouselInView) startAutoScroll();
    };

    carousel.addEventListener('mousedown', handleMouseDown);
    carousel.addEventListener('mouseup', handleMouseUp);
    carousel.addEventListener('mouseleave', handleMouseLeaveCarousel);
    carousel.addEventListener('mousemove', handleMouseMoveDrag);
    carousel.addEventListener('wheel', handleWheel);
    carousel.addEventListener('mouseenter', handleCarouselHover);
    carousel.addEventListener('mouseleave', handleCarouselHoverLeave);
    window.addEventListener('mousemove', handleMouseMove);

    if (carouselInView) {
      startAutoScroll();
    }

    return () => {
      carousel.removeEventListener('mousedown', handleMouseDown);
      carousel.removeEventListener('mouseup', handleMouseUp);
      carousel.removeEventListener('mouseleave', handleMouseLeaveCarousel);
      carousel.removeEventListener('mousemove', handleMouseMoveDrag);
      carousel.removeEventListener('wheel', handleWheel);
      carousel.removeEventListener('mouseenter', handleCarouselHover);
      carousel.removeEventListener('mouseleave', handleCarouselHoverLeave);
      window.removeEventListener('mousemove', handleMouseMove);
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
      clearInterval(autoScrollRef.current);
    };
  }, [carouselInView]);

  return (
    <div className="features-container">
      <style jsx>{`
        .features-container {
          background: #121212;
          color: #eee;
          padding: 4rem 0;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
          padding: 0 2rem;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .section-title.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .features-carousel {
          display: flex;
          overflow-x: auto;
          padding: 1.5rem 0;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          gap: 2rem;
          opacity: 0;
          transition: opacity 0.8s ease;
          cursor: grab;
          user-select: none;
        }
        .features-carousel.visible {
          opacity: 1;
        }
        .features-carousel::-webkit-scrollbar {
          display: none;
        }
        .features-carousel:active {
          cursor: grabbing;
        }

        .e-card {
          background: #1b1b1b;
          box-shadow: 0px 8px 28px -9px rgba(0, 0, 0, 0.45);
          position: relative;
          min-width: 320px;
          height: 400px;
          border-radius: 16px;
          overflow: hidden;
          scroll-snap-align: center;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          flex-shrink: 0;
        }
        .e-card:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 212, 98, 0.3);
        }
        
        .wave {
          position: absolute;
          width: 640px;
          height: 800px;
          opacity: 0.3;
          left: 0;
          top: 0;
          margin-left: -50%;
          margin-top: -70%;
          background: linear-gradient(744deg, #00d462, #1b1b1b 60%, #00d462);
          border-radius: 40%;
          animation: wave 3000ms infinite linear;
          z-index: 1;
        }
        .wave:nth-child(2) {
          top: 240px;
          animation-duration: 4000ms;
          opacity: 0.2;
        }
        .wave:nth-child(3) {
          top: 240px;
          animation-duration: 5000ms;
          opacity: 0.1;
        }

        .card-icon {
          width: 4rem;
          margin-top: -1rem;
          padding-bottom: 1rem;
          color: #00d462;
          font-size: 3rem;
          transition: transform 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .e-card:hover .card-icon {
          transform: scale(1.2);
        }

        .infotop {
          text-align: center;
          font-size: 24px;
          position: absolute;
          top: 2.5rem;
          left: 0;
          right: 0;
          color: #fff;
          font-weight: 600;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: calc(100% - 5rem);
          z-index: 10;
          padding: 0 1.5rem;
        }

        .card-title {
          font-size: 1.8rem;
          margin: 0.5rem 0;
          color: #fff;
          font-weight: 600;
          line-height: 1.2;
        }

        .card-description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #ccc;
          margin: 0;
          text-align: center;
        }

        .fallback {
          color: #fff;
          font-size: 1.5rem;
          text-align: center;
          padding: 2rem;
        }

        @keyframes wave {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .custom-cursor {
          position: fixed;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(0, 212, 98, 0.3);
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: transform 0.2s ease, opacity 0.3s ease;
          z-index: 1000;
          opacity: 0;
        }
        .custom-cursor.active {
          transform: translate(-50%, -50%) scale(1.5);
          background: rgba(0, 212, 98, 0.5);
          opacity: 1;
        }

        .features-cta {
          margin-top: 3rem;
          text-align: center;
          display: flex;
          justify-content: center;
          gap: 1.5rem;
        }

        .btn {
          padding: 0.85rem 2rem;
          font-size: 1.1rem;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
          border: none;
          text-decoration: none;
          display: inline-block;
        }
        .btn-secondary {
          background: transparent;
          border: 2px solid #00d462;
          color: #00d462;
        }
        .btn-secondary:hover {
          background: #00d462;
          color: #121212;
        }
        .btn-primary {
          background: #00d462;
          border: none;
          color: #121212;
        }
        .btn-primary:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .features-carousel {
            gap: 1rem;
          }
          .e-card {
            min-width: 280px;
            height: 360px;
          }
          .infotop {
            top: 2rem;
            font-size: 20px;
          }
          .card-icon {
            width: 3.5rem;
            font-size: 2.5rem;
          }
          .card-title {
            font-size: 1.6rem;
          }
          .card-description {
            font-size: 1rem;
          }
          .container {
            padding: 0 1rem;
          }
        }

        @media (max-width: 600px) {
          .features-carousel {
            gap: 0.5rem;
          }
          .e-card {
            min-width: 240px;
            height: 320px;
          }
          .infotop {
            top: 1.5rem;
            font-size: 18px;
          }
          .features-cta {
            flex-direction: column;
            align-items: center;
          }
          .btn {
            width: 100%;
            max-width: 300px;
          }
          .custom-cursor {
            display: none;
          }
        }
      `}</style>
      
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="container">
        <h2
          className={`section-title ${titleInView ? 'visible' : ''}`}
        >
          Our Features
        </h2>

        <div
          ref={carouselContainerRef}
          className={`features-carousel ${carouselInView ? 'visible' : ''}`}
        >
          {featuresData.length > 0 ? (
            featuresData.map((feature, index) => (
              <div className="e-card" key={index}>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="infotop">
                  <div className="card-icon">{feature.icon}</div>
                  <div className="card-title">{feature.title}</div>
                  <div className="card-description">{feature.description}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="fallback">No features available</div>
          )}
        </div>

        <div className="features-cta">
          <button className="btn btn-secondary" onClick={handleSignUp}>
            Sign Up
          </button>
          <button className="btn btn-primary" onClick={handleDemo}>
            Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;