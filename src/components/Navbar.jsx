import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, BookHeart } from 'lucide-react';
import '../styles/scrapbook.css';

const pages = [
  { path: '/',         label: 'Cover',    emoji: '🏠' },
  { path: '/memories', label: 'Memories', emoji: '📸' },
  { path: '/reasons',  label: 'Reasons',  emoji: '💕' },
  { path: '/timeline', label: 'Timeline', emoji: '📅' },
  { path: '/letters',  label: 'Letters',  emoji: '✉️' },
  { path: '/album',    label: 'Album',    emoji: '🖼️' },
  { path: '/surprise', label: 'Surprise', emoji: '🎁' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className="navbar-wrapper">
        <nav className="navbar">
          <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
            <BookHeart size={20} className="navbar-logo-icon" />
            <span className="navbar-logo-text">Our Scrapbook</span>
          </Link>

          {/* Desktop tabs */}
          <ul className="navbar-tabs" role="tablist">
            {pages.map(p => (
              <li key={p.path}>
                <NavLink
                  to={p.path}
                  end={p.path === '/'}
                  className={({ isActive }) => `navbar-tab${isActive ? ' active' : ''}`}
                >
                  <span className="navbar-tab-emoji">{p.emoji}</span>
                  <span className="navbar-tab-label">{p.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Hamburger button (mobile/tablet) */}
          <button
            className="navbar-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="m"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              className="navbar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              key="menu"
              className="navbar-mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {pages.map((p, i) => (
                <motion.div
                  key={p.path}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <NavLink
                    to={p.path}
                    end={p.path === '/'}
                    className={({ isActive }) => `navbar-mobile-link${isActive ? ' active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{p.emoji}</span>
                    <span>{p.label}</span>
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
