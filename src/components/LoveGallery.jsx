import { AnimatePresence, motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import defaultMemoryImage from '../assets/gallery/memory1.jpg';

const rasterGalleryModules = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,JPG,JPEG,PNG}', {
  eager: true,
  import: 'default',
});

const canonicalizeKey = (value = '') =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/(\d+)/g, (segment) => String(Number(segment)));

const galleryAssetLookup = Object.entries(rasterGalleryModules).reduce((accumulator, [path, source]) => {
  const fileName = path.split('/').pop() ?? '';
  const baseName = fileName.replace(/\.[^/.]+$/, '');
  const lowerBaseName = baseName.toLowerCase();
  const canonicalBaseName = canonicalizeKey(baseName);

  accumulator[lowerBaseName] = source;
  accumulator[canonicalBaseName] = source;

  return accumulator;
}, {});

const fallbackImage = defaultMemoryImage;

const resolveAsset = (key) => {
  if (!key) {
    return fallbackImage;
  }

  const directKey = key.toLowerCase();
  const canonicalKey = canonicalizeKey(key);
  const asset = galleryAssetLookup[directKey] ?? galleryAssetLookup[canonicalKey];

  if (!asset) {
    if (import.meta?.env?.DEV) {
      console.warn(`LoveGallery: asset for "${key}" was not found in src/assets/gallery.`);
    }
    return fallbackImage;
  }

  return asset;
};

const basePhotoLibrary = [
  {
    id: '01',
    assetKey: 'memory1',
    title: 'Pulang sekolah',
    description:
      'Masa putih abu',
    tone: 'from-rose-400/45 via-transparent to-transparent',
    meta: ['Rumah athaya'],
  },
  {
    id: '02',
    assetKey: 'memory2',
    title: 'Kamu dan malam dikala itu',
    description: 'hei apa kabar? gimana bandung? hold you like the way i do? seperti biasa, i miss you so much, i miss u maaf belum bisa lupain kamu dan maaf masih suka ngasih signal',
    tone: 'from-sky-400/45 via-transparent to-transparent',
    meta: ['Our home','Taman heulang'],
  },
  {
    id: '03',
    assetKey: 'memory3',
    title: '',
    description: '',
    tone: 'from-amber-200/35 via-transparent to-transparent',
    meta: [''],
  },
  {
    id: '04',
    assetKey: 'memory4',
    title: 'Hahaha I miss you gitarisku paling manis',
    description: 'Demi allah gua kangen gitaran dan nyanyi bareng lu anjing',
    tone: 'from-emerald-300/40 via-transparent to-transparent',
    meta: ['Taman Heulang'],
  },
  {
    id: '05',
    assetKey: 'memory5',
    title: '',
    description: '',
    tone: 'from-violet-300/35 via-transparent to-transparent',
    meta: [''],
  },
  {
    id: '06',
    assetKey: 'memory6',
    title: '',
    description: '',
    tone: 'from-fuchsia-300/35 via-transparent to-transparent',
    meta: [''],
  },
  {
    id: '07',
    assetKey: 'memory7',
    title: 'Taheul lost us, and i lost you',
    description: 'Cinta yang ku titipkan di ujung doa mungkin tidak pernah sampai kepadamu. tapi setiap kali ku ingat, rasa itu tetap hangat, meski tak punya lagi arahnya untuk pulang, Namun sialnya aku selalu mau pulang ketempat yang ada kamu, yang cuman ada kita berdua di dalamnya.',
    tone: 'from-fuchsia-300/35 via-transparent to-transparent',
    meta: ['Taman heulang lagi :v'],
  },
  {
    id: '08',
    assetKey: 'memory8',
    title: 'Thuesday, 04 Nov 2025',
    description: 'Ini tepat 3 bulan 12 hari after we lost...kamu dibandung, aku dibogor, tapi dijalan aku selalu cari cari kamu :(',
    tone: 'from-fuchsia-300/35 via-transparent to-transparent',
    meta: ['Rumah athaya lagi'],
  },
  {
    id: '09',
    assetKey: 'memory9',
    title: '',
    description: 'terimakasih untuk ragamu yang pernah jatuh cinta padaku, untuk mata yang dulu menatapku seolah aku satu satunya tempat pulang, terimakasih untuk waktu, untuk setiap “hati hati dijalan” “jangan pegang hp kalau lagi bawa motor” walaupun harusnya kamu tau aku sejago itu hahaha, untuk perhatian kecil lainnya yang sekarang hanya jadi kenangan samar.',
    tone: 'from-fuchsia-300/35 via-transparent to-transparent',
    meta: ['Bogor'],
  },
  {
    id: '10',
    assetKey: 'memory10',
    title: '',
    description: 'Terimakasih karna pernah bikin dunia ku terasa ringan akan hadir nya kamu dihari hari ku, kalau surat kecil super alay ini udah sampe ke kamu itu tandanya aku benar benar melepasmu .. karna aku percaya kamu pantas mendapatkan cinta sejatimu juga. you were a soft chapter, the kinda pain that still feels warm .. after all the pain, temuin cinta kamu ya? semoga ga sesakit waktu sama aku kemarin ❤‍🩹 maafin kalo waktu sama aku kemarin ga sebahagia yang kamu harapkan, tapi andai kamu tau, aku udah ngasih semua dunia aku ke kamu, bahkan aku lebih sayang kamu dari pada diri aku sendiri. aku bakal nyimpen kamu di tempat yang terbaik, sangat baik, yang paling baik. untuk kenangan kita dan semua kebaikan kamu, God knows i love you so much poy 💕  bahagia selalu sipitku , nama kamu bakal selalu aku selipin di setiap doa yang aku panjatkan, b happy n b healthy, sukses selalu yaaa 🤜🏻⿢⿣🤛🏻kisah ini bakal abadi di hidup aku. salam hangat dari aku yeyes, princess nya kamu ☹🤍',
    tone: 'from-fuchsia-300/35 via-transparent to-transparent',
    meta: ['Bogor'],
  },
];

const photoLibrary = basePhotoLibrary.map(({ assetKey, ...memory }) => ({
  ...memory,
  src: resolveAsset(assetKey),
}));


function ZigZagMemory({ memory, index }) {
  const containerRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  });

  const alignRight = index % 2 === 1;
  const alignmentClass = alignRight
    ? 'lg:ml-auto lg:flex-row-reverse lg:items-center lg:gap-12 lg:text-right'
    : 'lg:mr-auto lg:flex-row lg:items-center lg:gap-12';
  const badgeAlignment = alignRight ? 'right-6' : 'left-6';
  const pinAlignment = alignRight ? '-left-9' : '-right-9';
  const textAlignment = alignRight ? 'lg:items-end' : '';
  const metaJustify = alignRight ? 'justify-end' : '';

  const cardFloat = useTransform(smoothProgress, [0, 1], [60, -60]);
  const cardOpacity = useTransform(smoothProgress, [0, 0.12, 0.85, 1], [0, 1, 1, 0.9]);
  const auraOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.25, 0.6, 0.4]);
  const imageDrift = useTransform(smoothProgress, [0, 1], [80, -80]);
  const imageTilt = useTransform(smoothProgress, [0, 0.5, 1], [alignRight ? 5 : -5, 0, alignRight ? -3 : 3]);
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1.08, 1, 1.03]);
  const textOffset = useTransform(smoothProgress, [0, 1], [40, -30]);
  const metaOffset = useTransform(smoothProgress, [0, 1], [20, -15]);

  return (
    <motion.article
      ref={containerRef}
      className={`group relative isolate flex flex-col gap-8 overflow-hidden rounded-[2.75rem] border border-slate-900/10 bg-white/70 p-6 text-slate-900 shadow-[0_45px_120px_-55px_rgba(15,23,42,0.45)] backdrop-blur-xl transition-colors duration-500 sm:p-8 lg:max-w-[min(560px,calc(50vw-2.5rem))] ${alignmentClass} dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-100 dark:shadow-[0_45px_120px_-45px_rgba(15,23,42,0.85)]`}
      style={{ y: cardFloat, opacity: cardOpacity }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent dark:from-white/[0.08]"
        style={{ opacity: auraOpacity }}
      />

      <span
        className={`pointer-events-none absolute top-10 hidden h-4 w-4 rounded-full border border-slate-900/20 bg-emerald-300/40 shadow-[0_0_40px_rgba(94,234,212,0.45)] transition-colors duration-500 lg:block ${pinAlignment} dark:border-white/30 dark:bg-emerald-200/20`}
      />

      <motion.button
        type="button"
        onClick={() => setIsZoomed((value) => !value)}
        className="relative overflow-hidden rounded-[2.25rem] border border-slate-900/10 bg-slate-900/10 text-left transition-colors duration-500 lg:flex-1 dark:border-white/10 dark:bg-slate-950/50"
        whileTap={{ scale: 0.98 }}
        aria-pressed={isZoomed}
        aria-label={isZoomed ? `Tutup tampilan penuh ${memory.title}` : `Perbesar foto ${memory.title}`}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent dark:from-slate-950/80"
          style={{ opacity: auraOpacity }}
        />
        <motion.img
          src={memory.src}
          alt={memory.title}
          className="h-[300px] w-full object-cover sm:h-[340px]"
          style={{ y: imageDrift, rotate: imageTilt, scale: imageScale }}
          loading="lazy"
        />
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${memory.tone}`} />
        <motion.span
          className={`absolute top-6 flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-5 py-1 text-[11px] uppercase tracking-[0.35em] text-slate-700/80 transition-colors duration-500 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100/80 ${badgeAlignment}`}
          style={{ y: metaOffset }}
        >
          Album {memory.id}
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isZoomed ? (
          <motion.button
            key="zoom-overlay"
            type="button"
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 flex w-full items-center justify-center bg-slate-900/80 p-6 text-slate-100 backdrop-blur dark:bg-slate-950/85"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label={`Tutup tampilan penuh ${memory.title}`}
          >
            <motion.img
              src={memory.src}
              alt={memory.title}
              className="h-auto max-h-[min(90vh,700px)] w-full max-w-3xl rounded-[2.25rem] border border-slate-900/15 object-contain shadow-[0_45px_140px_-55px_rgba(15,23,42,0.65)] dark:border-white/15 dark:shadow-[0_45px_140px_-45px_rgba(15,23,42,0.95)]"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              loading="lazy"
            />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <motion.div
        className={`relative flex flex-1 flex-col gap-5 ${textAlignment}`}
        style={{ y: textOffset }}
      >
        <span className="text-xs uppercase tracking-[0.35em] text-slate-500/80 dark:text-slate-300/70">{memory.title}</span>
        <motion.p className="text-base leading-relaxed text-slate-600 dark:text-slate-200/90">{memory.description}</motion.p>

        <motion.div
          className={`flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.32em] text-slate-500/80 dark:text-slate-200/80 ${metaJustify}`}
          style={{ y: metaOffset }}
        >
          {memory.meta.map((chip) => (
            <span
              key={`${memory.id}-${chip}`}
              className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 transition-colors duration-500 dark:border-white/10 dark:bg-white/5"
            >
              {chip}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

export default function LoveGallery() {
  return (
    <section className="relative">
      <motion.div
        className="mb-16 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500/90 dark:text-slate-400/90">Perpustakaan visual</p>
        <h2 className="section-heading mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">
          This is how our memories replay in my head
        </h2>
        {/* <p className="mt-3 max-w-2xl text-sm text-slate-300/90">
          Arsip zigzag ini dibuat supaya setiap foto punya ruang untuk bernapas—animasi lembut mengantar kamu melompat
          dari satu kenangan ke kenangan berikutnya.
        </p> */}
      </motion.div>

      <div className="relative">
        <span className="pointer-events-none absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-slate-900/20 to-transparent sm:left-1/2 sm:-translate-x-1/2 dark:via-white/10" />

        <div className="flex flex-col gap-16">
          {photoLibrary.map((memory, index) => (
            <ZigZagMemory key={memory.id} memory={memory} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
