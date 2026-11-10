import { useRef } from "react";
import { frameUrl } from "../site";
import { useFrameSequence } from "../hooks/useFrameSequence";

export function Hero() {
  const hero = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useFrameSequence(hero, canvas);

  return (
    <section
      className="hero"
      id="inicio"
      ref={hero}
      aria-labelledby="hero-title"
      tabIndex={-1}
    >
      <div className="hero-visual">
        <picture className="hero-poster">
          <source media="(max-width: 759px)" srcSet={frameUrl(0, true)} />
          <img
            src={frameUrl(0)}
            alt="Móvel em madeira natural com duas gavetas e acabamento em tom areia"
            width="1280"
            height="720"
            fetchPriority="high"
          />
        </picture>
        <canvas ref={canvas} className="hero-canvas" aria-hidden="true" />
      </div>
      <div className="hero-content">
        <h1 className="hero-wordmark-rail" id="hero-title">
          <span className="hero-wordmark">STATE<span className="hero-wordmark-period">.</span></span>
          <span className="hero-wordmark-subtitle">marcenaria</span>
        </h1>
      </div>
    </section>
  );
}
