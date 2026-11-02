import React, { useState } from 'react';
import { Camera, Play } from 'lucide-react';
import { photoFocus } from '../data/scrapbookData';

export function ImageWithFallback({ src, alt, className, style, loading = 'eager' }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="img-placeholder" style={style}>
        <Camera size={28} style={{ opacity: 0.45 }} />
        <span>{alt || 'Photo coming soon'}</span>
        <span style={{ fontSize: '0.72rem', opacity: 0.6 }}>Add your photo here</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      decoding="auto"
      onError={() => setErrored(true)}
    />
  );
}

const tapeColors = {
  pink:     'tape-pink',
  yellow:   'tape-yellow',
  lavender: 'tape-lavender',
  sage:     'tape-sage',
};

export default function Polaroid({
  image,
  caption,
  date,
  rotation = 0,
  tape = 'pink',
  video = null,
  objectPosition = null,
  aspectRatio = '3/4',
  onClick,
}) {
  const focalPos = objectPosition || photoFocus[image] || 'center 20%';

  return (
    <div
      className="polaroid-wrap"
      style={{ transform: `rotate(${rotation}deg)`, cursor: 'pointer' }}
      onClick={onClick}
    >
      {/* Washi tape strip */}
      <div className={`tape-strip tape ${tapeColors[tape] || 'tape-pink'}`} />

      <div className="polaroid">
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: aspectRatio,
          width: '100%',
          borderRadius: 2,
          background: '#FDFBF7',
        }}>
          <ImageWithFallback
            src={image}
            alt={caption}
            loading="eager"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: focalPos,
              display: 'block',
            }}
          />

          {/* Video indicator badge if this memory has an attached video */}
          {video && (
            <div style={{
              position: 'absolute', bottom: 8, right: 8,
              background: 'rgba(50, 31, 27, 0.76)',
              backdropFilter: 'blur(4px)',
              color: 'white',
              fontSize: '0.7rem',
              padding: '3px 8px',
              borderRadius: 14,
              display: 'flex', alignItems: 'center', gap: 4,
              fontFamily: 'var(--font-friendly)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
              zIndex: 2,
            }}>
              <Play size={10} fill="currentColor" />
              <span>Video</span>
            </div>
          )}
        </div>

        <div className="polaroid-caption">{caption}</div>
        {date && (
          <div style={{
            fontFamily: 'var(--font-friendly)',
            fontSize: '0.72rem',
            color: 'var(--ink-muted)',
            textAlign: 'center',
            marginTop: 2,
          }}>
            {date}
          </div>
        )}
      </div>
    </div>
  );
}
