import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { frameCount, frameUrl } from "../site";

gsap.registerPlugin(ScrollTrigger);
type Frame = ImageBitmap | HTMLImageElement;
const release = (frame: Frame) => {
  if ("close" in frame) frame.close();
};

export function useFrameSequence(
  heroRef: RefObject<HTMLElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
) {
  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!hero || !canvas || !context) return;
    const media = gsap.matchMedia();
    media.add(
      {
        mobile: "(max-width: 759px)",
        desktop: "(min-width: 760px)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (scope) => {
        const mobile = Boolean(scope.conditions?.mobile);
        const reduced = Boolean(scope.conditions?.reduced);
        const cache = new Map<number, Frame>();
        const pending = new Set<number>();
        const failed = new Set<number>();
        const abort = new AbortController();
        const state = { frame: 0 };
        const maxFrames = mobile ? 16 : 22;
        let disposed = false;
        let drawRequest = 0;
        let target = 0;
        let lastDrawn = -1;
        let width = 0;
        let height = 0;
        const wordmark = hero.querySelector<HTMLElement>(".hero-wordmark-rail")!;

        function draw() {
          drawRequest = 0;
          if (!cache.size || disposed) return;
          const closest = cache.has(target)
            ? target
            : [...cache.keys()].reduce((a, b) =>
                Math.abs(b - target) < Math.abs(a - target) ? b : a,
              );
          if (closest === lastDrawn) return;
          const frame = cache.get(closest)!;
          const ratio = Math.max(width / frame.width, height / frame.height);
          const w = frame.width * ratio;
          const h = frame.height * ratio;
          context!.drawImage(frame, (width - w) / 2, (height - h) / 2, w, h);
          canvas!.style.opacity = "1";
          canvas!.dataset.frame = String(closest + 1);
          lastDrawn = closest;
        }
        function scheduleDraw() {
          if (!drawRequest && !disposed)
            drawRequest = requestAnimationFrame(draw);
        }
        function resize() {
          const bounds = canvas!.getBoundingClientRect();
          const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
          width = Math.round(bounds.width * dpr);
          height = Math.round(bounds.height * dpr);
          canvas!.width = width;
          canvas!.height = height;
          lastDrawn = -1;
          scheduleDraw();
        }
        async function load(index: number) {
          pending.add(index);
          try {
            const response = await fetch(frameUrl(index, mobile), {
              signal: abort.signal,
            });
            if (!response.ok)
              throw new Error(`Frame ${index + 1}: ${response.status}`);
            const blob = await response.blob();
            let frame: Frame;
            if ("createImageBitmap" in window)
              frame = await createImageBitmap(blob);
            else {
              const url = URL.createObjectURL(blob);
              try {
                const image = new Image();
                image.src = url;
                await image.decode();
                frame = image;
              } finally {
                URL.revokeObjectURL(url);
              }
            }
            if (disposed) {
              release(frame);
              return;
            }
            cache.set(index, frame);
            // Keep the first frame and a bounded window near the playhead.
            const evictable = [...cache.keys()]
              .filter((key) => key !== 0 && key !== target)
              .sort((a, b) => Math.abs(b - target) - Math.abs(a - target));
            while (cache.size > maxFrames && evictable.length) {
              const key = evictable.shift()!;
              release(cache.get(key)!);
              cache.delete(key);
            }
            scheduleDraw();
          } catch {
            if (!disposed) failed.add(index);
          } finally {
            pending.delete(index);
            if (!disposed) pump();
          }
        }
        function pump() {
          if (disposed) return;
          const candidates = [target, 0];
          if (!reduced)
            for (let offset = 1; offset <= (mobile ? 6 : 9); offset++)
              candidates.push(target + offset, target - offset);
          for (const index of candidates) {
            if (pending.size >= 3) break;
            if (
              index < 0 ||
              index >= frameCount ||
              cache.has(index) ||
              pending.has(index) ||
              failed.has(index)
            )
              continue;
            void load(index);
          }
        }
        const observer = new ResizeObserver(resize);
        observer.observe(canvas);
        resize();
        if (!reduced) {
          pump();
          gsap.fromTo(
            hero.querySelector(".hero-content"),
            { y: 22, opacity: 0.4 },
            { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
          );
          gsap.to(state, {
            frame: frameCount - 1,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: () => `+=${window.innerHeight * 3.5}`,
              pin: true,
              scrub: 0.45,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
            onUpdate: () => {
              target = Math.round(state.frame);
              const progress = gsap.utils.clamp(0, 1, state.frame / Math.min(frameCount - 1, mobile ? 20 : 24));
              const distance = gsap.utils.interpolate(0, mobile ? window.innerHeight * 0.32 : window.innerWidth * 0.42, progress);
              wordmark.style.transform = mobile
                ? `translate3d(-50%, ${distance}px, 0)`
                : `translate3d(${distance}px, 0, 0)`;
              wordmark.style.opacity = String(1 - progress);
              scheduleDraw();
              pump();
            },
          });
        }
        return () => {
          disposed = true;
          abort.abort();
          observer.disconnect();
          cancelAnimationFrame(drawRequest);
          for (const frame of cache.values()) release(frame);
          cache.clear();
          canvas.style.opacity = "0";
          wordmark.style.transform = "translate3d(-50%, 0, 0)";
          wordmark.style.opacity = "1";
        };
      },
      hero,
    );
    return () => media.revert();
  }, [heroRef, canvasRef]);
}
