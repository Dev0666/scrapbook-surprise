import React, { useEffect, useRef } from 'react';

const HEARTS = ['💕', '♡', '🌸', '✨', '💖', '⭐', '🌷'];

export default function FloatingHearts() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = containerRef.current;
    if (!container) return;

    let id;
    const spawn = () => {
      const el = document.createElement('div');
      el.className = 'floating-heart';
      el.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];

      const left = 3 + Math.random() * 94;
      const duration = 7 + Math.random() * 9;
      const delay = Math.random() * 3;
      const size = 10 + Math.random() * 14;

      el.style.cssText = `
        left: ${left}%;
        bottom: -30px;
        font-size: ${size}px;
        animation: floatUp ${duration}s ${delay}s linear both;
      `;
      container.appendChild(el);

      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, (duration + delay + 0.5) * 1000);
    };

    // Initial burst
    for (let i = 0; i < 4; i++) {
      setTimeout(spawn, i * 400);
    }
    id = setInterval(spawn, 2800);

    return () => clearInterval(id);
  }, []);

  return <div ref={containerRef} className="floating-hearts" aria-hidden="true" />;
}
