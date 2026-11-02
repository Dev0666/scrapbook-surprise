import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageNav from '../components/PageNav';
import FloatingHearts from '../components/FloatingHearts';
import Confetti from '../components/Confetti';
import VideoPlayer from '../components/VideoPlayer';
import { finalSurprise, scrapbookConfig } from '../data/scrapbookData';
import { RotateCcw, Heart, Film, Camera } from 'lucide-react';
import { ImageWithFallback } from '../components/Polaroid';

// Ripple ring component
function RippleRing({ delay = 0, size = 200 }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: size, height: size,
        borderRadius: '50%',
        border: '1.5px solid var(--blush-deep)',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
      animate={{ scale: [0.8, 2.2], opacity: [0.5, 0] }}
      transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

export default function Surprise() {
  const [opened, setOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [mediaMode, setMediaMode] = useState('video'); // 'video' | 'photo'

  const handleOpen = () => {
    setOpened(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 7000);
  };

  const handleReplay = () => {
    setOpened(false);
    setShowConfetti(false);
    setTimeout(() => handleOpen(), 350);
  };

  const handleGiftHover = () => {
    if (!shaking) {
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }
  };

  return (
    <div className="surprise-page paper-bg">
      <FloatingHearts />
      <Confetti active={showConfetti} />

      {/* Background decorative rings */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <RippleRing delay={0}   size={250} />
        <RippleRing delay={1}   size={350} />
        <RippleRing delay={2}   size={450} />
        <RippleRing delay={0.5} size={550} />
      </div>

      <div style={{ width: '100%', maxWidth: 'min(700px, 100%)', position: 'relative', zIndex: 10 }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 36 }}
        >
          <div className="section-eyebrow">🎁 Page Seven — The Grand Finale</div>
          <h1 className="section-heading" style={{ fontSize: 'clamp(1.7rem, 6vw, 2.8rem)' }}>
            {finalSurprise.heading}
          </h1>
          <p style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(0.95rem, 3.5vw, 1.2rem)',
            color: 'var(--ink-light)', marginTop: 8,
          }}>
            The last page holds the biggest surprise of all… 💌
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!opened ? (
            /* ── Gift Box ─────────────────────────────────── */
            <motion.div
              key="gift"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2, y: -28 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}
            >
              {/* Gift illustration */}
              <motion.div
                style={{
                  position: 'relative',
                  width: 'clamp(160px, 40vw, 220px)',
                  height: 'clamp(180px, 45vw, 240px)',
                  cursor: 'pointer',
                }}
                onHoverStart={handleGiftHover}
                onTouchStart={handleGiftHover}
                onClick={handleOpen}
                animate={shaking ? { rotate: [-3, 3, -3, 3, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                {/* Glow */}
                <motion.div
                  style={{
                    position: 'absolute', inset: -24,
                    background: 'radial-gradient(ellipse, rgba(201,137,154,0.3) 0%, transparent 70%)',
                    borderRadius: '50%',
                  }}
                  animate={{ opacity: [0.4, 0.85, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />

                {/* Box lid */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '22%', left: '6%', right: '6%', height: '24%',
                    background: 'linear-gradient(135deg, #C88090 0%, var(--dusty-rose) 100%)',
                    borderRadius: 8, zIndex: 3,
                    boxShadow: '0 4px 14px rgba(160,96,112,0.35)',
                  }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Box body */}
                <div style={{
                  position: 'absolute',
                  top: '40%', left: '12%', right: '12%', bottom: 0,
                  background: 'linear-gradient(135deg, var(--dusty-rose) 0%, #C08090 100%)',
                  borderRadius: 8,
                  boxShadow: '0 10px 30px rgba(201,137,154,0.45)',
                }}>
                  {/* Ribbon vertical */}
                  <div style={{
                    position: 'absolute', top: '-52%', bottom: 0,
                    left: '50%', transform: 'translateX(-50%)',
                    width: 22, background: 'var(--butter)', borderRadius: 3,
                  }} />
                  {/* Ribbon horizontal */}
                  <div style={{
                    position: 'absolute', top: '40%', left: -14, right: -14,
                    height: 22, background: 'var(--butter)', borderRadius: 3, zIndex: 2,
                  }} />
                </div>

                {/* Bow */}
                <motion.div
                  style={{
                    position: 'absolute', top: '4%', left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: 'clamp(2rem, 7vw, 3rem)',
                    zIndex: 5,
                  }}
                  animate={{ rotate: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🎀
                </motion.div>
              </motion.div>

              <motion.button
                className="btn-primary"
                onClick={handleOpen}
                whileHover={{ scale: 1.07, y: -3 }}
                whileTap={{ scale: 0.96 }}
                style={{ fontSize: 'clamp(1.1rem, 4vw, 1.35rem)', padding: 'clamp(15px, 3vw, 20px) clamp(30px, 8vw, 52px)' }}
              >
                <Heart size={20} fill="currentColor" />
                {finalSurprise.buttonLabel}
              </motion.button>

              <p style={{
                fontFamily: 'var(--font-handwritten)',
                fontSize: 'clamp(0.95rem, 3vw, 1.05rem)',
                color: 'var(--ink-light)', fontStyle: 'italic',
              }}>
                ✍️ Something special awaits inside…
              </p>
            </motion.div>

          ) : (
            /* ── Final Message Reveal ─────────────────────────────── */
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 44, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="final-message-reveal">
                {/* Tape decoration */}
                <div className="tape tape-yellow" style={{
                  position: 'absolute', top: -10, left: '50%',
                  transform: 'translateX(-50%) rotate(-1.5deg)', zIndex: 20,
                }} />

                {/* Pulsing heart */}
                <motion.div
                  style={{ fontSize: 'clamp(2rem, 6vw, 2.8rem)', textAlign: 'center', marginBottom: 14 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                >
                  💖
                </motion.div>

                {/* Gold divider */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  margin: '0 auto 16px', opacity: 0.5, maxWidth: 160,
                }}>
                  <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, var(--gold))' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>✦</span>
                  <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, var(--gold))' }} />
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                  fontSize: 'clamp(1.2rem, 4vw, 1.6rem)',
                  color: 'var(--ink-dark)', textAlign: 'center', marginBottom: 16,
                }}>
                  To {scrapbookConfig.recipientName},
                </h2>

                {/* Featured Reveal Video/Photo Centerpiece */}
                <div style={{
                  maxWidth: 380,
                  margin: '0 auto 24px',
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(92, 61, 56, 0.25)',
                  background: '#fff',
                  padding: 8,
                }}>
                  {/* Media Mode Switcher */}
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 8 }}>
                    <button
                      onClick={() => setMediaMode('video')}
                      className="btn-ghost"
                      style={{
                        padding: '4px 12px',
                        fontSize: '0.8rem',
                        minHeight: 28,
                        background: mediaMode === 'video' ? 'var(--blush)' : 'transparent',
                        fontWeight: mediaMode === 'video' ? 600 : 400,
                      }}
                    >
                      <Film size={12} /> Moving Memory
                    </button>
                    <button
                      onClick={() => setMediaMode('photo')}
                      className="btn-ghost"
                      style={{
                        padding: '4px 12px',
                        fontSize: '0.8rem',
                        minHeight: 28,
                        background: mediaMode === 'photo' ? 'var(--blush)' : 'transparent',
                        fontWeight: mediaMode === 'photo' ? 600 : 400,
                      }}
                    >
                      <Camera size={12} /> The Red Roses
                    </button>
                  </div>

                  {mediaMode === 'video' ? (
                    <div style={{ maxWidth: 260, margin: '0 auto', borderRadius: 8, overflow: 'hidden' }}>
                      <VideoPlayer
                        src={finalSurprise.featuredVideo}
                        poster={finalSurprise.featuredPoster}
                        caption="Your beautiful smile in motion ✨"
                        autoplay={true}
                        aspectRatio="9/16"
                        objectPosition="center top"
                      />
                    </div>
                  ) : (
                    <div style={{ position: 'relative', maxWidth: 260, margin: '0 auto' }}>
                      <div style={{
                        aspectRatio: '3/4',
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: 6,
                        background: 'var(--cream)',
                      }}>
                        <ImageWithFallback
                          src={finalSurprise.featuredPhoto}
                          alt="Roses for you"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: finalSurprise.featuredPhotoPosition || 'center 16%',
                            borderRadius: 6,
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
                        A memory to cherish forever 🌹
                      </div>
                    </div>
                  )}
                </div>

                <div className="final-message-text">{finalSurprise.message}</div>

                <div className="final-signature">{scrapbookConfig.senderName}</div>

                <div className="final-closing">
                  "{finalSurprise.closingLine}"
                </div>

                {/* Floating emoji row */}
                <div style={{
                  display: 'flex', justifyContent: 'center', gap: 'clamp(6px, 3vw, 14px)',
                  marginTop: 28, fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', flexWrap: 'wrap',
                }} aria-hidden="true">
                  {['💕', '✨', '🌸', '⭐', '💖', '🌷', '✨'].map((e, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -9, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8 + i * 0.2, delay: i * 0.14 }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>

                {/* Replay button */}
                <div style={{ textAlign: 'center', marginTop: 28 }}>
                  <button
                    className="btn-secondary"
                    onClick={handleReplay}
                    style={{ fontSize: 'clamp(0.85rem, 3vw, 0.95rem)', gap: 8 }}
                  >
                    <RotateCcw size={15} /> Experience Again
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <PageNav currentPath="/surprise" />
      </div>
    </div>
  );
}
