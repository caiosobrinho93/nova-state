const highlights = [
  { title: "Projeto sob medida", description: "Cada espaço começa com as suas ideias, necessidades e rotina.", image: "/moveis/IMG_0680-Salman-Moveis.jpeg", alt: "Detalhe de marcenaria em madeira" },
  { title: "Aproveitamento inteligente", description: "Soluções pensadas para integrar beleza, organização e funcionalidade.", image: "/moveis/moveis-planejados-mdf-cozinha-01.webp", alt: "Cozinha planejada com aproveitamento inteligente" },
  { title: "Acabamento cuidadoso", description: "Materiais e detalhes escolhidos para criar ambientes que duram.", image: "/moveis/moveis-planejados-mdf-cozinha-04.webp", alt: "Detalhes de cozinha planejada" },
] as const;

export function Testimonials() {
  const repeated = [...highlights, ...highlights];

  return (
    <section aria-labelledby="testimonials-title" className="testimonials" id="depoimentos">
      <div className="testimonials-heading">
        <p className="projects-eyebrow">A ESSÊNCIA DA STATE</p>
        <h2 id="testimonials-title">Pensado em cada <em>detalhe.</em></h2>
      </div>
      <div className="testimonial-marquee" aria-label="Diferenciais da marcenaria">
        <div className="testimonial-track">
          {repeated.map((highlight, index) => (
            <article className="testimonial-card" key={`${highlight.title}-${index}`} aria-hidden={index >= highlights.length}>
              <div className="testimonial-profile">
                <img className="testimonial-photo" src={highlight.image} alt={highlight.alt} loading="lazy" />
                <div><span className="testimonial-profile-name">State Marcenaria</span><span className="testimonial-profile-context">Projeto em destaque</span></div>
              </div>
              <div className="testimonial-bubble">
                <h3 className="testimonial-quote">{highlight.title}</h3>
                <p className="testimonial-description">{highlight.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
