import { useEffect, useRef, useState } from "react";
import { contactUrl, exploreSequence } from "../site";
import { Arrow } from "./Arrow";

export function Header() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () =>
      header.current?.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const dialog = menu.current!;
    const trigger = toggle.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    const breakpoint = window.matchMedia("(min-width: 760px)");
    const closeOnDesktop = () => {
      if (breakpoint.matches) setOpen(false);
    };
    breakpoint.addEventListener("change", closeOnDesktop);
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      breakpoint.removeEventListener("change", closeOnDesktop);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  function explore() {
    setOpen(false);
    requestAnimationFrame(exploreSequence);
  }

  return (
    <>
      <header ref={header} className="header">
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#inicio">Início</a>
          <button className="experience-link" onClick={exploreSequence}>
            A experiência
          </button>
        </nav>
        <a
          className="header-contact"
          href={contactUrl}
          target="_blank"
          rel="noreferrer"
        >
          Vamos conversar <Arrow />
        </a>
        <button
          className="menu-toggle"
          ref={toggle}
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <span className="menu-toggle-label">Menu</span>
          <span className="menu-toggle-icon" aria-hidden="true"><i /><i /></span>
        </button>
      </header>
      <dialog
        ref={menu}
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Menu de navegação"
        onCancel={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="menu-content">
          <div className="menu-heading">
            <span>state.</span>
            <button
              className="menu-close"
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
            >
              <span />
              <span />
            </button>
          </div>
          <nav aria-label="Navegação mobile">
            <a href="#inicio" onClick={() => setOpen(false)}>
              Início <Arrow />
            </a>
            <button className="experience-link" onClick={explore}>
              A experiência <Arrow />
            </button>
            <a
              href={contactUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              Vamos conversar <Arrow />
            </a>
          </nav>
          <p>
            Marcenaria autoral.
            <br />
            Feita para o seu jeito de viver.
          </p>
        </div>
      </dialog>
    </>
  );
}
