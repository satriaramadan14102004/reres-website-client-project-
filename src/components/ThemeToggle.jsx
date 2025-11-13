import { useEffect, useMemo, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'preferred-theme';

const resolveInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  const prefersDark = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState(resolveInitialTheme);

  const isDark = theme === 'dark';
  const label = useMemo(() => (isDark ? 'Mode gelap aktif' : 'Mode terang aktif'), [isDark]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [isDark, theme]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY && (event.newValue === 'light' || event.newValue === 'dark')) {
        setTheme(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={label}
      className="pointer-events-auto fixed top-6 right-6 z-50 flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-900 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_30px_70px_-35px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:shadow-[0_24px_60px_-30px_rgba(15,23,42,0.75)]"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/70 text-slate-900 shadow-sm dark:bg-slate-800/90 dark:text-amber-200">
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </span>
      <span className="tracking-[0.25em]">{isDark ? '' : ''}</span>
    </button>
  );
}
