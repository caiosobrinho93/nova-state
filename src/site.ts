export const contactUrl =
  "https://wa.me/5517997448213?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20um%20projeto%20sob%20medida.";
export const frameCount = 71;
export const frameUrl = (index: number, mobile = false) =>
  `${import.meta.env.BASE_URL}sequence/${mobile ? "mobile" : "desktop"}/frame_${String(index + 1).padStart(4, "0")}.webp`;

export function exploreSequence() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.scrollTo({ top: window.innerHeight * 1.35, behavior: "smooth" });
}
