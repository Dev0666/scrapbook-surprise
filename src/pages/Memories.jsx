import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Polaroid from '../components/Polaroid';
import PageNav from '../components/PageNav';
import FloatingHearts from '../components/FloatingHearts';
import VideoPlayer from '../components/VideoPlayer';
import { memories } from '../data/scrapbookData';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../components/Polaroid';

export default function Memories() {
  const [selected, setSelected] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const openMemory = (mem, idx) => {
    setSelected(mem);
    setSelectedIdx(idx);
  };
  const closeMemory = () => { setSelected(null); setSelectedIdx(null); };
  const prevMemory = () => {
    const prev = (selectedIdx - 1 + memories.length) % memories.length;
    setSelected(memories[prev]);
    setSelectedIdx(prev);
  };
  const nextMemory = () => {
    const next = (selectedIdx + 1) % memories.length;
    setSelected(memories[next]);
    setSelectedIdx(next);
  };

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
          <div className="section-eyebrow">📸 Page Two</div>
          <h1 className="section-heading">Little Moments, Big Feelings</h1>
          <p className="section-subheading">
            Some memories are made of golden light, laughter and quiet magic ✨
          </p>
          {/* Tape row */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32 }}
          >
            {['tape-pink', 'tape-yellow', 'tape-lavender', 'tape-sage'].map(t => (
              <div key={t} className={`tape ${t}`} style={{ position: 'static', width: 44, height: 13 }} />
            ))}
          </motion.div>
        </motion.div>

        {/* Polaroid grid */}
        <div className="memories-grid">
          {memories.map((mem, i) => (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.5, type: 'spring', stiffness: 120 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              style={{ cursor: 'pointer' }}
              onClick={() => openMemory(mem, i)}
            >
              <Polaroid
                image={mem.image}
                caption={mem.caption}
                date={mem.date}
                rotation={mem.rotation}
                tape={mem.tape}
                video={mem.video}
                objectPosition={mem.objectPosition}
                aspectRatio="3/4"
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom floating emoji row */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 'clamp(8px, 3vw, 18px)',
          marginTop: 48, fontFamily: 'var(--font-handwritten)',
          fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', opacity: 0.45,
          flexWrap: 'wrap',
        }} aria-hidden="true">
          {['🌸', '💕', '✨', '🌿', '⭐', '💖', '🌷'].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 2 + i * 0.28, delay: i * 0.18 }}
            >{e}</motion.span>
          ))}
        </div>

        <PageNav currentPath="/memories" />
      </div>

      {/* Memory modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMemory}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              onClick={e => e.stopPropagation()}
              style={{ padding: 0, overflow: 'hidden', maxWidth: 'min(440px, calc(100vw - 24px))' }}
            >
              <button className="modal-close" onClick={closeMemory} aria-label="Close memory">
                <X size={15} />
              </button>

              {/* Tape */}
              <div className={`tape tape-${selected.tape}`} style={{
                position: 'absolute', top: -10, left: '50%',
                transform: 'translateX(-50%) rotate(-2deg)', zIndex: 20,
              }} />

              {/* Media: Video if available, otherwise Photo */}
              <div style={{ background: 'white', padding: 'clamp(14px, 3vw, 20px) clamp(14px, 3vw, 20px) 8px' }}>
                {selected.video ? (
                  <div style={{
                    maxWidth: 280,
                    margin: '0 auto',
                    borderRadius: 8,
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  }}>
                    <VideoPlayer
                      src={selected.video}
                      poster={selected.image}
                      caption={selected.caption}
                      autoplay={false}
                      aspectRatio="9/16"
                      objectPosition={selected.objectPosition || 'center top'}
                    />
                  </div>
                ) : (
                  <div style={{
                    maxWidth: 320,
                    margin: '0 auto',
                    aspectRatio: '3/4',
                    maxHeight: 'min(55vh, 380px)',
                    overflow: 'hidden',
                    borderRadius: 8,
                    background: 'var(--cream)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  }}>
                    <ImageWithFallback
                      src={selected.image}
                      alt={selected.caption}
                      loading="eager"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: selected.objectPosition || 'center 18%',
                        borderRadius: 8,
                        display: 'block',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ background: 'white', padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 30px) clamp(20px, 4vw, 28px)', textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-handwritten)',
                  fontSize: 'clamp(1.1rem, 4vw, 1.4rem)',
                  color: 'var(--ink)', marginBottom: 4,
                }}>{selected.caption}</div>
                {selected.date && (
                  <div style={{
                    fontFamily: 'var(--font-friendly)',
                    fontSize: '0.82rem', color: 'var(--dusty-rose)', marginBottom: 10,
                  }}>{selected.date}</div>
                )}
                <div style={{
                  fontFamily: 'var(--font-handwritten)',
                  fontSize: 'clamp(0.95rem, 3.5vw, 1.08rem)',
                  color: 'var(--ink-light)', fontStyle: 'italic',
                  background: 'var(--cream)', borderRadius: 8, padding: 'clamp(10px, 2vw, 14px) clamp(12px, 3vw, 18px)',
                }}>
                  "{selected.note}"
                </div>

                {/* Navigation within modal */}
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16 }}>
                  <button
                    className="btn-secondary"
                    onClick={(e) => { e.stopPropagation(); prevMemory(); }}
                    style={{ fontSize: '0.85rem', padding: '8px 16px', minHeight: 36 }}
                  >
                    <ChevronLeft size={14} /> Prev
                  </button>
                  <span style={{
                    fontFamily: 'var(--font-handwritten)', fontSize: '0.9rem',
                    color: 'var(--ink-muted)', alignSelf: 'center',
                  }}>
                    {selectedIdx + 1} / {memories.length}
                  </span>
                  <button
                    className="btn-secondary"
                    onClick={(e) => { e.stopPropagation(); nextMemory(); }}
                    style={{ fontSize: '0.85rem', padding: '8px 16px', minHeight: 36 }}
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
