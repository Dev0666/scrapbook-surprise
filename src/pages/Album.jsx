import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageNav from '../components/PageNav';
import FloatingHearts from '../components/FloatingHearts';
import PhotoLightbox from '../components/PhotoLightbox';
import { albumPhotos } from '../data/scrapbookData';
import { ImageWithFallback } from '../components/Polaroid';
import { Play, Camera, Film, Sparkles } from 'lucide-react';

const tapeOptions = [
  'repeating-linear-gradient(90deg,#F2D9E3 0,#F2D9E3 8px,#E8C5D4 8px,#E8C5D4 16px)',
  'repeating-linear-gradient(90deg,#F5E4A0 0,#F5E4A0 8px,#EDD880 8px,#EDD880 16px)',
  'repeating-linear-gradient(90deg,#E4D8F5 0,#E4D8F5 8px,#D8CDF0 8px,#D8CDF0 16px)',
  'repeating-linear-gradient(90deg,#D4E8D0 0,#D4E8D0 8px,#C2D9BC 8px,#C2D9BC 16px)',
];

export default function Album() {
  const [filter, setFilter] = useState('all'); // 'all', 'photo', 'video'
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredPhotos = useMemo(() => {
    if (filter === 'all') return albumPhotos;
    return albumPhotos.filter(item => item.type === filter);
  }, [filter]);

  const openInLightbox = (item) => {
    const idx = albumPhotos.findIndex(p => p.id === item.id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const photoCount = albumPhotos.filter(p => p.type === 'photo').length;
  const videoCount = albumPhotos.filter(p => p.type === 'video').length;

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
          <div className="section-eyebrow">🖼️ Page Six</div>
          <h1 className="section-heading">Our Photo & Video Album</h1>
          <p className="section-subheading">
            Every snapshot and moving memory that makes our story so uniquely ours ✨
          </p>
        </motion.div>

        {/* Filter Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 32,
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'btn-primary' : 'btn-secondary'}
            style={{
              padding: '8px 18px',
              fontSize: '0.95rem',
              minHeight: 40,
            }}
          >
            <Sparkles size={15} /> All Moments ({albumPhotos.length})
          </button>
          <button
            onClick={() => setFilter('photo')}
            className={filter === 'photo' ? 'btn-primary' : 'btn-secondary'}
            style={{
              padding: '8px 18px',
              fontSize: '0.95rem',
              minHeight: 40,
            }}
          >
            <Camera size={15} /> Photographs ({photoCount})
          </button>
          <button
            onClick={() => setFilter('video')}
            className={filter === 'video' ? 'btn-primary' : 'btn-secondary'}
            style={{
              padding: '8px 18px',
              fontSize: '0.95rem',
              minHeight: 40,
            }}
          >
            <Film size={15} /> Video Memories ({videoCount})
          </button>
        </motion.div>

        {/* Decorative washi tape row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 32, flexWrap: 'wrap' }}
        >
          {tapeOptions.map((t, i) => (
            <div key={i} style={{ width: 44, height: 13, borderRadius: 2, opacity: 0.8, background: t }} />
          ))}
        </motion.div>

        {/* Album Grid */}
        <motion.div layout className="album-grid">
          <AnimatePresence>
            {filteredPhotos.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                className={`album-card ${item.span === 'wide' ? 'album-card-wide' : 'album-card-standard'}`}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
                onClick={() => openInLightbox(item)}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                {/* Washi tape on select cards */}
                {i % 2 === 0 && (
                  <div style={{
                    position: 'absolute', top: -7, left: '50%',
                    transform: `translateX(-50%) rotate(${i % 4 === 0 ? '-2deg' : '2deg'})`,
                    width: 48, height: 14,
                    background: tapeOptions[i % tapeOptions.length],
                    borderRadius: 2, opacity: 0.88, zIndex: 6,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }} />
                )}

                <div className="album-card-media" style={{ aspectRatio: item.aspectRatio || '3/4' }}>
                  <ImageWithFallback
                    src={item.image}
                    alt={item.caption}
                    loading="eager"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: item.objectPosition || 'center 20%',
                      display: 'block',
                    }}
                  />

                  {/* Video Play Badge */}
                  {item.type === 'video' && (
                    <div className="album-video-badge">
                      <Play size={11} fill="currentColor" />
                      <span>Watch Video</span>
                    </div>
                  )}

                  <div className="album-card-vignette" />
                </div>

                <div className="album-card-footer">
                  {item.category && <span className="album-card-category">{item.category}</span>}
                  <div className="album-card-title">{item.caption}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Page note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center', marginTop: 44,
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(0.95rem, 3vw, 1.15rem)',
            color: 'var(--ink-light)', fontStyle: 'italic', opacity: 0.7,
          }}
        >
          Every single frame and video clip holds a piece of our story ♡
        </motion.div>

        <PageNav currentPath="/album" />
      </div>

      {/* Lightbox with Video & Photo support */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <PhotoLightbox
            photos={albumPhotos}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex(prev => Math.max(0, prev - 1))}
            onNext={() => setLightboxIndex(prev => Math.min(albumPhotos.length - 1, prev + 1))}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
