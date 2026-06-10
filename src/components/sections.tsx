"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, Database, Cpu, Mail, Link, GitBranch, Phone, Award, Camera, GraduationCap, Shield, Menu, X, BookOpen, Zap, ExternalLink } from "lucide-react";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// Shared animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

// Section-to-navItem mapping for scroll spy
const sectionMap: Record<string, string> = {
  'top':        'hero',
  'about':      'about',
  'work':       'projects',
  'frames':     'projects',
  'expertise':  'projects',
  'research':   'research',
  'experience': 'experience',
  'education':  'experience',
  'awards':     'experience',
  'contact':    'contact',
};

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('hero');

  // 6 nav items perfectly matching portfolio sections
  const navItems = [
    { label: 'Hero',         id: 'hero',         anchor: 'top' },
    { label: 'About',        id: 'about',        anchor: 'about' },
    { label: 'Projects',     id: 'projects',     anchor: 'work' },
    { label: 'Research',     id: 'research',     anchor: 'research' },
    { label: 'Experience',   id: 'experience',   anchor: 'experience' },
    { label: 'Contact',      id: 'contact',      anchor: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      const sectionIds = Object.keys(sectionMap);
      for (const sid of sectionIds) {
        const el = document.getElementById(sid);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveItem(sectionMap[sid]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      aria-label="Primary"
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '900px',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      {/* Floating Capsule */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
          padding: '0 20px 0 12px',
          background: 'rgba(14, 14, 18, 0.92)',
          backdropFilter: 'blur(20px) saturate(200%)',
          WebkitBackdropFilter: 'blur(20px) saturate(200%)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '999px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
          pointerEvents: 'auto',
          gap: '8px',
        }}
      >
        {/* Logo — SRS image */}
        <a
          href="#top"
          onClick={() => setActiveItem('hero')}
          aria-label="SRS — Go to home"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            flexShrink: 0,
            padding: '2px 4px',
            transition: 'opacity 0.2s ease',
          }}
          className="nav-logo-link"
        >
          <Image
            src="/images/srs-logo-new-cropped.png"
            alt="SRS Logo"
            width={95}
            height={30}
            style={{
              objectFit: 'contain',
              display: 'block',
              mixBlendMode: 'screen',
              filter: 'brightness(1.3) contrast(1.1) saturate(0.8)',
            }}
            priority
            unoptimized
          />
        </a>

        {/* Desktop nav links — centered */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flex: 1,
            justifyContent: 'center',
          }}
          className="nav-links-desktop"
        >
          {navItems.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.anchor}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setActiveItem(item.id)}
                style={{
                  position: 'relative',
                  padding: '8px 10px',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.48)',
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: '10.5px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.13em',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                className="nav-capsule-link"
              >
                {item.label}
                {/* Active cyan indicator bar */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isActive ? '20px' : '0px',
                    height: '2.5px',
                    borderRadius: '2px',
                    background: '#00D2FF',
                    boxShadow: isActive ? '0 0 12px #00D2FF, 0 0 6px rgba(0,210,255,0.8)' : 'none',
                    opacity: isActive ? 1 : 0,
                    transition: 'width 0.25s ease, opacity 0.25s ease, box-shadow 0.25s ease',
                  }}
                  aria-hidden="true"
                />
                {/* Hover indicator */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '0px',
                    height: '2.5px',
                    borderRadius: '2px',
                    background: 'rgba(0,210,255,0.6)',
                    opacity: 0,
                    transition: 'width 0.2s ease, opacity 0.2s ease',
                  }}
                  className="hover-indicator"
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </div>

        {/* Mobile hamburger only */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          style={{
            padding: '8px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s ease',
            flexShrink: 0,
          }}
          className="nav-hamburger lg:hidden"
        >
          {mobileMenuOpen
            ? <X style={{ width: '16px', height: '16px' }} />
            : <Menu style={{ width: '16px', height: '16px' }} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{
          overflow: 'hidden',
          background: 'rgba(14, 14, 18, 0.96)',
          backdropFilter: 'blur(20px) saturate(200%)',
          WebkitBackdropFilter: 'blur(20px) saturate(200%)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          marginTop: '8px',
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
        className="lg:hidden"
      >
        <div style={{ display: 'flex', flexDirection: 'column', padding: '12px 16px' }}>
          {navItems.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.anchor}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => {
                  setActiveItem(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '13px 8px',
                  color: isActive ? '#00D2FF' : 'rgba(255,255,255,0.6)',
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  transition: 'color 0.2s ease',
                }}
                className="mobile-nav-link last:border-b-0"
              >
                {isActive && (
                  <span
                    style={{
                      width: '4px', height: '4px',
                      borderRadius: '50%',
                      background: '#00D2FF',
                      boxShadow: '0 0 8px #00D2FF',
                      flexShrink: 0,
                    }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </div>
      </motion.div>

      {/* Interaction styles */}
      <style>{`
        .nav-logo-link:hover { opacity: 0.8; }
        .nav-capsule-link:hover { color: #ffffff !important; }
        .nav-capsule-link:hover .hover-indicator {
          width: 14px !important;
          opacity: 0.65 !important;
        }
        .nav-hamburger:hover { background: rgba(255,255,255,0.14) !important; }
        .mobile-nav-link:hover { color: rgba(255,255,255,0.9) !important; }
        @media (min-width: 1024px) {
          .nav-hamburger { display: none !important; }
        }
        @media (max-width: 1023px) {
          .nav-links-desktop { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

export function Hero() {
  // Trigger count-up animation and mouse parallax in a useEffect hook
  useEffect(() => {
    // Count-up logic
    function countUp(el: HTMLElement, target: string, duration: number = 1200) {
      const start = performance.now();
      const num = parseInt(target);
      if (isNaN(num)) return;
      
      function update(time: number) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = Math.floor(eased * num);
        el.textContent = current + '+';
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(update);
    }

    // Observer to run countUp when the stats card is visible
    const statsCard = document.querySelector('.stats-card-new');
    const statProjects = document.getElementById('stat-val-projects');
    const statPapers = document.getElementById('stat-val-papers');

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (statProjects) countUp(statProjects, statProjects.textContent?.trim() || '5+');
        if (statPapers) countUp(statPapers, statPapers.textContent?.trim() || '2');
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    if (statsCard) observer.observe(statsCard);

    // Mousemove 3D tilt parallax logic
    const bgImage = document.querySelector('.hero-bg-character') as HTMLElement;
    const heroBound = document.getElementById('top');

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroBound || !bgImage) return;
      const rect = heroBound.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      bgImage.style.transform = `scale(1.08) translateX(${x * 20}px) translateY(${y * 20}px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
    };

    const handleMouseLeave = () => {
      if (bgImage) {
        bgImage.style.transform = 'scale(1.05) translate(0, 0) rotateY(0deg) rotateX(0deg)';
      }
    };

    if (heroBound) {
      heroBound.addEventListener('mousemove', handleMouseMove);
      heroBound.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      observer.disconnect();
      if (heroBound) {
        heroBound.removeEventListener('mousemove', handleMouseMove);
        heroBound.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--bg-hero)' }}
    >
      {/* Full-bleed background image using the original photo */}
      <div
        className="hero-bg-container"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <Image
          src="/images/sanket-avatar.png"
          alt="Sanket Saraf 3D background"
          fill
          priority
          quality={100}
          style={{
            objectFit: 'cover',
            objectPosition: 'center 35%',
            transform: 'scale(1.05)',
            transition: 'transform 0.1s ease-out',
          }}
          className="hero-bg-character"
        />
      </div>

      {/* ── Main Layout Container ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: 1400,
        margin: '0 auto',
        padding: '100px 64px 60px',
        display: 'grid',
        gridTemplateColumns: '1fr 1.1fr 0.7fr',
        alignItems: 'center',
        gap: 0,
      }} className="hero-inner-new">

        {/* ───── LEFT: text content ───── */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            paddingRight: 32,
            transform: 'translateY(-40px)', // Shift upwards slightly to clear the backpack in the background image
            transition: 'transform 0.3s',
          }}
          initial="hidden"
          animate="visible"
          className="hero-left-col"
        >
          {/* Availability badge */}
          <motion.div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Satoshi', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: 'var(--text-secondary)',
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(45,107,228,0.20)',
              borderRadius: 100,
              padding: '7px 16px',
              backdropFilter: 'blur(8px)',
              width: 'fit-content',
            }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <span style={{
              width: 7,
              height: 7,
              background: 'var(--accent-green)',
              borderRadius: '50%',
              flexShrink: 0,
              animation: 'pulse-green 2s ease-in-out infinite',
            }} />
            OPEN TO SDE · MLE · AI ENGINEER · DATA ANALYST ROLES
          </motion.div>

          {/* Main headline */}
          <motion.h1
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(56px, 8vw, 92px)',
              lineHeight: 1.0,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              margin: 0,
            }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
            }}
          >
            Hi, I&apos;m <span style={{ color: 'var(--accent-primary)', position: 'relative' }}>Sanket</span><br />
            <span>Saraf</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(18px, 2vw, 24px)',
              color: 'var(--text-secondary)',
              letterSpacing: '-0.01em',
              margin: 0,
            }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
            }}
          >
            AI Engineer · Data Scientist · SDE
          </motion.p>

          {/* Bio */}
          <motion.p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 500,
              color: '#1E293B',
              lineHeight: 1.75,
              maxWidth: 420,
              margin: 0,
              textShadow: '0 2px 8px rgba(255, 255, 255, 0.9), 0 0 2px rgba(255, 255, 255, 0.9)',
            }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } }
            }}
          >
            I build AI systems and data pipelines that ship — from RAG agents
            and LLM orchestration to end-to-end data engineering.
            2 Published Research Papers. Available for internships immediately.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginTop: 4 }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }
            }}
          >
            <a
              href="#work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '13px 28px',
                background: 'var(--text-primary)',
                color: '#ffffff',
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                borderRadius: 10,
                textDecoration: 'none',
                transition: 'background 0.25s, transform 0.2s, box-shadow 0.2s',
                letterSpacing: '0.01em',
              }}
              className="btn-primary-new"
            >
              View My Work →
            </a>
            <a
              href="/resume.pdf"
              download
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.72)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: 'var(--text-primary)',
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                border: '1.5px solid rgba(15,23,42,0.20)',
                borderRadius: 10,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              className="btn-secondary-new"
            >
              ⬇ Resume
            </a>
          </motion.div>
        </motion.div>

        {/* ───── CENTER: Speech Bubble (boy in background) ───── */}
        <motion.div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            height: 'calc(100vh - 64px)',
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.2 } }}
          className="hero-image-col"
        >
          {/* Speech bubble above character */}
          <motion.div
            style={{
              position: 'absolute',
              top: '15%',
              left: '55%',
              background: '#ffffff',
              color: 'var(--text-primary)',
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              padding: '10px 18px',
              borderRadius: '20px 20px 20px 4px',
              boxShadow: '0 4px 20px rgba(15,23,42,0.12)',
              whiteSpace: 'nowrap',
              zIndex: 2,
              pointerEvents: 'auto',
            }}
            animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="speech-bubble-new"
          >
            HI! 👋
            {/* Tail on the bubble */}
            <div style={{
              position: 'absolute',
              bottom: -8,
              left: 18,
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #ffffff',
            }} />
          </motion.div>
        </motion.div>

        {/* ───── RIGHT: Stats card ───── */}
        <motion.div
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.4 } }}
          className="hero-right-col"
        >
          <div
            style={{
              background: 'var(--bg-card)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid var(--bg-card-border)',
              borderRadius: 20,
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-card)',
              width: 200,
              transform: 'rotate(1deg)',
              transition: 'transform 0.3s',
            }}
            className="stats-card-new"
          >
            <div className="stat-row-new">
              <span className="stat-label-new">Experience</span>
              <span className="stat-value-new">1+ <small>Yrs</small></span>
            </div>
            <div className="stat-divider-new" />
            <div className="stat-row-new">
              <span className="stat-label-new">Projects</span>
              <span className="stat-value-new" id="stat-val-projects">5+</span>
            </div>
            <div className="stat-divider-new" />
            <div className="stat-row-new">
              <span className="stat-label-new">Research Papers</span>
              <span className="stat-value-new" id="stat-val-papers">2</span>
            </div>
            <div className="stat-divider-new" />
            <div className="stat-row-new">
              <span className="stat-label-new">Availability</span>
              <span className="stat-value-new available">
                <span className="avail-dot-new" />Open
              </span>
            </div>
          </div>
        </motion.div>

      </div>

      <style>{`

        .btn-primary-new:hover {
          background: var(--accent-primary) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-btn);
        }

        .btn-secondary-new:hover {
          border-color: var(--accent-primary) !important;
          color: var(--accent-primary) !important;
          background: rgba(45,107,228,0.05) !important;
          transform: translateY(-2px);
        }

        .stats-card-new:hover {
          transform: rotate(0deg) translateY(-4px) !important;
        }

        .stat-row-new {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 14px 0;
        }

        .stat-label-new {
          font-family: 'Satoshi', sans-serif;
          font-weight: 500;
          font-size: 11px;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        .stat-value-new {
          font-family: 'Clash Display', sans-serif;
          font-weight: 700;
          font-size: 26px;
          color: var(--text-primary);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .stat-value-new small {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .stat-value-new.available {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 16px;
          color: var(--accent-green);
        }

        .avail-dot-new {
          width: 8px;
          height: 8px;
          background: var(--accent-green);
          border-radius: 50%;
          animation: pulse-green 2s ease-in-out infinite;
        }

        .stat-divider-new {
          height: 1px;
          background: rgba(15,23,42,0.07);
          width: 100%;
        }

        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }

        @keyframes pulse-dot-available {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }

        @media (max-width: 1024px) {
          .hero-inner-new {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto !important;
            padding: 80px 20px 48px !important;
            text-align: center;
            gap: 24px !important;
          }
          .hero-left-col {
            align-items: center !important;
            padding: 0 16px !important;
            max-width: 480px !important;
            margin: 0 auto !important;
            transform: none !important;
          }
          .hero-image-col {
            display: none !important;
          }
          .hero-right-col {
            justify-content: center !important;
            width: 100% !important;
            max-width: 480px !important;
            margin: 0 auto !important;
          }
          .stats-card-new {
            width: 100% !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            justify-content: space-around !important;
            transform: none !important;
            gap: 0 !important;
          }
          .stat-row-new {
            width: 48% !important;
            align-items: center !important;
            padding: 12px 8px !important;
          }
          .stat-divider-new {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}


export function About() {
  return (
    <section id="about" className="py-20 md:py-24 px-6 md:px-16">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-12 md:mb-16">
        <span className="text-muted-foreground uppercase tracking-widest text-sm mb-4 block">02 / The Narrative</span>
        <h2 className="font-heading text-3xl md:text-5xl text-foreground">Beyond Code.</h2>
      </motion.div>

      <div className="flex flex-col-reverse md:flex-row gap-12 md:gap-20 items-center justify-between">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1 max-w-4xl space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
          <p><strong className="text-foreground font-medium">I&apos;m Sanket Rajiv Saraf. I don&apos;t just build projects. I architect systems that think.</strong></p>
          <p>Currently engineering solutions in Artificial Intelligence &amp; Data Science at KJ Somaiya Institute of Technology. My philosophy is simple: technology should be invisible, yet infinitely powerful.</p>
          <p>Whether I&apos;m optimizing a Large Language Model for a resource-constrained Raspberry Pi, or architecting a multi-agent orchestration platform, my focus remains strictly on the intersection of deep technical capability and seamless human experience.</p>
          <p>I thrive in ambiguity. Give me a complex data problem, and I&apos;ll give you a clean, scalable, production-ready solution.</p>

          {/* Currently Building callout */}
          <div className="mt-2 pt-6 border-t border-border space-y-4">
            <div className="p-4 rounded-xl border border-border bg-muted/50 space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-xs uppercase tracking-widest text-foreground font-bold">Currently</span>
              </div>
              <p className="text-sm !mt-0">🔨 <strong className="text-foreground">Building:</strong> AION — Agent-as-a-Service marketplace for zero-code AI automation</p>
              <p className="text-sm !mt-0">📚 <strong className="text-foreground">Learning:</strong> LlamaIndex, MLflow, Vector DB optimization &amp; MLOps pipelines</p>
              <p className="text-sm !mt-0">🎯 <strong className="text-foreground">Target:</strong> MLE / AI Engineer / SDE roles at product-first companies</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-foreground font-bold mb-3 block">Beyond the Terminal</span>
              <p className="!mt-0">I&apos;m an avid traveller — always planning the next country to explore or the next hidden spot to discover. I&apos;m also a die-hard automobile enthusiast; cars and bikes are my other language, and I can talk engines and designs just as passionately as neural networks.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative shrink-0 p-3 md:p-5 rounded-[2rem] bg-card/50 backdrop-blur-xl border border-border shadow-premium-lg flex items-center justify-center group"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="relative w-[240px] sm:w-[280px] md:w-[320px] lg:w-[380px] aspect-[4/5] rounded-[1.5rem] overflow-hidden border border-black/5 dark:border-white/5 bg-muted">
            <Image
              src="/images/sanket-main.jpg"
              alt="Sanket Rajiv Saraf"
              fill
              sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 320px, 380px"
              quality={85}
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Subtle Decorative Glow Behind Frame */}
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent rounded-[2rem] pointer-events-none -z-10" />
        </motion.div>
      </div>
    </section>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const projectCards = [
    {
      num: "01",
      tags: ["AI AGENTS", "MARKETPLACE", "AAAS"],
      title: "AION",
      desc: "Agent-as-a-Service marketplace where freelancers publish ready-to-use agent workflows. AI agents handle onboarding, API integration, configuration, and deployment — zero coding required.",
      metric: "Zero-code agent deployment · Multi-agent orchestration",
      link: "#top",
      github: "https://github.com/SanketVerse",
      liveLink: "#top",
      bg: "linear-gradient(135deg,#0a1628,#1a0a2e)",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80",
    },
    {
      num: "02",
      tags: ["DATA ENGINEERING", "WEB SCRAPING", "PYTHON"],
      title: "Scrappydo",
      desc: "Full-stack data engineering platform with a complete Extract → Clean → Visualize pipeline. Autonomously scrapes, structures, and presents web content for market research and AI datasets.",
      metric: "End-to-end pipeline: Extract → Clean → Display · JSON & CSV export",
      link: "#top",
      github: "https://github.com/SanketVerse/Scrappydo",
      liveLink: "#top",
      bg: "linear-gradient(135deg,#0a1a10,#0a2818)",
      image: "https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&q=80",
    },
    {
      num: "03",
      tags: ["LANGCHAIN", "RAG", "STREAMLIT"],
      title: "PadhAI",
      desc: "LangChain agent that ingests YouTube videos, Docs, and LMS content to auto-generate quizzes, flashcards, and TTS audio summaries. Integrated with Quizlet API. Deployed on Streamlit Cloud via GitHub CI.",
      metric: "60-min video → structured quiz in <30s · Streamlit Cloud deployed",
      link: "https://padh-ai-pro.vercel.app",
      github: "https://github.com/SanketVerse/Padh-Ai",
      liveLink: "https://padh-ai-pro.vercel.app",
      bg: "linear-gradient(135deg,#1a0a0a,#2e1a0a)",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80",
    },
    {
      num: "04",
      tags: ["EDGE AI", "RASPBERRY PI", "GEMMA 1B"],
      title: "MAX",
      desc: "Privacy-first, zero-cloud AI voice assistant on Raspberry Pi using Gemma 1B. Complete on-device LLM inference with custom audio pipeline (mic → inference → TTS). Sub-2s end-to-end latency.",
      metric: "<2s latency · 100% on-device · 4-core ARM · Zero cloud",
      link: "https://github.com/SanketVerse",
      github: "https://github.com/SanketVerse",
      liveLink: "https://github.com/SanketVerse",
      bg: "linear-gradient(135deg,#0a0a1a,#0a1628)",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
    },
    {
      num: "05",
      tags: ["PSYCHOMETRICS", "SEVERITY ROUTING", "HACKATHON WINNER"],
      title: "SYNAPSE",
      desc: "WHO-aligned psychometric assessment engine scoring stress, depression, and anxiety with severity-based routing to AI or live therapists. Won national-level hackathon.",
      metric: "Hackathon Winner · WHO-aligned scoring · Real-time severity routing",
      link: "https://synapse-nu.vercel.app",
      github: "https://github.com/SanketVerse/Synapse",
      liveLink: "https://synapse-nu.vercel.app",
      bg: "linear-gradient(135deg,#1a0a1a,#2e0a2e)",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80",
    },
  ];

  // ── GSAP: only scale-back the card going behind ──
  // CSS sticky handles the actual slide-up naturally.
  useEffect(() => {
    let attempts = 0;
    type GSAPWin = typeof window & {
      gsap?: {
        registerPlugin: (p: unknown) => void;
        utils: { toArray: <T>(s: string) => T[] };
        to: (el: Element, to: Record<string, unknown>) => void;
      };
      ScrollTrigger?: {
        create: (config: Record<string, unknown>) => void;
        getAll: () => Array<{ kill: () => void }>;
      };
    };

    const init = () => {
      attempts++;
      const win = window as GSAPWin;
      if (!win.gsap || !win.ScrollTrigger) {
        if (attempts < 30) setTimeout(init, 300);
        return;
      }
      const { gsap, ScrollTrigger } = win;
      gsap.registerPlugin(ScrollTrigger);

      const cards = gsap.utils.toArray<Element>('.project-card');

      // Each card scales down as the NEXT card scrolls on top of it
      // Start: when next card's natural top (= i+1 * 100vh) enters the viewport bottom
      // End:   when next card fully covers (its top reaches viewport top)
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.90,
            ease: 'none',
            scrollTrigger: {
              trigger: card,          // trigger on this card itself
              start: 'top top',       // when this card sticks at top (user is looking at it)
              end: '+=100%',          // one full viewport of scroll later
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      });

      // Progress bar
      const pb = progressRef.current;
      const sec = sectionRef.current;
      if (pb && sec) {
        ScrollTrigger.create({
          trigger: sec, start: 'top top', end: 'bottom bottom',
          onUpdate: (self: { progress: number }) => { pb.style.width = self.progress * 100 + '%'; },
        });
      }
    };

    init();
    return () => {
      const win = window as GSAPWin;
      win.ScrollTrigger?.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      {/* Fixed cyan→violet progress bar at very top */}
      <div ref={progressRef} className="projects-progress" aria-hidden="true" />

      {/* Anchor for "WORK" nav link */}
      <span id="work" style={{ display: 'block', visibility: 'hidden', height: 0 }} aria-hidden="true" />

      <section id="projects-sticky" ref={sectionRef as React.Ref<HTMLElement>}>
        <div className="cards-wrapper">
          {projectCards.map((card, idx) => (
            <div
              key={idx}
              className="project-card"
              id={`card-${idx + 1}`}
              style={{ zIndex: idx + 1 }}
            >
              {/* Full-bleed background image */}
              <div className="card-bg-image">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  style={{ opacity: 0.45 }}
                  sizes="100vw"
                  quality={80}
                  priority={idx === 0}
                />
              </div>

              {/* Dark gradient overlay */}
              <div className="card-overlay" />

              {/* Ghost number watermark */}
              <div className="card-number" aria-hidden="true">{card.num}</div>

              {/* Two-column content */}
              <div className="card-inner">
                {/* LEFT — info */}
                <div className="card-left">
                  {/* Index label */}
                  <span className="card-index">{card.num} / 0{projectCards.length} &nbsp;·&nbsp; Selected Work</span>

                  {/* Tags */}
                  <div className="card-tags">
                    {card.tags.map((t) => (
                      <span key={t} className="card-tag">{t}</span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="card-title">{card.title}</h3>

                  {/* Description */}
                  <p className="card-desc">{card.desc}</p>

                  {/* Metric strip */}
                  <div className="card-metric">{card.metric}</div>

                  {/* Action links */}
                  <div className="card-links">
                    <a
                      href={card.link}
                      target={card.link.startsWith('http') ? '_blank' : undefined}
                      rel={card.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="link-primary"
                    >
                      View Project →
                    </a>
                    <a
                      href={card.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-secondary"
                    >
                      GitHub ↗
                    </a>
                  </div>
                </div>

                {/* RIGHT — empty, image fills via card-bg-image */}
                <div className="card-right" />
              </div>

              {/* Bottom-left scroll cue */}
              <div className="card-footer">
                <div className="card-footer-line" />
                <span className="card-footer-text">
                  {idx < projectCards.length - 1 ? 'Scroll for next' : 'End of projects'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function Expertise() {
  return (
    <section id="expertise" className="py-20 md:py-24 px-6 md:px-16">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-12 md:mb-16">
        <span className="text-muted-foreground uppercase tracking-widest text-sm mb-4 block">05 / Capabilities</span>
        <h2 className="font-heading text-3xl md:text-5xl text-foreground">The Ecosystem.</h2>
      </motion.div>

      <div className="max-w-4xl mx-auto mb-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-2 md:p-3 rounded-2xl bg-muted/50 border border-border shadow-premium-lg">
          {/* Ecosystem image — reduced from 350px to 240px max */}
          <div className="relative w-full h-[160px] sm:h-[200px] md:h-[240px] rounded-xl overflow-hidden bg-card">
            <Image src="/images/ecosystem-dark-hd.png" alt="AI & Data Science Ecosystem" fill className="object-cover hidden dark:block" quality={85} />
            <Image src="/images/ecosystem-light-hd.png" alt="AI & Data Science Ecosystem" fill className="object-cover block dark:hidden" quality={85} />
          </div>
        </motion.div>
      </div>

      {/* Proficiency Bars */}
      <div className="max-w-4xl mx-auto mb-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">Core Proficiencies</h3>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
            {[
              { skill: "Python", level: 92, color: "bg-blue-500" },
              { skill: "LangChain / RAG", level: 85, color: "bg-emerald-500" },
              { skill: "Machine Learning", level: 82, color: "bg-purple-500" },
              { skill: "SQL & Big Data", level: 80, color: "bg-rose-500" },
              { skill: "LLM Agent Architecture", level: 88, color: "bg-amber-500" },
              { skill: "Docker & Linux", level: 70, color: "bg-sky-500" },
              { skill: "Data Visualization", level: 78, color: "bg-indigo-500" },
              { skill: "Java / JavaScript", level: 72, color: "bg-orange-500" },
            ].map(({ skill, level, color }, i) => (
              <div key={skill}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-foreground font-medium">{skill}</span>
                  <span className="text-xs text-muted-foreground font-mono">{level}%</span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {[
          { icon: <Database className="w-5 h-5 text-emerald-500" />, title: "Data Science & ML", skills: ["Pandas", "NumPy", "Scikit-learn", "Apache Spark", "Feature Engineering", "Statistical Analysis"] },
          { icon: <Brain className="w-5 h-5 text-blue-500" />, title: "AI / LLM", skills: ["LangChain", "RAG", "Agent Architecture", "Prompt Engineering", "Gemma 1B", "TTS / STT", "Multimodal AI"] },
          { icon: <Cpu className="w-5 h-5 text-purple-500" />, title: "Programming", skills: ["Python", "SQL", "Java", "JavaScript", "C++", "REST APIs", "Streamlit"] },
          { icon: <Database className="w-5 h-5 text-rose-500" />, title: "Databases & Big Data", skills: ["PostgreSQL", "MongoDB", "Hadoop (HDFS)", "Apache Hive", "Apache NiFi", "Spark SQL", "ETL"] },
          { icon: <GitBranch className="w-5 h-5 text-muted-foreground" />, title: "Tools & Platforms", skills: ["Git & GitHub", "Docker", "Linux / Kali", "Raspberry Pi / Edge AI", "Jupyter", "Streamlit Cloud"] },
          { icon: <Shield className="w-5 h-5 text-orange-500" />, title: "Cybersecurity", skills: ["Digital Forensics", "Vulnerability Assessment", "CTF & Ethical Hacking", "OSINT", "Network Security"] }
        ].map((category, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: idx * 0.08 }}
            className="p-5 border border-border bg-muted hover:bg-card transition-colors rounded-xl"
          >
            <div className="flex items-center gap-3 mb-5">
              {category.icon}
              <h4 className="text-base text-foreground font-medium">{category.title}</h4>
            </div>
            <ul className="flex flex-wrap gap-2">
              {category.skills.map(skill => (
                <li key={skill} className="text-xs text-muted-foreground bg-background border border-border px-2.5 py-1 rounded-md">
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  const experiences = [
    {
      date: "Present • KJ Somaiya Institute of Technology",
      role: "Tech Head, CyberSecurity Cell",
      desc: "Leading technical operations of a 20+ member team, overseeing vulnerability assessments, security awareness initiatives, and coordinating CTF competitions.",
      bullets: [
        "Orchestrated Kali Linux-based pen-testing labs and CTF challenge design for 100+ participants",
        "Delivered security awareness workshops to 200+ students on OSINT, phishing, and network forensics",
        "Managed cross-functional team coordination between technical and outreach divisions"
      ]
    },
    {
      date: "April 2025 • Capabl × KJ Somaiya",
      role: "Generative AI Intern",
      desc: "Completed the MSME & Startup India-recognised Gen AI Saksham Program; developed LLM-powered prototypes leveraging prompt engineering, chain-of-thought, and API orchestration.",
      bullets: [
        "Engineered 3 LLM-powered prototypes using chain-of-thought prompting and tool-use patterns",
        "Applied RAG architecture to reduce hallucination rates in knowledge-grounded responses",
        "Presented prototype demos to senior engineers; prototype selected for internal showcase"
      ]
    },
    {
      date: "Jun – Jul 2023 • R3 Systems Pvt. Ltd.",
      role: "Web Application Development Intern",
      desc: "Completed industrial training in full-stack web development (Java), building and testing production-grade modules under senior mentorship.",
      bullets: [
        "Built and tested 5+ production modules in Java/Spring MVC framework",
        "Collaborated with a 4-person team using Git version control and Agile sprints"
      ]
    },
    {
      date: "2023 • Nashik City Police",
      role: "Cyber Security Volunteer (Cyber Doot)",
      desc: "Trained under Nashik City Police Cyber Cell on cybercrime investigation; received official commendation certificate.",
      bullets: [
        "Assisted in cybercrime awareness drives reaching 500+ citizens in Nashik district",
        "Recognized with official Cyber Doot commendation certificate from Nashik Police Commissioner"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 md:py-24 px-6 md:px-16">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-12 md:mb-16">
        <span className="text-muted-foreground uppercase tracking-widest text-sm mb-4 block">06 / Journey</span>
        <h2 className="font-heading text-3xl md:text-5xl text-foreground">Professional Track.</h2>
      </motion.div>

      {/* Mobile: simple stack; Desktop: alternating timeline */}
      <div className="max-w-3xl mx-auto">
        {/* Timeline line — only show on md+ */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 top-0 h-full w-[1px] bg-border -translate-x-px" />
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className={`relative flex items-start gap-8 mb-16 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Dot */}
              <div className="absolute left-1/2 top-3 w-3 h-3 rounded-full border-2 border-foreground bg-background -translate-x-1/2 ring-4 ring-background z-10" />
              {/* Card */}
              <div className="w-[calc(50%-2rem)] p-5 rounded-xl border border-border bg-card hover:bg-muted transition-colors">
                <div className="text-xs text-muted-foreground font-mono mb-2 uppercase tracking-wider">{exp.date}</div>
                <h3 className="text-base text-foreground font-semibold mb-2">{exp.role}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm mb-3">{exp.desc}</p>
                {exp.bullets && (
                  <ul className="space-y-1.5">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-emerald-500 mt-1 shrink-0">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Spacer */}
              <div className="w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </div>

        {/* Mobile: simple card stack */}
        <div className="md:hidden space-y-5">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="p-5 rounded-xl border border-border bg-card"
            >
              <div className="text-xs text-muted-foreground font-mono mb-2 uppercase tracking-wider">{exp.date}</div>
              <h3 className="text-base text-foreground font-semibold mb-2">{exp.role}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-3">{exp.desc}</p>
              {exp.bullets && (
                <ul className="space-y-1.5">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-emerald-500 mt-1 shrink-0">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Education() {
  const education = [
    {
      degree: "BTech — Artificial Intelligence & Data Science",
      institution: "KJ Somaiya Institute of Technology, Mumbai",
      university: "University of Mumbai",
      timeline: "Sept 2024 — Present",
      grade: "Avg CGPA 9.2"
    },
    {
      degree: "Diploma — Computer Engineering",
      institution: "Guru Gobind Singh Polytechnic, Nashik",
      university: "Maharashtra State Board of Technical Education",
      timeline: "2021 — 2024",
      grade: "88.22%"
    }
  ];

  return (
    <section id="education" className="py-20 md:py-24 px-6 md:px-16">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-12 md:mb-16">
        <span className="text-muted-foreground uppercase tracking-widest text-sm mb-4 block">04 / Academia</span>
        <h2 className="font-heading text-3xl md:text-5xl text-foreground flex items-center gap-4">
          <GraduationCap className="w-8 h-8 text-purple-500 hidden md:block" />
          Education.
        </h2>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-5">
        {education.map((edu, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            transition={{ delay: idx * 0.15 }}
            className="p-5 md:p-6 border border-border bg-card/50 hover:bg-card transition-colors rounded-2xl group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-5 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
              <GraduationCap className="w-20 h-20 text-foreground" />
            </div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 gap-2">
                <h3 className="text-base md:text-lg text-foreground font-heading">
                  {edu.degree}{" "}
                  {edu.grade && <span className="text-purple-400/80">· {edu.grade}</span>}
                </h3>
                <span className="text-purple-500 font-mono text-sm tracking-widest whitespace-nowrap shrink-0">{edu.timeline}</span>
              </div>
              <p className="text-base md:text-lg text-muted-foreground font-medium mb-1">{edu.institution}</p>
              <p className="text-muted-foreground text-sm uppercase tracking-wider">{edu.university}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Awards() {
  const awards = [
    { title: "2nd Rank — AI-Ideathon (Multi-Agent Orchestration)", body: "KJ Somaiya / AI-Robo Festival", year: "Feb 2026" },
    { title: "Best Performance — S4DS IoT Poster Presentation", body: "KJ Somaiya Institute of Technology", year: "Nov 2025" },
    { title: "Cybersecurity Analyst Job Simulation (IAM)", body: "Tata / Forage", year: "Aug 2025" },
    { title: "Gen AI Saksham Program", body: "Capabl x KJ Somaiya / TechfusionX", year: "Apr 2025" },
    { title: "Research Paper: Mentor AI — IJMRSET (IF 7.521)", body: "IJMRSET Volume 7, Issue 3", year: "Mar 2024" },
    { title: "GGS Hackathon Prize Winner", body: "MoE Innovation Council (GGSP-IIC)", year: "Feb 2024" },
    { title: "Cyber Security Volunteer — Cyber Doot Award", body: "Nashik City Police Commissionerate", year: "2023" },
    { title: "Research Paper: The Power of the Cloud (IF 5.49)", body: "IJSRED / IC-RTETM-2023", year: "Jun 2023" },
  ];

  return (
    <section id="awards" className="py-20 md:py-24 px-6 md:px-16 bg-background">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-12 md:mb-16">
        <span className="text-muted-foreground uppercase tracking-widest text-sm mb-4 block">07 / Recognition</span>
        <h2 className="font-heading text-3xl md:text-5xl text-foreground flex items-center gap-4">
          <Award className="w-8 h-8 text-emerald-500 hidden md:block" />
          Awards &amp; Certifications.
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {awards.map((award, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: idx * 0.05 }}
            className="p-4 md:p-5 border border-border bg-muted hover:bg-card transition-colors rounded-xl group"
          >
            <div className="text-emerald-500 text-xs font-mono mb-2">{award.year}</div>
            <h3 className="text-sm md:text-base text-foreground font-medium mb-1 group-hover:text-emerald-400 transition-colors leading-snug">{award.title}</h3>
            <p className="text-muted-foreground text-xs md:text-sm">{award.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Frames() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  const row1 = ["gallery-1.jpg", "gallery-3.jpg", "gallery-4.jpg", "gallery-5.jpg"];
  const row2 = ["gallery-6.jpg", "gallery-7.jpg", "IMG_1089.png", "f4413cca-98e0-4980-b1b1-fe2ec44c7782-2.png"];

  return (
    <section id="frames" ref={containerRef} className="py-20 md:py-24 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="px-6 md:px-16 mb-12 md:mb-14 text-center"
      >
        <span className="text-muted-foreground uppercase tracking-widest text-sm mb-4 block">03 / Gallery</span>
        <h2 className="font-heading text-3xl md:text-5xl text-foreground flex items-center justify-center gap-4">
          <Camera className="w-8 h-8 text-blue-500 hidden md:block" />
          Life in Frames.
        </h2>
      </motion.div>

      {/* Gallery strips — clip overflow at the section level to prevent page horizontal scroll */}
      <div className="flex flex-col gap-4 md:gap-6 overflow-hidden">
        <motion.div style={{ x: x1 }} className="flex gap-4 md:gap-6 w-max pl-6 md:pl-16">
          {[...row1, ...row1, ...row1].map((filename, idx) => (
            <div key={`r1-${idx}`} className="relative w-[55vw] sm:w-[40vw] md:w-[22vw] aspect-[4/3] rounded-2xl overflow-hidden shrink-0 border border-border group shadow-premium-md">
              <Image
                src={`/images/${filename}`}
                alt="Gallery Photo"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                sizes="(max-width: 640px) 55vw, (max-width: 768px) 40vw, 22vw"
                quality={75}
                unoptimized
              />
            </div>
          ))}
        </motion.div>

        <motion.div style={{ x: x2 }} className="flex gap-4 md:gap-6 w-max pl-6 md:pl-16">
          {[...row2, ...row2, ...row2].map((filename, idx) => (
            <div key={`r2-${idx}`} className="relative w-[55vw] sm:w-[40vw] md:w-[22vw] aspect-[4/3] rounded-2xl overflow-hidden shrink-0 border border-border group shadow-premium-md">
              <Image
                src={`/images/${filename}`}
                alt="Gallery Photo"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                sizes="(max-width: 640px) 55vw, (max-width: 768px) 40vw, 22vw"
                quality={75}
                unoptimized
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function ContactTabs() {
  const tabs = [
    { icon: <Phone className="w-6 h-6" />, label: "Phone", value: "+91 9156161100", link: "tel:+919156161100" },
    { icon: <Mail className="w-6 h-6" />, label: "Email", value: "sanketsaraf08@gmail.com", link: "mailto:sanketsaraf08@gmail.com" },
    { icon: <Link className="w-6 h-6" />, label: "LinkedIn", value: "linkedin.com/in/sanketsaraf", link: "https://linkedin.com/in/sanketsaraf" },
    { icon: <GitBranch className="w-6 h-6" />, label: "GitHub", value: "github.com/SanketVerse", link: "https://github.com/SanketVerse" },
  ];

  return (
    <section id="contact" className="py-20 md:py-24 px-6 md:px-16 bg-background border-t border-border">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-12 md:mb-16 text-center">
        <span className="text-muted-foreground uppercase tracking-widest text-sm mb-4 block">08 / Connect</span>
        <h2 className="font-heading text-3xl md:text-5xl text-foreground">Let&apos;s <span className="gradient-text" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300 }}>Talk.</span></h2>
      </motion.div>

      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4 md:gap-5">
        {tabs.map((tab, idx) => (
          <motion.a
            key={idx}
            href={tab.link}
            target={tab.label !== "Phone" && tab.label !== "Email" ? "_blank" : undefined}
            rel={tab.label !== "Phone" && tab.label !== "Email" ? "noopener noreferrer" : undefined}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-4 p-4 md:p-5 border border-border bg-muted hover:bg-card transition-all rounded-xl group"
          >
            <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:bg-black/5 dark:group-hover:bg-foreground/10 transition-colors shrink-0">
              {tab.icon}
            </div>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{tab.label}</div>
              <div className="text-sm md:text-base text-foreground font-medium truncate">{tab.value}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

export function Publications() {
  const papers = [
    {
      title: "Mentor AI — Personalized Learning with Large Language Models",
      journal: "IJMRSET · Volume 7, Issue 3",
      impactFactor: "IF 7.521",
      year: "March 2024",
      desc: "Proposed an adaptive LLM-based tutoring system that tailors curriculum, pacing, and assessment to individual learner profiles using chain-of-thought reasoning and pedagogical scaffolding.",
      link: "#research",
      color: "text-purple-500",
      bg: "bg-purple-500/8 border-purple-500/20"
    },
    {
      title: "The Power of the Cloud — Distributed Computing at Scale",
      journal: "IJSRED · IC-RTETM-2023",
      impactFactor: "IF 5.49",
      year: "June 2023",
      desc: "Explored distributed cloud architectures for high-throughput workloads, benchmarking latency and resource utilization across multi-region deployments using real-world case studies.",
      link: "#research",
      color: "text-blue-500",
      bg: "bg-blue-500/8 border-blue-500/20"
    }
  ];

  return (
    <section id="research" className="py-20 md:py-24 px-6 md:px-16 bg-background">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-12 md:mb-16">
        <span className="text-muted-foreground uppercase tracking-widest text-sm mb-4 block">08 / Research</span>
        <h2 className="font-heading text-3xl md:text-5xl text-foreground flex items-center gap-4">
          <BookOpen className="w-8 h-8 text-purple-500 hidden md:block" />
          Published Research.
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl">Peer-reviewed research in AI/ML and distributed systems, published in high-impact factor international journals.</p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-5">
        {papers.map((paper, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            transition={{ delay: idx * 0.15 }}
            className="p-5 md:p-6 border border-border bg-card/50 hover:bg-card transition-colors rounded-2xl group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-5 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
              <BookOpen className="w-20 h-20 text-foreground" />
            </div>
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${paper.bg} ${paper.color}`}>{paper.impactFactor}</span>
                <span className="text-xs font-mono text-muted-foreground">{paper.journal}</span>
                <span className="text-xs font-mono text-muted-foreground ml-auto">{paper.year}</span>
              </div>
              <h3 className="text-base md:text-lg text-foreground font-heading mb-2">{paper.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{paper.desc}</p>
              <a
                href={paper.link}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group/link"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="relative">
                  Read Paper
                  <span className="absolute -bottom-px left-0 w-full h-[1px] bg-foreground scale-x-0 origin-right group-hover/link:scale-x-100 group-hover/link:origin-left transition-transform duration-500" />
                </span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certifications row */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-14 max-w-4xl mx-auto">
        <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">Certifications & Recognitions</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Gen AI Saksham Program", issuer: "Capabl × MSME", color: "border-amber-500/30 bg-amber-500/8 text-amber-600 dark:text-amber-400" },
            { label: "Cybersecurity Analyst Simulation", issuer: "Tata / Forage", color: "border-blue-500/30 bg-blue-500/8 text-blue-600 dark:text-blue-400" },
            { label: "AI-Ideathon 2nd Rank", issuer: "KJ Somaiya / AI-Robo Fest", color: "border-emerald-500/30 bg-emerald-500/8 text-emerald-600 dark:text-emerald-400" },
            { label: "Cyber Doot Award", issuer: "Nashik Police", color: "border-purple-500/30 bg-purple-500/8 text-purple-600 dark:text-purple-400" },
            { label: "GGS Hackathon Winner", issuer: "MoE Innovation Council", color: "border-rose-500/30 bg-rose-500/8 text-rose-600 dark:text-rose-400" },
          ].map(({ label, issuer, color }) => (
            <div key={label} className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-medium ${color}`}>
              <Award className="w-3.5 h-3.5" />
              <span>{label}</span>
              <span className="opacity-60">· {issuer}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export function Footer() {
  const socials = [
    { icon: <GitBranch className="w-4 h-4" />, label: "GitHub", href: "https://github.com/SanketVerse", value: "SanketVerse" },
    { icon: <Link className="w-4 h-4" />, label: "LinkedIn", href: "https://linkedin.com/in/sanketsaraf", value: "sanketsaraf" },
    { icon: <Mail className="w-4 h-4" />, label: "Email", href: "mailto:sanketsaraf08@gmail.com", value: "sanketsaraf08@gmail.com" },
  ];

  return (
    <footer className="py-10 md:py-12 px-6 md:px-16 border-t border-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">&copy; 2026 Sanket Rajiv Saraf &nbsp;·&nbsp; fueled by caffeine &amp; Claude tokens ☕</p>
        <div className="flex items-center gap-5">
          {socials.map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
