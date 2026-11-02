import React, { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './Polaroid';
import VideoPlayer from './VideoPlayer';

export default function PhotoLightbox({ photos, currentIndex, onClose, onPrev, onNext }) {
  const [direction, setDirection] = useState(0);

  const handleKey = useCallback(e => {
    if (e.key === 'Escape')     onClose();
    if (e.key === 'ArrowLeft')  { setDirection(-1); onPrev(); }
    if (e.key === 'ArrowRight') { setDirection(1);  onNext(); }
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  if (currentIndex === null || !photos[currentIndex]) return null;
  const photo = photos[currentIndex];

  const variants = {
    enter: d => ({ x: d > 0 ? '8%' : '-8%', opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:   d => ({ x: d > 0 ? '-8%' : '8%', opacity: 0, scale: 0.97 }),
  };

  const goNext = () => { setDirection(1); onNext(); };
  const goPrev = () => { setDirection(-1); onPrev(); };

  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
          <X size={18} />
        </button>

        {/* Media with transition */}
        <div className="lightbox-img-wrap" style={{ width: '100%', maxWidth: 'min(88vw, 860px)' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {photo.video ? (
                <div style={{
                  maxWidth: 'min(85vw, 360px)',
                  margin: '0 auto',
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
                }}>
                  <VideoPlayer
                    src={photo.video}
                    poster={photo.image}
                    caption={photo.caption}
                    aspectRatio="9/16"
                    objectPosition="center top"
                    autoplay={false}
                  />
                </div>
              ) : (
                <ImageWithFallback
                  src={photo.image}
                  alt={photo.caption}
                  loading="eager"
                  style={{
                    maxWidth: 'min(88vw, 760px)',
                    maxHeight: 'clamp(280px, 75vh, 720px)',
                    objectFit: 'contain',
                    borderRadius: 8,
                    boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          {currentIndex > 0 && (
            <button className="lightbox-nav prev" onClick={goPrev} aria-label="Previous photo">
              <ChevronLeft size={22} />
            </button>
          )}
          {currentIndex < photos.length - 1 && (
            <button className="lightbox-nav next" onClick={goNext} aria-label="Next photo">
              <ChevronRight size={22} />
            </button>
          )}
        </div>

        {/* Caption */}
        <div className="lightbox-caption">{photo.caption}</div>
        <div className="lightbox-counter">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>
    </motion.div>
  );
}
