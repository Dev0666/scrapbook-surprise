import React, { useEffect, useRef } from 'react';

const CONFETTI_COLORS = [
  '#F2D9E3', '#F5E4A0', '#E4D8F5', '#D4E8D0',
  '#C9899A', '#FFB3C6', '#FFDDA1', '#C3B1E1',
  '#B5D5C5', '#FF9AA2', '#C9A84C', '#FFEAA7',
];

function rand(a, b) { return a + Math.random() * (b - a); }

export default function Confetti({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = containerRef.current;
    container.innerHTML = '';

    const pieces = 100;
    for (let i = 0; i < pieces; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      const left = rand(3, 97);
      const delay = rand(0, 2.2);
      const duration = rand(2.8, 5.5);
      const size = rand(7, 15);
      const isCircle = Math.random() > 0.55;

      el.style.cssText = `
        left: ${left}%;
        top: -20px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${isCircle ? '50%' : '2px'};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        animation-name: confettiFall;
        animation-fill-mode: both;
        animation-timing-function: linear;
      `;
      container.appendChild(el);
    }

    // Emoji shower
    const emojis = ['💖', '💕', '✨', '🌸', '⭐', '💛', '🌷', '🎀'];
    for (let i = 0; i < 22; i++) {
      const el = document.createElement('div');
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.cssText = `
        position: absolute;
        left: ${rand(3, 97)}%;
        top: -30px;
        font-size: ${rand(14, 30)}px;
        animation: confettiFall ${rand(3, 6)}s ${rand(0, 2.5)}s linear both;
      `;
      container.appendChild(el);
    }
  }, [active]);

  return <div ref={containerRef} className="confetti-container" aria-hidden="true" />;
}
