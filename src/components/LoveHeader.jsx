import { motion } from 'framer-motion';

export default function LoveHeader() {
  return (
    <motion.section
      className="relative overflow-hidden rounded-[3rem] border border-slate-900/10 bg-gradient-to-br from-white/85 to-white/60 px-6 py-20 text-center shadow-[0_40px_120px_-50px_rgba(59,130,246,0.35)] transition-colors duration-500 sm:px-16 dark:border-white/10 dark:from-white/[0.06] dark:to-white/[0.02] dark:shadow-[0_40px_120px_-40px_rgba(244,114,182,0.45)]"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <div className="glow-ring" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.18),transparent_58%)]" />

      {/* <motion.p
        className="mb-6 text-xs uppercase tracking-[0.5em] text-rose-200/80"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Bab sinematik perjalanan kisah kita
      </motion.p> */}

      <motion.h1
        className="mx-auto max-w-3xl text-balance text-4xl font-semibold text-slate-900 drop-shadow-2xl sm:text-6xl section-heading dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.25 }}
      >
        Menyulam Kenangan, Menyatu Dalam Lantunan <span className="text-rose-500 dark:text-rose-300">"Akhir Perang"</span>
      </motion.h1>

      <motion.p
        className="mx-auto mt-8 max-w-2xl text-balance text-lg text-slate-600 dark:text-slate-200/90"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Setiap scroll adalah adegan baru—mengajak kita menyelami kembali detik-detik yang membuat hati kita bersatu, diiringi melodi
        hangat dari Nadin Amizah yang memeluk seluruh cerita kita.
      </motion.p>

      <motion.div
        className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <div className="glass-panel relative flex w-full max-w-xs items-center justify-between rounded-full px-5 py-3 text-sm text-slate-900/90 dark:text-slate-100/90">
          <span className="font-medium uppercase tracking-[0.35em] text-rose-500/80 dark:text-rose-200/80">Scroll</span>
          <motion.span
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-400/70 to-sky-400/70 text-xl"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </div>

        <div className="glass-panel relative flex w-full max-w-xs items-center justify-between rounded-3xl px-6 py-3 text-left text-slate-900 dark:text-slate-100">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">Soundtrack</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Akhir Perang</p>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-300">Nadin Amizah</span>
        </div>
      </motion.div>
    </motion.section>
  );
}
