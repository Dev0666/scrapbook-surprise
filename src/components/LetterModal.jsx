import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function LetterModal({ letter, onClose }) {
  // Close on Escape & prevent body scroll
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!letter) return null;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 'min(560px, calc(100vw - 24px))' }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close letter">
          <X size={16} />
        </button>

        {/* Washi tape decoration */}
        <div className="tape tape-yellow" style={{
          position: 'absolute', top: -10, left: '50%',
          transform: 'translateX(-50%) rotate(-1.5deg)', zIndex: 20,
        }} />

        {/* Envelope header */}
        <div style={{
          background: letter.color || 'var(--blush)',
          padding: 'clamp(20px, 4vw, 28px) clamp(20px, 4vw, 32px) clamp(16px, 3vw, 22px)',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 'clamp(1.6rem, 5vw, 2rem)', lineHeight: 1 }}>{letter.emoji}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-friendly)',
              fontSize: 'clamp(0.72rem, 2.5vw, 0.82rem)',
              color: 'var(--ink-light)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 4,
            }}>
              {letter.label}
            </div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 3.5vw, 1.2rem)',
              color: 'var(--ink-dark)',
              lineHeight: 1.25,
            }}>
              {letter.subject}
            </div>
          </div>
        </div>

        {/* Letter body */}
        <div className="letter-paper">
          <div className="letter-lines" />
          <div className="letter-body">{letter.content}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
