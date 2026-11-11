import { useCallback, useRef, useState } from "react";

const projects = [
  {
    image: "/moveis/IMG_0680-Salman-Moveis.webp",
    title: "Detalhes que fazem a diferença",
    description: "Marcenaria sob medida para viver melhor.",
    position: "center 58%",
  },
  {
    image: "/moveis/moveis-planejados-mdf-cozinha-01.webp",
    title: "A cozinha no seu ritmo",
    description: "Organização e beleza em cada escolha.",
    position: "center",
  },
  {
    image: "/moveis/moveis-planejados-mdf-cozinha-04.webp",
    title: "Espaços com personalidade",
    description: "Soluções pensadas para a sua casa.",
    position: "center",
  },
  {
    image: "/moveis/5-dicas-para-voce-que-esta-pensando-em-contratar-moveis-planejados-2-1024x683.webp",
    title: "Um lugar para cada coisa",
    description: "Projeto inteligente, acabamento cuidadoso.",
    position: "center",
  },
  {
    image: "/moveis/images.jpg",
    title: "Feito para durar",
    description: "Madeira, forma e atenção aos detalhes.",
    position: "center",
  },
  {
    image: "/moveis/images (1).jpg",
    title: "O seu jeito de habitar",
    description: "Marcenaria que combina com você.",
    position: "center",
  },
] as const;

export function FurnitureCarousel() {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const move = useCallback((direction: number) => {
    setActive((current) => (current + direction + projects.length) % projects.length);
  }, []);

  return (
    <section
      aria-labelledby="projects-title"
      className="projects"
      id="projetos"
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        const end = event.changedTouches[0]?.clientX;
        touchStart.current = null;
        if (start !== null && end !== undefined && Math.abs(end - start) > 48)
          move(end < start ? 1 : -1);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          move(1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(-1);
        }
      }}
    >
      <div className="projects-heading">
        <p className="projects-eyebrow">FEITO PARA O SEU ESPAÇO</p>
        <h2 id="projects-title">Detalhes que <em>inspiram.</em></h2>
        <p>Uma seleção de ideias para transformar o seu jeito de habitar.</p>
      </div>

      <div className="carousel-stage" role="region" aria-roledescription="carrossel" aria-label="Projetos de marcenaria">
        {projects.map((project, index) => {
          const offset = (index - active + projects.length + Math.floor(projects.length / 2)) % projects.length - Math.floor(projects.length / 2);
          const visible = Math.abs(offset) <= 2;
          return (
            <article
              key={project.image}
              ref={(element) => { itemRefs.current[index] = element; }}
              aria-label={`${index + 1} de ${projects.length}: ${project.title}`}
              aria-hidden={!visible}
              className="carousel-card"
              data-active={offset === 0}
              data-visible={visible}
              style={{ "--card-offset": offset } as React.CSSProperties}
              tabIndex={offset === 0 ? 0 : -1}
            >
              <img src={project.image} alt={project.title} style={{ objectPosition: project.position }} loading={Math.abs(offset) < 2 ? "eager" : "lazy"} decoding="async" />
              <div className="carousel-card-copy">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="carousel-controls">
        <button className="carousel-arrow" onClick={() => move(-1)} aria-label="Projeto anterior">←</button>
        <div className="carousel-dots" aria-label={`Projeto ${active + 1} de ${projects.length}`}>
          {projects.map((project, index) => (
            <button key={project.image} className="carousel-dot" data-active={active === index} onClick={() => setActive(index)} aria-label={`Ver projeto ${index + 1}`} aria-current={active === index ? "true" : undefined} />
          ))}
        </div>
        <button className="carousel-arrow" onClick={() => move(1)} aria-label="Próximo projeto">→</button>
        <span className="carousel-count">{String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
