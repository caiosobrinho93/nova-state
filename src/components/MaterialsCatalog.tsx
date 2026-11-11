import { useEffect, useRef, useState } from "react";

type Sample = {
  name: string;
  note: string;
  color?: string;
  texture?: string;
  kind?: "hinge" | "slide" | "handle";
};

type CatalogPage = {
  chapter: "MDF" | "Ferragens";
  title: string;
  subtitle: string;
  samples: Sample[];
};

const wood = (tone: string, grain: string): Pick<Sample, "color" | "texture"> => ({
  color: tone,
  texture: "repeating-linear-gradient(176deg, transparent 0 7px, " + grain + " 8px 9px, transparent 10px 17px), linear-gradient(100deg, #0002, transparent 40%, #fff2)",
});

const pages: CatalogPage[] = [
  {
    chapter: "MDF",
    title: "Madeiras e veios",
    subtitle: "Tons amadeirados para trazer calor e textura ao ambiente.",
    samples: [
      { name: "Carvalho claro", note: "Veios suaves · tom natural", ...wood("#c7a47d", "#805f43aa") },
      { name: "Freijó mel", note: "Veios marcantes · tom dourado", ...wood("#bd8958", "#70452399") },
      { name: "Nogueira", note: "Tom profundo · visual acolhedor", ...wood("#795a45", "#392a2199") },
      { name: "Carvalho natural", note: "Tonalidade equilibrada", ...wood("#b8956d", "#694b3499") },
      { name: "Amêndoa", note: "Madeirado suave · tom quente", ...wood("#d1b08b", "#92714e99") },
      { name: "Ébano", note: "Madeirado escuro · alto contraste", ...wood("#514038", "#261d1999") },
    ],
  },
  {
    chapter: "MDF",
    title: "Neutros e cores",
    subtitle: "Bases versáteis e pontos de cor para compor cada projeto.",
    samples: [
      { name: "Branco quente", note: "Neutro · acabamento ilustrativo", color: "#e9e3d6" },
      { name: "Areia", note: "Neutro · tom suave", color: "#d3c3a8" },
      { name: "Cinza urbano", note: "Neutro · tom contemporâneo", color: "#8c918b" },
      { name: "Verde oliva", note: "Cor · tom natural", color: "#69735d" },
      { name: "Azul profundo", note: "Cor · tom fechado", color: "#40566a" },
      { name: "Terracota", note: "Cor · tom terroso", color: "#ad7059" },
    ],
  },
  {
    chapter: "Ferragens",
    title: "Dobradiças",
    subtitle: "Soluções de abertura para diferentes portas e aplicações.",
    samples: [
      { name: "Com amortecimento", note: "Fechamento suave · ilustrativo", kind: "hinge" },
      { name: "Sem amortecimento", note: "Abertura convencional · ilustrativo", kind: "hinge" },
      { name: "Reta", note: "Para aplicação sobreposta · ilustrativo", kind: "hinge" },
      { name: "Curva", note: "Para aplicação parcialmente sobreposta · ilustrativo", kind: "hinge" },
      { name: "Super curva", note: "Para aplicação embutida · ilustrativo", kind: "hinge" },
      { name: "Ângulo especial", note: "Opção conforme o projeto · ilustrativo", kind: "hinge" },
    ],
  },
  {
    chapter: "Ferragens",
    title: "Corrediças",
    subtitle: "Mecanismos para o movimento e a abertura das gavetas.",
    samples: [
      { name: "Telescópica", note: "Trilho lateral · ilustrativo", kind: "slide" },
      { name: "Oculta", note: "Instalação sob a gaveta · ilustrativo", kind: "slide" },
      { name: "Extração total", note: "Abertura ampla · ilustrativo", kind: "slide" },
      { name: "Com amortecimento", note: "Fechamento suave · ilustrativo", kind: "slide" },
      { name: "Push-to-open", note: "Abertura por pressão · ilustrativo", kind: "slide" },
      { name: "Compacta", note: "Para espaços reduzidos · ilustrativo", kind: "slide" },
    ],
  },
  {
    chapter: "Ferragens",
    title: "Puxadores",
    subtitle: "Formas, acabamentos e detalhes que completam o móvel.",
    samples: [
      { name: "Alça", note: "Formato linear · ilustrativo", kind: "handle" },
      { name: "Ponto", note: "Perfil compacto · ilustrativo", kind: "handle" },
      { name: "Perfil", note: "Integração à borda · ilustrativo", kind: "handle" },
      { name: "Cava", note: "Abertura embutida · ilustrativo", kind: "handle" },
      { name: "Concha", note: "Formato clássico · ilustrativo", kind: "handle" },
      { name: "Botão", note: "Detalhe pontual · ilustrativo", kind: "handle" },
    ],
  },
];

const projectImages = [
  { src: "/moveis/moveis-planejados-mdf-cozinha-01.webp", alt: "Cozinha planejada para referência visual" },
  { src: "/moveis/moveis-planejados-mdf-cozinha-04.webp", alt: "Detalhe de marcenaria para referência visual" },
];

function SampleArt({ sample }: { sample: Sample }) {
  if (!sample.kind) {
    return <span className="catalog-swatch-art" style={{ "--sample-color": sample.color, "--sample-texture": sample.texture ?? "none" } as React.CSSProperties} />;
  }

  return (
    <span className={"catalog-hardware-art catalog-hardware-art--" + sample.kind} aria-hidden="true">
      {sample.kind === "hinge" ? (
        <svg viewBox="0 0 120 84"><rect x="20" y="13" width="28" height="58" rx="5" /><rect x="72" y="13" width="28" height="58" rx="5" /><path d="M48 27h13a9 9 0 0 1 9 9v12a9 9 0 0 1-9 9H48m-15-29v2m15 26v2m39-30v2m0 26v2" /><circle cx="34" cy="28" r="2" /><circle cx="34" cy="56" r="2" /><circle cx="86" cy="28" r="2" /><circle cx="86" cy="56" r="2" /></svg>
      ) : sample.kind === "slide" ? (
        <svg viewBox="0 0 120 84"><path d="M17 24h86v12H17zm0 25h86v12H17z" /><path d="M25 30h70m-70 25h70M29 36v13m62-13v13" /><circle cx="31" cy="30" r="2" /><circle cx="89" cy="55" r="2" /></svg>
      ) : (
        <svg viewBox="0 0 120 84"><path d="M29 42h62m-53 0v15m44-15v15" /><rect x="24" y="34" width="72" height="16" rx="8" /><circle cx="30" cy="42" r="2" /><circle cx="90" cy="42" r="2" /></svg>
      )}
    </span>
  );
}

function CatalogPageContent({
  page,
  pageNumber,
  interactive = true,
  disabled = false,
  onSelect,
}: {
  page: CatalogPage;
  pageNumber: number;
  interactive?: boolean;
  disabled?: boolean;
  onSelect?: (sample: Sample) => void;
}) {
  return (
    <>
      <div className="catalog-content-heading">
        <div><p className="catalog-page-kicker">{page.chapter} · {String(pageNumber + 1).padStart(2, "0")}</p><h3>{page.title}</h3></div>
        <span className="catalog-page-stamp">STATE<br />CATÁLOGO</span>
      </div>
      <p className="catalog-page-description">{page.subtitle}</p>
      <div className="catalog-samples">
        {page.samples.map((sample, index) => {
          const contents = (
            <>
              <span className="catalog-sample-index">{String(index + 1).padStart(2, "0")}</span>
              <SampleArt sample={sample} />
              <span className="catalog-sample-copy"><b>{sample.name}</b><small>{sample.note}</small></span>
              <span className="catalog-sample-open" aria-hidden="true">↗</span>
            </>
          );
          return interactive ? (
            <button className="catalog-sample" type="button" key={sample.name} onClick={() => onSelect?.(sample)} disabled={disabled}>
              {contents}
            </button>
          ) : (
            <div className="catalog-sample catalog-sample--turning" key={sample.name}>
              {contents}
            </div>
          );
        })}
      </div>
      <div className="catalog-page-footer"><span>Deslize para folhear · toque em uma amostra</span><span>{String(pageNumber + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}</span></div>
    </>
  );
}

export function MaterialsCatalog() {
  const [pageIndex, setPageIndex] = useState(0);
  const [turn, setTurn] = useState<{ from: number; to: number; direction: "next" | "previous" } | null>(null);
  const [selected, setSelected] = useState<Sample | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const activePage = pages[pageIndex]!;
  const displayedPage = pages[pageIndex]!;

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (selected && !element.open) element.showModal();
    if (!selected && element.open) element.close();
  }, [selected]);

  function turnTo(index: number) {
    if (turn || index === pageIndex || index < 0 || index >= pages.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPageIndex(index);
      return;
    }
    setTurn({ from: pageIndex, to: index, direction: index > pageIndex ? "next" : "previous" });
  }

  function finishTurn() {
    if (!turn) return;
    setPageIndex(turn.to);
    setTurn(null);
  }

  function changeChapter(chapter: CatalogPage["chapter"]) {
    turnTo(pages.findIndex((page) => page.chapter === chapter));
  }

  return (
    <section className="materials-catalog" id="materiais" aria-labelledby="catalog-title">
      <div className="catalog-heading">
        <p className="projects-eyebrow">SESSÃO 04 · CATÁLOGO DE MATERIAIS</p>
        <h2 id="catalog-title">Toque, escolha, <em>imagine.</em></h2>
        <p>Um catálogo para explorar materiais e acabamentos que dão forma ao seu projeto.</p>
      </div>

      <div className="catalog-chapters" aria-label="Capítulos do catálogo">
        {(["MDF", "Ferragens"] as const).map((chapter) => (
          <button key={chapter} type="button" data-active={activePage.chapter === chapter} onClick={() => changeChapter(chapter)}>
            {chapter === "MDF" ? "01 · MDF" : "02 · Ferragens"}
          </button>
        ))}
      </div>

      <div
        className="catalog-book"
        role="region"
        aria-roledescription="livro de amostras"
        aria-label="Catálogo de materiais. Use as setas ou deslize para folhear."
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") { event.preventDefault(); turnTo(pageIndex + 1); }
          if (event.key === "ArrowLeft") { event.preventDefault(); turnTo(pageIndex - 1); }
        }}
        onTouchStart={(event) => { touchStart.current = { x: event.touches[0]?.clientX ?? 0, y: event.touches[0]?.clientY ?? 0 }; }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          if (!start) return;
          const dx = (event.changedTouches[0]?.clientX ?? start.x) - start.x;
          const dy = (event.changedTouches[0]?.clientY ?? start.y) - start.y;
          if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.2) turnTo(pageIndex + (dx < 0 ? 1 : -1));
          touchStart.current = null;
        }}
      >
        <aside className="catalog-index-page" aria-label="Índice do catálogo">
          <p className="catalog-page-kicker">STATE · MARCENARIA</p>
          <h3>Seu livro<br />de materiais</h3>
          <p className="catalog-index-intro">Folheie as opções e descubra combinações para o seu espaço.</p>
          <div className="catalog-index-list">
            {pages.map((page, index) => (
              <button type="button" key={page.title} data-active={pageIndex === index} onClick={() => turnTo(index)} disabled={Boolean(turn)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span><b>{page.title}</b><small>{page.chapter}</small></span>
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <span className="catalog-index-note">AMOSTRAS ILUSTRATIVAS</span>
        </aside>

        <div className={"catalog-page-stack" + (turn ? " catalog-page-stack--turning" : "")}>
          <article className="catalog-content-page">
            <CatalogPageContent page={displayedPage} pageNumber={pageIndex} disabled={Boolean(turn)} onSelect={setSelected} />
          </article>
          {turn && (
            <div className={"catalog-turn-sheet catalog-turn-sheet--" + turn.direction} onAnimationEnd={(event) => {
              if (event.target !== event.currentTarget) return;
              if (event.animationName === "catalog-page-reveal") setPageIndex(turn.to);
              if (event.animationName === "catalog-page-" + turn.direction) finishTurn();
            }} aria-hidden="true">
              <div className="catalog-turn-face catalog-turn-face--front">
                <article className="catalog-content-page catalog-content-page--turning">
                  <CatalogPageContent page={pages[turn.from]!} pageNumber={turn.from} interactive={false} />
                </article>
              </div>
              <div className="catalog-turn-face catalog-turn-face--back">
                <article className="catalog-content-page catalog-content-page--turning">
                  <CatalogPageContent page={pages[turn.to]!} pageNumber={turn.to} interactive={false} />
                </article>
              </div>
            </div>
          )}
        </div>
        <span className="catalog-spine" aria-hidden="true" />
      </div>

      <div className="catalog-navigation">
        <button type="button" onClick={() => turnTo(pageIndex - 1)} disabled={pageIndex === 0 || Boolean(turn)} aria-label="Folhear para a página anterior">← <span>Anterior</span></button>
        <div className="catalog-page-dots" aria-label={"Página " + (pageIndex + 1) + " de " + pages.length}>
          {pages.map((page, index) => <button key={page.title} type="button" aria-label={"Abrir " + page.title} aria-current={pageIndex === index ? "page" : undefined} data-active={pageIndex === index} onClick={() => turnTo(index)} disabled={Boolean(turn)} />)}
        </div>
        <button type="button" onClick={() => turnTo(pageIndex + 1)} disabled={pageIndex === pages.length - 1 || Boolean(turn)} aria-label="Folhear para a próxima página"><span>Próxima</span> →</button>
      </div>
      <p className="catalog-disclaimer">Cores, ferragens e aplicações desta demonstração são ilustrativas. As amostras reais e suas fotos serão adicionadas quando disponíveis.</p>

      <dialog ref={dialog} className="catalog-dialog" aria-labelledby="sample-dialog-title" onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
        {selected && (
          <div className="catalog-dialog-content">
            <button className="catalog-dialog-close" type="button" onClick={() => setSelected(null)} aria-label="Fechar detalhes">×</button>
            <div className="catalog-dialog-material"><SampleArt sample={selected} /><span className="catalog-page-kicker">AMOSTRA ILUSTRATIVA</span><h3 id="sample-dialog-title">{selected.name}</h3><p>{selected.note}</p></div>
            <div className="catalog-dialog-projects"><p className="catalog-page-kicker">IDEIAS DE APLICAÇÃO</p><h4>Inspire-se em projetos</h4><div>{projectImages.map((image) => <figure key={image.src}><img src={image.src} alt={image.alt} loading="lazy" decoding="async" /><figcaption>Projeto de referência · imagem ilustrativa</figcaption></figure>)}</div><p className="catalog-dialog-note">As imagens são referências visuais e não representam uma correspondência exata com esta amostra.</p></div>
          </div>
        )}
      </dialog>
    </section>
  );
}
