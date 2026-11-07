import { useEffect, useRef, useState } from 'react';

const IntroLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reducedMotion ? 450 : 1050;
    const startedAt = performance.now();
    let frameId;

    const updateProgress = (now) => {
      const nextProgress = Math.min((now - startedAt) / duration, 1);
      setProgress(nextProgress * 100);

      if (nextProgress === 1) {
        onCompleteRef.current?.();
        return;
      }

      frameId = requestAnimationFrame(updateProgress);
    };

    frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="intro-loader" role="status" aria-label="Loading portfolio">
      <div className="intro-loader-content">
        <span className="intro-loader-mark" aria-hidden="true">JP</span>
        <p>Jezua Palma</p>
        <span className="intro-loader-caption">Developer &amp; Designer</span>
        <div className="intro-loader-track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default IntroLoader;
