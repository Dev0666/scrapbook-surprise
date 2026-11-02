import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageNav from '../components/PageNav';
import FloatingHearts from '../components/FloatingHearts';
import LetterModal from '../components/LetterModal';
import { openWhenLetters } from '../data/scrapbookData';

const envColors = [
  { bg: '#F2D9E3', border: '#D4A0B5', flap: '#E8C5D4' },
  { bg: '#F5E4A0', border: '#C8A850', flap: '#EDD880' },
  { bg: '#E4D8F5', border: '#9B87C0', flap: '#D8CDF0' },
  { bg: '#D4E8D0', border: '#8BAF7A', flap: '#C2D9BC' },
  { bg: '#FFF0F5', border: '#D4A0B5', flap: '#FFCCE0' },
  { bg: '#FFFBE6', border: '#C8A850', flap: '#FFF0B0' },
];

export default function Letters() {
  const [openLetter, setOpenLetter] = useState(null);
  const [opening, setOpening] = useState(null);

  const handleEnvelopeClick = (letter) => {
    if (opening) return;
    setOpening(letter.id);
    setTimeout(() => {
      setOpening(null);
      setOpenLetter(letter);
    }, 420);
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
          <div className="section-eyebrow">✉️ Page Five</div>
          <h1 className="section-heading">Open When Letters</h1>
          <p className="section-subheading">
            Each envelope holds a little piece of my heart —<br />
            open one when the moment feels right 💌
          </p>
        </motion.div>

        {/* Instruction tag */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <div style={{
            display: 'inline-block',
            background: 'var(--butter)',
            border: '1.5px dashed var(--ink-muted)',
            borderRadius: 8, padding: 'clamp(7px, 2vw, 10px) clamp(16px, 4vw, 24px)',
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(0.9rem, 3vw, 1rem)',
            color: 'var(--ink)', transform: 'rotate(-1deg)',
          }}>
            ✍️ Tap an envelope to open it
          </div>
        </motion.div>

        {/* Envelopes grid */}
        <div className="envelopes-grid">
          {openWhenLetters.map((letter, i) => {
            const colors = envColors[i % envColors.length];
            const isOpening = opening === letter.id;
            const rotation = i % 2 === 0 ? -1.5 : 1.5;

            return (
              <motion.div
                key={letter.id}
                initial={{ opacity: 0, y: 32, rotate: i % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: rotation }}
                viewport={{ once: true, margin: '-30px' }}
                animate={{
                  rotate: isOpening ? [0, -6, 6, -2, 0] : rotation,
                  scale: isOpening ? 0.94 : 1,
                }}
                transition={{
                  opacity: { delay: i * 0.08, duration: 0.5 },
                  y: { delay: i * 0.08, type: 'spring' },
                }}
                whileHover={{ scale: 1.05, rotate: 0, y: -8 }}
                className="envelope-card"
                onClick={() => handleEnvelopeClick(letter)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && handleEnvelopeClick(letter)}
                aria-label={`Open letter: ${letter.label}`}
              >
                {/* Envelope visual */}
                <div className="envelope-visual">
                  <div
                    className="env-body"
                    style={{
                      background: `linear-gradient(145deg, ${colors.bg} 0%, ${colors.bg}CC 100%)`,
                      borderColor: colors.border,
                    }}
                  >
                    {/* Flap */}
                    <div
                      className="env-flap"
                      style={{ background: `linear-gradient(135deg, ${colors.flap} 0%, ${colors.bg} 100%)` }}
                    />
                    {/* Content lines */}
                    <div className="env-lines">
                      <div className="env-line" />
                      <div className="env-line" />
                      <div className="env-line" />
                    </div>
                    {/* Emoji seal */}
                    <div style={{
                      position: 'absolute', bottom: 'clamp(6px, 2vw, 10px)', right: 'clamp(8px, 2vw, 12px)',
                      fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
                    }}>
                      {letter.emoji}
                    </div>
                  </div>
                </div>

                {/* Label */}
                <div className="envelope-label">{letter.label}</div>
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
            textAlign: 'center', marginTop: 52,
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
            color: 'var(--ink-light)', fontStyle: 'italic', opacity: 0.65,
          }}
        >
          Every word was written with you in mind ♡
        </motion.div>

        <PageNav currentPath="/letters" />
      </div>

      {/* Letter modal */}
      <AnimatePresence>
        {openLetter && (
          <LetterModal letter={openLetter} onClose={() => setOpenLetter(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
