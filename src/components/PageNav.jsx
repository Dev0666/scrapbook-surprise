import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const pages = [
  { path: '/',         label: 'Cover'    },
  { path: '/memories', label: 'Memories' },
  { path: '/reasons',  label: 'Reasons'  },
  { path: '/timeline', label: 'Timeline' },
  { path: '/letters',  label: 'Letters'  },
  { path: '/album',    label: 'Album'    },
  { path: '/surprise', label: 'Surprise' },
];

export default function PageNav({ currentPath }) {
  const currentIndex = pages.findIndex(p => p.path === currentPath);
  const prev = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const next = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  return (
    <motion.div
      className="page-nav"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      {prev ? (
        <Link to={prev.path} className="btn-secondary">
          <ChevronLeft size={16} /> {prev.label}
        </Link>
      ) : <div />}

      <div className="page-nav-indicator">
        <div style={{ marginBottom: 6, fontFamily: 'var(--font-handwritten)', fontSize: 'clamp(0.82rem, 2.5vw, 0.95rem)' }}>
          Page {currentIndex + 1} of {pages.length}
        </div>
        <div className="page-nav-dots">
          {pages.map((p, i) => (
            <Link
              key={p.path}
              to={p.path}
              aria-label={p.label}
              style={{ display: 'flex' }}
            >
              <div className={`page-nav-dot${i === currentIndex ? ' active' : ''}`} />
            </Link>
          ))}
        </div>
        <div className="page-nav-home" style={{ marginTop: 10 }}>
          <Link to="/" className="btn-ghost" style={{ fontSize: '0.82rem', padding: '6px 14px', minHeight: 32, gap: 4 }}>
            <Home size={12} /> Home
          </Link>
        </div>
      </div>

      {next ? (
        <Link to={next.path} className="btn-secondary">
          {next.label} <ChevronRight size={16} />
        </Link>
      ) : <div />}
    </motion.div>
  );
}
