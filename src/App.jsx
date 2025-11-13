import React from 'react';
import { motion, useScroll } from 'framer-motion';
import LoveHeader from './components/LoveHeader';
import LoveCounter from './components/LoveCounter';
import LoveGallery from './components/LoveGallery';
import LoveMusic from './components/LoveMusic';
import CinematicBackground from './components/CinematicBackground';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="relative z-0 min-h-screen overflow-hidden bg-transparent text-slate-900 transition-colors duration-500 dark:text-slate-100">
      <CinematicBackground />
      <ThemeToggle />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-slate-200/60 mix-blend-soft-light backdrop-blur-[1.5px] dark:bg-slate-900/25"
        aria-hidden="true"
      />
      <motion.div
        className="fixed top-0 left-0 right-0 z-40 h-1 origin-left bg-gradient-to-r from-rose-400 via-emerald-300/70 to-sky-400/80"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.18),transparent_55%),_radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),transparent_60%)] mix-blend-soft-light dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),transparent_55%),_radial-gradient(circle_at_bottom,_rgba(190,227,248,0.16),transparent_60%)]" />
      <div className="pulse-beam pointer-events-none" />
      <div className="cinematic-noise" />

      <LoveMusic />

      <main className="relative z-30 mx-auto flex w-full max-w-6xl flex-col gap-32 px-6 pb-32 pt-24 sm:px-10">
        <LoveHeader />
        <LoveCounter />
        <LoveGallery />
      </main>

      {/* <footer className="relative z-30 py-16 text-center text-sm text-slate-300/80">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-full border border-white/5 bg-white/5 px-6 py-4 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Sebuah memoar cinta sinematik</p>
          <p className="max-w-2xl text-balance text-sm text-slate-200/90">
            Dibuat dengan penuh rasa syukur untuk setiap momen kecil yang membuat kita jatuh cinta berkali-kali.
          </p>
        </div>
      </footer> */}
    </div>
  );
}
