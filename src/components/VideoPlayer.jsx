import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from './Polaroid';

/**
 * VideoPlayer — A premium, mobile-first cinematic video component.
 * Features:
 * - Local MP4 and WebM files support
 * - Video URLs through configurable data
 * - Poster images before playback with graceful fallback
 * - Touch-friendly minimum 44px hit-targets
 * - Muted autoplay option (respecting prefers-reduced-motion & data-saver)
 * - Play/pause overlay and controls bar
 * - Fullscreen toggle
 * - Clean error handling: falls back to photograph poster without breaking layout
 */
export default function VideoPlayer({
  src,
  poster,
  caption,
  loop = false,
  autoplay = false,
  muted = true,
  style = {},
  className = '',
  aspectRatio = '9/16',
  objectFit = 'cover',
  objectPosition = 'center top',
  onPlayStateChange,
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const hideControlsTimer = useRef(null);

  // Check user preferences
  const prefersReduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = typeof navigator !== 'undefined'
    && navigator.connection && navigator.connection.saveData;

  const shouldAutoplay = autoplay && !prefersReduced && !saveData;

  useEffect(() => {
    if (shouldAutoplay && videoRef.current && !hasError) {
      videoRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [shouldAutoplay, hasError]);

  const triggerControls = () => {
    setShowControls(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => {
      setShowControls(false);
    }, 2800);
  };

  const togglePlay = useCallback((e) => {
    if (e) e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play()
        .then(() => {
          setPlaying(true);
          if (onPlayStateChange) onPlayStateChange(true);
          triggerControls();
        })
        .catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
      if (onPlayStateChange) onPlayStateChange(false);
      setShowControls(true);
    }
  }, [onPlayStateChange]);

  const toggleMute = useCallback((e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    triggerControls();
  }, []);

  const handleFullscreen = useCallback((e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) {
      v.requestFullscreen();
    } else if (v.webkitEnterFullscreen) {
      // Mobile Safari / iOS
      v.webkitEnterFullscreen();
    }
  }, []);

  const handleEnded = useCallback(() => {
    setPlaying(false);
    if (!loop && videoRef.current) videoRef.current.currentTime = 0;
    if (onPlayStateChange) onPlayStateChange(false);
  }, [loop, onPlayStateChange]);

  // Graceful fallback to photo poster if no video source or on load error
  if (!src || hasError) {
    return (
      <div
        className={`video-card ${className}`}
        style={{ aspectRatio, position: 'relative', overflow: 'hidden', ...style }}
      >
        {poster ? (
          <ImageWithFallback
            src={poster}
            alt={caption || 'Video preview'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: objectFit || 'cover',
              objectPosition: objectPosition || 'center top',
            }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--blush) 0%, var(--lavender) 100%)',
            gap: 8, color: 'var(--ink-light)',
            fontFamily: 'var(--font-friendly)',
            fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
            textAlign: 'center', padding: 16,
          }}>
            <AlertCircle size={24} style={{ opacity: 0.6 }} />
            <span>Video Memory</span>
            <span style={{ fontSize: '0.72rem', opacity: 0.7 }}>Add your video to public/videos/</span>
          </div>
        )}

        {hasError && (
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(50, 31, 27, 0.75)',
            color: 'white', fontSize: '0.7rem',
            padding: '3px 8px', borderRadius: 12,
            fontFamily: 'var(--font-friendly)',
            backdropFilter: 'blur(4px)',
          }}>
            Showing Photo Fallback
          </div>
        )}

        {caption && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '18px 12px 8px',
            background: 'linear-gradient(to top, rgba(20,10,8,0.7) 0%, transparent 100%)',
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(0.85rem, 3vw, 0.95rem)',
            color: 'white',
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}>
            {caption}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`video-card ${className}`}
      style={{ aspectRatio, position: 'relative', cursor: 'pointer', ...style }}
      onClick={togglePlay}
      onMouseMove={triggerControls}
      onTouchStart={triggerControls}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        muted={isMuted}
        playsInline
        preload="metadata"
        onError={() => setHasError(true)}
        onEnded={handleEnded}
        style={{
          width: '100%',
          height: '100%',
          objectFit: objectFit || 'cover',
          objectPosition: objectPosition || 'center top',
          display: 'block',
          background: '#1a0f0d',
        }}
      />

      {/* Play button overlay (when paused) */}
      {!playing && (
        <div className="video-overlay">
          <button
            className="video-play-btn"
            aria-label="Play video"
            onClick={togglePlay}
          >
            <Play size={22} fill="currentColor" style={{ marginLeft: 2 }} />
          </button>
        </div>
      )}

      {/* Floating Controls Bar (shown when playing + interacted) */}
      {playing && (
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '10px 14px',
            background: 'linear-gradient(to top, rgba(20,10,8,0.75) 0%, transparent 100%)',
            display: 'flex', gap: 10, alignItems: 'center',
            justifyContent: 'flex-end',
            opacity: showControls ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: showControls ? 'auto' : 'none',
          }}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={togglePlay}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none', cursor: 'pointer', color: 'white',
              width: 36, height: 36, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}
            aria-label="Pause"
          >
            <Pause size={16} />
          </button>
          <button
            onClick={toggleMute}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none', cursor: 'pointer', color: 'white',
              width: 36, height: 36, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button
            onClick={handleFullscreen}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none', cursor: 'pointer', color: 'white',
              width: 36, height: 36, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}
            aria-label="Fullscreen"
          >
            <Maximize size={15} />
          </button>
        </div>
      )}

      {/* Video Caption & badge */}
      <div style={{
        position: 'absolute', top: 10, left: 10,
        background: 'rgba(30, 18, 15, 0.65)',
        backdropFilter: 'blur(6px)',
        color: 'white',
        fontSize: '0.72rem',
        padding: '3px 8px',
        borderRadius: 'var(--radius-full)',
        display: 'flex', alignItems: 'center', gap: 4,
        fontFamily: 'var(--font-friendly)',
        pointerEvents: 'none',
      }}>
        <span>▶ Video</span>
      </div>

      {caption && !playing && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '24px 12px 8px',
          background: 'linear-gradient(to top, rgba(20,10,8,0.7) 0%, transparent 100%)',
          fontFamily: 'var(--font-handwritten)',
          fontSize: 'clamp(0.85rem, 3vw, 0.95rem)',
          color: 'white',
          textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
        }}>
          {caption}
        </div>
      )}
    </div>
  );
}
