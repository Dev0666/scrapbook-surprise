import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PageNav from '../components/PageNav';
import FloatingHearts from '../components/FloatingHearts';
import VideoPlayer from '../components/VideoPlayer';
import { timelineEvents } from '../data/scrapbookData';
import { ImageWithFallback } from '../components/Polaroid';

const tapePatterns = [
  'repeating-linear-gradient(90deg,#F2D9E3 0,#F2D9E3 8px,#E8C5D4 8px,#E8C5D4 16px)',
  'repeating-linear-gradient(90deg,#F5E4A0 0,#F5E4A0 8px,#EDD880 8px,#EDD880 16px)',
  'repeating-linear-gradient(90deg,#E4D8F5 0,#E4D8F5 8px,#D8CDF0 8px,#D8CDF0 16px)',
  'repeating-linear-gradient(90deg,#D4E8D0 0,#D4E8D0 8px,#C2D9BC 8px,#C2D9BC 16px)',
];

function TimelineEntry({ event, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const isRight = event.side === 'right';

  return (
    <motion.div
      ref={ref}
      className={`timeline-entry${isRight ? ' right' : ''}`}
      initial={{ opacity: 0, x: isRight ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="timeline-card">
        {/* Pin dot on the line */}
        <motion.div
          className="timeline-pin"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.32, type: 'spring', stiffness: 350 }}
          style={{ [isRight ? 'left' : 'right']: -51 }}
        />

        {/* Tape decoration */}
        <div style={{
          position: 'absolute', top: -9,
          left: isRight ? 'auto' : 18,
          right: isRight ? 18 : 'auto',
          width: 44, height: 15,
          borderRadius: 2, opacity: 0.82,
          background: tapePatterns[index % tapePatterns.length],
        }} />

        <div className="timeline-date">{event.date}</div>
        <h3 className="timeline-title">{event.title}</h3>
        <p className="timeline-desc">{event.description}</p>

        {/* Video or Image presentation */}
        {event.video ? (
          <div style={{
            maxWidth: 260,
            margin: '14px auto 0',
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(92, 61, 56, 0.15)',
          }}>
            <VideoPlayer
              src={event.video}
              poster={event.image}
              caption={event.title}
              aspectRatio="9/16"
              objectPosition={event.objectPosition || 'center top'}
            />
          </div>
        ) : event.image ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              maxWidth: 260,
              margin: '14px auto 0',
              aspectRatio: '3/4',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              background: 'var(--cream)',
              boxShadow: '0 4px 16px rgba(92, 61, 56, 0.12)',
            }}
          >
            <ImageWithFallback
              src={event.image}
              alt={event.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: event.objectPosition || 'center 18%',
                borderRadius: 'var(--radius-sm)',
                display: 'block',
              }}
            />
          </motion.div>
        ) : null}

        {/* Directional arrow */}
        <div style={{
          position: 'absolute', bottom: 12,
          [isRight ? 'right' : 'left']: 14,
          fontFamily: 'var(--font-handwritten)',
          fontSize: 'clamp(1rem, 3vw, 1.3rem)',
          color: 'var(--dusty-rose)', opacity: 0.5,
        }}>
          {isRight ? '→' : '←'}
        </div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
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
          <div className="section-eyebrow">📅 Page Four</div>
          <h1 className="section-heading">Our Story, One Page at a Time</h1>
          <p className="section-subheading">
            Every moment led us here. Scroll to remember… 🌸
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="timeline-container">
          {/* Vertical line */}
          <div className="timeline-line" />

          {timelineEvents.map((event, i) => (
            <TimelineEntry key={event.id} event={event} index={i} />
          ))}

          {/* End marker */}
          <motion.div
            style={{ textAlign: 'center', marginTop: 36, position: 'relative', zIndex: 2 }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div style={{
              display: 'inline-flex', flexDirection: 'column',
              alignItems: 'center', gap: 6,
              background: 'linear-gradient(135deg, var(--blush) 0%, var(--lavender) 100%)',
              borderRadius: '50%',
              width: 'clamp(68px, 16vw, 86px)',
              height: 'clamp(68px, 16vw, 86px)',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(201, 137, 154, 0.35)',
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              border: '3px solid var(--paper)',
            }}>
              💕
            </div>
            <div style={{
              fontFamily: 'var(--font-handwritten)',
              fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
              color: 'var(--ink-light)', marginTop: 14, fontStyle: 'italic',
            }}>
              …to be continued ♡
            </div>
          </motion.div>
        </div>

        <PageNav currentPath="/timeline" />
      </div>
    </div>
  );
}
