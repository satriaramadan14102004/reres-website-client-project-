import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

const MEETING_DATE = new Date('2024-24-07T00:00:00+07:00');

const format = (value, digits = 2) => value.toString().padStart(digits, '0');

export default function LoveCounter() {
  const [elapsed, setElapsed] = useState({ days: '000', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const updateElapsed = () => {
      const diff = Date.now() - MEETING_DATE.getTime();
      const totalSeconds = Math.max(Math.floor(diff / 1000), 0);
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setElapsed({
        days: format(days, 3),
        hours: format(hours),
        minutes: format(minutes),
        seconds: format(seconds),
      });
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { label: 'Hari', value: elapsed.days },
    { label: 'Jam', value: elapsed.hours },
    { label: 'Menit', value: elapsed.minutes },
    { label: 'Detik', value: elapsed.seconds },
  ];

  return (
    <motion.section
      className="relative"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className="glass-panel relative overflow-hidden rounded-[2.5rem] px-8 py-12 text-slate-900 shadow-[0_30px_80px_-45px_rgba(37,99,235,0.35)] transition-colors duration-500 dark:text-slate-100 dark:shadow-[0_30px_80px_-40px_rgba(14,165,233,0.45)]">
        <div className="absolute -left-24 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full bg-rose-400/30 blur-3xl sm:block" />
        <div className="absolute -right-28 -top-16 hidden h-52 w-52 rounded-full bg-sky-400/20 blur-3xl sm:block" />

        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 text-rose-500/80 dark:text-rose-200/90">
              <Calendar className="h-6 w-6" />
              <p className="text-sm uppercase tracking-[0.4em]">Sejak 24 Juli 2024</p>
            </div>
            <h2 className="section-heading text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">
              The Day That I Lose You
            </h2>
            {/* <p className="max-w-xl text-sm text-slate-300/90">
              Setiap detik membawa cerita baru.
            </p> */}
          </div>

          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="group relative overflow-hidden rounded-[1.75rem] border border-slate-900/10 bg-white/70 px-6 py-7 text-center backdrop-blur-xl transition-colors duration-500 dark:border-white/5 dark:bg-white/5"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.7 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <motion.span
                  className="text-4xl font-bold text-rose-500 drop-shadow-[0_8px_24px_rgba(244,114,182,0.35)] dark:text-rose-100"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.3 }}
                >
                  {metric.value}
                </motion.span>
                <p className="mt-3 text-xs uppercase tracking-[0.35em] text-slate-500/80 dark:text-slate-300/80">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-500/90 dark:text-slate-400/90">
            <Clock className="h-4 w-4" />
            <p>See you and i'll ready missing you</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
