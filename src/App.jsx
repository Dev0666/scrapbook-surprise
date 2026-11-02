import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import Memories from './pages/Memories';
import Reasons from './pages/Reasons';
import Timeline from './pages/Timeline';
import Letters from './pages/Letters';
import Album from './pages/Album';
import Surprise from './pages/Surprise';
import './styles/global.css';
import './styles/scrapbook.css';

const pageVariants = {
  initial: { opacity: 0, y: 18, scale: 0.99 },
  in:      { opacity: 1, y: 0,  scale: 1    },
  out:     { opacity: 0, y: -12, scale: 1.005 },
};

const pageTransition = {
  type: 'tween',
  ease: [0.25, 0.46, 0.45, 0.94],
  duration: 0.42,
};

function PageWrapper({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<PageWrapper><Welcome  /></PageWrapper>} />
        <Route path="/memories" element={<PageWrapper><Memories /></PageWrapper>} />
        <Route path="/reasons"  element={<PageWrapper><Reasons  /></PageWrapper>} />
        <Route path="/timeline" element={<PageWrapper><Timeline /></PageWrapper>} />
        <Route path="/letters"  element={<PageWrapper><Letters  /></PageWrapper>} />
        <Route path="/album"    element={<PageWrapper><Album    /></PageWrapper>} />
        <Route path="/surprise" element={<PageWrapper><Surprise /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AnimatedRoutes />
      </main>
    </BrowserRouter>
  );
}
