import { useEffect, useRef } from 'react';
const videoBg = '/video.mp4';

export default function CinematicBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const playVideo = () => {
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          videoEl.muted = true;
          videoEl.play().catch(() => {});
        });
      }
    };

    if (videoEl.readyState >= 2) {
      playVideo();
    } else {
      videoEl.addEventListener('canplay', playVideo, { once: true });
    }

    return () => videoEl.removeEventListener('canplay', playVideo);
  }, []);

  return (
    <div className="cinematic-bg pointer-events-none">
      <video
        ref={videoRef}
        src={videoBg}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="cinematic-bg__video"
      />
      <div className="cinematic-bg__overlay" aria-hidden="true" />
    </div>
  );
}
