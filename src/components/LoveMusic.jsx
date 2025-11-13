import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Disc3, Music } from 'lucide-react';
import soundtrack from '../assets/music.mp3';

export default function LoveMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const lyricAlignedRef = useRef(false);
  const lyricTimestamp = 75.2; // detik menuju lirik "kan kubisikan asal kau tahu ..."

  const alignToLyricMoment = (force = false) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
      return;
    }

    if (!force && lyricAlignedRef.current) {
      return;
    }

    const safeTimestamp = Math.min(lyricTimestamp, audio.duration);
    audio.currentTime = safeTimestamp;
    lyricAlignedRef.current = true;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.7;
    audio.loop = true;

    const handleMetadata = () => {
      alignToLyricMoment(true);
    };

    const handleTimeUpdate = () => {
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
      if (audio.currentTime < lyricTimestamp - 0.25) {
        lyricAlignedRef.current = false;
        alignToLyricMoment(true);
      }
    };

    if (audio.readyState >= 1) {
      alignToLyricMoment(true);
    } else {
      audio.addEventListener('loadedmetadata', handleMetadata, { once: true });
    }

    audio.addEventListener('timeupdate', handleTimeUpdate);

    const attemptAutoplay = async () => {
      try {
        alignToLyricMoment();
        await audio.play();
        setAutoplayFailed(false);
      } catch (error) {
        setAutoplayFailed(true);
      }
    };

    attemptAutoplay();

    const syncState = () => setIsPlaying(!audio.paused);
    audio.addEventListener('play', syncState);
    audio.addEventListener('pause', syncState);

    return () => {
      audio.removeEventListener('play', syncState);
      audio.removeEventListener('pause', syncState);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleMetadata);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        alignToLyricMoment();
        await audio.play();
        setAutoplayFailed(false);
      } catch (error) {
        setAutoplayFailed(true);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 w-[clamp(260px,28vw,340px)] overflow-hidden rounded-3xl border border-slate-900/10 bg-white/80 text-slate-900 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.55)] backdrop-blur-3xl transition-colors duration-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-100 dark:shadow-[0_30px_60px_-45px_rgba(15,23,42,0.85)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      <div className="relative flex flex-col gap-4 px-6 py-4 text-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 via-transparent to-sky-400/15 dark:from-rose-400/15" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 text-rose-500 shadow-sm dark:bg-white/10">
            <Disc3 className="h-6 w-6 text-current" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose-500/80 dark:text-rose-200/80">Soundtrack</p>
            <p className="text-base font-semibold text-slate-900 dark:text-slate-100">Hati Hati Di Jalan</p>
            <p className="text-xs text-slate-500/90 dark:text-slate-300/90">Tulus</p>
          </div>
        </div>

        <motion.div
          className="relative flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-600/80 dark:text-slate-300/80"
          animate={{ opacity: isPlaying ? 1 : 0.7 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4 text-rose-500 dark:text-rose-200" />
            <span>{isPlaying ? 'Sedang mengalun' : 'Siap diputar'}</span>
          </div>
          <motion.span
            className="flex h-8 w-16 items-center justify-around"
            animate={{ opacity: isPlaying ? [0.3, 1, 0.3] : 0.4, scale: isPlaying ? [1, 1.1, 1] : 1 }}
            transition={{ repeat: isPlaying ? Infinity : 0, duration: 1.8 }}
          >
            {[...Array(3)].map((_, index) => (
              <span
                key={index}
                className="h-4 w-[3px] rounded-full bg-gradient-to-t from-rose-300 via-sky-300 to-emerald-200"
                style={{ animationDelay: `${index * 0.2}s`, animation: isPlaying ? 'bounce 1.6s ease-in-out infinite' : 'none' }}
              />
            ))}
          </motion.span>
        </motion.div>

        {autoplayFailed && (
          <motion.p
            className="relative rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-xs leading-relaxed text-slate-700 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200/90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Browser-mu membutuhkan sentuhan kecil untuk memulai musik. Ketuk tombol di bawah agar soundtrack segera
            mengalun.
          </motion.p>
        )}

        <motion.button
          type="button"
          onClick={togglePlayback}
          className="relative flex items-center justify-center rounded-2xl bg-gradient-to-r from-rose-400 to-sky-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-900 shadow-[0_15px_35px_-20px_rgba(244,114,182,0.8)] dark:text-slate-950"
          whileTap={{ scale: 0.97 }}
        >
          {isPlaying ? 'Jeda sejenak' : 'Putar lagu'}
        </motion.button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: scaleY(0.6); opacity: 0.5; }
          50% { transform: scaleY(1.4); opacity: 1; }
        }
      `}</style>

      <audio ref={audioRef} src={soundtrack} preload="auto" autoPlay />
    </motion.div>
  );
}
