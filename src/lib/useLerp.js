import { useEffect, useRef, useState } from "react";

/**
 * Smoothly interpolates a displayed number toward `target` with
 * requestAnimationFrame so financial figures count up/down instead of snapping.
 */
export function useLerp(target, duration = 620) {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    if (Math.abs(from - target) < 0.5) {
      fromRef.current = target;
      setDisplay(target);
      return;
    }
    startRef.current = 0;
    const step = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min(1, (timestamp - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = from + (target - from) * eased;
      fromRef.current = next;
      setDisplay(next);
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return display;
}