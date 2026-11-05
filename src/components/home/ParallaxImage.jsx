import { useEffect, useRef } from "react";
import { Image } from "@/components/ui/image";
import { prefersReducedMotion } from "@/lib/useInView";

/**
 * Photograph inside a clipped frame that drifts as the page scrolls, with an
 * optional slow light-scan sweep for depth.
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  strength = 32,
  scan = false,
  children,
}) {
  const frameRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const image = imageRef.current;
    if (!frame || !image || prefersReducedMotion()) return;

    let queued = 0;
    const update = () => {
      queued = 0;
      const rect = frame.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const offset = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      image.style.transform = `translate3d(0, ${(-offset * strength).toFixed(2)}px, 0) scale(1.14)`;
    };
    const onScroll = () => {
      if (!queued) queued = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (queued) cancelAnimationFrame(queued);
    };
  }, [strength]);

  return (
    <div ref={frameRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={imageRef}
        className="h-full w-full will-change-transform"
        style={{ transform: "scale(1.14)" }}
      >
        <Image src={src} alt={alt} className="block h-full w-full" fittingType="fill" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080B0E] via-[#080B0E]/30 to-[#080B0E]/10"
        aria-hidden="true"
      />
      {scan && (
        <span
          className="ms-scan pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}