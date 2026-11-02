import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from '../components/FloatingHearts';
import PageNav from '../components/PageNav';
import { scrapbookConfig } from '../data/scrapbookData';
import VideoPlayer from '../components/VideoPlayer';
import { Play, Sparkles, X } from 'lucide-react';
import { ImageWithFallback } from '../components/Polaroid';

const doodles = [
  { emoji: '🌸', top: '14%', left: '6%',   delay: 0,   rotation: -15, size: '1.6rem' },
  { emoji: '✨', top: '16%', right: '8%',  delay: 0.3, rotation: 12,  size: '1.5rem' },
  { emoji: '🌿', top: '62%', left: '5%',   delay: 0.7, rotation: 8,   size: '1.4rem' },
  { emoji: '💕', top: '68%', right: '6%',  delay: 0.2, rotation: -10, size: '1.6rem' },
  { emoji: '⭐', top: '32%', left: '4%',   delay: 0.5, rotation: 22,  size: '1.3rem' },
  { emoji: '🎀', top: '42%', right: '5%',  delay: 0.9, rotation: -14, size: '1.4rem' },
  { emoji: '🌷', top: '54%', left: '2.5%', delay: 0.1, rotation: 9,   size: '1.3rem' },
  { emoji: '🍃', top: '22%', left: '12%',  delay: 0.6, rotation: -6,  size: '1.2rem' },
  { emoji: '💛', top: '78%', left: '8%',   delay: 0.4, rotation: 5,   size: '1.2rem' },
  { emoji: '🌺', top: '80%', right: '9%',  delay: 0.8, rotation: -18, size: '1.3rem' },
];

export default function Welcome() {
  const navigate = useNavigate();
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(() => {
      setOpened(true);
      setTimeout(() => navigate('/memories'), 850);
    }, 950);
  };

  return (
    <div className="welcome-page paper-bg">
      <FloatingHearts />

      {/* Decorative background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(242,217,227,0.25) 0%, transparent 65%)',
      }} />

      {/* Floating doodles */}
      <div className="cover-doodles" aria-hidden="true">
        {doodles.map((d, i) => (
          <motion.div
            key={i}
            className="doodle"
            style={{
              top: d.top, left: d.left, right: d.right,
              transform: `rotate(${d.rotation}deg)`,
              fontSize: d.size,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.65, scale: 1 }}
            transition={{ delay: d.delay + 0.6, duration: 0.5, type: 'spring', stiffness: 200 }}
          >
            {d.emoji}
          </motion.div>
        ))}
      </div>

      {/* Main scrapbook cover */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            className="scrapbook-cover"
            initial={{ opacity: 0, y: 44, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04, y: -28 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Corner ornaments */}
            <div className="cover-corner tl" aria-hidden="true">✿</div>
            <div className="cover-corner tr" aria-hidden="true">✿</div>
            <div className="cover-corner bl" aria-hidden="true">✿</div>
            <div className="cover-corner br" aria-hidden="true">✿</div>

            {/* Washi tape decoration on top */}
            <div className="tape tape-yellow" style={{
              position: 'absolute', top: -10, left: '50%',
              transform: 'translateX(-50%) rotate(-1deg)',
              width: 72,
            }} />

            {/* Pulsing heart */}
            <motion.div
              style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', marginBottom: 8 }}
              animate={{ scale: [1, 1.22, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              💖
            </motion.div>

            <h1 className="cover-title">A Little Book of Our Memories</h1>
            <p className="cover-subtitle">{scrapbookConfig.subtitle}</p>

            {/* Gold divider */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              margin: '0 auto 24px',
              opacity: 0.6,
              maxWidth: 220,
            }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, var(--gold))' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--gold)' }}>✦</span>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, var(--gold))' }} />
            </div>

            {/* Featured Cover Photo (Couple Photo) with Washi Tape */}
            <motion.div
              style={{
                maxWidth: 'min(240px, 62vw)',
                margin: '0 auto 24px',
                position: 'relative',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.04, rotate: 1 }}
              onClick={handleOpen}
            >
              <div className="tape tape-pink" style={{
                top: -8, left: '50%', transform: 'translateX(-50%) rotate(2deg)',
                width: 60, height: 16, zIndex: 5,
              }} />
              <div style={{
                background: '#fff',
                padding: '8px 8px 18px',
                boxShadow: '0 8px 24px rgba(92, 61, 56, 0.2)',
                borderRadius: 4,
                transform: 'rotate(-1.5deg)',
              }}>
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  aspectRatio: '3/4',
                  width: '100%',
                  borderRadius: 2,
                  background: 'var(--cream)',
                }}>
                  <ImageWithFallback
                    src={scrapbookConfig.coverPhoto}
                    alt="Us Together"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: scrapbookConfig.coverPhotoPosition || 'center 16%',
                      display: 'block',
                    }}
                  />
                </div>
                <div style={{
                  fontFamily: 'var(--font-handwritten)',
                  fontSize: '0.95rem',
                  color: 'var(--ink)',
                  textAlign: 'center',
                  marginTop: 6,
                }}>
                  Us, always ♡
                </div>
              </div>
            </motion.div>

            {/* Central interactive envelope */}
            <motion.div
              className="cover-envelope"
              animate={opening
                ? { scale: 1.12, rotate: [0, -6, 6, -3, 0], y: -14 }
                : { y: [0, -4, 0] }}
              transition={opening
                ? { duration: 0.5 }
                : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              onClick={handleOpen}
              style={{ cursor: 'pointer' }}
            >
              <div className="envelope-body">
                <div className="envelope-flap" />
                <div className="envelope-wax">💌</div>

                {/* Envelope ruled lines */}
                <div style={{
                  position: 'absolute', bottom: '18%', left: '18%', right: '18%',
                  display: 'flex', flexDirection: 'column', gap: 5,
                }}>
                  {[1, 2, 3].map(n => (
                    <div key={n} style={{ height: 1.5, background: 'rgba(92,61,56,0.13)', borderRadius: 1 }} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 12 }}>
              <motion.button
                className="btn-primary"
                onClick={handleOpen}
                disabled={opening}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97, y: 0 }}
                style={{ fontSize: 'clamp(1.05rem, 4vw, 1.25rem)', padding: 'clamp(14px, 3vw, 18px) clamp(28px, 6vw, 40px)' }}
              >
                <Sparkles size={18} />
                {opening ? '✨ Opening Memories…' : 'Open Your Surprise ✨'}
              </motion.button>

              <motion.button
                className="btn-secondary"
                onClick={() => setShowVideoModal(true)}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{ fontSize: '1rem', padding: '12px 20px', gap: 6 }}
                aria-label="Watch Special Video Clip"
              >
                <Play size={15} fill="currentColor" /> Watch Story Reel
              </motion.button>
            </div>

            {/* Handwritten note */}
            <p className="cover-handwritten-note" style={{ marginTop: 22 }}>
              ✍️ Made with all my love, just for you.
            </p>

            {/* Decorative emoji row */}
            <div style={{
              display: 'flex', gap: 10, justifyContent: 'center',
              marginTop: 18, opacity: 0.5, fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
              flexWrap: 'wrap',
            }} aria-hidden="true">
              {['🌸', '✨', '💕', '⭐', '🌷', '✨', '💕'].map((e, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2 + i * 0.25, delay: i * 0.18 }}
                >
                  {e}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video reel modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ padding: 'clamp(16px, 3vw, 24px)', maxWidth: 440 }}
            >
              <button
                className="modal-close"
                onClick={() => setShowVideoModal(false)}
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.25rem',
                color: 'var(--ink-dark)',
                textAlign: 'center',
                marginBottom: 12,
              }}>
                Our Sweetest Moments ☕✨
              </div>

              <VideoPlayer
                src={scrapbookConfig.featureVideo}
                poster="/video-thumbs/2.jpg"
                caption="Lentini Social Date Memories"
                autoplay={true}
                aspectRatio="9/16"
              />

              <div style={{
                textAlign: 'center',
                marginTop: 14,
                fontFamily: 'var(--font-handwritten)',
                fontSize: '1rem',
                color: 'var(--ink-light)',
              }}>
                Every second with you is a gift ♡
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom ruler */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 6,
        background: 'repeating-linear-gradient(90deg, var(--blush) 0, var(--blush) 20px, var(--dusty-rose) 20px, var(--dusty-rose) 22px)',
        opacity: 0.4, pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: 700 }}>
        <PageNav currentPath="/" />
      </div>
    </div>
  );
}
