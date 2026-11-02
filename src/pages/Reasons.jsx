import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import PageNav from '../components/PageNav';
import FloatingHearts from '../components/FloatingHearts';
import { loveReasons } from '../data/scrapbookData';
import { Shuffle } from 'lucide-react';
import { ImageWithFallback } from '../components/Polaroid';

const tapeGradients = {
  pink:     'repeating-linear-gradient(90deg,#F2D9E3 0,#F2D9E3 8px,#E8C5D4 8px,#E8C5D4 16px)',
  yellow:   'repeating-linear-gradient(90deg,#F5E4A0 0,#F5E4A0 8px,#EDD880 8px,#EDD880 16px)',
  lavender: 'repeating-linear-gradient(90deg,#E4D8F5 0,#E4D8F5 8px,#D8CDF0 8px,#D8CDF0 16px)',
  sage:     'repeating-linear-gradient(90deg,#D4E8D0 0,#D4E8D0 8px,#C2D9BC 8px,#C2D9BC 16px)',
};

export default function Reasons() {
  const [flipped, setFlipped] = useState({});
  const [highlighted, setHighlighted] = useState(null);

  const toggleFlip = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const highlightRandom = useCallback(() => {
    const ids = loveReasons.map(r => r.id);
    const rand = ids[Math.floor(Math.random() * ids.length)];
    setHighlighted(rand);
    setTimeout(() => setHighlighted(null), 2800);
  }, []);

  return (
    <div className="paper-bg" style={{ minHeight: '100vh' }}>
      <FloatingHearts />
      <div className="page-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 16 }}
        >
          <div className="section-eyebrow">💕 Page Three</div>
          <h1 className="section-heading">Little Things I Adore About You</h1>
          <p className="section-subheading">
            Tap any note to reveal the thought behind it. The list truly has no end… 💌
          </p>
        </motion.div>

        {/* Shuffle button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <motion.button
            className="btn-primary"
            onClick={highlightRandom}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: 'linear-gradient(135deg, var(--lavender-deep) 0%, var(--lavender) 100%)',
              color: 'var(--ink-dark)',
              boxShadow: '0 4px 16px rgba(228, 216, 245, 0.6)',
            }}
          >
            <Shuffle size={16} />
            Give Me Another Reason ✨
          </motion.button>
        </motion.div>

        {/* Notes grid */}
        <div className="notes-grid">
          {loveReasons.map((reason, i) => {
            const isFlipped = !!flipped[reason.id];
            const isHighlighted = highlighted === reason.id;

            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 22, rotate: reason.rotation }}
                whileInView={{ opacity: 1, y: 0, rotate: isHighlighted ? [reason.rotation, reason.rotation + 6, reason.rotation] : reason.rotation }}
                viewport={{ once: true, margin: '-30px' }}
                animate={{
                  scale: isHighlighted ? 1.08 : 1,
                  boxShadow: isHighlighted
                    ? '0 12px 36px rgba(201, 137, 154, 0.5), 0 2px 8px rgba(201, 137, 154, 0.2)'
                    : '2px 4px 16px rgba(92, 61, 56, 0.12)',
                  rotate: isHighlighted ? [reason.rotation, reason.rotation + 5, reason.rotation] : reason.rotation,
                }}
                transition={{
                  opacity: { delay: i * 0.07, duration: 0.5 },
                  y: { delay: i * 0.07, duration: 0.5, type: 'spring' },
                  scale: { duration: 0.3 },
                }}
                whileHover={{ scale: 1.05, rotate: reason.rotation + 1, zIndex: 10 }}
                className="note-card"
                style={{
                  background: reason.color,
                  cursor: 'pointer',
                  minHeight: 180,
                }}
                onClick={() => toggleFlip(reason.id)}
                role="button"
                aria-label={`Reason ${reason.id}: ${reason.message}`}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && toggleFlip(reason.id)}
              >
                {/* Washi Tape */}
                <div style={{
                  position: 'absolute', top: -9, left: '50%',
                  transform: 'translateX(-50%)', width: 48, height: 17,
                  borderRadius: 2, opacity: 0.83,
                  background: tapeGradients[reason.tape] || tapeGradients.pink,
                }} />

                {/* Card flip container */}
                <div style={{ position: 'relative', width: '100%', minHeight: 155, perspective: '700px' }}>
                  <motion.div
                    style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', minHeight: 'inherit' }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.48, ease: 'easeInOut' }}
                  >
                    {/* Front */}
                    <div style={{
                      backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                      position: 'absolute', inset: 0,
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      padding: 'clamp(8px, 2vw, 12px)', textAlign: 'center',
                    }}>
                      <div style={{ fontSize: 'clamp(1.4rem, 5vw, 1.9rem)', marginBottom: 8 }}>{reason.sticker}</div>
                      <div style={{
                        fontFamily: 'var(--font-handwritten)',
                        fontSize: 'clamp(0.9rem, 3vw, 1.08rem)',
                        color: 'var(--ink)', lineHeight: 1.55,
                      }}>
                        {reason.message}
                      </div>
                    </div>

                    {/* Back */}
                    <div style={{
                      backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                      position: 'absolute', inset: 0,
                      transform: 'rotateY(180deg)',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      padding: '8px', textAlign: 'center',
                      background: 'rgba(255,255,255,0.85)', borderRadius: 4,
                    }}>
                      {reason.featuredImage ? (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <ImageWithFallback
                            src={reason.featuredImage}
                            alt="Those eyes"
                            style={{
                              width: '100%',
                              maxHeight: 75,
                              objectFit: 'cover',
                              borderRadius: 4,
                              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                            }}
                          />
                          <div style={{
                            fontFamily: 'var(--font-handwritten)',
                            fontSize: '0.85rem',
                            color: 'var(--ink)',
                            marginTop: 6,
                            fontStyle: 'italic',
                          }}>
                            "Those eyes that hold my universe ♡"
                          </div>
                        </div>
                      ) : (
                        <>
                          <div style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: 8 }}>💖</div>
                          <div style={{
                            fontFamily: 'var(--font-handwritten)',
                            fontSize: 'clamp(0.85rem, 3vw, 1rem)',
                            color: 'var(--ink-light)', fontStyle: 'italic',
                          }}>
                            Reason #{reason.id} — and counting ♡
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Flip hint */}
                <div style={{
                  fontFamily: 'var(--font-friendly)',
                  fontSize: 'clamp(0.65rem, 2vw, 0.72rem)',
                  color: 'var(--ink-muted)', textAlign: 'center',
                  marginTop: 6, opacity: 0.7,
                }}>
                  {isFlipped ? 'tap to flip back' : 'tap to reveal ✨'}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            display: 'flex', justifyContent: 'center', gap: 12,
            marginTop: 52, fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
            opacity: 0.6, fontFamily: 'var(--font-handwritten)',
            fontStyle: 'italic', textAlign: 'center', color: 'var(--ink-light)',
          }}
        >
          ✍️ The list goes on forever, just like my love for you…
        </motion.div>

        <PageNav currentPath="/reasons" />
      </div>
    </div>
  );
}
